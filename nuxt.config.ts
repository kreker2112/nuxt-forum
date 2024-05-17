// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from "path";

export default defineNuxtConfig({
  alias: {
    "@": resolve(__dirname, "./"),
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    [
      "@nuxt/content",
      {
        highlight: {
          theme: "github-dark",
          preload: ["vue"],
        },
        navigation: {
          fields: ["author", "subject", "position"],
        },
      },
    ],
    "nuxt-icon",
    "@nuxt/test-utils/module",
  ],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.js",
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  colorMode: {
    classSuffix: "",
  },
  runtimeConfig: {
    private: {
      stripeSecretKey: process.env.STRIPE_SECRET_KEY,
      db: process.env.DATABASE_URL,
    } as any,
    public: {
      appDomain: process.env.APP_DOMAIN,
      gitHash: process.env.GITHUB_SHA,
      releaseVersion: process.env.RELEASE_VERSION,
    },
  },
  experimental: {
    writeEarlyHints: false,
  },
});
