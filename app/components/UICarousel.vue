<template>
  <div
    class="relative w-full overflow-hidden rounded-xl carousel-container"
    :class="bgClass"
  >
    <div
      class="flex transition-transform duration-1000 ease-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="w-full flex-shrink-0 relative h-80 md:h-[500px]"
      >
        <div
          class="absolute inset-0 w-full h-full bg-cover bg-center"
          :style="{ background: slide.bgStyle }"
        ></div>

        <div
          class="absolute inset-0 flex flex-col gap-4"
          :class="getContentPosition(slide.position)"
        >
          <h2
            v-if="slide.title"
            class="text-3xl md:text-5xl font-bold text-white drop-shadow-md"
          >
            {{ slide.title }}
          </h2>
          <p
            v-if="slide.desc"
            class="text-lg md:text-xl text-white drop-shadow-md max-w-xl"
          >
            {{ slide.desc }}
          </p>
          <div v-if="slide.buttonText && slide.buttonLink">
            <NuxtLink :to="slide.buttonLink">
              <UIButton variant="primary" size="md">{{
                slide.buttonText
              }}</UIButton>
            </NuxtLink>
          </div>
          <slot name="overlay" :slide="slide"></slot>
        </div>
      </div>
    </div>

    <!-- Navigation Arrows (hidden on mobile) -->
    <button
      v-if="!isMobile"
      @click="prev"
      class="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition"
    >
      <UIIcon icon="material-symbols:arrow-back-ios-new" class="w-6 h-6" />
    </button>
    <button
      v-if="!isMobile"
      @click="next"
      class="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition"
    >
      <UIIcon icon="material-symbols:arrow-forward-ios" class="w-6 h-6" />
    </button>

    <!-- Dots Navigation -->
    <div
      class="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2"
    >
      <span
        v-for="(slide, idx) in slides"
        :key="idx"
        @click="goTo(idx)"
        :class="[
          'w-3 h-3 rounded-full cursor-pointer transition',
          idx === currentIndex
            ? 'bg-white dark:bg-appleBlue'
            : 'bg-white/50 dark:bg-appleBlue/50',
        ]"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  slides: { type: Array, required: true, default: () => [] },
  bgClass: { type: String, default: "bg-gray-300 dark:bg-darkSurface" },
  autoPlayInterval: { type: Number, default: 5000 },
});

const currentIndex = ref(0);

let interval = null;

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.slides.length;
};
const prev = () => {
  currentIndex.value =
    (currentIndex.value - 1 + props.slides.length) % props.slides.length;
};
const goTo = (index) => (currentIndex.value = index);

const getContentPosition = (position) => {
  switch (position) {
    case "top-left":
      return "justify-start items-start p-6";
    case "top-right":
      return "justify-start items-end p-6";
    case "bottom-left":
      return "justify-end items-start p-6";
    case "bottom-right":
      return "justify-end items-end p-6";
    default:
      return "justify-center items-center text-center p-6";
  }
};

// --- Mobile detection ---
const isMobile = ref(false);
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

let touchStartX = 0;
const onTouchStart = (e) => {
  touchStartX = e.changedTouches[0].clientX;
};
const onTouchEnd = (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) next();
    else prev();
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);

  interval = setInterval(() => next(), props.autoPlayInterval);

  // Attach passive touch events to the carousel container
  const carouselEl = document.querySelector(".carousel-container");
  if (carouselEl) {
    carouselEl.addEventListener("touchstart", onTouchStart, { passive: true });
    carouselEl.addEventListener("touchend", onTouchEnd, { passive: true });
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
  clearInterval(interval);

  const carouselEl = document.querySelector(".carousel-container");
  if (carouselEl) {
    carouselEl.removeEventListener("touchstart", onTouchStart);
    carouselEl.removeEventListener("touchend", onTouchEnd);
  }
});
</script>
