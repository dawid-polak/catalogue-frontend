export const useAuthStore = defineStore(
     "authStore",
     () => {
          // STATE
          const email = ref("");
          const token = ref("");

          // ACTIONS
          async function login(mail, password) {
               try {
                    const res = await $fetch(
                         "https://mastercatalogue.ozparts.eu/api/auth/login",
                         {
                              method: "POST",
                              body: {
                                   email: mail,
                                   password: password,
                              },
                         }
                    );

                    if (res.status !== "success") return res.message;

                    email.value = mail;
                    token.value = res.data.token;

                    return res.status;
               } catch (error) {
                    console.error(error);
               }
          }

          function signOut() {
               email.value = "";
               token.value = "";
          }

          async function signUp(mail, password) {
               try {
                    const res = await $fetch(
                         "https://mastercatalogue.ozparts.eu/api/auth/signup",
                         {
                              method: "POST",
                              body: {
                                   email: mail,
                                   password: password,
                              },
                         }
                    );

                    if (res.status !== "success") return res.message;

                    return "success";
               } catch (error) {
                    console.error(error);
               }
          }

          return { email, token, login, signOut, signUp };
     },
     {
          persist: true,
     }
);
