import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "./genkit-flows/index.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve public files
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () => {
    console.log("✅ Server running on http://localhost:3000");
});
