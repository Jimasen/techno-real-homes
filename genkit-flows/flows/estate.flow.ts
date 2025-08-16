import { defineFlow } from "@genkit-ai/flow";
import { z } from "zod";
import fetch from "node-fetch";

export const estateFlow = defineFlow(
  {
    name: "estateFlow",
    inputSchema: z.object({
      action: z.enum(["list", "add"]),
      name: z.string().optional(),
      description: z.string().optional()
    }),
    outputSchema: z.any()
  },
  async (input) => {
    const apiUrl = "http://localhost:8000/API.php";

    if (input.action === "list") {
      const res = await fetch(`${apiUrl}?action=list`);
      return await res.json();
    }

    if (input.action === "add") {
      if (!input.name || !input.description) {
        return { error: "Name and description are required" };
      }
      const res = await fetch(`${apiUrl}?action=add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: input.name, description: input.description })
      });
      return await res.json();
    }

    return { error: "Invalid action" };
  }
);
