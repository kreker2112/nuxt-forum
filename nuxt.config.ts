// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";

export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    "@": resolve(__dirname, "./"),
  },
  app: {
    rootId: "KreKer2112",
    head: {
      title: "My nuxt fullstack tutorial",
      meta: [
        {
          name: "description",
          content: "Nuxt3 + TailwindCSS + TypeScript + Pinia",
        },
      ],
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
  css: ["~/assets/styles/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  colorMode: {
    classSuffix: "",
  },
  typescript: {
    typeCheck: true,
  },
  extensions: [".ts", ".js", ".vue", ".json", ".graphql", ".gql"],
  runtimeConfig: {
    private: {
      stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    },
    public: {
      appDomain: process.env.APP_DOMAIN,
    },
  },
});
