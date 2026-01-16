<template>
  <div>
    <div
      v-if="!isCollapsed"
      class="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden"
      @click="isCollapsed = true"
    />
    <!-- Mobile Header -->
    <header
      v-if="isCollapsed"
      class="fixed top-0 left-0 right-0 z-30 h-14 flex items-center gap-3 px-4 bg-white/70 backdrop-blur-xl border-b border-gray-200 md:hidden"
    >
      <button
        @click="isCollapsed = false"
        class="p-2 rounded-lg hover:bg-black/5 transition"
      >
        <UIIcon
          icon="material-symbols:menu"
          custom-class="text-blue-500 text-2xl"
        />
      </button>

      <span class="font-semibold text-gray-900 text-lg"> BetterVLR </span>
    </header>

    <aside
      :class="[
        'fixed top-0 left-0 z-40 h-screen flex flex-col bg-[#F5F5F7] border-r border-gray-200 shadow-sm transition-all duration-300',

        // Desktop width
        isCollapsed ? 'md:w-20' : 'md:w-64',

        // Mobile slide in/out
        isCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0',

        // Mobile full width
        'w-64',
      ]"
    >
      <div class="p-4">
        <button
          @click="isCollapsed = !isCollapsed"
          :class="[
            'flex w-full items-center p-2 gap-3 rounded-xl hover:bg-[#EAEAEE] transition-all',
            isCollapsed ? 'pl-3' : '',
          ]"
        >
          <UIIcon
            icon="material-symbols:menu"
            custom-class="text-blue-400 text-2xl"
          />

          <span
            class="whitespace-nowrap text-gray-900 !font-semibold text-xl transition-all duration-200 ease-out delay-75"
            :class="textTransition"
          >
            BetterVLR
          </span>
        </button>
      </div>

      <nav class="flex-1 px-3 space-y-1">
        <NuxtLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          :class="[
            'group flex items-center p-2 gap-3 rounded-xl transition-all hover:bg-[#EAEAEE]',
            isCollapsed ? 'pl-4' : '',
          ]"
          exact-active-class="bg-[#E8F0FF] text-blue-600"
        >
          <UIIcon
            :icon="item.icon"
            custom-class="text-blue-400 text-xl group-[.router-link-exact-active]:text-blue-600"
          />

          <span
            class="whitespace-nowrap transition-all duration-200 ease-out delay-75"
            :class="textTransition"
          >
            {{ item.label }}
          </span>
        </NuxtLink>
      </nav>

      <div class="p-4 space-y-2">
        <NuxtLink
          to="/profile"
          :class="[
            'flex items-center rounded-xl gap-3 hover:bg-[#EAEAEE] transition-all',
            isCollapsed ? 'pl-1 pb-2' : ' p-2',
          ]"
        >
          <img
            src="https://i.pravatar.cc/40"
            class="w-9 h-9 rounded-full flex-shrink-0 border border-gray-300 shadow-sm"
          />

          <span
            class="whitespace-nowrap text-gray-700 transition-all duration-200 ease-out delay-75"
            :class="textTransition"
          >
            Profile
          </span>
        </NuxtLink>
      </div>
    </aside>

    <main
      :class="[
        'transition-all duration-300 pt-14 md:pt-0',
        isCollapsed ? 'md:ml-20' : 'md:ml-64',
      ]"
    >
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const isCollapsed = ref(false);

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
</script>
