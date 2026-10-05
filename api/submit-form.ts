import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

// Cache for resolved Telegram chat ID
let activeTelegramChatId: string | number | null = null;

// Safe environment variable readers (never expose secrets)
const getSupabaseUrl = (): string => {
  return (
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    ""
  ).trim();
};

const getSupabaseServiceKey = (): string => {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_KEY ||
    ""
  ).trim();
};

const getTelegramBotToken = (): string => {
  return (process.env.TELEGRAM_BOT_TOKEN || "").trim().replace(/^["']|["']$/g, "");
};

const getTelegramChatId = (): string => {
  return (
    activeTelegramChatId ||
    process.env.TELEGRAM_CHAT_ID ||
    ""
  ).toString().trim().replace(/^["']|["']$/g, "");
};

// Lazy, safe Supabase client that never throws on missing keys
let cachedSupabase: any = null;
const getSupabase = () => {
  if (cachedSupabase) return cachedSupabase;
  const url = getSupabaseUrl();
  const key = getSupabaseServiceKey();
  if (!url || !key) {
    return null;
  }
  try {
    cachedSupabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    return cachedSupabase;
  } catch (err: any) {
    console.warn("[Supabase Init Notice] Could not initialize client:", err?.message || "Unknown error");
    return null;
  }
};

// Duplicate prevention cache (15-second debounce)
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

// Telegram notification sender with strict timeout and isolated error handling
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
}): Promise<{ sent: boolean; httpStatus: number | null; reason?: string }> => {
  const token = getTelegramBotToken();
  const initialChatId = getTelegramChatId();

  if (!token || !initialChatId) {
    console.warn(
      "[Telegram Notice] Notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured in environment."
    );
    return { sent: false, httpStatus: null, reason: "Credentials not configured" };
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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    try {
      const res = await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: targetChatId,
          text,
          parse_mode: "HTML",
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const data = await res.json().catch(() => null);
      console.log("[Telegram Debug] Response:", JSON.stringify(data));
      return {
        status: res.status,
        ok: res.ok && data?.ok === true,
        description: data?.description || (res.ok ? undefined : res.statusText),
        parameters: data?.parameters,
      };
    } catch (err: any) {
      clearTimeout(timeoutId);
      return {
        status: 0,
        ok: false,
        description: err?.name === "AbortError" ? "Telegram request timed out after 4s" : err?.message,
        parameters: null,
      };
    }
  };

  try {
    const result = await postMessage(initialChatId);

    // Handle Telegram group migration if migrated chat ID provided in response
    if (!result.ok && result.parameters?.migrate_to_chat_id) {
      const migratedId = result.parameters.migrate_to_chat_id;
      const retryResult = await postMessage(migratedId);
      if (retryResult.ok) {
        activeTelegramChatId = migratedId;
        return { sent: true, httpStatus: retryResult.status };
      }
    }

    if (!result.ok) {
      return { sent: false, httpStatus: result.status, reason: result.description || "API returned error" };
    }
    return { sent: true, httpStatus: result.status };
  } catch (error: any) {
    return { sent: false, httpStatus: null, reason: error?.message || "Network error" };
  }
};

// Safe fallback buffer in case database is momentarily unavailable
const fallbackBuffer: Array<any> = [];

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
  const supabase = getSupabase();
  if (!supabase) {
    console.warn(
      "[Supabase Notice] Not configured (SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing). Submission retained in memory buffer."
    );
    fallbackBuffer.push(submission);
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
        console.warn("[Supabase Notice] Insert into admissions notice:", error.message);
        fallbackBuffer.push(submission);
        return { savedToSupabase: false, error: error.message };
      }
    } else if (typeLower.includes("tour")) {
      // 2. Campus Tour Booking -> 'tour_bookings' table
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
        console.warn("[Supabase Notice] Insert into tour_bookings notice:", error.message);
        fallbackBuffer.push(submission);
        return { savedToSupabase: false, error: error.message };
      }
    } else if (typeLower.includes("franchise")) {
      // 3. Franchise Application -> 'enquiries' table
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
        console.warn("[Supabase Notice] Insert into enquiries notice:", error.message);
        fallbackBuffer.push(submission);
        return { savedToSupabase: false, error: error.message };
      }
    } else {
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
        console.warn("[Supabase Notice] Insert into enquiries notice:", enqError.message);
        fallbackBuffer.push(submission);
        return { savedToSupabase: false, error: enqError.message };
      }
    }

    return { savedToSupabase: true };
  } catch (err: any) {
    console.error("[Supabase Error] Unexpected error saving submission:", err?.message || "Unknown error");
    fallbackBuffer.push(submission);
    return { savedToSupabase: false, error: err?.message || "Insert failed" };
  }
};

// Safe request body parser that works across Vercel Functions, Express, and standard Node HTTP
async function parseRequestBody(req: any): Promise<any> {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }
  if (typeof req.body === "string" && req.body.trim()) {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  if (typeof req.json === "function") {
    try {
      return await req.json();
    } catch {
      return {};
    }
  }
  if (typeof req.on === "function" && !req.readableEnded && !req.destroyed && req.readable !== false) {
    try {
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
      }
      const raw = Buffer.concat(chunks).toString("utf-8");
      if (raw.trim()) {
        return JSON.parse(raw);
      }
    } catch {
      return {};
    }
  }
  return {};
}

// Universal response helper: supports Express, VercelResponse, Node http.ServerResponse, and Web Response
function sendResponse(res: any, statusCode: number, data: any) {
  if (res && typeof res.status === "function") {
    if (typeof res.json === "function") {
      return res.status(statusCode).json(data);
    }
    res.status(statusCode);
    if (typeof res.setHeader === "function") {
      res.setHeader("Content-Type", "application/json");
    }
    if (typeof res.end === "function") {
      return res.end(JSON.stringify(data));
    }
  }

  if (res && typeof res.setHeader === "function") {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    if (typeof res.end === "function") {
      return res.end(JSON.stringify(data));
    }
  }

  return new Response(JSON.stringify(data), {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
}

function setCorsHeaders(res: any) {
  if (res && typeof res.setHeader === "function") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  }
}

// VERCEL SERVERLESS FUNCTION HANDLER
export default async function handler(req: any, res: any) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    if (res && typeof res.status === "function") {
      return res.status(200).end();
    }
    if (res && typeof res.end === "function") {
      res.statusCode = 200;
      return res.end();
    }
    return new Response(null, { status: 200 });
  }

  if (req.method !== "POST") {
    return sendResponse(res, 405, { success: false, error: "Method not allowed. Use POST." });
  }

  try {
    const body = await parseRequestBody(req);

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
    } = body;

    const resolvedName = String(parentName || name || "").trim();
    const resolvedPhone = String(phone || "").trim();

    // Validation
    if (!resolvedName) {
      return sendResponse(res, 400, { success: false, error: "Name is required." });
    }
    if (resolvedName.length > 200) {
      return sendResponse(res, 400, { success: false, error: "Name is too long." });
    }
    if (!resolvedPhone || resolvedPhone.length < 7 || resolvedPhone.length > 30) {
      return sendResponse(res, 400, { success: false, error: "A valid phone number is required." });
    }

    // Normalize form type
    const normalizedType = (() => {
      const t = String(type || "").toLowerCase();
      if (t.includes("admission")) return "Admission Enquiry";
      if (t.includes("tour")) return "Campus Tour Booking";
      if (t.includes("franchise")) return "Franchise Application";
      if (t.includes("contact")) return "Contact Enquiry";
      if (enquiryType) return String(enquiryType);
      return "Website Enquiry";
    })();

    // Duplicate check
    const dedupKey = `${normalizedType}:${resolvedPhone}:${resolvedName.toLowerCase()}`;
    if (isDuplicateSubmission(dedupKey)) {
      return sendResponse(res, 200, {
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

    const safeMetadata = (metadata && typeof metadata === "object") ? metadata : {};
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
        ...safeMetadata,
        city: city || preferredCampus || null,
        preferredDate: preferredDate || null,
        preferredTime: preferredTime || null,
        experience: experience || null,
        investmentBudget: investmentBudget || null,
        propertyAvailable: propertyAvailable || null,
        enquiryType: enquiryType || null,
      },
    };

    // 1. Save to Supabase
    const supabaseResult = await saveSubmissionToSupabase(submissionRecord);

    // 2. Send Telegram notification (isolated - failure does not turn submission into 500)
    let telegramResult: { sent: boolean; httpStatus: number | null; reason?: string } = {
      sent: false,
      httpStatus: null,
      reason: "Not executed",
    };
    try {
      telegramResult = await sendTelegramNotification({
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
    } catch (telErr: any) {
      console.warn("[Telegram Safe Log] Notification notice:", telErr?.message || "Notification error");
      telegramResult = { sent: false, httpStatus: null, reason: "Notification error" };
    }

    // Safe diagnostic logging (no secrets exposed)
    console.log(`[Form Submission Diagnostics]`);
    console.log(`- SUPABASE_URL configured: ${Boolean(getSupabaseUrl())}`);
    console.log(`- SUPABASE_SERVICE_ROLE_KEY configured: ${Boolean(getSupabaseServiceKey())}`);
    console.log(`- TELEGRAM_BOT_TOKEN configured: ${Boolean(getTelegramBotToken())}`);
    console.log(`- TELEGRAM_CHAT_ID configured: ${Boolean(getTelegramChatId())}`);
    console.log(`- form type: ${normalizedType}`);
    console.log(`- Supabase success/failure: ${supabaseResult.savedToSupabase ? "SUCCESS" : "FAILURE"}`);
    console.log(`- Telegram success/failure: ${telegramResult.sent ? "SUCCESS" : "FAILURE"}`);
    console.log(`- Telegram HTTP status: ${telegramResult.httpStatus !== null ? telegramResult.httpStatus : "N/A"}`);

    if (!telegramResult.sent) {
      console.warn(`[Telegram Safe Log] Delivery notice (${telegramResult.httpStatus || "N/A"}): ${telegramResult.reason || "Delivery skipped"}`);
    }

    // Always return HTTP 200 after receiving submission
    return sendResponse(res, 200, {
      success: true,
      message: "Your submission has been received successfully!",
      recordId: supabaseResult.recordId || null,
      savedToSupabase: supabaseResult.savedToSupabase,
      telegramSent: telegramResult.sent,
    });
  } catch (error: any) {
    console.error("[Form Submission] Unexpected handler error:", error?.message || "Unknown error");
    return sendResponse(res, 500, {
      success: false,
      error: "An unexpected error occurred while processing your submission. Please try again.",
    });
  }
}

export {
  handler,
  sendTelegramNotification,
  saveSubmissionToSupabase,
  getSupabase,
  getSupabaseUrl,
  getSupabaseServiceKey,
  getTelegramBotToken,
  getTelegramChatId,
};
