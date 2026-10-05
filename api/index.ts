import express from "express";
import path from "path";
import dotenv from "dotenv";
import submitFormHandler, {
  getSupabase,
  getSupabaseUrl,
  getSupabaseServiceKey,
  getTelegramBotToken,
  getTelegramChatId,
  sendTelegramNotification,
} from "./submit-form.js";
import askLeoHandler from "./ask-leo.js";

dotenv.config();

const app = express();

// Middleware: Pre-parsed body protection & URL path recovery for Vercel
app.use((req, res, next) => {
  if (req.body && typeof req.body === "object") {
    (req as any)._body = true;
  }
  // Restore subpath if Vercel rewrite flattened req.url
  const forwardedUrl = (req.headers["x-forwarded-url"] || req.headers["x-vercel-forwarded-for"]) as string | undefined;
  const matchedPath = req.headers["x-matched-path"] as string | undefined;
  if (req.url === "/" || req.url === "/api" || req.url === "" || req.url.startsWith("/api?")) {
    if (forwardedUrl) {
      try {
        const parsed = new URL(forwardedUrl, "http://localhost");
        if (parsed.pathname && parsed.pathname.length > 1 && parsed.pathname !== "/api") {
          req.url = parsed.pathname;
        }
      } catch {}
    } else if (matchedPath && matchedPath !== "/api" && matchedPath !== "/") {
      req.url = matchedPath;
    }
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from public if available
app.use(express.static(path.join(process.cwd(), "public")));

const apiRouter = express.Router();

// Root API check
apiRouter.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "A Kid's Pre School API is online 🦁",
    timestamp: new Date().toISOString(),
  });
});

// Health Check
apiRouter.get("/health", (req, res) => {
  res.json({
    status: "ok",
    hasGroqKey: Boolean(process.env.GROQ_API_KEY),
    hasSupabase: Boolean(getSupabaseUrl() && getSupabaseServiceKey()),
    hasTelegram: Boolean(getTelegramBotToken() && getTelegramChatId()),
    timestamp: new Date().toISOString(),
  });
});

// Form Submissions
apiRouter.post("/submit-form", (req, res) => submitFormHandler(req, res));
apiRouter.post("/admissions", (req, res) => submitFormHandler(req, res));
apiRouter.post("/enquiries", (req, res) => submitFormHandler(req, res));
apiRouter.post("/tour-bookings", (req, res) => submitFormHandler(req, res));
apiRouter.post("/franchise", (req, res) => submitFormHandler(req, res));

// AI Chatbot
apiRouter.post("/ask-leo", (req, res) => askLeoHandler(req, res));

// Root POST dispatcher: in case Vercel rewrote POST /api/submit-form to /api
apiRouter.post("/", (req, res) => {
  const body = req.body && typeof req.body === "object" ? req.body : {};
  if (body.message && !body.phone && !body.parentName && !body.name) {
    return askLeoHandler(req, res);
  }
  return submitFormHandler(req, res);
});

// Mount apiRouter on both /api (standard) and / (in case Vercel rewrites strip /api prefix)
app.use("/api", apiRouter);
app.use(apiRouter);

export {
  app,
  submitFormHandler as handleFormSubmission,
  askLeoHandler as handleAskLeo,
  getSupabase,
  sendTelegramNotification,
  getSupabaseUrl,
  getSupabaseServiceKey,
  getTelegramBotToken,
  getTelegramChatId,
};

export default app;
