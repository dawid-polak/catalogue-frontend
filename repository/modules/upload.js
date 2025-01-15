import FetchCatalogue from "../catalogue";

class UploadModule extends FetchCatalogue {
     constructor(options, apiFetcher) {
          super({ ...options, module: "uploads", $fetch: apiFetcher });
     }

     async rowData(data) {
          return await this.call("POST", ["rowData"], data);
     }
}

export default UploadModule;
