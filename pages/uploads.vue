<script setup>
const titlePage = inject("titlePage");

onMounted(() => {
     titlePage.value = "Uploads";
});
</script>

<template>
     <div class="pt-5">
          <!-- <UploadsUploadSqlFile /> -->

          <UploadsUploadBigCsv />
     </div>
</template>
