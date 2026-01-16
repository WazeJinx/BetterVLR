<template>
  <div
    class="min-h-screen bg-white dark:bg-darkBg text-black dark:text-darkText transition-colors duration-300 p-6"
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
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UICard class="bg-[#F5F5F7] dark:bg-darkSurface p-4">
        <h3 class="font-semibold text-lg dark:text-darkText mb-2">
          Top Matches
        </h3>
        <ul
          class="text-gray-700 dark:text-darkSubText list-disc pl-5 space-y-1"
        >
          <li>Team A vs Team B - 2:1</li>
          <li>Team C vs Team D - 0:2</li>
          <li>Team E vs Team F - 3:3</li>
        </ul>
      </UICard>

      <UICard class="bg-[#F5F5F7] dark:bg-darkSurface p-4">
        <h3 class="font-semibold text-lg dark:text-darkText mb-2">
          Latest News
        </h3>
        <ul
          class="text-gray-700 dark:text-darkSubText list-disc pl-5 space-y-1"
        >
          <li>Roster changes announced for Team X.</li>
          <li>Upcoming tournament schedule released.</li>
          <li>New patch affects map strategies.</li>
        </ul>
      </UICard>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: "Dashboard",
  layout: "default",
});
</script>

<style scoped></style>
