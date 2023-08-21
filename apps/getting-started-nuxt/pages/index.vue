<script setup lang="ts">
const route = useRoute();
const search = route.query.q;
const { data } = await useFetch(`/api/posts`, { query: { q: search } });
</script>

<template>
  <div class="w-full max-w-5xl mt-16">
    <form>
      <input name="q" v-model="search" placeholder="Search..." class="w-full rounded-lg p-2 dark:text-purple-950" />
    </form>
  </div>

  <div class="w-full max-w-5xl mt-16">
    <p v-if="data && data.length === 0">No blog posts found</p>
    <div v-for="post in data" class="mb-16">
      <p class="text-xs mb-2 text-purple-950 dark:text-purple-200">
        {{ new Date(post.pubDate || '').toDateString() }}
      </p>
      <h2 class="text-2xl mb-2">
        <a :href="`/posts/${post.slug}`">{{ post.title }}</a>
      </h2>
      <p class="text-purple-950 dark:text-purple-200 mb-5">{{ post.description }}</p>
      <a
        :href="`/posts/${post.slug}`"
        class="px-4 py-2 font-semibold text-sm bg-purple-700 text-white rounded-lg shadow-sm w-fit"
      >
        Read more &rarr;
      </a>
    </div>
  </div>
</template>
