import { defineFlow } from "@genkit-ai/flow";
import { z } from "zod";

export const helloFlow = defineFlow(
  {
    name: "helloFlow",
    inputSchema: z.object({ name: z.string() }),
    outputSchema: z.string()
  },
  async (input) => {
    return `Hello, ${input.name}! 👋`;
  }
);
