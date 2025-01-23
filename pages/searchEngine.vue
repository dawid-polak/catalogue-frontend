<script setup>
const { $toast } = useNuxtApp();

const titlePage = inject("titlePage");
const currentKtypes = ref(undefined);

const changeKtypes = (newKtypes) => {
     try {
          return (currentKtypes.value = newKtypes);
     } catch (error) {
          $toast("error", "Change Ktypes", error.message);

          return;
     }
};

const resetData = () => {
     currentKtypes.value = undefined;
};

onMounted(() => {
     titlePage.value = "Serach Engine";
});
</script>

<template>
     <UCard
          class="card-custom h-100 my-5"
          :ui="{
               body: {
                    padding: 0,
               },
          }"
     >
          <template #header>
               <div
                    class="flex justify-between items-center gap-4 font-weight-light"
               >
                    <div class="font-weight-thin text-xs">
                         {{
                              currentKtypes
                                   ? "Ktypes: " + currentKtypes
                                   : "Select your car model!"
                         }}
                    </div>

                    <SearchEngineSelectModel @search="changeKtypes" />
               </div>
          </template>

          <div class="m-0 p-0">
               <SearchEngineTable :ktypes="currentKtypes" />
          </div>

          <template #footer>
               <div class="flex justify-end items-center">
                    <UButton
                         class="font-light"
                         variant="ghost"
                         @click="resetData"
                         >Reset</UButton
                    >
               </div>
          </template>
     </UCard>
</template>

<style scoped>
.card-custom {
     height: calc(100% - 62px);
}
</style>
