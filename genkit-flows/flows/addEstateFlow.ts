import { defineFlow } from "@genkit-ai/flow";
import { generate } from "@genkit-ai/ai";

export const addEstateFlow = defineFlow(
  {
    name: "addEstateFlow",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string" },
        description: { type: "string" }
      },
      required: ["name"]
    },
    outputSchema: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        id: { type: "number" }
      }
    }
  },
  async (input) => {
    let { name, description } = input;

    // Auto-generate description if missing
    if (!description || description.trim() === "") {
      const aiResponse = await generate({
        model: "gemini-1.5-flash",
        prompt: `Write a professional real estate description for an estate called "${name}" located in Nigeria.`
      });
      description = aiResponse.outputText || "No description provided.";
    }

    // Send to PHP API
    const response = await fetch("http://localhost/API.php?action=add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description })
    });

    return await response.json();
  }
);
