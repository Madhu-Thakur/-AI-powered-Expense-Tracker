import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export const generateExpense = async (text) => {
  const today = new Date().toISOString().split("T")[0];

  const prompt = `
You are a JSON API.

Text: "${text}"

Respond ONLY with valid JSON.

{
  "title": "Food",
  "amount": 100,
  "category": "Food",
  "description": "Expense added using AI",
  "date": "${today}"
}
`;

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
  });

  const result = await model.generateContent(prompt);

  const responseText = result.response.text();

  const cleaned = responseText.replace(/```json|```/g, "");

  return JSON.parse(cleaned);
};