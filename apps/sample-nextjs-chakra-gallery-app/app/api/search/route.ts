import { getXataClient } from '~/utils/xata';

export const config = {
  runtime: 'edge',
  regions: ['iad1']
};

const xata = getXataClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get('q') ?? '';

  const results = await xata.search.all(searchQuery, {
    tables: [
      {
        table: 'tag',
        target: [{ column: 'name' }]
      },
      {
        table: 'image',
        target: [{ column: 'name' }]
      }
    ],
    fuzziness: 1,
    prefix: 'phrase'
  });

  return new Response(JSON.stringify(results), {
    headers: { 'Cache-Control': 'max-age=1, stale-while-revalidate=300' }
  });
}
