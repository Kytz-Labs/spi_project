import { defineConfig } from 'astro/config';  
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
// import vercel from "@astrojs/vercel/serverless";
 
export default defineConfig({
  output: 'static',
  adapter: cloudflare(),// adapter: cloudflare(),
  integrations: [
    tailwind({
      config: './tailwind.config.js', // Path to your Tailwind config file
    }),
    react(), // Ensure React is integrated
  ],
});