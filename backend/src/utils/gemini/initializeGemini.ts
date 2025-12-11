import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import * as dotenv from "dotenv";

import generateSummary from "./outputSchemas/summarySchema";
import generateFlashcards from "./outputSchemas/flashcardsSchema";

dotenv.config();

export const config = {
  summary: {
    prompt:
      "You are a professional teacher with a specialization in summarization. Make a summary of the provided notes. ",
    schema: generateSummary,
  },
  flashcards: {
    prompt:
      "You are a professional teacher with a specialization in flashcards. Make flashcards of the provided notes. ",
    schema: generateFlashcards,
  },
};

export const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in the environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    responseMimeType: "application/json",
  },
});

export const fileManager = new GoogleAIFileManager(apiKey);
