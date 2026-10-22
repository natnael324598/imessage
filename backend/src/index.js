import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDb } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";
import authRoutes from "./routes/auth.route.js"
import job from "./lib/cron.js";
import clerkWebhook from "./webhooks/clerk.webhook.js";
import dns from "node:dns";

import fs from "fs";
import path from "path";

const app = express();
const port = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(), "public");

//middlewares
app.use("/api/webhooks/clerk", express.raw({ type: "application/json" }), clerkWebhook);

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/auth", authRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

// if the public directory exists, serve the static files
// this is for the production build
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get("/{*any}", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}

async function start() {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);

  await connectDb();

  app.listen(port, () => {
    console.log(`app is running on ${port}`);

    if (process.env.NODE_ENV === "production") {
      job.start();
    }
  });
}

start();
