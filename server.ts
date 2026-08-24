import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Google GenAI lazily or with environment key
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
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
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // Gemini API route for "Ask Leo" AI Mascot Chatbot
  app.post("/api/ask-leo", async (req, res) => {
    try {
      const { message, childAge, program, history } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const ai = getGenAI();

      if (!ai) {
        // Fallback intelligent response if API key is not yet set
        return res.json({
          reply:
            `🦁 *Roar!* Hi there! I'm Leo, your friendly mascot at A Kid's Pre School! ` +
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
`.trim();

      // Format chat messages
      let promptContents = "";
      if (Array.isArray(history) && history.length > 0) {
        const recentHistory = history.slice(-4).map((h: { sender: string; text: string }) => 
          `${h.sender === "user" ? "Parent" : "Leo"}: ${h.text}`
        ).join("\n");
        promptContents = `${recentHistory}\nParent: ${message}\nLeo:`;
      } else {
        promptContents = `Parent: ${message}\nLeo:`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: promptContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "🦁 *Roar!* I'd love to help you with that! Let's explore our programs or book a campus tour today!";

      return res.json({
        reply: replyText,
        isFallback: false,
      });
    } catch (error: any) {
      console.error("Gemini API Error in /api/ask-leo:", error);
      return res.json({
        reply:
          "🦁 *Roar!* Leo is right here! Whether you're curious about our admissions, meal menus, or potty training techniques, our teachers and I are ready to welcome your family! Feel free to click 'Book a Tour' to visit our cheerful classrooms!",
        isFallback: true,
        error: error?.message || "Internal server error",
      });
    }
  });

  // Vite middleware for development
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
    console.log(`PreSchool Server running on port ${PORT}`);
  });
}

startServer();
