import { defineAgent } from "eve";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_KEY,
});
export default defineAgent({
  model: openrouter.chat("minimax/minimax-m3.1-flash:free"),
  modelContextWindowTokens: 1_000_000,
});
