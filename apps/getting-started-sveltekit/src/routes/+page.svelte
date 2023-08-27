<script lang="ts">
  import type { PageData } from './$types';
  
  export let data: PageData;
</script>

<div class="w-full max-w-5xl mt-16">
  <form data-sveltekit-reload>
    <input
      name="q"
      placeholder="Search..."
      value={data.search}
      class="w-full rounded-lg border-2 p-2 dark:text-purple-950"
    />
  </form>
</div>

<div class="w-full max-w-5xl mt-16">
  {#if data.posts.length === 0}
    <p>No blog posts found</p>
  {/if}
  {#each data.posts as post}
    <div class="mb-16">
      <p class="text-xs mb-2 text-purple-950 dark:text-purple-200">
        {post.pubDate?.toDateString()}
      </p>
      <h2 class="text-2xl mb-2">
        <a href={`posts/${post.slug}`}>
          {post.title}
        </a>
      </h2>
      <p class="text-purple-950 dark:text-purple-200 mb-5">
        {post.description}
      </p>
      <a
        href={`posts/${post.slug}`}
        class="px-4 py-2 font-semibold text-sm bg-purple-700 text-white rounded-lg shadow-sm w-fit"
      >
        Read more &rarr;
      </a>
    </div>
    {/each}
</div>