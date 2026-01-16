<template>
  <button
    :disabled="isDisabled || isLoading"
    @click="$emit('click')"
    class="relative flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus:outline-none select-none"
    :class="[
      sizeClasses,
      variantClasses,
      customClass,
      { 'opacity-60 cursor-not-allowed': isDisabled || isLoading },
    ]"
  >
    <!-- Loading Spinner -->
    <div
      v-if="isLoading"
      class="absolute inset-0 flex items-center justify-center"
    >
      <UIIcon
        icon="svg-spinners:blocks-shuffle-3"
        class="text-lg text-gray-400 dark:text-darkSubText"
      />
    </div>

    <!-- Button Content -->
    <div
      :class="{ 'opacity-0': isLoading, 'opacity-100': !isLoading }"
      class="flex items-center gap-2 transition-opacity duration-200"
    >
      <template v-if="variant === 'icon' && icon">
        <UIIcon :icon="icon" :class="iconSizeClasses" />
      </template>
      <template v-else>
        <slot name="icon-left"></slot>
        <span class="truncate"><slot>Button</slot></span>
        <slot name="icon-right"></slot>
      </template>
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "primary", // "primary" | "secondary" | "outline" | "icon" | "text"
  },
  size: {
    type: String,
    default: "md", // "sm" | "md" | "lg"
  },
  isDisabled: Boolean,
  isLoading: Boolean,
  icon: String,
  customClass: {
    type: String,
    default: "",
  },
});

// Apple-style variants
const variantClasses = computed(() => {
  switch (props.variant) {
    case "secondary":
      return `
        bg-gray-50 dark:bg-darkSurface 
        text-gray-900 dark:text-darkText 
        hover:bg-gray-100 dark:hover:bg-[#3A3A3C]
        border border-transparent
      `;
    case "text":
      return `
        bg-transparent 
        text-appleBlue dark:text-appleBlue 
        hover:underline
      `;
    case "outline":
      return `
        border border-gray-300 dark:border-darkBorder 
        text-gray-900 dark:text-darkText 
        hover:bg-gray-50 dark:hover:bg-[#2C2C2E]
      `;
    case "icon":
      return `
        bg-gray-100 dark:bg-darkSurface 
        hover:bg-gray-200 dark:hover:bg-[#3A3A3C] 
        text-gray-900 dark:text-darkText 
        p-2 rounded-full
      `;
    default: // primary
      return `
        bg-appleBlue text-white 
        hover:bg-[#0A7AFF] dark:bg-appleBlue dark:hover:bg-[#0A7AFF] 
      `;
  }
});

// Apple rounded sizes
const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "px-3 py-1 text-sm";
    case "lg":
      return "px-6 py-2 text-lg";
    default:
      return "px-4 py-2 text-md";
  }
});

const iconSizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "w-4 h-4";
    case "lg":
      return "w-6 h-6";
    default:
      return "w-5 h-5";
  }
});
</script>

<style scoped>
button {
  backdrop-filter: blur(4px); /* subtle macOS blur effect */
}
button:active {
  transform: scale(0.98);
}
</style>
