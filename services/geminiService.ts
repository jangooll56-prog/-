
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getFunctionalGroupFact = async (groupName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a very short, interesting scientific fact (1 sentence) about the functional group "${groupName}" and a common real-world application. For example: "Alcohols are used as fuels and disinfectants because of their hydroxyl group."`,
    });
    return response.text || "Failed to load fact.";
  } catch (error) {
    console.error("Error fetching fact from Gemini:", error);
    return "Keep learning! Organic chemistry is the study of carbon compounds.";
  }
};

export const getRiddleForGroup = async (groupName: string): Promise<{ clues: string[] }> => {
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
    return data;
  } catch (error) {
    console.error("Error generating riddle:", error);
    return { clues: ["ฉันคือใครในอินทรีย์เคมี?", "ฉันมีโครงสร้างที่พิเศษ", "ฉันคือ " + groupName] };
  }
};
