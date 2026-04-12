import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const isRetryableGeminiError = (error: any): boolean => {
  const status = error?.status;
  const message = String(error?.message || '').toLowerCase();
  return status === 429 || status === 500 || status === 503 || message.includes('unavailable');
};

const generateWithRetry = async (
  ai: GoogleGenAI,
  contents: any[],
  model: string,
  maxAttempts = 3
) => {
  let lastError: any;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction:
            'You are the Trip Hawks AI Assistant. You help users plan luxury travel, book premium flights, and suggest destinations. Keep your responses concise, friendly, and helpful.'
        }
      });
    } catch (error: any) {
      lastError = error;
      if (!isRetryableGeminiError(error) || attempt === maxAttempts) break;
      await delay(500 * attempt);
    }
  }

  throw lastError;
};

export const chatWithAgent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { history, newMessage } = req.body;
    
    if (!history || !newMessage) {
      res.status(400).json({ error: 'History and newMessage are required' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
      res.json({ text: "Please add your Gemini API key to .env.local file to activate the AI agent." });
      return;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Convert history to Gemini format
    const contents = history.map((msg: any) => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));
    
    contents.push({
      role: 'user',
      parts: [{ text: newMessage }]
    });

    let response: any;
    try {
      response = await generateWithRetry(ai, contents, 'gemini-2.5-flash');
    } catch (primaryError: any) {
      // Fallback model for temporary capacity/rate issues on the primary model.
      response = await generateWithRetry(ai, contents, 'gemini-2.0-flash');
    }

    res.json({ text: response.text || "I'm sorry, I couldn't generate a response." });
  } catch (error: any) {
    console.error('Chat generation failed:', error);
    res.status(500).json({ error: "AI Agent error: " + (error.message || error.toString()) });
  }
};
