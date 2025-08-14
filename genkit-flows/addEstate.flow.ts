import { defineFlow } from "@genkit-ai/flow";
import { generate } from "@genkit-ai/core";
import fetch from "node-fetch";

export const addEstateFlow = defineFlow({
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
}, async (input) => {
  let { name, description } = input;

  // If no description, let AI generate one
  if (!description || description.trim() === "") {
    const aiResponse = await generate({
      model: "gpt-4o-mini", // Or your preferred model
      prompt: `Write a professional real estate listing description for an estate named "${name}". 
               Make it sound attractive, highlighting location, amenities, and lifestyle.`
    });
    description = aiResponse.outputText.trim();
  }

  // Send to PHP API
  const response = await fetch("http://localhost/techno_real_homes/API.php?action=add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description })
  });

  const result = await response.json();
  return result;
});
