import type { APIRoute } from "astro";
import { xata } from "../lib/xata";

export const post: APIRoute = async () => {
  await xata.db.astro_with_xata_example.create([
    {
      description: "Everything you need to know about Xata APIs and tools.",
      title: "Xata Docs",
      url: "https://docs.xata.io",
    },
    {
      description: "Learn how Astro works and explore the official API docs.",
      title: "Astro Docs",
      url: "https://docs.astro.build/",
    },
    {
      description:
        "Maintain your flow by managing your Xata Workspace without ever leaving VS Code.",
      title: "Xata VS Code Extension",
      url: "https://marketplace.visualstudio.com/items?itemName=xata.xata",
    },
    {
      description: "Get help. Offer help. Show us what you built!",
      title: "Xata Discord",
      url: "https://xata.io/discord",
    },
  ]);

  return new Response(null, {
    status: 200,
  });
};
