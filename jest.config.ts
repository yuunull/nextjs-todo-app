import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./src/jest.setup.ts"],
  setupFiles: ["./src/jest.polyfills.js"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};

export default createJestConfig(config);
