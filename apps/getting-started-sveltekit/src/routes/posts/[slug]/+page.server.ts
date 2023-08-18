import type { PageServerLoad } from './$types';

import { XataClient } from '../../../xata';

const xata = new XataClient({ apiKey: import.meta.env.VITE_XATA_API_KEY });

export const load: PageServerLoad = async ({ params }) => {
  const post = await xata.db.Posts.filter({ slug: params.slug }).getFirst();

  return {
    post
  };
};
