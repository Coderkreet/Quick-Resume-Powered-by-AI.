import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";


const apiKey = 'AIzaSyDxpxMUGPJ0GeDq97paDsy7JkjqBZ-uURA';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const AIchatSession = model.startChat({
  generationConfig,
  // Optional: Adjust safety settings
  // safetySettings: { ... }
  history: [],
});
