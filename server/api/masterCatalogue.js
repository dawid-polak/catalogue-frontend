class ApiMasterCatalogue {
     constructor(host) {
          this.host = host;
     }
}

const $apiMasterCatalogue = new ApiMasterCatalogue(
     "https://mastercatalogue.ozparts.eu/api/"
);

export default $apiMasterCatalogue;
