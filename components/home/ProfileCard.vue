<script setup>
const isLoggedIn = ref(false);
const currentAction = ref("signup"); // status | login | register
const isOpenModalInformation = ref(false);

const stateLogin = reactive({
     email: undefined,
     password: undefined,
});

const stateSingUp = reactive({
     email: undefined,
     password: undefined,
     confirmPassword: undefined,
});

const validateLogin = (state) => {
     let errors = [];

     if (!state.password) {
          errors.push({ path: "password", message: "Required" });
     }

     if (!state.email) {
          errors.push({ path: "email", message: "Required" });
     }

     return errors;
};

const submitLogin = (event) => {
     console.log(event.data);
};

// Sign up validate
const validateSignUp = (state) => {
     let errors = [];

     if (!state.email) {
          errors.push({ path: "email", message: "Required" });
     }

     if (!state.password) {
          errors.push({ path: "password", message: "Required" });
     }

     if (state.confirmPassword !== state.password) {
          errors.push({
               path: "confirmPassword",
               message: "The password must be the same ",
          });
     }

     return errors;
};

const submitSignUp = (event) => {
     console.log(event.data);
};

const textMainBtnAction = (action) => {
     if (action === "login") return "Sign up";

     if (action === "signup") return "Login";

     if (action === "status") return "Sign out";
};

const handleMainBtnAction = (action) => {
     if (action === "login") {
          currentAction.value = "signup";

          return;
     }

     if (action === "signup") {
          console.log(23);
          currentAction.value = "login";
          return;
     }

     if (action === "status") {
          currentAction.value = "login";
          return;
     }
};
</script>

<template>
     <UCard class="font-thin">
          <template #header>
               <div class="flex justify-between items-center">
                    <div class="h-6 flex items-center">
                         <UIcon
                              name="i-material-symbols-light:person"
                              class="w-6 h-6"
                         />
                         <h1 class="ml-2">Profile - {{ currentAction }}</h1>
                    </div>

                    <UButton
                         icon="i-material-symbols-light:info-outline"
                         variant="ghost"
                         @click="
                              isOpenModalInformation = !isOpenModalInformation
                         "
                    />
               </div>
          </template>

          <!-- Alert -->
          <div v-if="currentAction === 'status'">
               <h1>Status: <span class="text-orange-400">Active</span></h1>
               <h1 class="mt-1">ID: dawid.polak@3cerp.cloud</h1>
          </div>

          <div v-if="currentAction === 'alert'">
               <h1 class="text-center">
                    To be able to use the application in full, please log in
               </h1>
          </div>

          <!-- Form to login -->
          <UForm
               v-if="currentAction === 'login'"
               :state="stateLogin"
               :validate="validateLogin"
               class="max-w-[500px] mx-auto space-y-4"
               @submit="submitLogin"
          >
               <UFormGroup label="E-mail" name="email" required>
                    <UInput v-model="stateLogin.email" />
               </UFormGroup>
               <UFormGroup label="Password" name="password" required>
                    <UInput v-model="stateLogin.password" type="password" />
               </UFormGroup>

               <UButton type="submit">Submit</UButton>
          </UForm>

          <!-- Sign up form -->
          <UForm
               v-if="currentAction === 'signup'"
               :state="stateSingUp"
               :validate="validateSignUp"
               class="max-w-[500px] mx-auto space-y-4"
               @submit="submitLogin"
          >
               <UFormGroup label="E-mail" name="email" required>
                    <UInput v-model="stateSingUp.email" />
               </UFormGroup>
               <UFormGroup label="Password" name="password" required>
                    <UInput v-model="stateSingUp.password" type="password" />
               </UFormGroup>
               <UFormGroup
                    label="Confirm password"
                    name="confirmPassword"
                    required
               >
                    <UInput
                         v-model="stateSingUp.confirmPassword"
                         type="password"
                    />
               </UFormGroup>

               <UButton type="submit">Submit</UButton>
          </UForm>

          <template #footer>
               <div class="flex justify-between items-center">
                    <p class="text-white text-xs">
                         *As a logged-in user you have access to the full range
                         of functions
                    </p>
                    <UButton
                         class="font-light"
                         variant="ghost"
                         @click="handleMainBtnAction(currentAction)"
                    >
                         {{ textMainBtnAction(currentAction) }}
                    </UButton>

                    <!-- Additon -->
                    <UiModalInformation
                         :is-open="isOpenModalInformation"
                         @close="isOpenModalInformation = false"
                    >
                         <template #content>
                              <div>
                                   <p class="font-thin text-sm">
                                        By logging in you accept the entire
                                        3cerp.cloud company policy available on
                                        their website 3cerp.cloud If you do not
                                        agree, do not create an account.
                                        Remember an account can no longer be
                                        deleted. If you are not a member of
                                        ozparts or 3cerp, you will not receive
                                        an email to complete your registration.
                                        The only condition for creating an
                                        account is to obtain permission from the
                                        IT department. If you wish to create an
                                        account, please contact us.
                                   </p>
                              </div>
                         </template>
                    </UiModalInformation>
               </div>
          </template>
     </UCard>
</template>

<style></style>
