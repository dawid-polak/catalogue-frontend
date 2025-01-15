import UploadModule from "~/repository/modules/upload";

export default defineNuxtPlugin((nuxtApp) => {
     const config = useRuntimeConfig();

     const fetchOptions = {
          baseURL: config.public.host + "/api",
          "Content-Type": "application/json",
     };

     const apiFetcher = $fetch.create(fetchOptions);

     const modules = {
          uploads: new UploadModule(fetchOptions, apiFetcher),
     };

     return {
          provide: {
               api: modules,
          },
     };
});
