import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "logo.svg",
        "brasao.svg",
      ],
      manifest: {
        name: "",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        orientation: "portrait-primary",
        short_name: "",
        description: "Aplicativo do Museu de Arte da UFC",
        theme_color: "#000000",
        icons: [
          {
            src: "logo.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
        ],
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
  },
});
