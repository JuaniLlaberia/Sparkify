import { GoogleGenerativeAI } from '@google/generative-ai';
import { v } from 'convex/values';

import { action } from './_generated/server';
import { api } from './_generated/api';

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

export const generateResponse = action({
  args: {
    prompt: v.string(),
    chatId: v.id('chats'),
    history: v.array(
      v.object({
        role: v.string(),
        parts: v.array(v.object({ text: v.string() })),
      })
    ),
  },
  handler: async (ctx, { chatId, prompt, history }) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash-8b',
      generationConfig,
    });

    const chat = model.startChat({
      history,
    });
    const result = await chat.sendMessage(prompt);

    await ctx.runMutation(api.messages.createMessage, {
      role: 'model',
      content: result.response.text(),
      chatId,
    });
  },
});
