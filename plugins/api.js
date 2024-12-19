export default defineNuxtPlugin((nuxtApp) => {
     const config = useRuntimeConfig();

     const api = $fetch.create({
          baseURL: config.public.apiHost,
     });

     return {
          provide: { api },
     };
});
