/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { XataClient } from './xata';

export interface Env {
	XATA_BRANCH: string;
	XATA_API_KEY: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const xata = new XataClient({
			apiKey: env.XATA_API_KEY,
			branch: env.XATA_BRANCH,
		});
		// Note that the table name "Posts" may vary
		// depending on the shape of your schema
		const posts = await xata.db.Posts.getAll()
		return new Response(`Total Posts: ${posts.length}`);
	},
};
