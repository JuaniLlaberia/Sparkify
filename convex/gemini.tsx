import { GoogleGenerativeAI, Part } from '@google/generative-ai';
import { v } from 'convex/values';

import { action } from './_generated/server';
import { api } from './_generated/api';

const calculateImageTokens = async (base64String: string): Promise<number> => {
  return new Promise(resolve => {
    const img = new Image();

    img.onload = () => {
      // Calculate total pixels
      const totalPixels = img.width * img.height;

      // Estimate tokens based on image size
      const sizeBasedTokens = Math.ceil(totalPixels * 0.5);

      // Add base cost and return total
      const totalTokens = 1024 + sizeBasedTokens;

      resolve(totalTokens);
    };

    img.onerror = () => {
      // If we can't load the image, return a conservative estimate
      resolve(1024 * 2);
    };

    // Add the data URL prefix if it's not there
    const imageUrl = base64String.startsWith('data:')
      ? base64String
      : `data:image/jpeg;base64,${base64String}`;

    img.src = imageUrl;
  });
};

const countTokens = async (input: string, image?: string): Promise<number> => {
  const textTokens = input
    .trim()
    .split(/\s+/)
    .filter(word => word.length).length;
  const imageTokens = image ? await calculateImageTokens(image) : 0;

  return textTokens + imageTokens;
};

class GeminiService {
  private static instance: GoogleGenerativeAI;

  private static readonly CHAT_PROMPT_TOKENS = 100; // Base tokens for chat template
  private static readonly CODE_PROMPT_TOKENS = 500; // Base tokens for code template
  private static readonly TOKEN_MULTIPLIER = {
    chat: 2, // Expected response about 2x input
    code: 5, // Code responses can be 5x larger due to structure
  };

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
      model: 'gemini-2.0-flash-exp',
      generationConfig,
    });
  }

  static async estimateTokens(
    prompt: string,
    type: 'chat' | 'code'
  ): Promise<number> {
    const promptTokens = await countTokens(prompt);
    const baseTokens =
      type === 'chat' ? this.CHAT_PROMPT_TOKENS : this.CODE_PROMPT_TOKENS;

    return baseTokens + promptTokens * this.TOKEN_MULTIPLIER[type];
  }
}

export const generateGeminiMessage = action({
  args: {
    prompt: v.string(),
    image: v.optional(v.string()),
    chatId: v.id('chats'),
    history: v.array(
      v.object({
        role: v.string(),
        parts: v.array(v.object({ text: v.string() })),
      })
    ),
  },
  handler: async (ctx, { chatId, prompt, image, history = [] }) => {
    const user = await ctx.runQuery(api.users.currentUser);
    if (!user)
      throw new Error(
        'You must be logged in to generate messages with gemini.'
      );

    const estimatedTokens = await GeminiService.estimateTokens(prompt, 'chat');
    if (user.tokens < estimatedTokens) {
      throw new Error(
        `Insufficient tokens. Required: ${estimatedTokens}, Available: ${user.tokens}`
      );
    }

    const chatModel = GeminiService.getModel('chat');

    // Chat implementation
    const CHAT_PROMPT = `
          'You are a AI Assistant and experience in React and web Development.
          GUIDELINES:
            - Tell user what you are building and explain it with words.
            - When explanning or saying what it's being done talk like you where doing it, not the user.
            - Response less than 20 lines. 
            - Skip code examples and commentary.'
            - If user provides image, explain it in 2/3 lines.

          This is the user prompt: ${prompt} 
`;
    const chatSession = chatModel.startChat({ history });

    const parts: Part[] = [{ text: CHAT_PROMPT }];
    if (image) {
      const imagePart: Part = {
        inlineData: {
          mimeType: 'image/*',
          data: image,
        },
      };

      parts.unshift(imagePart);
    }

    const chatResponse = await chatSession.sendMessage(parts);

    const tokensUsed = await countTokens(
      CHAT_PROMPT + chatResponse.response.text()
    );

    await Promise.all([
      ctx.runMutation(api.messages.createMessage, {
        role: 'model',
        content: chatResponse.response.text(),
        chatId,
      }),
      ctx.runMutation(api.users.updateUsersTokens, {
        tokens: user.tokens - tokensUsed,
      }),
    ]);

    return {
      chatResponseText: chatResponse.response.text(),
    };
  },
});

export const generateGeminiCode = action({
  args: {
    prompt: v.string(),
    image: v.optional(v.string()),
    chatId: v.id('chats'),
    history: v.array(
      v.object({
        role: v.string(),
        parts: v.array(v.object({ text: v.string() })),
      })
    ),
  },
  handler: async (ctx, { chatId, image, prompt, history = [] }) => {
    const user = await ctx.runQuery(api.users.currentUser);
    if (!user)
      throw new Error(
        'You must be logged in to generate messages with gemini.'
      );

    const estimatedTokens = await GeminiService.estimateTokens(prompt, 'code');
    if (user.tokens < estimatedTokens) {
      throw new Error(
        `Insufficient tokens. Required: ${estimatedTokens}, Available: ${user.tokens}`
      );
    }

    const codeModel = GeminiService.getModel('code');

    // Code implementation
    const CODE_PROMPT = `
        Generate a programming code structure for a React project. Create multiple components, organizing them in separate folders with filenames using TypeScript, unless JavaScript is indicated, use a src folder. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="size-4" />.

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
          - For placeholder images, please use a https://archive.org/download/placeholder-image/placeholder-image.jpg
          - Add Emoji/Icons whenever needed to give good user experinence
          - All designs I ask you to make, have them be beautiful with a modern look, not cookie cutter. Make webpages that are fully featured and worthy for production.
          - By default, this template supports TSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.
          - Use icons from lucide-react for logos.
          - Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.
          - If possible keep the project structure you generated and just make the modification that the user asks.
          - In case a image is provided try to recreate it.
    
            This is the user prompt: ${prompt}
        `;
    const codeSession = codeModel.startChat({ history });

    const parts: Part[] = [{ text: CODE_PROMPT }];
    if (image) {
      const imagePart: Part = {
        inlineData: {
          mimeType: 'image/*',
          data: image,
        },
      };

      parts.unshift(imagePart);
    }

    const codeResponse = await codeSession.sendMessage(parts);

    const tokensUsed = await countTokens(
      CODE_PROMPT + codeResponse.response.text()
    );

    await Promise.all([
      ctx.runMutation(api.chats.updateChat, {
        chatId,
        chatData: {
          fileData: JSON.parse(codeResponse.response.text())?.files,
        },
      }),
      ctx.runMutation(api.users.updateUsersTokens, {
        tokens: user.tokens - tokensUsed,
      }),
    ]);

    return {
      codeResponseText: codeResponse.response.text(),
    };
  },
});
