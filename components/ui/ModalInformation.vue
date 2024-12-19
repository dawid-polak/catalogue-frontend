<script setup>
const emit = defineEmits(["close"]);
const props = defineProps({
     isOpen: {
          required: true,
          type: Boolean,
     },
});
</script>

<template>
     <UModal
          v-model="props.isOpen"
          prevent-close
          @close-prevented="emit('close')"
     >
          <UCard
               :ui="{
                    ring: '',
                    divide: 'divide-y divide-gray-100 dark:divide-gray-800',
               }"
          >
               <template #header>
                    <div class="flex items-center">
                         <UIcon
                              name="i-material-symbols-light:info-outline"
                              class="w-5 h-5"
                         />

                         <h1 class="ml-2 font-thin">Information</h1>
                    </div>
               </template>

               <div class="px-2">
                    <slot name="content" />
               </div>

               <template #footer>
                    <div class="flex justify-end">
                         <UButton variant="ghost" @click="emit('close')"
                              >Close</UButton
                         >
                    </div>
               </template>
          </UCard>
     </UModal>
</template>
