
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Cache objects to store results for the current session
const factCache: Record<string, string> = {};
const riddleCache: Record<string, { clues: string[] }> = {};

export const getFunctionalGroupFact = async (groupName: string): Promise<string> => {
  // Return from cache if available
  if (factCache[groupName]) return factCache[groupName];

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a very short, interesting scientific fact (1 sentence) about the functional group "${groupName}" and a common real-world application. For example: "Alcohols are used as fuels and disinfectants because of their hydroxyl group."`,
    });
    const result = response.text || "Failed to load fact.";
    factCache[groupName] = result;
    return result;
  } catch (error) {
    console.error("Error fetching fact from Gemini:", error);
    return "Keep learning! Organic chemistry is the study of carbon compounds.";
  }
};

export const getRiddleForGroup = async (groupName: string): Promise<{ clues: string[] }> => {
  // Return from cache if available
  if (riddleCache[groupName]) return riddleCache[groupName];

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a set of 3 sequential riddles/clues for the functional group "${groupName}". 
      Clue 1 should be vague/conceptual. 
      Clue 2 should describe its structure. 
      Clue 3 should give a clear hint about its name or common use.
      The clues should be in Thai.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            clues: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of exactly 3 clues in Thai language."
            }
          },
          required: ["clues"]
        }
      }
    });
    const data = JSON.parse(response.text || '{"clues": []}');
    if (data.clues && data.clues.length > 0) {
      riddleCache[groupName] = data;
    }
    return data;
  } catch (error) {
    console.error("Error generating riddle:", error);
    return { clues: ["ฉันคือใครในอินทรีย์เคมี?", "ฉันมีโครงสร้างที่พิเศษ", "ฉันคือ " + groupName] };
  }
};
