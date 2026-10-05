import path from "path";
import express from "express";
import { createServer as createViteServer } from "vite";
import app from "./api/index";

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
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
      if (req.path.startsWith("/api/")) {
        return res.status(404).json({ error: "API route not found" });
      }
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  return app.listen(PORT, "0.0.0.0", () => {
    console.log(`🦁 PreSchool Server running on port ${PORT}`);
    console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
  });
}

// Never run app.listen() in Vercel serverless / lambda environments
const isServerless = Boolean(
  process.env.VERCEL ||
  process.env.VERCEL_ENV ||
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.env.LAMBDA_TASK_ROOT
);

if (!isServerless && process.env.NODE_ENV !== "test") {
  startServer();
}

export { app, startServer };
export default app;
