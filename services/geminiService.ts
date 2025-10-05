import { GoogleGenAI, Type } from "@google/genai";
import type { StartupIdea, GeminiResponse } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    ideas: {
      type: Type.ARRAY,
      description: "A list of 2-3 startup ideas.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "The catchy name of the startup." },
          description: { type: Type.STRING, description: "A brief, compelling description of the startup idea." },
          howToStart: { type: Type.STRING, description: "A step-by-step guide on how to launch this startup. Use markdown for lists." },
          howToSucceed: { type: Type.STRING, description: "Key strategies and unique selling propositions for success in the specified city." },
          howToScale: { type: Type.STRING, description: "A clear plan for scaling the business locally and beyond." },
          monthlyBenefits: { type: Type.STRING, description: "How this startup provides ongoing value or benefits to its customers or the community." },
          resources: {
            type: Type.OBJECT,
            properties: {
              links: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: { title: { type: Type.STRING }, url: { type: Type.STRING } },
                  required: ["title", "url"],
                }
              },
              helpCenters: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: { name: { type: Type.STRING }, url: { type: Type.STRING } },
                  required: ["name", "url"],
                }
              },
              tools: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: { name: { type: Type.STRING }, url: { type: Type.STRING } },
                  required: ["name", "url"],
                }
              },
            },
            required: ["links", "helpCenters", "tools"],
          },
          makeAutomation: {
            type: Type.OBJECT,
            properties: {
              description: { type: Type.STRING, description: "A practical, free workflow automation using Make.com (integromat) relevant to the startup." },
              steps: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Numbered steps to set up the automation." },
            },
            required: ["description", "steps"],
          },
        },
        required: ["title", "description", "howToStart", "howToSucceed", "howToScale", "monthlyBenefits", "resources", "makeAutomation"],
      },
    },
  },
  required: ["ideas"],
};

export const generateStartupIdeas = async (city: string, languageName: string): Promise<StartupIdea[]> => {
  const prompt = `
    Generate 2 NEW, UNIQUE, and innovative low-competition startup ideas specifically tailored for the city of ${city}.
    The entire response, including all fields, descriptions, titles, and resource names within the JSON schema, must be written in the ${languageName} language.
    For each request, generate completely different ideas. Avoid common or generic business ideas.
    For each idea, provide a comprehensive plan covering all aspects requested in the JSON schema.
    Focus on ideas that leverage the city's unique characteristics, demographics, or challenges in a creative way.
    The details should be practical and actionable.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 1.0,
        topP: 0.9,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
      console.error("Gemini API returned an empty text response.");
      return [];
    }
    
    const parsedResponse: GeminiResponse = JSON.parse(jsonText);
    return parsedResponse.ideas || [];
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to fetch startup ideas from Gemini API.");
  }
};
