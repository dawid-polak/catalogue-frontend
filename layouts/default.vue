<script setup>
const windowHeight = ref(0);
const isFullWithContainer = ref(false);
const containerHeight = computed(() => windowHeight.value - 106);
const titlePage = ref("No data");

onMounted(() => {
     const { width, height } = useWindowSize();

     windowHeight.value = height.value;
});

// Layout providers
provide("titlePage", titlePage);
</script>

<template>
     <div class="h-full">
          <Navbar
               @expand-display="isFullWithContainer = !isFullWithContainer"
               :isFullWithContainer="isFullWithContainer"
          />

          <UContainer
               class=""
               :style="{ height: `${containerHeight}px` }"
               :ui="{
                    base: 'mx-auto',
                    padding: 'px-4 sm:px-6 lg:px-8',
                    constrained: isFullWithContainer ? '' : 'max-w-7xl',
               }"
          >
               <div>
                    <h1 class="my-4 text-orange-400 text-xl font-thin">
                         {{ titlePage }}
                    </h1>
               </div>
               <UDivider />

               <slot />
          </UContainer>
     </div>
</template>
