import { defineTool } from "eve/tools";
import { z } from "zod";

export default defineTool({
  description:
    "Search Google via Serper for real-time information, postal codes, carrier rules, tracking, or address details.",
  inputSchema: z.object({
    query: z.string().min(1).describe("The search query."),
    num: z.number().int().min(1).max(10).optional().default(5).describe("Number of results to return (default: 5)."),
  }),
  outputSchema: z.object({
    query: z.string(),
    results: z.array(
      z.object({
        title: z.string(),
        url: z.string(),
        snippet: z.string(),
      })
    ),
  }),
  async execute({ query, num = 5 }) {
    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) {
      throw new Error("SERPER_API_KEY environment variable is not configured.");
    }

    const response = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ q: query, num }),
    });

    if (!response.ok) {
      throw new Error(`Serper search failed with status ${response.status}: ${response.statusText}`);
    }

    const data = (await response.json()) as {
      organic?: Array<{ title?: string; link?: string; snippet?: string }>;
    };

    const results = (data.organic ?? []).slice(0, num).map((item) => ({
      title: item.title ?? "",
      url: item.link ?? "",
      snippet: item.snippet ?? "",
    }));

    return { query, results };
  },
});
