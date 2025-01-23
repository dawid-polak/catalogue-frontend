import UploadModule from "~/repository/modules/upload";
import DatabaseModule from "~/repository/modules/database";
import CrudModules from "~/repository/modules/crud";
import WarehouseModule from "~/repository/modules/warehouse";

export default defineNuxtPlugin((nuxtApp) => {
     const config = useRuntimeConfig();

     const fetchOptions = {
          baseURL: config.public.host + "/api",
          "Content-Type": "application/json",
     };

     const apiFetcher = $fetch.create(fetchOptions);

     // Modules API
     const modules = {
          uploads: new UploadModule(fetchOptions, apiFetcher),
          database: new DatabaseModule(fetchOptions, apiFetcher),
          crud: new CrudModules(fetchOptions, apiFetcher),
          warehouse: new WarehouseModule(fetchOptions, apiFetcher),
     };

     return {
          provide: {
               api: modules,
          },
     };
});
