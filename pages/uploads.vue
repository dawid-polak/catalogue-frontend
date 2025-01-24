<script setup>
const titlePage = inject("titlePage");

onMounted(() => {
     titlePage.value = "Uploads";
});
</script>

<template>
     <div class="py-5">
          <UAlert
               icon="i-material-symbols-light:info-rounded"
               description="This view is used to upload data into the database. The modules available here can cope with large data files. So far only the csv module is running. Other possibilities for uploading data will be developed in the future.  "
               title="What is it about? "
               class="mb-5"
               color="yellow"
          />

          <UploadsUploadBigCsv />
     </div>
</template>
