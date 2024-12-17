<script setup>
const titlePage = inject("titlePage");


onMounted(() => {

     console.log(titlePage)

     titlePage.value = 'Home Page'
})
</script>

<template>
     <div>Data</div>
</template>
