// plugin for managing notifications, providing a global toast function
// type: error || success
export default defineNuxtPlugin({
     name: "notification",
     setup(app) {
          const toast = useToast();

          //   Global prefernces toast
          const toastPreferences = {
               timeout: 3000,
               pauseTimeoutOnHover: true,
          };

          //   Select type of toast
          const selectToast = (type, title, description) => {
               switch (type) {
                    case "error": {
                         errorToast(title, description);
                    }
                    case "success": {
                         successToast(title, description);
                    }
               }
          };

          //  Error toast
          const errorToast = (title, description) => {
               toast.add({
                    ...toastPreferences,
                    description: description,
                    title: title,
                    color: "red",
                    icon: "i-mdi-light:alert-octagon",
               });
          };

          //   Success toast
          const successToast = (title, description) => {
               toast.add({
                    ...toastPreferences,
                    description: description,
                    title: title,
                    color: "green",
                    icon: "i-heroicons-check-circle",
               });
          };

          return {
               provide: {
                    toast: (type, title, description) =>
                         selectToast(type, title, description),
               },
          };
     },
});
