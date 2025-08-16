const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

// Import the compiled Genkit flow
const { helloFlow } = require("../genkit-flows/index.js");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Route to handle chatbot requests
app.post("/ai", async (req, res) => {
  try {
    const query = req.body.query;
    if (!query) {
      return res.status(400).json({ reply: "No message received." });
    }

    // Call Genkit flow
    const result = await helloFlow({ input: query });

    res.json({ reply: result.output });
  } catch (error) {
    console.error("Error in /ai:", error);
    res.status(500).json({ reply: "Something went wrong." });
  }
});

// Export Firebase Function
exports.api = functions.https.onRequest(app);
