<script setup>
const titlePage = inject("titlePage");

onMounted(() => {
     titlePage.value = "Home Page";
});
</script>

<template>
     <div class="pt-5">
          <HomeProfileCard />
     </div>
</template>
