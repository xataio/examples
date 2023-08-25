<script setup lang="ts">
const route = useRoute();
const { data: post } = await useFetch(`/api/posts/${route.params.slug}`);

useHead({
  title: post?.title
});
</script>

<template>
  <div class="w-full max-w-5xl mt-16">
    <p className="mb-2">
      <a href="/" class="text-purple-600"> &larr; Back to blog </a>
    </p>
    <h1 class="text-3xl mb-2">{{ post?.title }}</h1>
    <p class="text-sm mb-4 text-purple-950 dark:text-purple-200">
      {{ new Date(post?.pubDate || '').toDateString() }}
    </p>
    <p class="text-xl">{{ post?.description }}</p>
  </div>
</template>
