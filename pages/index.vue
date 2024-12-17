<script setup>
const titlePage = inject("titlePage");

onMounted(() => {
     titlePage.value = "Home Page";
});
</script>

<template>
     <div class="pt-5 w-[400px]">
          <UCard class="font-thin">
               <template #header>
                    <div class="h-6 flex items-center">
                         <UIcon
                              name="i-material-symbols-light:person"
                              class="w-6 h-6"
                         />
                         <h1 class="ml-2">Profile data</h1>
                    </div>
               </template>

               <div>
                    <h1>Dawid Polak</h1>
                    <h1>dawid.polak@3cerp.cloud</h1>
                    <h1 class="mt-2 text-sm">Role: admin</h1>
               </div>

               <template #footer>
                    <div class="flex justify-between">
                         <ULink class="text-sm text-white hover:text-orange-400"
                              >Edit</ULink
                         >
                         <UButton class="font-light">Sign out</UButton>
                    </div>
               </template>
          </UCard>
     </div>
</template>
