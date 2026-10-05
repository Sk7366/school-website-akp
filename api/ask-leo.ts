import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

// Initialize Groq client lazily
let groqClient: Groq | null = null;
const getGroqClient = (): Groq | null => {
  const apiKey = (process.env.GROQ_API_KEY || "").trim().replace(/^["']|["']$/g, "");
  if (!apiKey) {
    return null;
  }
  if (!groqClient) {
    try {
      groqClient = new Groq({ apiKey });
    } catch (err: any) {
      console.warn("[Groq Init Notice] Could not initialize Groq:", err?.message || "Unknown error");
      return null;
    }
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

// VERCEL SERVERLESS FUNCTION HANDLER FOR ASK-LEO
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
    const { message, childAge, program, history } = (body && typeof body === "object") ? body : {};

    if (!message || typeof message !== "string") {
      return sendResponse(res, 400, { error: "Message is required" });
    }

    const groq = getGroqClient();
    if (!groq) {
      const isTourReq = /tour|visit|see campus|walkthrough|in-person|appointment/i.test(message);
      return sendResponse(res, 200, {
        reply: isTourReq
          ? `🦁 *Roar!* We would love to give you a personalized in-person tour of our school! Please use our **Personalized In-Person Experience Booking** page to select your preferred date and time slot and generate your VIP Visitor Pass with a free explorer kit!`
          : `🦁 *Roar!* Hi there! I'm Leo, your friendly mascot at A Kid's Pre School! ` +
            `For a child around ${childAge || "2–4 years"} in ${program || "our early childhood programs"}, ` +
            `our Montessori + Play-Way curriculum focuses on sensory discovery, joyful phonics, and warm social bonding. ` +
            `Our campus is at 156, Doctor layout, Hosa Rd, Naganathapura, Bengaluru. Admissions are open for 2026–27! Would you like to schedule a campus tour or check our location?`,
        isFallback: true,
      });
    }

    const systemInstruction = `You are "Leo the Lion", the warm, enthusiastic, and lovable AI Lion Mascot and Admissions Advisor for "A Kid's Pre School".
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
5. When the user asks to book a tour, schedule a visit, book an in-person tour, see the campus, or anything similar, enthusiastically direct them to our "Personalized In-Person Experience Booking" page where they can pick a preferred date and time slot and receive an instant VIP Visitor Pass!`.trim();

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

    return sendResponse(res, 200, {
      reply: replyText,
      isFallback: false,
    });
  } catch (error: any) {
    console.error("Groq API Error in /api/ask-leo:", error?.message || error);
    return sendResponse(res, 200, {
      reply:
        "🦁 *Roar!* Leo is right here! Whether you're curious about our admissions, meal menus, or potty training techniques, our teachers and I are ready to welcome your family! Feel free to click 'Book a Tour' to visit our cheerful classrooms!",
      isFallback: true,
    });
  }
}
