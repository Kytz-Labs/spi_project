// import { defineConfig } from 'astro/config';
// import cloudflare from '@astrojs/cloudflare';
// import tailwind from '@astrojs/tailwind';
// import react from "@astrojs/react";

// // https://astro.build/config
// export default defineConfig({
//   output: 'server',
//   // adapter: cloudflare(),
//   integrations: [tailwind(), react()],
// });

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
 
export default defineConfig({
  output: 'server',
  // adapter: cloudflare(),
  integrations: [
    tailwind({
      config: './tailwind.config.js', // Path to your Tailwind config file
    }),
    react(), // Ensure React is integrated
  ],
});