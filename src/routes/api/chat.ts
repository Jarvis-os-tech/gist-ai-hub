import {
  createGeminiAiGatewayProvider,
  createLovableAiGatewayProvider,
  createOpenAiGatewayProvider,
} from "@/lib/ai-gateway.server";
import { buildSystemPrompt } from "@/lib/knowledge-base";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

type ChatRequestBody = { messages?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: ChatRequestBody;
        try {
          body = (await request.json()) as ChatRequestBody;
        } catch {
          return new Response("Invalid JSON payload", { status: 400 });
        }

        const { messages } = body || {};
        if (!messages || !Array.isArray(messages)) {
          return new Response("Messages are required and must be an array", { status: 400 });
        }

        const geminiKey = process.env.GEMINI_API_KEY?.trim();
        const lovableKey = process.env.LOVABLE_API_KEY?.trim();
        const openaiKey = process.env.OPENAI_API_KEY?.trim();

        if (!geminiKey && !lovableKey && !openaiKey) {
          const noticeText =
            "⚠️ **API Key Required**\n\nPlease add your **GEMINI_API_KEY** (or `OPENAI_API_KEY`) to the `.env` file in the project directory:\n\n```env\nGEMINI_API_KEY=your_actual_key_here\n```\nAfter saving `.env`, ask your question again!";

          return Response.json({
            id: `msg-${Date.now()}`,
            role: "assistant",
            content: noticeText,
          });
        }

        let model;
        if (geminiKey) {
          const gateway = createGeminiAiGatewayProvider(geminiKey);
          model = gateway("gemini-2.5-flash");
        } else if (lovableKey) {
          const gateway = createLovableAiGatewayProvider(lovableKey);
          model = gateway("openai/gpt-5.5");
        } else if (openaiKey) {
          const gateway = createOpenAiGatewayProvider(openaiKey);
          model = gateway("gpt-4o-mini");
        }

        if (!model) {
          return new Response("Failed to initialize AI model", { status: 500 });
        }

        try {
          const result = streamText({
            model,
            system: buildSystemPrompt(),
            messages: await convertToModelMessages(messages as UIMessage[]),
          });

          return result.toUIMessageStreamResponse({
            originalMessages: messages as UIMessage[],
          });
        } catch (err: any) {
          console.error("AI Generation Error:", err);
          return new Response(`AI stream error: ${err?.message || "Unknown error"}`, { status: 500 });
        }
      },
    },
  },
});