import express from "express";
import cors from "cors";
import { Pool } from "pg";
import fs from "fs";
import * as dotenv from "dotenv";

import authRoutes from "./routes/auth";
import homeRoutes from "./routes/home";
import deckRoutes from "./routes/deck";
import flashcardRoutes from "./routes/flashcard";
import videoRoutes from "./routes/video";
import notesRoutes from "./routes/note";
import profileRoutes from "./routes/profile";
import aiRoutes from "./routes/ai";

dotenv.config({ path: "../.env" });

export const app = express();

// create the memory storage folder
const directoryPath = process.env.MEMORY_STORAGE_FOLDER!;

if (!fs.existsSync(directoryPath)) {
  fs.mkdirSync(directoryPath);
}

// initialize the database connection
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// MIDDLEWARE
app.use(express.json()); // use express.json to allow to parse JSON requests
app.use(cors());

app.use("/auth", authRoutes);
app.use("/home", homeRoutes);
app.use("/decks", deckRoutes);
app.use("/notes", notesRoutes);
app.use("/", flashcardRoutes);
app.use("/videos", videoRoutes);
app.use("/profile", profileRoutes);
app.use("/ai", aiRoutes);
