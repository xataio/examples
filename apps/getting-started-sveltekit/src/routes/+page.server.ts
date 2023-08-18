import type { PageServerLoad } from './$types';

import { XataClient } from '../xata';

const xata = new XataClient({ apiKey: import.meta.env.VITE_XATA_API_KEY });

export const load: PageServerLoad = async ({ request }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('q');

  let posts = null;
  if (search) {
    posts = await xata.db.Posts.search(search, { fuzziness: 2 });
  } else {
    posts = await xata.db.Posts.getAll();
  }

  return {
    posts
  };
};
