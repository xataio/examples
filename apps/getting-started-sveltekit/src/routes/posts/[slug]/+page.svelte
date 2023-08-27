<script lang="ts">
  import type { PageData } from './$types';
  
  export let data: PageData;
</script>

<svelte:head>
    <title>{data.post?.title}</title> 
</svelte:head>

<div class="w-full max-w-5xl mt-16">
  <p class="mb-2">
    <a href="/" class="text-purple-600">
      &larr; Back to blog
    </a>
  </p>
  <h1 class="text-3xl mb-2">{data.post?.title}</h1>
  <p class="text-sm mb-4 text-purple-950 dark:text-purple-200">{data.post?.pubDate?.toDateString()}</p>
  <p class="text-xl">{data.post?.description}</p>
</div>