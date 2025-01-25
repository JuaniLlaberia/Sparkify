import { GoogleGenerativeAI } from '@google/generative-ai';
import { v } from 'convex/values';

import { action } from './_generated/server';
import { api } from './_generated/api';

class GeminiService {
  private static instance: GoogleGenerativeAI;

  static getInstance() {
    if (!this.instance) {
      this.instance = new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY as string
      );
    }

    return this.instance;
  }

  static getModel(type: 'chat' | 'code') {
    const generationConfig = {
      temperature: type === 'code' ? 0.2 : 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: type === 'code' ? 'application/json' : 'text/plain',
    };

    return this.getInstance().getGenerativeModel({
      model: 'gemini-1.5-flash-8b',
      generationConfig,
    });
  }
}

export const generateGeminiMessage = action({
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
  handler: async (ctx, { chatId, prompt, history = [] }) => {
    const chatModel = GeminiService.getModel('chat');

    // Chat implementation
    const CHAT_PROMPT = `
          'You are a AI Assistant and experience in React and web Development.
          GUIDELINES:
            - Tell user what you are building and explain it with words.
            - Response less than 20 lines. 
            - Skip code examples and commentary.'

          This is the user prompt: ${prompt} 
`;
    const chatSession = chatModel.startChat({ history });
    const chatResponse = await chatSession.sendMessage(CHAT_PROMPT);
    await ctx.runMutation(api.messages.createMessage, {
      role: 'model',
      content: chatResponse.response.text(),
      chatId,
    });

    return {
      chatResponseText: chatResponse.response.text(),
    };
  },
});

export const generateGeminiCode = action({
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
  handler: async (ctx, { chatId, prompt, history = [] }) => {
    const codeModel = GeminiService.getModel('code');

    // Code implementation
    const CODE_PROMPT = `
        Generate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using TypeScript, unless JavaScript is indicated, use a src folder. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="size-4" />.

        Return the response in JSON format with the following schema:

        json
        Copy code
        {
          "projectTitle": "",
          "explanation": "",
          "files": {
            "/App.ts": {
              "code": ""
            },
            ...
          },
          "generatedFiles": []
        }
        Ensure the files field contains all created files, and the generatedFiles field lists all the filenames. Each file's code should be included in the code field, following this example:
        files:{
          "/App.ts": {
            "code": "import React from 'react';\nimport './styles.css';\nexport default function App() {\n  return (\n    <div className='p-4 bg-gray-100 text-center'>\n      <h1 className='text-2xl font-bold text-blue-500'>Hello, Tailwind CSS with Sandpack!</h1>\n      <p className='mt-2 text-gray-700'>This is a live code editor.</p>\n    </div>\n  );\n}"
          }
        }
          Additionally, include an explanation of the project's structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.
          - When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2) only when it required
          - For placeholder images, please use a https://archive.org/download/placeholder-image/placeholder-image.jpg
          - Add Emoji/Icons whenever needed to give good user experinence
          - All designs I ask you to make, have them be beautiful with a modern look, not cookie cutter. Make webpages that are fully featured and worthy for production.
          - By default, this template supports TSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.
          - Use icons from lucide-react for logos.
          - Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.
    
            This is the user prompt: ${prompt}
        `;
    const codeSession = codeModel.startChat({ history });
    const codeResponse = await codeSession.sendMessage(CODE_PROMPT);

    await ctx.runMutation(api.chats.updateChat, {
      chatId,
      chatData: {
        fileData: JSON.parse(codeResponse.response.text())?.files,
      },
    });

    return {
      codeResponseText: codeResponse.response.text(),
    };
  },
});
