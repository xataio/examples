import { getXataClient } from '../../../src/xata';
const xata = getXataClient();

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  const post = await xata.db.Posts.filter({ slug }).getFirst();

  return post;
});
