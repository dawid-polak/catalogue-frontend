<script setup>

</script>

<template>
     <div>
          <UContainer>
               <div class="my-4 flex justify-between items-center">
                    <h1 class="text-orange-400 text-xl">Car Models</h1>

                    <div class="flex gap-2">
                         <UInput
                              icon="i-heroicons-magnifying-glass-20-solid"
                              placeholder="Serach ..."
                         />
                    </div>
               </div>

               <UTable :rows="people" />
          </UContainer>
     </div>
</template>
