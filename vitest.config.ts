import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ["./src/tests/setup-test.ts", "dotenv/config"],
    environment: "node",
    clearMocks: true,
  },
  plugins: [tsconfigPaths()],
});
