import { defineAgent } from "eve";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_KEY,
});

export default defineAgent({
  model: openrouter.chat("deepseek/deepseek-v4.1-flash-1017"),
  modelContextWindowTokens: 1_000_000,
});
