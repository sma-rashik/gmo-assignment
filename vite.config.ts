import { defineConfig } from "vite";

export default defineConfig({
  // ... other config options
  esbuild: {
    jsxFactory: "React.createElement",
    jsxInject: `import React from 'react';`,
  },
});
