import { defineConfig } from 'vitest/config';
import { workflow } from "workflow/vite";

export default defineConfig({
  plugins: [workflow()],
  test: {
    include: ['**/*.test.workflow.ts'],
    testTimeout: 30000,
    globalSetup: './vitest.setup.workflow.ts',
  },
});
