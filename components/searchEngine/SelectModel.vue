<script setup>
const emit = defineEmits(["search"]);

const isOpen = ref(false);

const stateForm = ref({
     ktypes: 120608,
});

// Function to hande serach ktypes
const handleSerach = () => {
     if (!stateForm.value.ktypes) return;

     emit("search", stateForm.value.ktypes);

     return (isOpen.value = false);
};
</script>

<template>
     <div>
          <UButton class="font-light" @click="isOpen = !isOpen">
               Select Model
          </UButton>

          <!-- Modal select model -->
          <UModal v-model="isOpen" fullscreen>
               <UForm :state="stateForm">
                    <UCard>
                         <template #header>
                              <div class="flex items-center justify-between">
                                   <div class="flex items-center">
                                        <UIcon
                                             name="i-material-symbols-light:info-outline"
                                             class="w-5 h-5"
                                        />

                                        <h1 class="ml-2 font-thin">
                                             Select your car model
                                        </h1>
                                   </div>

                                   <UButton
                                        color="gray"
                                        variant="ghost"
                                        icon="i-heroicons-x-mark-20-solid"
                                        class="-my-1"
                                        @click="isOpen = false"
                                   />
                              </div>
                         </template>

                         <div>
                              <UAlert
                                   icon="i-material-symbols-light:info-rounded"
                                   description="We are waiting for the correct tree table. For the time being, you can only search for parts for a specific model by entering the ktype number. Remember that the ktype number must be correct, and you can only enter one."
                                   title="What is it about? "
                                   class="my-5"
                                   color="yellow"
                              />

                              <UFormGroup label="Ktypes" name="ktypes" required>
                                   <UInput
                                        v-model="stateForm.ktypes"
                                        class="mt-2"
                                   />
                              </UFormGroup>
                         </div>

                         <template #footer>
                              <div class="flex justify-end items-center">
                                   <UButton
                                        class="font-light"
                                        type="submit"
                                        @click="handleSerach"
                                   >
                                        Search
                                   </UButton>
                              </div>
                         </template>
                    </UCard>
               </UForm>
          </UModal>
     </div>
</template>
