import FetchCatalogue from "../catalogue";

class DatabaseModule extends FetchCatalogue {
     constructor(options, apiFetcher) {
          super({ ...options, module: "tables" });
     }
}
