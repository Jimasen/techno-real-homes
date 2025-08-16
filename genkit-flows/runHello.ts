import { helloFlow } from "./flows/hello.flow.js";

// Grab name from CLI arguments or default to "World"
const name = process.argv[2] || "World";

(async () => {
  const result = await helloFlow.run({ name });
  console.log(result.message);
})();
