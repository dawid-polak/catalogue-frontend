// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
     devtools: { enabled: true },
     modules: ["@nuxt/ui", "@vueuse/nuxt"],
     devServer: {
          port: 3001,
     },
     runtimeConfig: {
          public: {
               apiHost: "https://mastercatalogue.ozparts.eu",
          },
     },
});
