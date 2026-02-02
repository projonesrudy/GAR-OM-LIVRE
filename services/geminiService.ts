
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateJobDescriptionSuggestion(title: string, requirements: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Crie uma descrição de vaga profissional e atraente para o cargo de ${title} com os seguintes requisitos: ${requirements}. Foque em hospitalidade e agilidade.`,
      config: { maxOutputTokens: 250 }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Job Desc Error:", error);
    return null;
  }
}

export async function calculateMatchScore(jobTitle: string, jobDesc: string, userSkills: string[]) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Compare esta vaga: "${jobTitle} - ${jobDesc}" com as habilidades do profissional: "${userSkills.join(', ')}". Retorne um JSON com a porcentagem de compatibilidade (field: score, number 0-100) e uma breve dica (field: tip).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            tip: { type: Type.STRING }
          },
          required: ["score", "tip"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return { score: 70, tip: "Habilidades compatíveis com o mercado." };
  }
}
