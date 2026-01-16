<template>
  <div
    class="min-h-screen bg-white dark:bg-darkBg transition-colors duration-300"
  >
    <VitePwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const isDark = ref(false);

if (process.client) {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") isDark.value = true;
  else if (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
    isDark.value = true;

  if (isDark.value) document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
}
</script>
