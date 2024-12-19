export const useAuthStore = defineStore("authStore", {
     state: () => ({
          email: "",
          token: "",
     }),

     actions: {
          async login() {
               const res = await $fetch("");
          },
     },
});
