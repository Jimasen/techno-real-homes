// flows/addEstate.flow.ts
import { GENKIT_CONFIG } from "../genkit.config";
import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";
import fetch from "node-fetch";

const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model("gemini-2.5-flash")
});

export async function addEstate(name: string, description?: string) {
  if (!description || !description.trim()) {
    const response = await ai.generate(
      `Write a professional real estate listing description for an estate named "${name}".`
    );
    description = response.text;
  }

  const resp = await fetch(`${GENKIT_CONFIG.apiUrl}?action=add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description })
  });

  return await resp.json();
}
