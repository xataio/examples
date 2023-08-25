<script setup lang="ts">
useHead({
  title: 'Get started with Xata and Nuxt'
});
</script>
<template>
  <main class="flex flex-wrap justify-center content-start p-8 lg:p-24 min-h-screen">
    <div class="z-10 h-50 w-full max-w-5xl items-center justify-between text-xl lg:flex">
      <p
        class="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto bg-gradient-to-b from-white via-white via-65% dark:from-black dark:via-black lg:bg-none"
      >
        <a href="/">Get started with Xata and Nuxt</a>
      </p>
      <div
        class="fixed bottom-0 left-0 flex w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none"
      >
        <a href="https://xata.io" class="w-20">
          <img src="https://raw.githubusercontent.com/xataio/examples/main/docs/app_logo.svg" />
        </a>
      </div>
    </div>
    <NuxtPage />
  </main>
</template>
