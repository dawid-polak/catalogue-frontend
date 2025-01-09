<script setup>
const constantVariables = useConstantVariable();
const titlePage = inject("titlePage");

// Data
const accordionItems = constantVariables.value.databaseAccordion;

onMounted(() => {
     titlePage.value = "Database";
});
</script>

<template>
     <div class="pt-2">
          <UAccordion
               open-icon="i-heroicons-plus"
               close-icon="i-heroicons-minus"
               color="primary"
               variant="solid"
               size="md"
               :items="accordionItems"
          >
               <template #tables>
                    <DatabaseTables />
               </template>
          </UAccordion>
     </div>
</template>
