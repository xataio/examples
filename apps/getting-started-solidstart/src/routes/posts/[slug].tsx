export default function Post() {
  const post = {}

  return (
    <>
      <div class="w-full max-w-5xl mt-16">
        <p class="mb-2">
          <a href="/" class="text-purple-600">
            &larr; Back to blog
          </a>
        </p>

        <h1 class="text-3xl mb-2">{post?.title}</h1>
        <p class="text-sm mb-4 text-purple-950 dark:text-purple-200">
          {post?.pubDate?.toDateString()}
        </p>
        <p class="text-xl">{post?.description}</p>
      </div>
    </>
  )
}
