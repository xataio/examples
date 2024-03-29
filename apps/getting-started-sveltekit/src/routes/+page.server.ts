import type { PageServerLoad } from './$types';

import { XataClient } from '../xata';

const xata = new XataClient({
  apiKey: import.meta.env.VITE_XATA_API_KEY,
  branch: import.meta.env.VITE_XATA_BRANCH
});

export const load: PageServerLoad = async ({ request }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('q');

  let posts = null;
  if (search) {
    const { records } = await xata.db.Posts.search(search, { fuzziness: 2 });
    posts = records;
  } else {
    posts = await xata.db.Posts.getAll();
  }

  return {
    posts,
    search
  };
};
