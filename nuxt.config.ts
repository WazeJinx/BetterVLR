// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxtjs/tailwindcss",
    "@vite-pwa/nuxt",
  ],

  css: ["~/assets/css/main.css"],
  tailwindcss: {
    config: {
      darkMode: "class",
      theme: {
        extend: {
          fontFamily: {
            sans: [
              "-apple-system",
              "BlinkMacSystemFont",
              '"Segoe UI"',
              "Roboto",
              "Oxygen",
              "Ubuntu",
              "Cantarell",
              '"Fira Sans"',
              '"Droid Sans"',
              '"Helvetica Neue"',
              "sans-serif",
            ],
          },
          colors: {
            darkBg: "#1C1C1E",
            darkSurface: "#2C2C2E",
            darkText: "#FFFFFF",
            darkSubText: "#AEAEB2",
            darkBorder: "#3A3A3C",
            appleBlue: "#0A84FF",
            appleHover: "#1C1C1E/5",
          },
        },
      },
    },
  },

  pwa: {
    manifest: {
      name: "BetterVLR",
      short_name: "BetterVLR",
      lang: "fa",
      start_url: "/",
      display: "standalone",
      background_color: "#0A7AFF",
      theme_color: "#0A7AFF",
      icons: [
        {
          src: "/icon-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icon-512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  },

  app: {
    head: {
      title: "BetterVLR",
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
      ],
    },
  },
});
