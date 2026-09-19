import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Groq from "groq-sdk";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

// Initialize Supabase client (backend uses service_role key)
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = supabaseUrl ? createClient(supabaseUrl, supabaseServiceKey) : null;

// Initialize Groq client lazily
let groqClient: Groq | null = null;
const getGroqClient = (): Groq | null => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!groqClient) {
    groqClient = new Groq({ apiKey });
  }
  return groqClient;
};

// Auto-detect best supported model from Groq
let cachedGroqModel: string | null = null;
const getWorkingModel = async (groq: Groq): Promise<string> => {
  if (cachedGroqModel) return cachedGroqModel;

  if (process.env.GROQ_MODEL) {
    cachedGroqModel = process.env.GROQ_MODEL;
    return cachedGroqModel;
  }

  const candidateModels = [
    "qwen/qwen3.8-27b",
    "groq/compound-mini",
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
  ];

  try {
    const modelList = await groq.models.list();
    const availableIds = new Set(modelList.data.map((m) => m.id));
    for (const cand of candidateModels) {
      if (availableIds.has(cand)) {
        cachedGroqModel = cand;
        return cand;
      }
    }
  } catch (err) {
    console.warn("Could not list Groq models, falling back to default:", err);
  }

  cachedGroqModel = "qwen/qwen3.8-27b";
  return cachedGroqModel;
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  // Serve static assets from public
  app.use(express.static(path.join(process.cwd(), "public")));

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      hasGroqKey: Boolean(process.env.GROQ_API_KEY),
      hasSupabase: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
      hasTelegram: Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
      timestamp: new Date().toISOString(),
    });
  });

  // ============================================
  // TEST ENDPOINT: Supabase RLS & Connection
  // ============================================
  app.get("/api/test-supabase", async (req, res) => {
    if (!supabase) {
      return res.json({ error: "Supabase not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env" });
    }
    try {
      // Test 1: Insert into admissions (should work with service_role)
      const { data: admissionData, error: admissionError } = await supabase
        .from("admissions")
        .insert([{
          parent_name: "Test Parent",
          child_name: "Test Child",
          child_age: 4,
          phone: "9999999999",
          program: "Nursery",
          message: "RLS Test - This is a test entry",
          status: "new"
        }])
        .select();
      
      if (admissionError) {
        return res.json({ 
          admissions: "FAILED", 
          error: admissionError.message,
          hint: "Check if RLS policies are set up correctly"
        });
      }
      
      // Test 2: Read gallery events (should work - service_role bypasses RLS)
      const { data: galleryData, error: galleryError } = await supabase
        .from("gallery_events")
        .select("*")
        .eq("published", true)
        .limit(5);
      
      if (galleryError) {
        return res.json({ 
          gallery: "FAILED", 
          error: galleryError.message 
        });
      }
      
      // Test 3: Read articles (should work)
      const { data: articlesData, error: articlesError } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .limit(3);
      
      if (articlesError) {
        return res.json({ 
          articles: "FAILED", 
          error: articlesError.message 
        });
      }
      
      // Clean up: Delete the test admission entry
      if (admissionData && admissionData.length > 0) {
        await supabase
          .from("admissions")
          .delete()
          .eq("id", admissionData[0].id);
      }
      
      res.json({
        admissions: "SUCCESS",
        gallery: "SUCCESS",
        galleryCount: galleryData?.length || 0,
        articles: "SUCCESS",
        articlesCount: articlesData?.length || 0,
        message: "✅ Supabase connection and RLS policies are working correctly!",
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      res.status(500).json({ 
        error: error.message,
        hint: "Check your .env file for SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
      });
    }
  });

  // ============================================
  // Telegram Bot Notification & Duplicate Prevention
  // ============================================
  const recentSubmissionKeys = new Map<string, number>();
  const isDuplicateSubmission = (key: string): boolean => {
    const now = Date.now();
    const lastTime = recentSubmissionKeys.get(key);
    if (lastTime && now - lastTime < 15000) {
      return true;
    }
    recentSubmissionKeys.set(key, now);
    if (recentSubmissionKeys.size > 200) {
      for (const [k, t] of recentSubmissionKeys.entries()) {
        if (now - t > 60000) recentSubmissionKeys.delete(k);
      }
    }
    return false;
  };

  const escapeHtml = (str?: string | number | null): string => {
    if (str === undefined || str === null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  // Cache for resolved Telegram chat ID (handles group -> supergroup migration)
  let activeTelegramChatId: string | number | null = null;

  const sendTelegramNotification = async (payload: {
    submissionType: string;
    parentName: string;
    phone: string;
    email?: string;
    childName?: string;
    childAge?: string | number;
    program?: string;
    city?: string;
    preferredDate?: string;
    preferredTime?: string;
    experience?: string;
    investmentBudget?: string;
    propertyAvailable?: string;
    message?: string;
    submittedAt: string;
  }): Promise<{ sent: boolean; reason?: string }> => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const initialChatId = activeTelegramChatId || process.env.TELEGRAM_CHAT_ID;

    if (!token || !initialChatId) {
      console.warn(
        "[Telegram] Notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured in environment."
      );
      return { sent: false, reason: "Credentials not configured" };
    }

    const lines: string[] = [
      `🦁 <b>New Website Form Submission</b>`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `📋 <b>Form Type:</b> ${escapeHtml(payload.submissionType)}`,
      `👤 <b>Name:</b> ${escapeHtml(payload.parentName)}`,
      `📞 <b>Phone:</b> <code>${escapeHtml(payload.phone)}</code>`,
    ];

    if (payload.email) {
      lines.push(`✉️ <b>Email:</b> ${escapeHtml(payload.email)}`);
    }
    if (payload.childName) {
      lines.push(`👶 <b>Child Name:</b> ${escapeHtml(payload.childName)}`);
    }
    if (payload.childAge) {
      lines.push(`🎂 <b>Child Age / Group:</b> ${escapeHtml(payload.childAge)}`);
    }
    if (payload.program) {
      lines.push(`🎒 <b>Selected Program:</b> ${escapeHtml(payload.program)}`);
    }
    if (payload.preferredDate) {
      lines.push(
        `📅 <b>Tour Date:</b> ${escapeHtml(payload.preferredDate)} (${escapeHtml(payload.preferredTime || "Anytime")})`
      );
    }
    if (payload.city) {
      lines.push(`📍 <b>Campus / City:</b> ${escapeHtml(payload.city)}`);
    }
    if (payload.investmentBudget) {
      lines.push(`💼 <b>Investment Budget:</b> ${escapeHtml(payload.investmentBudget)}`);
    }
    if (payload.experience) {
      lines.push(`🎓 <b>Experience:</b> ${escapeHtml(payload.experience)}`);
    }
    if (payload.propertyAvailable) {
      lines.push(`🏢 <b>Property Available:</b> ${escapeHtml(payload.propertyAvailable)}`);
    }
    if (payload.message) {
      lines.push(`💬 <b>Message:</b>\n<i>${escapeHtml(payload.message)}</i>`);
    }

    lines.push(`━━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`🕒 <b>Date & Time:</b> ${escapeHtml(payload.submittedAt)}`);
    lines.push(`📌 <b>Status:</b> <code>new</code>`);

    const text = lines.join("\n");

    const postMessage = async (targetChatId: string | number) => {
      const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
      const res = await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: targetChatId,
          text,
          parse_mode: "HTML",
        }),
      });
      return await res.json();
    };

    try {
      let result = await postMessage(initialChatId);

      // Handle Telegram group migration or chat-not-found when group was converted to supergroup
      if (!result.ok) {
        let migratedId: string | number | null = result.parameters?.migrate_to_chat_id || null;

        if (!migratedId && result.description && result.description.toLowerCase().includes("chat not found")) {
          try {
            const updatesRes = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
            const updatesData = await updatesRes.json();
            if (updatesData.ok && Array.isArray(updatesData.result)) {
              for (let i = updatesData.result.length - 1; i >= 0; i--) {
                const u = updatesData.result[i];
                const chat = u.message?.chat || u.my_chat_member?.chat || u.channel_post?.chat;
                if (chat && chat.id) {
                  migratedId = chat.id;
                  break;
                }
              }
            }
          } catch (fetchErr) {
            console.warn("[Telegram] Error fetching bot updates for chat resolution:", fetchErr);
          }
        }

        if (migratedId && migratedId !== initialChatId) {
          console.log(`[Telegram] Retrying delivery with resolved supergroup chat ID: ${migratedId}`);
          result = await postMessage(migratedId);
          if (result.ok) {
            activeTelegramChatId = migratedId;
          }
        }
      }

      if (!result.ok) {
        console.error("[Telegram] Telegram API error:", result.description || "Unknown error");
        return { sent: false, reason: result.description || "API returned error" };
      }

      return { sent: true };
    } catch (error: any) {
      console.error("[Telegram] Network/send error:", error?.message || error);
      return { sent: false, reason: error?.message || "Network error" };
    }
  };

  // Safe fallback storage buffer in case database is momentarily unavailable
  const fallbackSubmissionsBuffer: Array<any> = [];

  const saveSubmissionToSupabase = async (submission: {
    submission_type: string;
    parent_name: string;
    phone: string;
    email?: string | null;
    child_name?: string | null;
    child_age?: string | null;
    program?: string | null;
    message?: string | null;
    status: string;
    created_at: string;
    metadata?: Record<string, any>;
  }): Promise<{ savedToSupabase: boolean; recordId?: string | number; tableUsed?: string; error?: string }> => {
    if (!supabase) {
      console.warn(
        "[Supabase] Not configured (SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing). Submission retained in memory buffer."
      );
      fallbackSubmissionsBuffer.push(submission);
      return { savedToSupabase: false, error: "Supabase not configured in environment" };
    }

    const typeLower = submission.submission_type.toLowerCase();

    try {
      // 1. Admission Enquiry -> 'admissions' table
      if (typeLower.includes("admission")) {
        const match = String(submission.child_age || "").match(/\d+(\.\d+)?/);
        const parsedAge = match ? Math.round(parseFloat(match[0])) || 3 : 3;

        const { data, error } = await supabase
          .from("admissions")
          .insert([
            {
              parent_name: submission.parent_name,
              child_name: submission.child_name || "Little Explorer",
              child_age: parsedAge,
              phone: submission.phone,
              email: submission.email || "",
              program: submission.program || "General",
              message: submission.message || "",
              status: "new",
            },
          ])
          .select();

        if (!error && data && data.length > 0) {
          return { savedToSupabase: true, recordId: data[0].id, tableUsed: "admissions" };
        }
        if (error) {
          console.warn("[Supabase] Insert into admissions notice:", error.message);
        }
      }

      // 2. Campus Tour Booking -> 'tour_bookings' table
      if (typeLower.includes("tour")) {
        const match = String(submission.child_age || "").match(/\d+(\.\d+)?/);
        const parsedAge = match ? Math.round(parseFloat(match[0])) || null : null;

        const tourMessage = [
          submission.child_name ? `Child: ${submission.child_name}` : "",
          submission.program ? `Program: ${submission.program}` : "",
          submission.message || "",
        ]
          .filter(Boolean)
          .join(" | ");

        const { data, error } = await supabase
          .from("tour_bookings")
          .insert([
            {
              parent_name: submission.parent_name,
              phone: submission.phone,
              email: submission.email || "",
              child_age: parsedAge,
              preferred_date: submission.metadata?.preferredDate || "",
              preferred_time: submission.metadata?.preferredTime || "",
              message: tourMessage,
              status: "new",
            },
          ])
          .select();

        if (!error && data && data.length > 0) {
          return { savedToSupabase: true, recordId: data[0].id, tableUsed: "tour_bookings" };
        }
        if (error) {
          console.warn("[Supabase] Insert into tour_bookings notice:", error.message);
        }
      }

      // 3. Franchise Application -> 'enquiries' table (or contact / general enquiry)
      if (typeLower.includes("franchise")) {
        const franchiseDetails = [
          submission.metadata?.city ? `City: ${submission.metadata.city}` : "",
          submission.metadata?.experience ? `Experience: ${submission.metadata.experience}` : "",
          submission.metadata?.investmentBudget ? `Budget: ${submission.metadata.investmentBudget}` : "",
          submission.metadata?.propertyAvailable ? `Property: ${submission.metadata.propertyAvailable}` : "",
          submission.message ? `Notes: ${submission.message}` : "",
        ]
          .filter(Boolean)
          .join("\n");

        const { data, error } = await supabase
          .from("enquiries")
          .insert([
            {
              name: submission.parent_name,
              phone: submission.phone,
              email: submission.email || "",
              subject: `Franchise Application${submission.metadata?.city ? ` - ${submission.metadata.city}` : ""}`,
              message: franchiseDetails || "Franchise partner application",
              source: "Franchise Page",
              status: "new",
            },
          ])
          .select();

        if (!error && data && data.length > 0) {
          return { savedToSupabase: true, recordId: data[0].id, tableUsed: "enquiries" };
        }
        if (error) {
          console.warn("[Supabase] Insert into enquiries notice:", error.message);
        }
      }

      // 4. Contact Enquiry & all other enquiries -> 'enquiries' table
      const contactDetails = [
        submission.child_age ? `Child Age / Group: ${submission.child_age}` : "",
        submission.metadata?.city ? `Campus / Locality: ${submission.metadata.city}` : "",
        submission.message || "",
      ]
        .filter(Boolean)
        .join("\n");

      const { data: enqData, error: enqError } = await supabase
        .from("enquiries")
        .insert([
          {
            name: submission.parent_name,
            phone: submission.phone,
            email: submission.email || "",
            subject: submission.metadata?.enquiryType || submission.submission_type || "Contact Enquiry",
            message: contactDetails || "General enquiry",
            source: "Contact Form",
            status: "new",
          },
        ])
        .select();

      if (!enqError && enqData && enqData.length > 0) {
        return { savedToSupabase: true, recordId: enqData[0].id, tableUsed: "enquiries" };
      }

      if (enqError) {
        console.warn("[Supabase] Insert into enquiries failed:", enqError.message);
        fallbackSubmissionsBuffer.push(submission);
        return { savedToSupabase: false, error: enqError.message };
      }

      return { savedToSupabase: true };
    } catch (err: any) {
      console.error("[Supabase] Unexpected error saving submission:", err?.message || err);
      fallbackSubmissionsBuffer.push(submission);
      return { savedToSupabase: false, error: err?.message || "Insert failed" };
    }
  };

  // ============================================
  // Unified Form Submission API (Supabase + Telegram)
  // Supports: Admissions, Enquiries, Book-a-Tour, Franchise, Contact
  // ============================================
  const handleFormSubmission = async (req: express.Request, res: express.Response) => {
    try {
      const {
        type = "enquiry",
        parentName,
        name,
        phone,
        email,
        childName,
        childAge,
        program,
        city,
        preferredCampus,
        preferredDate,
        preferredTime,
        experience,
        investmentBudget,
        propertyAvailable,
        enquiryType,
        message,
        metadata = {},
      } = req.body;

      const resolvedName = (parentName || name || "").trim();
      const resolvedPhone = (phone || "").trim();

      // Validation
      if (!resolvedName) {
        return res.status(400).json({ success: false, error: "Name is required." });
      }
      if (!resolvedPhone || resolvedPhone.length < 7) {
        return res.status(400).json({ success: false, error: "A valid phone number is required." });
      }

      // Normalize human-readable form type
      const normalizedType = (() => {
        const t = String(type).toLowerCase();
        if (t.includes("admission")) return "Admission Enquiry";
        if (t.includes("tour")) return "Campus Tour Booking";
        if (t.includes("franchise")) return "Franchise Application";
        if (t.includes("contact")) return "Contact Enquiry";
        if (enquiryType) return String(enquiryType);
        return "Website Enquiry";
      })();

      // Duplicate prevention (15-second debounce)
      const dedupKey = `${normalizedType}:${resolvedPhone}:${resolvedName.toLowerCase()}`;
      if (isDuplicateSubmission(dedupKey)) {
        return res.json({
          success: true,
          message: "Thank you! We have already received your submission.",
          duplicate: true,
        });
      }

      const submittedAt = new Date().toISOString();
      const formattedTimestamp = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      });

      const submissionRecord = {
        submission_type: normalizedType,
        parent_name: resolvedName,
        phone: resolvedPhone,
        email: email ? String(email).trim() : null,
        child_name: childName ? String(childName).trim() : null,
        child_age: childAge ? String(childAge).trim() : null,
        program: program ? String(program).trim() : null,
        message: message ? String(message).trim() : null,
        status: "new",
        created_at: submittedAt,
        metadata: {
          ...metadata,
          city: city || preferredCampus || null,
          preferredDate: preferredDate || null,
          preferredTime: preferredTime || null,
          experience: experience || null,
          investmentBudget: investmentBudget || null,
          propertyAvailable: propertyAvailable || null,
          enquiryType: enquiryType || null,
        },
      };

      // 1. Save to Supabase first
      const supabaseResult = await saveSubmissionToSupabase(submissionRecord);

      // 2. Send Telegram notification (does not break submission if Telegram fails or unconfigured)
      const telegramResult = await sendTelegramNotification({
        submissionType: normalizedType,
        parentName: resolvedName,
        phone: resolvedPhone,
        email: email || undefined,
        childName: childName || undefined,
        childAge: childAge || undefined,
        program: program || undefined,
        city: city || preferredCampus || undefined,
        preferredDate: preferredDate || undefined,
        preferredTime: preferredTime || undefined,
        experience: experience || undefined,
        investmentBudget: investmentBudget || undefined,
        propertyAvailable: propertyAvailable || undefined,
        message: message || undefined,
        submittedAt: `${formattedTimestamp} IST`,
      });

      return res.json({
        success: true,
        message: "Your submission has been received successfully!",
        recordId: supabaseResult.recordId || null,
        savedToSupabase: supabaseResult.savedToSupabase,
        telegramSent: telegramResult.sent,
      });
    } catch (error: any) {
      console.error("[Form Submission] Unexpected error:", error?.message || error);
      return res.status(500).json({
        success: false,
        error: "An unexpected error occurred while processing your submission. Please try again.",
      });
    }
  };

  app.post("/api/submit-form", handleFormSubmission);
  app.post("/api/admissions", handleFormSubmission);
  app.post("/api/enquiries", handleFormSubmission);
  app.post("/api/tour-bookings", handleFormSubmission);
  app.post("/api/franchise", handleFormSubmission);

  // Diagnostic route for admin inspection
  app.get("/api/submissions/recent", (req, res) => {
    res.json({
      bufferedCount: fallbackSubmissionsBuffer.length,
      recent: fallbackSubmissionsBuffer.slice(-10),
    });
  });

  // ============================================
  // Groq API route for "Ask Leo" AI Chatbot
  // ============================================
  app.post("/api/ask-leo", async (req, res) => {
    try {
      const { message, childAge, program, history } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const groq = getGroqClient();

      if (!groq) {
        const isTourReq = /tour|visit|see campus|walkthrough|in-person|appointment/i.test(message);
        // Fallback intelligent response if GROQ_API_KEY is not yet configured
        return res.json({
          reply: isTourReq
            ? `🦁 *Roar!* We would love to give you a personalized in-person tour of our school! Please use our **Personalized In-Person Experience Booking** page to select your preferred date and time slot and generate your VIP Visitor Pass with a free explorer kit!`
            : `🦁 *Roar!* Hi there! I'm Leo, your friendly mascot at A Kid's Pre School! ` +
              `For a child around ${childAge || "2–4 years"} in ${program || "our early childhood programs"}, ` +
              `our Montessori + Play-Way curriculum focuses on sensory discovery, joyful phonics, and warm social bonding. ` +
              `Our campus is at 156, Doctor layout, Hosa Rd, Naganathapura, Bengaluru. Admissions are open for 2026–27! Would you like to schedule a campus tour or check our location?`,
          isFallback: true,
        });
      }

      const systemInstruction = `
You are "Leo the Lion", the warm, enthusiastic, and lovable AI Lion Mascot and Admissions Advisor for "A Kid's Pre School".
Your tone is deeply caring, playful, reassuring to anxious parents, and encouraging. You frequently use playful lion expressions like "Roar!", "Pawsome!", "Little Cubs!", and joyful emojis (🦁, 🌟, 🎨, 🌈, 🍎, 📚).

School Key Facts:
- School Name: A Kid's Pre School
- Campus Location: 156, Doctor layout, 1st main road, Hosa Rd, Naganathapura, Bengaluru, Karnataka 560100, India (near Hosa Road Junction / Electronic City corridor)
- Admissions Hotline: +91 9945531032 / +91 9845296096
- Email: akidspreschool@gmail.com
- Core Philosophy: Joyful Montessori + Play-Way methodology, sensory integration, emotional intelligence.
- Programs: 
  1. Playgroup (1.5 - 2.5 yrs): Sensory messy play, gentle separation, rhythm (9:00 AM - 11:30 AM)
  2. Nursery (2.5 - 3.5 yrs): Phonics, pattern recognition, puppet storytelling (8:30 AM - 12:00 PM)
  3. Junior KG (LKG, 3.5 - 4.5 yrs): STEM inquiry, early math 1-50, writing readiness (8:30 AM - 12:30 PM)
  4. Senior KG (UKG, 4.5 - 5.5 yrs): Independent reading, grade school confidence (8:30 AM - 1:30 PM)
  5. Daycare & Extended Care (1.5 - 8 yrs): Organic hot meals, quiet nap suites, homework aid, open 8:00 AM - 6:30 PM
- Admissions: Open for Academic Year 2026-27 with instant VIP tour passes and trial classes.
- Facilities & Safety: 100% CCTV surveillance, child-safe rubberized play areas, Montessori sensory labs, GPS-tracked air-conditioned school van pickup across Hosa Road, Electronic City, Singasandra, Kudlu Gate, and Kasavanahalli.
- Meal Plan: 100% hygienic, dietitian-crafted nutritious meals & snack routines.

Context provided by the parent:
Child Age: ${childAge || "Not specified"}
Interested Program: ${program || "General"}

Guidelines for your response:
1. Greet the parent warmly as Leo the Lion.
2. Give actionable, compassionate preschool guidance (answering their specific question about curriculum, admissions, potty training, separation anxiety, daily meals, or directions to our Bengaluru campus).
3. Keep answers concise, highly readable, formatting with bullet points when listing tips.
4. Conclude with a helpful call-to-action (e.g. inviting them to book a campus tour or explore our programs).
5. When the user asks to book a tour, schedule a visit, book an in-person tour, see the campus, or anything similar, enthusiastically direct them to our "Personalized In-Person Experience Booking" page where they can pick a preferred date and time slot and receive an instant VIP Visitor Pass!
`.trim();

      // Build chat messages array for Groq Chat Completion
      const groqMessages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
        { role: "system", content: systemInstruction },
      ];

      if (Array.isArray(history) && history.length > 0) {
        const recentHistory = history.slice(-6);
        for (const h of recentHistory) {
          if (h && typeof h.text === "string" && h.text.trim()) {
            groqMessages.push({
              role: h.sender === "user" ? "user" : "assistant",
              content: h.text,
            });
          }
        }
      }

      groqMessages.push({
        role: "user",
        content: message,
      });

      const model = await getWorkingModel(groq);

      const completion = await groq.chat.completions.create({
        model,
        messages: groqMessages,
        temperature: 0.7,
        max_tokens: 1024,
      });

      const replyText =
        completion.choices[0]?.message?.content?.trim() ||
        "🦁 *Roar!* I'd love to help you with that! Let's explore our programs or book a campus tour today!";

      return res.json({
        reply: replyText,
        isFallback: false,
      });
    } catch (error: any) {
      console.error("Groq API Error in /api/ask-leo:", error);
      res.json({
        reply:
          "🦁 *Roar!* Leo is right here! Whether you're curious about our admissions, meal menus, or potty training techniques, our teachers and I are ready to welcome your family! Feel free to click 'Book a Tour' to visit our cheerful classrooms!",
        isFallback: true,
        error: error?.message || "Internal server error",
      });
    }
  });

  // ============================================
  // Vite middleware for development
  // ============================================
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🦁 PreSchool Server running on port ${PORT}`);
    console.log(`📊 Test Supabase: http://localhost:${PORT}/api/test-supabase`);
  });
}

startServer();