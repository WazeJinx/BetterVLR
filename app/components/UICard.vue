<template>
  <div
    class="border border-gray-200 dark:border-darkBorder"
    :class="[
      isGradient
        ? 'bg-[radial-gradient(76.25%_76.25%_at_50%_0%,rgba(142, 64, 0, 0.5)_0%,rgba(0,0,0,0)_100%)] rounded-lg'
        : 'bg-[#121212] rounded-lg',
      customClass,
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  isGradient: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped></style>
