import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

export const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY as string);

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const model = genAi.getGenerativeModel({
  model: "gemini-1.5-pro"
})