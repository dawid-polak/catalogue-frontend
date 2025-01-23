import FetchCatalogue from "../catalogue";

class WarehouseModule extends FetchCatalogue {
     constructor(options, apiFetcher) {
          super({ ...options, module: "warehouse", $fetch: apiFetcher });
     }

     // Find result from ktypes
     async cross(data) {
          return await this.call("POST", ["cross"], data);
     }
}

export default WarehouseModule;
