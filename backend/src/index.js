import express from "express";
import cors from "cors"
import "dotenv/config";
import { connectDb } from "./lib/db.js";
import clerkmiddleware from '@clerk/express'

const app = express();
const port = process.env.PORT;

//middlewares
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())


app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});


app.listen(port, () => {
  connectDb();
  console.log(`app is running on ${port}`);
});
