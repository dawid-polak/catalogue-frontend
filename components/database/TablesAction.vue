<script setup>
const { $toast, $api } = useNuxtApp();

const emit = defineEmits(["removed"]);
const props = defineProps({
     row: {
          type: Object,
          required: true,
     },
});

const isOpenModalCofirm = ref(false);
const isRemoving = ref(false);

const actions = () => [
     [
          {
               label: "Edit",
               icon: "i-material-symbols-light:edit-document-outline-rounded",
               disabled: true,
          },
     ],
     [
          {
               label: "Delete",
               icon: "i-material-symbols-light:delete-outline-sharp",
               click: () =>
                    (isOpenModalCofirm.value = !isOpenModalCofirm.value),
          },
     ],
];

// Funciton to remove table from db
const handleRemoveTableAction = async () => {
     try {
          isRemoving.value = true;
          const table = props.row.name;

          if (!table) throw new Error("Select table");

          const res = await $api.crud.remove(table);

          if (res.status === "success") {
               isRemoving.value = false;
               isOpenModalCofirm.value = false;

               emit("removed");

               return $toast(
                    "success",
                    "Remove table",
                    "The table was successfully deleted from the database"
               );
          }
     } catch (error) {
          console.error(error);
          isRemoving.value = false;

          return $toast("error", "Remove table", error.message);
     }
};
</script>

<template>
     <UDropdown class="font-thin" :items="actions(props.row)">
          <UButton
               color="gray"
               variant="ghost"
               icon="i-heroicons-ellipsis-horizontal-20-solid"
          />

          <UModal v-model="isOpenModalCofirm">
               <UCard>
                    <template #header>
                         <div class="flex gap-2 items-center">
                              <UIcon
                                   name="material-symbols-light:warning-outline-rounded"
                                   class="w-5 h-5"
                              />
                              <h1 class="font-thin">Confirm actions</h1>
                         </div>
                    </template>

                    <h1 class="font-thin text-sm">
                         This action is irreversible. It results in complete
                         deletion of the data. It will not be possible to
                         recover them.
                    </h1>

                    <template #footer>
                         <div class="w-100 flex gap-2 justify-end">
                              <UButton
                                   color="white"
                                   variant="solid"
                                   class="font-thin"
                                   @click="
                                        isOpenModalCofirm = !isOpenModalCofirm
                                   "
                              >
                                   Cancel
                              </UButton>

                              <UButton
                                   color="red"
                                   variant="ghost"
                                   class="font-thin"
                                   :loading="isRemoving"
                                   @click="handleRemoveTableAction"
                              >
                                   Remove
                              </UButton>
                         </div>
                    </template>
               </UCard>
          </UModal>
     </UDropdown>
</template>
