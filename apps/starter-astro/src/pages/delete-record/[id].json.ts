import type { APIRoute } from "astro";
import { xata } from "../../lib/xata";

export const del: APIRoute = async ({ params }) => {
  const id = params.id;

  if (typeof id !== "string")
    return new Response(
      JSON.stringify({
        message: "`id` must be a string",
      }),
      {
        status: 422,
      }
    );

  await xata.db.astro_with_xata_example.delete(id);

  return new Response(null, {
    status: 200,
  });
};
