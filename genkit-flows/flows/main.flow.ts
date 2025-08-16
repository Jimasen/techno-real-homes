import { defineFlow } from "@genkit-ai/flow";
import { z } from "zod";
import fetch from "node-fetch";

export const mainFlow = defineFlow(
  {
    name: "mainFlow",
    inputSchema: z.object({ type: z.string() }),
    outputSchema: z.any()
  },
  async (input) => {
    try {
      let result: any = {};
      if (input.type === "home") {
        const res = await fetch("http://localhost:8000/API.php");
        result = { type: "home", data: await res.json(), message: "Fetched Home Data" };
      } else if (input.type === "hello") {
        const res = await fetch("http://localhost:8000/hello.php");
        result = { type: "hello", data: await res.json(), message: "Fetched Hello Data" };
      } else {
        result = { error: "Unknown request type" };
      }
      return result;
    } catch (err: any) {
      return { error: err.message };
    }
  }
);
