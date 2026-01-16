<template>
  <div
    class="flex flex-col bg-white min-h-screen text-black justify-center items-center"
  >
    <UIIcon
      icon="material-symbols:home"
      custom-class="text-gray-500 text-[90px]"
    />
    <span class="text-2xl font-bold">Matches</span>
    <div class="py-6">
      <NuxtLink
        to="/"
        class="flex flex-row border rounded-lg bg-gray-300 min-w-[100px] hover:cursor-pointer text-center justify-center text-md font-medium py-2"
      >
        Back
      </NuxtLink>
    </div>

    <span class="text-2xl font-bold">NuxtJs + Tailwind + Icon</span>
    <span class="text-md font-medium">- marwannsaz -</span>
  </div>
</template>
<script setup>
definePageMeta({
  title: "matches",
  layout: "default",
});
</script>

<style scoped></style>
