// genkit-flows/genkit.config.ts
import { defineConfig } from "@genkit-ai/core";
import path from "path";

export default defineConfig({
  // Where flows live (relative to this config file)
  flowsDir: path.join(__dirname, "flows"),
  // Ensure dev mode features are enabled when GENKIT_ENV=dev
  env: process.env.GENKIT_ENV || "development",
  // Optional: where Genkit can write its runtime meta
  serverDir: path.join(__dirname, ".genkit", "servers")
});
