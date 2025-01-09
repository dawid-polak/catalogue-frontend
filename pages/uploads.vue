<script setup>
const titlePage = inject("titlePage");

onMounted(() => {
     titlePage.value = "Uploads";
});
</script>

<template>
     <div class="py-5">
          <UploadsUploadBigCsv />
     </div>
</template>
