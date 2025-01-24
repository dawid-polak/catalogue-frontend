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
     <div class="pt-5">
          <UAlert
               icon="i-material-symbols-light:info-rounded"
               description="This view is used to manage the database. The options that are available affect the data directly. Once an action has been performed, it cannot be undone. I recommend great caution."
               class="mb-5"
               color="yellow"
          />

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
