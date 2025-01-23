import FetchCatalogue from "../catalogue";

class CrudModules extends FetchCatalogue {
     constructor(options, apiFetcher) {
          super({ ...options, module: "crud", $fetch: apiFetcher });
     }

     //  Remove tabels from db
     async remove(id) {
          return await this.call("DELETE", [id]);
     }
}
export default CrudModules;
