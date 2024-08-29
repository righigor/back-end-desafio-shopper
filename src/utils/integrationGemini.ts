import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY as string);

export const getImgUrl = async ({ image, customerCode }: { image: string, customerCode: string }) => {
  const uploadResponse = await fileManager.uploadFile(image, {
    mimeType: "image/jpeg",
    displayName: `${customerCode}.jpeg`
  });
  return uploadResponse;
};

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const model = genAi.getGenerativeModel({
  model: "gemini-1.5-pro"
})