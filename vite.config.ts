import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["pwa-192x192.svg", "pwa-512x512.png"],
      manifest: {
        name: "AppMauc",
        short_name: "",
        start_url: "/",
        display: "standalone",
        orientation: "portrait-primary",
        theme_color: "#ffffff",
        description: "Aplicativo do Museu de Arte da UFC",
        background_color: "#ffffff",
        icons: [
          { src: "pwa-192x192.svg", sizes: "any", type: "image/svg+xml" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
        ],
        screenshots: [
          {
            src: "screenshot.png",
            sizes: "1440x1018",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "screenshot2.png",
            sizes: "360x793",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dias
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
  },
  define: {
    "process.env": process.env,
  },
});
