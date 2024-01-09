import { MetaFunction, json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getXataClient } from 'src/xata';

export const meta: MetaFunction = () => {
  return [{ title: 'Xata and Remix' }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const xata = getXataClient();

  const url = new URL(request.url);
  const search = url.searchParams.get('q');

  let posts = null;
  if (search) {
    const { records } = await xata.db.Posts.search(search, { fuzziness: 2 });
    posts = records;
  } else {
    posts = await xata.db.Posts.getAll();
  }

  return json({
    posts,
    search
  });
}

export default function Index() {
  const { posts, search } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="w-full max-w-5xl mt-16">
        <form>
          <input
            name="q"
            defaultValue={search || ''}
            placeholder="Search..."
            className="w-full p-2 border-2 rounded-lg dark:text-purple-950"
          />
        </form>
      </div>

      <div className="w-full max-w-5xl mt-16">
        {posts.length === 0 && <p>No blog posts found</p>}
        {posts.map((post) => (
          <div key={post.id} className="mb-16">
            <p className="mb-2 text-xs text-purple-950 dark:text-purple-200">
              {new Date(post.pubDate || '').toDateString()}
            </p>
            <h2 className="mb-2 text-2xl">
              <a href={`posts/${post.slug}`}>{post.title}</a>
            </h2>
            <p className="mb-5 text-purple-950 dark:text-purple-200">{post.description}</p>
            <a
              href={`posts/${post.slug}`}
              className="px-4 py-2 text-sm font-semibold text-white bg-purple-700 rounded-lg shadow-sm w-fit"
            >
              Read more &rarr;
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
