import * as v from 'valibot';
import { query, form, command } from '$app/server';
import { childrenDb, type Comment } from './mock-db';

export const getChildrenList = query(async () => {
	return childrenDb.map((child) => ({
		id: child.id,
		name: child.name,
		kindness: child.kindness,
		processed: child.processed,
		wishCount: child.wishes.length
	}));
});

export const getChildDetails = query.batch(v.string(), async (ids: string[]) => {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 200));

	const lookup = new Map(
		childrenDb
			.filter((child) => ids.includes(child.id))
			.map((child) => [
				child.id,
				{
					wishes: child.wishes,
					comments: child.comments
				}
			])
	);

	return (id: string) => lookup.get(id);
});

export const addComment = form(
	v.object({
		childId: v.string(),
		commentText: v.pipe(v.string(), v.nonEmpty('Comment cannot be empty'))
	}),
	async ({ childId, commentText }) => {
		// Simulate network delay
		await new Promise((resolve) => setTimeout(resolve, 150));

		const child = childrenDb.find((c) => c.id === childId);
		if (!child) {
			throw new Error('Child not found');
		}

		const newComment: Comment = {
			id: `c${Date.now()}`,
			text: commentText,
			timestamp: new Date()
		};

		child.comments.push(newComment);

		await getChildDetails(childId).refresh();

		return { success: true };
	}
);

export const toggleProcessed = command(v.string(), async (childId: string) => {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 100));

	const child = childrenDb.find((c) => c.id === childId);
	if (!child) {
		throw new Error('Child not found');
	}

	child.processed = !child.processed;

	await getChildrenList().refresh();
});
