import { defineNitroConfig } from 'nitro/config';

export default defineNitroConfig({
  serverDir: './test-server',
  modules: ['workflow/nitro'],
  compatibilityDate: '2024-01-01',
});
