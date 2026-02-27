
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateComplaintSummary = async (description: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a compliance officer. Summarize this consumer complaint for a support agent in exactly 2 sentences. Focus on the factual core issue and the specific expected outcome: "${description}"`,
      config: {
        temperature: 0.1, // Low temperature for factual accuracy
      },
    });
    return response.text || "Summary unavailable.";
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    return "Error generating automated summary.";
  }
};

export const suggestResolution = async (description: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // High reasoning model for complex resolutions
      contents: `As a senior customer success manager, analyze this complaint and provide 3 professional resolution options according to standard consumer protection guidelines. Be specific: "${description}"`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "No suggestions found.";
  } catch (error) {
    console.error("Gemini Suggestion Error:", error);
    return "Could not load resolution intelligence.";
  }
};
