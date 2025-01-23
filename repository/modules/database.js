import FetchCatalogue from "../catalogue";

class DatabaseModule extends FetchCatalogue {
     constructor(options, apiFetcher) {
          super({ ...options, module: "database", $fetch: apiFetcher });
     }

     // Get info about tables from db
     async tables() {
          return await this.call("GET", ["tables"]);
     }
}

export default DatabaseModule;
