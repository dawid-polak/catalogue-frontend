class FetchCatalogue {
     constructor(options) {
          this.options = options;
     }

     createUrl(params = []) {
          let url = [];

          url.push(`${this.options.baseURL}/${this.options.module}`);

          if (params.length > 0) {
               url.push(...params);
          }

          return url.join("/");
     }

     async call(method, params, data) {
          const $fetch = this.options.$fetch;
          const url = this.createUrl(params);

          return await $fetch(url, {
               method,
               body: data,
          });
     }
}

export default FetchCatalogue;
