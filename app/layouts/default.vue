<template>
  <div>
    <div
      v-if="!isCollapsed"
      class="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden"
      @click="isCollapsed = true"
    />

    <!-- iOS Install Instructions Modal -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showIOSInstructions"
        class="fixed left-0 top-0 w-screen h-[100dvh] z-50 flex items-end justify-center md:items-center bg-black/40 backdrop-blur-md pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
        @click="showIOSInstructions = false"
      >
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="translate-y-full md:translate-y-0 md:scale-95 md:opacity-0"
          enter-to-class="translate-y-0 md:scale-100 md:opacity-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="translate-y-0 md:scale-100 md:opacity-100"
          leave-to-class="translate-y-full md:translate-y-0 md:scale-95 md:opacity-0"
        >
          <div
            v-if="showIOSInstructions"
            class="bg-white dark:bg-darkSurface rounded-t-3xl md:rounded-2xl p-6 max-w-md w-full shadow-2xl mx-4 mb-0 md:mb-4"
            @click.stop
          >
            <div class="flex justify-between items-center mb-4">
              <div class="flex flex-row gap-4">
                <img
                  src="/favicon.ico"
                  alt="favicon"
                  class="w-6 h-6 rounded-sm"
                />

                <h3 class="text-lg font-semibold dark:text-darkText">
                  Install BetterVLR
                </h3>
              </div>

              <button
                @click="showIOSInstructions = false"
                class="p-2 hover:bg-gray-100 dark:hover:bg-darkBg rounded-lg transition"
              >
                <UIIcon
                  icon="material-symbols:close"
                  class="text-xl dark:text-darkText"
                />
              </button>
            </div>

            <div class="space-y-4 text-gray-700 dark:text-darkSubText">
              <p class="text-sm">To install this app on your iPhone:</p>
              <ol class="space-y-3 text-sm">
                <li class="flex gap-3">
                  <span class="font-semibold">1.</span>
                  <div class="flex-1">
                    <span class="inline-flex items-center gap-1 flex-wrap">
                      Tap the
                      <UIIcon
                        icon="material-symbols:ios-share"
                        class="text-lg px-1"
                      />
                      Share button
                    </span>
                  </div>
                </li>
                <li class="flex gap-3">
                  <span class="font-semibold">2.</span>
                  <div class="flex-1">
                    <span class="inline-flex items-center gap-1 flex-wrap">
                      Tap the
                      <UIIcon icon="bi:three-dots" class="text-lg px-1" />
                      more button
                    </span>
                  </div>
                </li>
                <li class="flex gap-3">
                  <span class="font-semibold">3.</span>
                  <div class="flex-1">
                    <span class="inline-flex items-center gap-1 flex-wrap">
                      Tap
                      <UIIcon
                        icon="material-symbols:add-box-outline"
                        class="text-lg px-1"
                      />
                      "Add to Home Screen"
                    </span>
                  </div>
                </li>
                <li class="flex gap-3">
                  <span class="font-semibold">4.</span>
                  <span>Tap "Add" in the top right corner</span>
                </li>
              </ol>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

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

      <div class="flex flex-row ml-auto gap-1">
        <!-- Install Button -->
        <button
          v-if="showInstallButton"
          @click="handleInstall"
          class="p-2 rounded-lg transition"
          title="Install App"
        >
          <UIIcon
            icon="material-symbols:download"
            class="text-gray-600 dark:text-darkText text-[20px]"
          />
        </button>

        <!-- Dark Mode Toggle -->
        <button
          @click="toggleDarkMode"
          class="p-2 justify-center items-center flex flex-col rounded-lg transition"
          title="Toggle Dark Mode"
        >
          <span
            class="inline-block transition-transform duration-500 ease-in-out"
            :style="{ transform: `rotate(${rotation}deg)` }"
          >
            <UIIcon
              :icon="themeIcon"
              class="text-gray-600 dark:text-darkText text-[20px]"
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
import { ref, computed, onMounted } from "vue";
import { useRoute } from "#app";

const showInstallButton = ref(false);
const showIOSInstructions = ref(false);
let deferredPrompt = null;

const route = useRoute();
const isDark = ref(false);
const rotation = ref(0);
const isCollapsed = ref(false);

const themeIcon = computed(() =>
  isDark.value ? "material-symbols:light-mode" : "material-symbols:dark-mode",
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
    : "opacity-100 translate-x-0",
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

const isIOS = () => {
  if (typeof window === "undefined") return false;
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};

const isInStandaloneMode = () => {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
};

const handleInstall = async () => {
  // For iOS devices, show instructions
  if (isIOS()) {
    showIOSInstructions.value = true;
    return;
  }

  // For other platforms, use the standard install prompt
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;

  if (outcome === "accepted") {
    showInstallButton.value = false;
  }

  deferredPrompt = null;
};

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  rotation.value += 180;

  document.documentElement.classList.toggle("dark", isDark.value);
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
};

onMounted(() => {
  // 🔥 SYNC INITIAL DARK MODE STATE
  const isDarkFromDom =
    document.documentElement.classList.contains("dark") ||
    localStorage.getItem("theme") === "dark";

  isDark.value = isDarkFromDom;
  rotation.value = isDarkFromDom ? 180 : 0;

  // Collapse sidebar on small screens
  if (window.innerWidth < 768) {
    isCollapsed.value = true;
  }

  // Install logic (unchanged)
  if (isInStandaloneMode()) {
    showInstallButton.value = false;
    return;
  }

  if (isIOS()) {
    showInstallButton.value = true;
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallButton.value = true;
  });

  window.addEventListener("appinstalled", () => {
    showInstallButton.value = false;
    deferredPrompt = null;
  });
});
</script>

<style scoped>
.UIIcon {
  transition: transform 0.5s ease-in-out;
}
</style>
