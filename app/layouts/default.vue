<template>
  <div>
    <div
      v-if="!isCollapsed"
      class="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden"
      @click="isCollapsed = true"
    />
    <header
      v-if="isCollapsed"
      class="fixed top-0 left-0 right-0 z-30 h-14 flex items-center gap-3 px-4 !bg-white/50 dark:!bg-darkSurface/70 backdrop-blur-xl rounded-b-2xl shadow-lg md:hidden"
    >
      <button
        @click="isCollapsed = false"
        class="p-2 rounded-lg hover:bg-black/5 transition"
      >
        <UIIcon
          icon="material-symbols:menu"
          custom-class="text-gray-600 dark:text-darkText text-2xl"
        />
      </button>

      <div class="flex items-center gap-4">
        <img src="/favicon.ico" alt="favicon" class="w-6 h-6 rounded-sm" />
        <span class="font-semibold dark:text-darkText text-lg">{{
          currentTitle
        }}</span>
      </div>
      <div class="flex flex-row ml-auto">
        <button
          @click="toggleDarkMode"
          class="flex w-fit items-center gap-3 p-2 rounded-xl transition-all"
          :class="[isCollapsed ? 'pl-3 pt-0 pb-0' : '']"
        >
          <span
            class="inline-block transition-transform duration-500 ease-in-out"
            :style="{ transform: `rotate(${rotation}deg)` }"
          >
            <UIIcon
              :icon="themeIcon"
              class="text-gray-600 dark:text-darkText text-[20px] w-9 h-9"
            />
          </span>
        </button>
      </div>
    </header>

    <aside
      :class="[
        'fixed top-0 left-0 z-40 h-screen flex flex-col border-r border-gray-200 shadow-sm transition-all duration-300 bg-[#F5F5F7] rounded-r-2xl',
        'dark:bg-darkBg dark:border-darkBorder',
        isCollapsed ? 'md:w-20' : 'md:w-64',
        isCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0',
        'w-64',
      ]"
    >
      <div class="p-4">
        <button
          @click="isCollapsed = !isCollapsed"
          :class="[
            'flex w-full items-center p-2 gap-3 rounded-xl  transition-all',
            isCollapsed
              ? 'pl-3 hover:bg-[#EAEAEE] dark:hover:bg-darkSurface'
              : '',
          ]"
        >
          <UIIcon
            icon="material-symbols:menu"
            custom-class="text-gray-600 dark:text-darkText dark:text-appleBlue text-2xl"
          />
          <div
            class="flex items-center gap-4 transition-all duration-200 ease-out"
            :class="textTransition"
          >
            <img src="/favicon.ico" alt="favicon" class="w-5 h-5 rounded-sm" />
            <span
              class="whitespace-nowrap dark:text-darkText !font-semibold text-xl"
            >
              BetterVLR
            </span>
          </div>
        </button>
      </div>

      <nav class="flex-1 px-3 space-y-1">
        <NuxtLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          :class="[
            'group flex items-center p-2 gap-3 rounded-xl transition-all hover:bg-[#EAEAEE] dark:hover:bg-darkSurface',
            isCollapsed ? 'pl-4' : '',
          ]"
          exact-active-class="bg-[#E8F0FF] dark:bg-darkSurface text-blue-600 dark:text-appleBlue"
          @click="onNavItemClick"
        >
          <UIIcon
            :icon="item.icon"
            class="text-gray-600 dark:text-darkText text-xl group-[.router-link-exact-active]:text-blue-600 dark:group-[.router-link-exact-active]:text-appleBlue"
          />
          <span
            class="whitespace-nowrap transition-all duration-200 ease-out delay-75 text-gray-900 dark:text-darkText"
            :class="textTransition"
          >
            {{ item.label }}
          </span>
        </NuxtLink>
      </nav>

      <div class="p-4 space-y-2">
        <!-- Dark Mode Toggle -->
        <button
          @click="toggleDarkMode"
          class="flex w-full items-center gap-3 p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-darkSurface transition-all"
          :class="[isCollapsed ? 'pl-1 pt-0 pb-0' : '']"
        >
          <span
            class="inline-block transition-transform duration-500 ease-in-out"
            :style="{ transform: `rotate(${rotation}deg)` }"
          >
            <UIIcon
              :icon="themeIcon"
              class="text-gray-600 dark:text-darkText text-[20px] w-9 h-9"
            />
          </span>
          <span
            class="text-gray-700 dark:text-darkText font-medium transition-all"
            :class="textTransition"
          >
            {{ isDark ? "Light Mode" : "Dark Mode" }}
          </span>
        </button>

        <!-- Profile -->
        <NuxtLink
          to="/profile"
          :class="[
            'flex items-center rounded-xl gap-3 hover:bg-[#EAEAEE] dark:hover:bg-darkSurface transition-all',
            isCollapsed ? 'pl-1 pb-2' : 'p-2',
          ]"
        >
          <img
            src="https://i.pravatar.cc/40"
            class="w-9 h-9 rounded-full flex-shrink-0 border border-gray-300 dark:border-darkBorder shadow-sm"
          />
          <span
            class="whitespace-nowrap text-gray-700 dark:text-darkText transition-all duration-200 ease-out delay-75"
            :class="textTransition"
          >
            Profile
          </span>
        </NuxtLink>
      </div>
    </aside>

    <main
      :class="[
        'transition-all duration-300 bg-white dark:bg-darkBg pt-14 md:pt-0',
        isCollapsed ? 'md:ml-20' : 'md:ml-64',
      ]"
    >
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "#app";

const route = useRoute();
const isDark = ref(false);
const rotation = ref(0);

const isCollapsed = ref(false);

const themeIcon = computed(() =>
  isDark.value ? "material-symbols:light-mode" : "material-symbols:dark-mode"
);

const navItems = [
  { label: "Dashboard", to: "/", icon: "material-symbols:home" },
  { label: "Matches", to: "/matches", icon: "material-symbols:sports-soccer" },
  { label: "News", to: "/news", icon: "material-symbols:article" },
  { label: "Results", to: "/results", icon: "material-symbols:bar-chart" },
];

const textTransition = computed(() =>
  isCollapsed.value
    ? "opacity-0 -translate-x-2 pointer-events-none"
    : "opacity-100 translate-x-0"
);

const pageTitles = {
  "/": "BetterVLR",
  "/matches": "Matches",
  "/news": "News",
  "/results": "Results",
};
const currentTitle = computed(() => pageTitles[route.path] || "Dashboard");

const onNavItemClick = () => {
  if (window.innerWidth < 768) {
    isCollapsed.value = true;
  }
};

const toggleDarkMode = () => {
  rotation.value += 180;
  isDark.value = !isDark.value;

  if (isDark.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

onMounted(() => {
  if (window.innerWidth < 768) {
    isCollapsed.value = true;
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    isDark.value = true;
    document.documentElement.classList.add("dark");
    rotation.value = 180;
  } else {
    isDark.value = false;
    document.documentElement.classList.remove("dark");
    rotation.value = 0;
  }
});
</script>

<style scoped>
.UIIcon {
  transition: transform 0.5s ease-in-out;
}
</style>
