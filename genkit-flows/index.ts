import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { generateText } from "@genkit-ai/ai"; // ✅ Correct import
import { configureGenkit } from "@genkit-ai/core";

configureGenkit({
  plugins: [],
  model: "gpt-4o-mini" // Or your preferred default model
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve your frontend

// AI endpoint
app.post("/api/ask", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "No question provided" });
    }

    const aiResponse = await generateText({
      model: "gpt-4o-mini",
      prompt: question
    });

    res.json({ answer: aiResponse.outputText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
