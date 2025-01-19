import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: "/job-listings/", // Must match your repository name
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    coverage: {
      provider: "v8", // Use V8 coverage provider
      all: true, // Ensure all files are checked for coverage
      reporter: ["text", "html"], // Output formats
      include: ["src/**/*.{ts,tsx}"], // Include all .ts and .tsx files
      exclude: [
        "src/**/*.test.{ts,tsx}", // Test files
        "src/setupTests.ts", // Test setup
        "src/__mocks__/**", // Mock files
        "src/vite-env.d.ts",
        "src/styles/**",
        "src/main.tsx",
        "src/App.tsx",
      ],
      thresholds: {
        statements: 80,
        branches: 70,
        functions: 80,
        lines: 80,
      },
    },
  },
});
