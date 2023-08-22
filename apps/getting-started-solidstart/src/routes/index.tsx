import { useLocation } from '@solidjs/router';
import { Match, Switch, For } from 'solid-js';
import { useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';

import { XataClient } from '~/xata';

export function routeData() {
  return createServerData$(async () => {
    const xata = new XataClient({
      apiKey: import.meta.env.XATA_API_KEY,
      branch: import.meta.env.XATA_BRANCH
    });

    const location = useLocation();
    const search = location.query.q;

    let posts = null;
    if (search) {
      posts = await xata.db.Posts.search(search, { fuzziness: 2 });
    } else {
      posts = await xata.db.Posts.getAll();
    }
    return { posts, search };
  });
}

export default function Home() {
  const resource = useRouteData<typeof routeData>();
  const data = resource();
  const posts = data?.posts;
  const search = data?.search || '';

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
        <Switch>
          <Match when={!posts}>
            <p>No blog posts found</p>
          </Match>
          <Match when={posts && posts.length > 0}>
            <For each={posts}>
              {(post) => (
                <div class="mb-16">
                  <p class="text-xs mb-2 text-purple-950 dark:text-purple-200">
                    {post.pubDate?.toDateString()}
                  </p>
                  <h2 class="text-2xl mb-2">
                    <a href={`posts/${post.slug}`}>{post.title}</a>
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
              )}
            </For>
          </Match>
        </Switch>
      </div>
    </>
  );
}
