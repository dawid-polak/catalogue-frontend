<script setup>
const { $api, $toast } = useNuxtApp();

const props = defineProps({
     ktypes: {
          type: [Number, String],
     },
});

const isLoading = ref(false);
const oemModal = ref({
     isOpen: false,
     data: undefined,
});
const rows = ref([]);

// Function to get data form db
const handleGetItems = async (ktypes) => {
     try {
          isLoading.value = true;

          const data = {
               ktypes: [String(ktypes)],
          };

          rows.value = [];
          const res = await $api.warehouse.cross(data);

          rows.value = res.data;

          isLoading.value = false;
     } catch (error) {
          isLoading.value = false;

          return $toast("error", "handleGetItems", error.message);
     }
};

watch(
     () => props.ktypes,
     async (observedData) => {
          if (observedData) {
               await handleGetItems(observedData);
          } else {
               rows.value = [];
          }
     }
);
</script>

<template>
     <div class="h-full p-0 ma-0">
          <UTable
               class="custom-height-table w-100"
               :rows="rows"
               :loading="isLoading"
               :ui="{
                    thead: 'sticky top-0 bg-white dark:bg-gray-900',
               }"
          >
               <!-- HEADERS -->

               <template #oem-header="{ row }">
                    <p class="ml-2">Oem</p>
               </template>

               <!-- ITEMS -->
               <template #oem-data="{ row }">
                    <div v-if="row.oem">
                         <UButton
                              class="font-thin"
                              variant="ghost"
                              @click="
                                   (oemModal.isOpen = true),
                                        (oemModal.data = row)
                              "
                         >
                              show oem
                         </UButton>
                    </div>
               </template>
               <template #ktypes-data="{ row }">
                    <p v-if="row.ktypes">
                         <span v-for="item in row.ktypes" :key="item">{{
                              item + " "
                         }}</span>
                    </p>
               </template>
               <template #criteria-data="{ row }">
                    <div v-if="row.criteria">
                         <p v-for="item in row.criteria" :key="item">
                              <span class="font-bold">{{ item.name }}: </span>
                              <span>{{ item.value.join(", ") }}</span>
                         </p>
                    </div>
                    <div v-else>No data</div>
               </template>

               <!-- Empty state -->
               <template #empty-state>
                    <div
                         class="custom-height-empty-state flex flex-col gap-3 justify-center items-center"
                    >
                         <UIcon
                              name="i-heroicons-circle-stack-20-solid"
                              class="h-12 w-12"
                         />
                         <p class="font-thin">No data</p>
                    </div>
               </template>
          </UTable>

          <!-- Oem modal -->
          <UModal v-model="oemModal.isOpen">
               <UCard>
                    <template #header>
                         <div class="flex justify-between items-center">
                              <div class="font-thin">
                                   <span class="font-thin text-xs">
                                        {{ oemModal.data.sku }}
                                   </span>
                              </div>
                              <UButton
                                   color="gray"
                                   variant="ghost"
                                   icon="i-heroicons-x-mark-20-solid"
                                   class="-my-1"
                                   @click="oemModal.isOpen = false"
                              />
                         </div>
                    </template>

                    <div v-if="oemModal.data">
                         <h4 class="font-thin text-primary uppercase mb-4">
                              OEM numbers:
                         </h4>
                         <div class="w-100 flex flex-wrap">
                              <p v-for="item in oemModal.data.oem" :key="item">
                                   <span class="font-thin mr-2"
                                        >{{ item }}
                                   </span>
                              </p>
                         </div>
                    </div>
               </UCard>
          </UModal>
     </div>
</template>

<style scoped>
.custom-height-table {
     height: calc(100vh - 310px) !important;
}

.custom-height-empty-state {
     height: calc(100vh - 320px) !important;
}
</style>
