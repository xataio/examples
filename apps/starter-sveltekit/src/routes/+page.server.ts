import type { Actions } from './$types';
import { invalid } from '@sveltejs/kit';
import { xata } from '$lib/xata';

export async function load() {
	const links = await xata.db.sveltekit_with_xata_example.getAll();
	return { links };
}

export const actions: Actions = {
	deleteRecord: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (typeof id !== 'string' || id === '') {
			return invalid(422, {
				id,
				missing: true
			});
		}
		await xata.db.sveltekit_with_xata_example.delete(id);

		return { success: true };
	},
	pushRecords: async () => {
		await xata.db.sveltekit_with_xata_example.create([
			{
				description: 'Everything you need to know about Xata APIs and tools.',
				title: 'Xata Docs',
				url: 'https://docs.xata.io'
			},
			{
				description: 'Learn how Svelte kit works and explore the official API docs.',
				title: 'Svelte Kit Docs',
				url: 'https://kit.svelte.dev/docs/introduction'
			},
			{
				description:
					'Maintain your flow by managing your Xata Workspace without ever leaving VS Code.',
				title: 'Xata VS Code Extension',
				url: 'https://marketplace.visualstudio.com/items?itemName=xata.xata'
			},
			{
				description: 'Get help. Offer help. Show us what you built!',
				title: 'Xata Discord',
				url: 'https://xata.io/discord'
			}
		]);

		return { success: true };
	}
};
