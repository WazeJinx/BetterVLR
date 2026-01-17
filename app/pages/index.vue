<template>
  <div
    class="h-screen flex flex-col bg-white dark:bg-darkBg text-black dark:text-darkText transition-colors duration-300 p-6"
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
    <div v-if="false" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- News Card -->
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

      <!-- Matches Card -->
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

      <!-- Results Card -->
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
    </div>

    <!-- Highlights / Recent Activity -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0">
      <UICard
        class="bg-[#F5F5F7] dark:bg-darkSurface p-4 flex flex-col h-full min-h-0"
      >
        <div class="flex items-center justify-between mb-3">
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

        <div v-else class="flex-1 min-h-0 overflow-y-auto pr-1 hide-scrollbar">
          <ul class="space-y-3">
            <li
              v-for="match in topResults"
              :key="match.id"
              class="rounded-lg bg-white dark:bg-darkBg px-4 py-3 shadow-sm"
            >
              <!-- DESKTOP -->
              <div
                class="hidden md:grid grid-cols-[1fr_auto_1fr_auto] items-center gap-3"
              >
                <!-- Team A (text end, flag after) -->
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

                <!-- Score -->
                <div
                  class="min-w-[56px] text-center font-mono text-sm font-semibold text-gray-700 dark:text-darkText"
                >
                  {{ match.teams?.[0]?.score ?? "-" }}
                  <span class="mx-1 text-gray-400">:</span>
                  {{ match.teams?.[1]?.score ?? "-" }}
                </div>

                <!-- Team B (text start, flag at end) -->
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

                <!-- Time -->
                <span
                  class="text-xs text-gray-500 whitespace-nowrap text-right min-w-[47px]"
                >
                  {{ match.ago }}
                </span>
              </div>

              <!-- MOBILE -->
              <div class="md:hidden space-y-1">
                <!-- Team A row -->
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

                <!-- Team B row -->
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

      <UICard
        class="bg-[#F5F5F7] dark:bg-darkSurface p-4 flex flex-col h-full min-h-0"
      >
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold text-lg dark:text-darkText">Latest News</h3>
          <!-- <NuxtLink to="/news" class="text-xs text-primary hover:underline">
            View all
          </NuxtLink> -->
        </div>

        <div v-if="newsPending" class="text-sm text-gray-500">
          Loading news...
        </div>

        <div v-else-if="newsError" class="text-sm text-red-500">
          Failed to load news
        </div>
        <div v-else class="flex-1 min-h-0 overflow-y-auto pr-1 hide-scrollbar">
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
                <!-- Title -->
                <h4
                  class="text-sm font-semibold leading-snug group-hover:text-primary transition"
                >
                  {{ news.title }}
                </h4>

                <!-- Meta -->
                <div
                  class="mt-1 flex items-center justify-between text-xs text-gray-500 dark:text-darkSubText"
                >
                  <span>by {{ news.author }}</span>
                  <span>{{ news.date }}</span>
                </div>

                <!-- Description -->
                <p
                  v-if="news.description"
                  class="mt-1 text-xs text-gray-600 dark:text-darkSubText line-clamp-2"
                >
                  {{ news.description }}
                </p>
              </a>
            </li>
          </ul>
        </div>
      </UICard>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

definePageMeta({
  title: "Dashboard",
  layout: "default",
});

const page = ref(1);

/**
 * API Calls
 */

const getFlagIcon = (country) => {
  if (!country) return null;
  return `flag:${country}-4x3`;
};

const { data, pending, error, refresh } = await useFetch("/api/vlr/results", {
  query: { page },
});

const topResults = computed(() => {
  return data.value?.data?.slice(0, 5) ?? [];
});

const {
  data: newsData,
  pending: newsPending,
  error: newsError,
} = await useFetch("/api/vlr/news");

const latestNews = computed(() => {
  return newsData.value?.data?.segments?.slice(0, 4) ?? [];
});
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none; /* IE & Edge */
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
</style>
