import { defineFlow } from "@genkit-ai/flow";
import fetch from "node-fetch"; // npm install node-fetch

export const helloFlow = defineFlow("helloFlow", async () => {
  try {
    // Example: Fetch greeting data from your PHP backend
    const response = await fetch("http://localhost:8000/hello.php");
    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json();
    console.log("HelloFlow received from PHP:", data);

    return {
      message: "Hello from Genkit + PHP backend!",
      backendGreeting: data
    };
  } catch (error) {
    console.error("Error in helloFlow:", error);
    return { error: error.message };
  }
});

