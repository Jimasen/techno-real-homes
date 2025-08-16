import { defineFlow } from "@genkit-ai/flow";
import { z } from "zod";
import fetch from "node-fetch";

export const homeFlow = defineFlow(
  {
    name: "homeFlow",
    inputSchema: z.object({}).optional(),
    outputSchema: z.object({
      message: z.string().optional(),
      backendData: z.any().optional(),
      error: z.string().optional()
    })
  },
  async () => {
    try {
      const response = await fetch("http://localhost:8000/API.php");
      const data = await response.json();
      return { message: "Data fetched successfully from PHP backend", backendData: data };
    } catch (error: any) {
      return { error: error.message };
    }
  }
);
