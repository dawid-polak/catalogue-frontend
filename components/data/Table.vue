<script setup>
const props = defineProps({
     rows: {
          type: Array,
     },
     laoding: {
          type: Boolean,
          required: false,
          default: true,
     },
});
</script>

<template>
     <div>
          <UTable />
     </div>
</template>
