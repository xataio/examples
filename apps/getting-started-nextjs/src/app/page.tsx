import { getXataClient } from '@/xata';

const xata = getXataClient();

export default async function Home({ searchParams }: { searchParams: { q: string } }) {
  let posts = null;
  if (searchParams.q) {
    posts = await xata.db.Posts.search(searchParams.q, { fuzziness: 2 });
  } else {
    posts = await xata.db.Posts.getAll();
  }

  return (
    <main className="flex flex-wrap justify-center content-start p-8 lg:p-24 min-h-screen">
      <div className="z-10 h-50 w-full max-w-5xl items-center justify-between text-xl lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto bg-gradient-to-b from-white via-white via-65% dark:from-black dark:via-black lg:bg-none">
          <a href="/">Get started with Xata and Next.js</a>
        </p>
        <div className="fixed bottom-0 left-0 flex w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a href="https://xata.io" className="w-20">
            <img src="https://raw.githubusercontent.com/leggetter/xata-examples/5b0715c9ba36556400b6121bd224203cb89f7741/docs/app_logo.svg" />
          </a>
        </div>
      </div>

      <div className="w-full max-w-5xl mt-16">
        <form>
          <input
            name="q"
            defaultValue={searchParams.q}
            placeholder="Search..."
            className="w-full rounded-lg border-2 p-2 dark:text-purple-950"
          />
        </form>
      </div>

      <div className="w-full max-w-5xl mt-16">
        {posts.length === 0 && <p>No blog posts found</p>}
        {posts.map((post) => (
          <div key={post.id} className="mb-16">
            <p className="text-xs mb-2 text-purple-950 dark:text-purple-200">{post.pubDate?.toDateString()}</p>
            <h2 className="text-2xl mb-2">
              <a href={`posts/${post.slug}`}>{post.title}</a>
            </h2>
            <p className="text-purple-950 dark:text-purple-200 mb-5">{post.description}</p>
            <a
              href={`posts/${post.slug}`}
              className="px-4 py-2 font-semibold text-sm bg-purple-700 text-white rounded-lg shadow-sm w-fit"
            >
              Read more &rarr;
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
