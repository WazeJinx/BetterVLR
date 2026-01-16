<template>
  <div
    class="flex flex-col min-h-screen bg-white text-black justify-center items-center"
  >
    <div class="py-6">
      <NuxtLink
        to="/"
        class="flex flex-row border rounded-lg bg-gray-300 min-w-[100px] hover:cursor-pointer text-center justify-center text-md font-medium py-2"
      >
        Click me
      </NuxtLink>
    </div>
    <span class="text-2xl font-bold">NuxtJs + Tailwind + Icon</span>
    <span class="text-md font-medium">- marwannsaz -</span>
  </div>
</template>
<script setup>
definePageMeta({
  title: "Homepage",
  layout: "default",
});
</script>

<style scoped></style>
