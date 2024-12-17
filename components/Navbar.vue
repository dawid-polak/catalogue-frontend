<script setup lang="ts">
const items = [
     [
          {
               label: "General",
               slot: "general",
               disabled: true,
          },
          {
               label: "Car Models",
               to: "data/carModels",
          },
     ],
     [
          {
               label: "Producents",
               slot: "producents",
               disabled: true,
          },
     ],
];
const openData = ref(false);

const emit = defineEmits(["expandDisplay"]);

const props = defineProps({
     isFullWithContainer: {
          type: Boolean,
          required: false,
     },
});
</script>

<template>
     <div>
          <div class="flex">
               <div class="flex items-center pl-5">
                    <UButton icon="" variant="ghost" />
               </div>

               <UContainer class="py-5 flex justify-center">
                    <div class="flex gap-5 items-center font-thin">
                         <ULink
                              to="/"
                              active-class="text-orange-400"
                              inactive-class="text-orange  dark:text-white hover:text-orange-400 dark:hover:text-orange-400"
                         >
                              Home
                         </ULink>

                         <UDropdown
                              v-model:open="openData"
                              :items="items"
                              :popper="{ placement: 'bottom-start' }"
                         >
                              <ULink
                                   active-class="text-orange-400"
                                   inactive-class="text-orange dark:text-white hover:text-orange-400 dark:hover:text-orange-400"
                              >
                                   Data
                              </ULink>

                              <template #general="{ item }">
                                   <div>{{ item.label }}</div>
                              </template>
                         </UDropdown>

                         <ULink
                              to="searchEngine"
                              active-class="text-orange-400"
                              inactive-class="text-orange dark:text-white hover:text-orange-400 dark:hover:text-orange-400"
                         >
                              Search engine
                         </ULink>

                         <ULink
                              to="uploads"
                              active-class="text-orange-400"
                              inactive-class="text-orange dark:text-white hover:text-orange-400 dark:hover:text-orange-400"
                         >
                              Uploads
                         </ULink>
                    </div>
               </UContainer>

               <div class="flex items-center pr-5">
                    <UButton
                         :icon="
                              props.isFullWithContainer
                                   ? 'i-material-symbols-light:collapse-content'
                                   : 'i-material-symbols-light:expand-content'
                         "
                         variant="ghost"
                         @click="emit('expandDisplay'), (change = !change)"
                    />
               </div>
          </div>
          <UDivider />
     </div>
</template>
