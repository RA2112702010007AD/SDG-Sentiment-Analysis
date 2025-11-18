import { GoogleGenAI, Type } from "@google/genai";
import type { Aspect, OverallSentiment, Sentiment } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const parseJsonResponse = <T,>(text: string, errorMessage: string): T => {
  try {
    // Clean the response from markdown code blocks if present
    const cleanedText = text.replace(/```json\n?|```/g, '').trim();
    return JSON.parse(cleanedText) as T;
  } catch (e) {
    console.error("Failed to parse JSON:", text);
    throw new Error(errorMessage);
  }
};


export const analyzeAspectSentiment = async (text: string): Promise<Aspect[]> => {
  const model = "gemini-2.5-flash";

  const prompt = `
    Analyze the following text about global partnerships and collaboration.
    Identify key collaboration aspects, topics, or entities being discussed (e.g., "research funding," "global policy," "student exchange programs," "data sharing").
    For each distinct aspect, determine its sentiment (Positive, Negative, or Neutral), provide a confidence score from 0.0 to 1.0, and extract a brief, relevant snippet of text (the context) that justifies this analysis.

    Text to analyze:
    ---
    ${text}
    ---

    Return the result as a JSON array. Each object in the array should contain 'aspect', 'sentiment', 'score', and 'context'.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              aspect: {
                type: Type.STRING,
                description: 'The collaboration aspect identified.',
              },
              sentiment: {
                type: Type.STRING,
                enum: ['Positive', 'Negative', 'Neutral'],
                description: 'The sentiment associated with the aspect.',
              },
              score: {
                type: Type.NUMBER,
                description: 'Confidence score for the sentiment, from 0.0 to 1.0.',
              },
              context: {
                type: Type.STRING,
                description: 'A brief text snippet from the source that supports the sentiment analysis for this aspect.'
              }
            },
            required: ["aspect", "sentiment", "score", "context"],
          },
        },
      },
    });

    return parseJsonResponse<Aspect[]>(response.text, 'Failed to parse aspect sentiment response from Gemini.');

  } catch (error) {
    console.error("Error in analyzeAspectSentiment:", error);
    throw new Error("Could not analyze aspect-based sentiment.");
  }
};

export const getOverallSentiment = async (text: string): Promise<OverallSentiment> => {
  const model = "gemini-2.5-flash";

  const prompt = `
    Act as a high-accuracy sentiment analysis model. Analyze the overall sentiment of the provided text.
    The output should be a single JSON object containing the sentiment (Positive, Negative, or Neutral), a confidence score from 0.0 to 1.0, and a brief explanation for your reasoning. This serves as the base score for a hybrid system.

    Text to analyze:
    ---
    ${text}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: {
              type: Type.STRING,
              enum: ['Positive', 'Negative', 'Neutral'],
            },
            score: {
              type: Type.NUMBER,
            },
            explanation: {
              type: Type.STRING,
              description: "A brief justification for the sentiment classification."
            }
          },
          required: ["sentiment", "score", "explanation"],
        },
      },
    });
    
    return parseJsonResponse<OverallSentiment>(response.text, 'Failed to parse overall sentiment response from Gemini.');
  } catch (error) {
    console.error("Error in getOverallSentiment:", error);
    throw new Error("Could not get overall sentiment.");
  }
};