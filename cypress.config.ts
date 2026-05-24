import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl:
      "https://notion-clone-iba62q21d-tomiiii-coders-projects.vercel.app",
    setupNodeEvents(on, config) {},
  },
});
