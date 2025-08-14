import { defineFlow } from "@genkit-ai/flow";
import fetch from "node-fetch"; // npm install node-fetch

export const mainFlow = defineFlow("mainFlow", async (input) => {
  try {
    let result = {};

    if (input?.type === "home") {
      const res = await fetch("http://localhost:8000/API.php");
      result = {
        type: "home",
        data: await res.json(),
        message: "Fetched Home Data from PHP backend"
      };
    } 
    else if (input?.type === "hello") {
      const res = await fetch("http://localhost:8000/hello.php");
      result = {
        type: "hello",
        data: await res.json(),
        message: "Fetched Hello Data from PHP backend"
      };
    } 
    else {
      result = { error: "Unknown request type" };
    }

    return result;

  } catch (err) {
    console.error("Flow error:", err);
    return { error: err.message };
  }
});
