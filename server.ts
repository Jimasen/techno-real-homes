// server.ts
import express from "express";
import { config } from "dotenv";

config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("✅ Techno Real Homes server is running!");
});

// Example API route
app.post("/api/message", (req, res) => {
  const { name, message } = req.body;
  res.json({
    success: true,
    reply: `Hello ${name}, you said: "${message}"`,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
