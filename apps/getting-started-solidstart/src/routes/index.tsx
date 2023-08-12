export default function Home() {
  const search = ''
  const posts = []

  return (
    <>
      <div class="w-full max-w-5xl mt-16">
        <form action="/">
          <input
            name="q"
            value={search}
            placeholder="Search..."
            class="w-full rounded-lg border-2 p-2 dark:text-purple-950"
          />
        </form>
      </div>

      <div class="w-full max-w-5xl mt-16">
        {posts.length === 0 && <p>No blog posts found</p>}
        {posts.map((posts) => (
          <div class="mb-16">
            <p class="text-xs mb-2 text-purple-950 dark:text-purple-200">
              {posts.pubDate?.toDateString()}
            </p>
            <h2 class="text-2xl mb-2">
              <a href={`posts/${posts.slug}`}>{posts.title}</a>
            </h2>
            <p class="text-purple-950 dark:text-purple-200 mb-5">
              {posts.description}
            </p>
            <a
              href={`posts/${posts.slug}`}
              class="px-4 py-2 font-semibold text-sm bg-purple-700 text-white rounded-lg shadow-sm w-fit"
            >
              Read more &rarr;
            </a>
          </div>
        ))}
      </div>
    </>
  )
}
