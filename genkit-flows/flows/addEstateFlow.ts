import { defineFlow } from "@genkit-ai/flow";
import { z } from "zod";
import { generate } from "@genkit-ai/ai";
import registry from "../genkit.config";

export const addEstateFlow = defineFlow(
  {
    name: "addEstateFlow",
    inputSchema: z.object({
      title: z.string(),
      location: z.string()
    }),
    outputSchema: z.object({
      description: z.string()
    })
  },
  async (input) => {
    const aiResponse = await generate(registry, {
      prompt: `Write a short description for an estate named "${input.title}" located in "${input.location}".`,
      output: z.object({ text: z.string() })
    });

    return { description: aiResponse.output.text };
  }
);
