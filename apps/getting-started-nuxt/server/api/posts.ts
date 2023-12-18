import { getXataClient } from '../../src/xata';
const xata = getXataClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const search = query.q as string;

  let posts = null;
  if (search) {
    const { records } = await xata.db.Posts.search(search, { fuzziness: 2 });
    posts = records;
  } else {
    posts = await xata.db.Posts.getAll();
  }

  return posts;
});
