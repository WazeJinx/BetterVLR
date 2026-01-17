<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-darkBg text-black dark:text-darkText px-6 text-center"
  >
    <!-- Glow accent -->
    <!-- <div
      class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,189,167,0.15),transparent_60%)]"
    /> -->

    <!-- Content -->
    <div class="relative z-10 max-w-md">
      <h1 class="text-3xl md:text-4xl font-bold mb-2">Matches</h1>

      <p class="text-sm md:text-base text-gray-600 dark:text-darkSubText mb-6">
        Coming soon, powered by AI, because people love it.
      </p>

      <NuxtLink
        to="/"
        class="inline-flex items-center justify-center rounded-lg px-5 py-2.5 bg-primary text-gray-600 dark:text-darkSubText text-sm font-medium hover:opacity-90 transition"
      >
        Back to Dashboard
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: "Matches",
  layout: "default",
});
</script>
