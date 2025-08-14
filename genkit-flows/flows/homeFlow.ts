import { defineFlow } from "@genkit-ai/flow";
import fetch from "node-fetch"; // make sure to install: npm install node-fetch

export const homeFlow = defineFlow("homeFlow", async () => {
  try {
    // Example API call to your PHP backend
    const response = await fetch("http://localhost:8000/API.php");
    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json();
    console.log("Data from PHP backend:", data);

    return {
      message: "Data fetched successfully from PHP backend",
      backendData: data
    };
  } catch (error) {
    console.error("Error in homeFlow:", error);
    return { error: error.message };
  }
});

