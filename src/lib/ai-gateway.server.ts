import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export function createGeminiAiGatewayProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "gemini",
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    headers: { Authorization: `Bearer ${apiKey}` },
  });
}

export function createOpenAiGatewayProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "openai",
    baseURL: "https://api.openai.com/v1",
    headers: { Authorization: `Bearer ${apiKey}` },
  });
}