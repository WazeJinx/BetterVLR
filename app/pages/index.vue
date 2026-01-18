<template>
  <div
    class="min-h-screen flex flex-col bg-white dark:bg-darkBg text-black dark:text-darkText transition-colors duration-300 p-6"
  >
    <!-- Dashboard Header -->
    <!-- <div
      class="flex flex-col justify-center text-center items-center gap-4 mb-8 min-h-[50vh]"
    >
      <h1 class="text-5xl font-bold dark:text-darkText">BetterVLR</h1>
      <p class="text-gray-700 dark:text-darkSubText text-lg max-w-xl">
        VLR.gg but its BetterVLR.
      </p>
      <NuxtLink to="/">
        <UIButton variant="primary" size="lg">Get Started</UIButton>
      </NuxtLink>
    </div> -->
    <div class="pb-6">
      <UICarousel
        :slides="[
          {
            title: 'Welcome to BetterVLR',
            desc: 'Track news, matches, and results all in one place.',
            buttonText: 'Get Started',
            buttonLink: '/',
            position: 'center',
            bgStyle: 'linear-gradient(to right, #0A7AFF, #00BDA7)',
          },
          {
            title: 'Upcoming Matches',
            desc: 'Never miss a match again.',
            buttonText: 'See Matches',
            buttonLink: '/matches',
            position: 'bottom-left',
            bgStyle: 'linear-gradient(to right, #0A7AFF, #00BDA7)',
          },
        ]"
      />
    </div>

    <!-- Overview Cards -->
    <!-- <div v-if="false" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <UICard
        class="bg-[#F5F5F7] dark:bg-darkSurface flex flex-col justify-between transition-transform"
      >
        <div class="flex flex-col p-4 gap-2">
          <h2 class="text-xl font-semibold dark:text-darkText">News</h2>
          <p class="text-gray-700 dark:text-darkSubText">
            Catch up with latest pro-scene, game updates and more!
          </p>
        </div>
        <div class="flex flex-row justify-end p-4">
          <NuxtLink to="/news">
            <UIButton variant="primary" size="sm">View</UIButton>
          </NuxtLink>
        </div>
      </UICard>

      <UICard
        class="bg-[#F5F5F7] dark:bg-darkSurface flex flex-col justify-between transition-transform"
      >
        <div class="flex flex-col p-4 gap-2">
          <h2 class="text-xl font-semibold dark:text-darkText">Matches</h2>
          <p class="text-gray-700 dark:text-darkSubText">
            Keep track of events and matches happening in the professional
            scene.
          </p>
        </div>
        <div class="flex flex-row justify-end p-4">
          <NuxtLink to="/matches">
            <UIButton variant="primary" size="sm">View</UIButton>
          </NuxtLink>
        </div>
      </UICard>

      <UICard
        class="bg-[#F5F5F7] dark:bg-darkSurface flex flex-col justify-between transition-transform"
      >
        <div class="flex flex-col p-4 gap-2">
          <h2 class="text-xl font-semibold dark:text-darkText">Results</h2>
          <p class="text-gray-700 dark:text-darkSubText">
            Stay up to date with latest match results.
          </p>
        </div>
        <div class="flex flex-row justify-end p-4">
          <NuxtLink to="/results">
            <UIButton variant="primary" size="sm">View </UIButton>
          </NuxtLink>
        </div>
      </UICard>
    </div> -->

    <!-- Highlights / Recent Activity -->
    <ClientOnly>
      <GridLayout
        v-model:layout="state.layout"
        :col-num="state.colNum"
        :row-height="80"
        :margin="[10, 10]"
        :is-draggable="true"
        :is-resizable="true"
        :isBounded="true"
        :preventCollision="false"
        :responsive="false"
      >
        <GridItem
          v-bind="state.layout[0]"
          i="0"
          dragAllowFrom=".card-drag-handle"
        >
          <UICard
            class="bg-[#F5F5F7] dark:bg-darkSurface p-4 flex flex-col h-full"
          >
            <div class="flex items-center justify-start mb-3 gap-2">
              <UIIcon icon="mi:drag" class="card-drag-handle text-[20px]" />
              <h3 class="font-semibold text-lg dark:text-darkText">
                Latest Matches
              </h3>
            </div>

            <div v-show="matchesPending" class="text-sm text-gray-500">
              Loading matches...
            </div>

            <div v-show="matchesError" class="text-sm text-red-500">
              Failed to load matches
            </div>

            <div
              v-show="!matchesPending && !matchesError"
              class="flex-1 min-h-0 overflow-y-auto pr-1 hide-scrollbar"
            >
              <ul class="space-y-3">
                <li
                  v-for="match in upcomingMatches"
                  :key="match.id"
                  class="rounded-lg bg-white dark:bg-darkBg px-4 py-3 shadow-sm"
                >
                  <div class="flex items-center justify-between gap-3 mb-2">
                    <div class="flex items-center gap-3 min-w-0">
                      <img
                        :src="match.img"
                        alt="event"
                        class="w-8 h-8 rounded-md object-cover shrink-0"
                      />
                      <div class="min-w-0">
                        <p class="text-sm font-semibold truncate">
                          {{ match.event }}
                        </p>
                        <p class="text-xs text-gray-500 truncate">
                          {{ match.tournament }}
                        </p>
                      </div>
                    </div>

                    <span class="text-xs text-gray-500 whitespace-nowrap">
                      {{ match.in }}
                    </span>
                  </div>

                  <div
                    class="grid grid-cols-[1fr_auto_1fr] items-center py-3 gap-2 text-sm"
                  >
                    <div class="flex items-center justify-end gap-2 min-w-0">
                      <UIIcon
                        v-if="getFlagIcon(match.teams?.[0]?.country)"
                        :icon="getFlagIcon(match.teams?.[0]?.country)"
                        class="w-5 h-4 shrink-0"
                      />
                      <span class="truncate font-medium text-right">
                        {{ match.teams?.[0]?.name }}
                      </span>
                    </div>

                    <span
                      class="text-xs text-gray-400 font-semibold text-center"
                    >
                      vs
                    </span>

                    <div class="flex items-center justify-start gap-2 min-w-0">
                      <span class="truncate font-medium">
                        {{ match.teams?.[1]?.name }}
                      </span>
                      <UIIcon
                        v-if="getFlagIcon(match.teams?.[1]?.country)"
                        :icon="getFlagIcon(match.teams?.[1]?.country)"
                        class="w-5 h-4 shrink-0"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </UICard>
        </GridItem>
        <GridItem
          v-bind="state.layout[1]"
          i="1"
          dragAllowFrom=".card-drag-handle"
        >
          <UICard
            class="bg-[#F5F5F7] dark:bg-darkSurface p-4 flex flex-col h-full"
          >
            <div class="flex items-center justify-start mb-3 gap-2">
              <UIIcon icon="mi:drag" class="card-drag-handle text-[20px]" />
              <h3 class="font-semibold text-lg dark:text-darkText">
                Latest Results
              </h3>
            </div>

            <div v-if="pending" class="text-sm text-gray-500">
              Loading results...
            </div>

            <div v-else-if="error" class="text-sm text-red-500">
              Failed to load results
            </div>

            <div
              v-else
              class="flex-1 min-h-0 overflow-y-auto pr-1 hide-scrollbar"
            >
              <ul class="space-y-3">
                <li
                  v-for="match in topResults"
                  :key="match.id"
                  class="rounded-lg bg-white dark:bg-darkBg px-4 py-3 shadow-sm"
                >
                  <div
                    class="hidden md:grid grid-cols-[1fr_auto_1fr_auto] items-center gap-3"
                  >
                    <div class="flex items-center justify-end gap-2 min-w-0">
                      <UIIcon
                        v-if="getFlagIcon(match.teams?.[0]?.country)"
                        :icon="getFlagIcon(match.teams?.[0]?.country)"
                        class="w-5 h-4 shrink-0"
                      />
                      <span class="truncate text-sm font-medium text-right">
                        {{ match.teams?.[0]?.name }}
                      </span>
                    </div>

                    <div
                      class="min-w-[56px] text-center font-mono text-sm font-semibold text-gray-700 dark:text-darkText"
                    >
                      {{ match.teams?.[0]?.score ?? "-" }}
                      <span class="mx-1 text-gray-400">:</span>
                      {{ match.teams?.[1]?.score ?? "-" }}
                    </div>

                    <div class="flex items-center justify-start gap-2 min-w-0">
                      <span class="truncate text-sm font-medium">
                        {{ match.teams?.[1]?.name }}
                      </span>
                      <UIIcon
                        v-if="getFlagIcon(match.teams?.[1]?.country)"
                        :icon="getFlagIcon(match.teams?.[1]?.country)"
                        class="w-5 h-4 shrink-0"
                      />
                    </div>

                    <span
                      class="text-xs text-gray-500 whitespace-nowrap text-right min-w-[47px]"
                    >
                      {{ match.ago }}
                    </span>
                  </div>

                  <div class="md:hidden space-y-1">
                    <div class="flex items-center justify-between gap-2">
                      <div class="flex items-center gap-2 min-w-0">
                        <UIIcon
                          v-if="getFlagIcon(match.teams?.[0]?.country)"
                          :icon="getFlagIcon(match.teams?.[0]?.country)"
                          class="w-5 h-4 shrink-0"
                        />
                        <span class="truncate text-sm font-medium">
                          {{ match.teams?.[0]?.name }}
                        </span>
                      </div>

                      <div class="flex items-center gap-3">
                        <span class="font-mono text-sm font-semibold">
                          {{ match.teams?.[0]?.score ?? "-" }}
                        </span>
                        <span
                          class="text-xs text-gray-500 whitespace-nowrap min-w-[47px]"
                        >
                          {{ match.ago }}
                        </span>
                      </div>
                    </div>

                    <div class="flex items-center justify-between gap-2">
                      <div class="flex items-center gap-2 min-w-0">
                        <UIIcon
                          v-if="getFlagIcon(match.teams?.[1]?.country)"
                          :icon="getFlagIcon(match.teams?.[1]?.country)"
                          class="w-5 h-4 shrink-0"
                        />
                        <span class="truncate text-sm font-medium">
                          {{ match.teams?.[1]?.name }}
                        </span>
                      </div>

                      <div class="flex items-center gap-3">
                        <span class="font-mono text-sm font-semibold">
                          {{ match.teams?.[1]?.score ?? "-" }}
                        </span>
                        <span
                          class="text-xs text-gray-500 whitespace-nowrap min-w-[47px]"
                        >
                          {{ match.ago }}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </UICard>
        </GridItem>
        <GridItem
          v-bind="state.layout[2]"
          i="2"
          dragAllowFrom=".card-drag-handle"
        >
          <UICard
            class="bg-[#F5F5F7] dark:bg-darkSurface p-4 flex flex-col h-full"
          >
            <div class="flex items-center justify-start mb-3 gap-2">
              <UIIcon icon="mi:drag" class="card-drag-handle text-[20px]" />
              <h3 class="font-semibold text-lg dark:text-darkText">
                Latest News
              </h3>
            </div>

            <div v-if="newsPending" class="text-sm text-gray-500">
              Loading news...
            </div>

            <div v-else-if="newsError" class="text-sm text-red-500">
              Failed to load news
            </div>
            <div
              v-else
              class="flex-1 min-h-0 overflow-y-auto pr-1 hide-scrollbar"
            >
              <ul class="space-y-3">
                <li
                  v-for="news in latestNews"
                  :key="news.url_path"
                  class="group rounded-lg bg-white dark:bg-darkBg p-3 hover:shadow-md transition"
                >
                  <a
                    :href="news.url_path"
                    target="_blank"
                    rel="noopener"
                    class="block"
                  >
                    <h4
                      class="text-sm font-semibold leading-snug group-hover:text-primary transition"
                    >
                      {{ news.title }}
                    </h4>

                    <div
                      class="mt-1 flex items-center justify-between text-xs text-gray-500 dark:text-darkSubText"
                    >
                      <span>by {{ news.author }}</span>
                      <span>{{ news.date }}</span>
                    </div>

                    <p
                      v-if="news.description"
                      class="mt-4 text-xs text-gray-600 dark:text-darkSubText line-clamp-2"
                    >
                      {{ news.description }}
                    </p>
                  </a>
                </li>
              </ul>
            </div>
          </UICard>
        </GridItem>
      </GridLayout>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch, onMounted, onUnmounted } from "vue";
import { GridLayout, GridItem } from "vue-grid-layout-v3";

definePageMeta({
  title: "Dashboard",
  layout: "default",
});

const isMobile = ref(false);

const state = reactive({
  layout: [],
  colNum: 12,
});

const desktopLayout = [
  { i: "0", x: 0, y: 0, w: 4, h: 6 },
  { i: "1", x: 4, y: 0, w: 4, h: 6 },
  { i: "2", x: 8, y: 0, w: 4, h: 6 },
];

const mobileLayout = [
  { i: "0", x: 0, y: 0, w: 1, h: 6 },
  { i: "1", x: 0, y: 6, w: 1, h: 6 },
  { i: "2", x: 0, y: 12, w: 1, h: 6 },
];

function onLayoutUpdated(newLayout) {
  // Must replace content **in place**, not `layout = newLayout`
  state.layout.splice(0, state.layout.length, ...newLayout);
}

function move(i, newX, newY) {
  console.info(`MOVE i=${i}, X=${newX}, Y=${newY}`);
}

function resize(i, newH, newW, newHPx, newWPx) {
  console.info(
    `RESIZE i=${i}, H=${newH}, W=${newW}, H(px)=${newHPx}, W(px)=${newWPx}`,
  );
}

function moved(i, newX, newY) {
  console.info(`### MOVED i=${i}, X=${newX}, Y=${newY}`);
}

function resized(i, newH, newW, newHPx, newWPx) {
  console.info(
    `### RESIZED i=${i}, H=${newH}, W=${newW}, H(px)=${newHPx}, W(px)=${newWPx}`,
  );
}

function containerResized(i, newH, newW, newHPx, newWPx) {
  console.info(
    `### CONTAINER RESIZED i=${i}, H=${newH}, W=${newW}, H(px)=${newHPx}, W(px)=${newWPx}`,
  );
}

const page = ref(1);

/**
 * API Calls
 */

const getFlagIcon = (country) => {
  if (!country) return null;
  return `flag:${country}-4x3`;
};

const { data, pending, error, refresh } = await useFetch("/api/vlr/results", {
  query: { page: 1, limit: 11 },
});

const topResults = computed(() => {
  return data.value?.data?.slice(0, 11) ?? [];
});

const {
  data: newsData,
  pending: newsPending,
  error: newsError,
} = await useFetch("/api/vlr/news", { query: { limit: 5 } });

const latestNews = computed(() => {
  return newsData.value?.data?.segments?.slice(0, 5) ?? [];
});

const {
  data: matchesData,
  pending: matchesPending,
  error: matchesError,
} = await useFetch("/api/vlr/matches", { query: { page: 1, limit: 5 } });

const upcomingMatches = computed(() => {
  return matchesData.value?.data?.slice(0, 5) ?? [];
});

function checkMobile() {
  isMobile.value = window.innerWidth < 768;
}

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

watch(
  isMobile,
  (mobile) => {
    state.colNum = mobile ? 1 : 12;

    const nextLayout = mobile ? mobileLayout : desktopLayout;

    state.layout.splice(0, state.layout.length, ...nextLayout);
  },
  { immediate: true },
);
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none; /* IE & Edge */
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

:deep(.vue-grid-item.vue-grid-placeholder) {
  background: gray;
  border-radius: 10px;
}
/* :deep(.vue-resizable-handle) {
  background: none !important;
}

:deep(.vue-resizable-handle)::before {
  content: "⌟";
  font-size: 20px;
  color: #9ca3af;
  padding-bottom: 30px !important;
} */
</style>
