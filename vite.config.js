import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import { loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    assetsInclude: ["**/*.worker.js"],
    base: env.VITE_BASE_URL || "/",
    define: {
      "process.env": env,
    },
    plugins: [
      react(),
      tailwindcss({
        config: {
          content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
          theme: {
            extend: {},
          },
          plugins: [],
        },
      }),
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: "/src",
        },
      ],
    },
  };
});
