// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
     devtools: { enabled: true },
     modules: [
          "@nuxt/ui",
          "@vueuse/nuxt",
          "@pinia/nuxt",
          "pinia-plugin-persistedstate/nuxt",
     ],
     devServer: {
          port: 3001,
     },
     runtimeConfig: {
          public: {
               host: "https://mastercatalogue.ozparts.eu",
          },
     },
});
