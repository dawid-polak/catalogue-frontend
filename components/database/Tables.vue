<script setup>
const { $toast } = useNuxtApp();

const isLoading = ref(false);
const rows = ref();
const columns = ref();

// Get tables
const fetchData = async () => {
     let url = "http://localhost:3000/api/database/tables";

     let headers = {
          method: "GET",
     };

     return await $fetch(url, headers);
};

// Function to create columns to table
const createColumns = (data) => {
     const row = data[0];

     const keys = Object.keys(row);

     const newColumns = [];
     const styles = "uppercase font-thin text-xs text-orange-400";

     keys.forEach((item) => {
          newColumns.push({
               label: item,
               key: item,
               class: styles,
          });
     });

     newColumns.push({
          key: "actions",
          //  label: "actions",
          //  class: styles
     });

     return newColumns;
};

// Function to format value in table
const formatValue = (data) => {
     for (let i = 0; i < data.length; i++) {
          const row = data[i];
     }
};

// Handle get tabels
const handleGetTables = async () => {
     try {
          isLoading.value = true;
          rows.value = undefined;
          columns.value = undefined;

          const res = await fetchData();

          const newColumns = createColumns(res.data);

          columns.value = newColumns;
          rows.value = res.data;

          return (isLoading.value = false);

          //   return $toast("success", "Get Tables", "Successfully refreshed data");
     } catch (error) {
          console.error(error);

          $toast("error", error.message);
     }
};

onMounted(async () => {
     await handleGetTables();
});
</script>

<template>
     <div>
          <UTable
               :rows="rows"
               :columns="columns"
               :loading="isLoading"
               :loading-state="{
                    icon: 'i-heroicons-arrow-path-20-solid',
                    label: 'Loading...',
               }"
               :progress="{ color: 'primary', animation: 'carousel' }"
               class="h-[400px]"
          >
               <template #actions-data="{ row }">
                    <DatabaseTablesAction
                         :row="row"
                         @removed="handleGetTables"
                    />
               </template>
          </UTable>
     </div>
</template>
