import * as v from 'valibot';
import { query, form, command, prerender } from '$app/server';
import * as db from './mock-db';

export const getChildrenList = query(async () => {
	return db.getList();
});

export const getChildDetails = query.batch(v.string(), async (ids: string[]) => {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 200));

	const lookup = new Map(
		db
			.getAll()
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

		db.addComment(childId, commentText);

		await getChildDetails(childId).refresh();
	}
);

export const toggleProcessed = command(v.string(), async (childId: string) => {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 1100));

	db.toggleProcessed(childId);

	await getChildrenList().refresh();
});

export const getHolidayStats = prerender(() => {
	const allChildren = db.getAll();
	const totalChildren = allChildren.length;
	const averageKindness = Math.round(
		allChildren.reduce((sum, c) => sum + c.kindness, 0) / totalChildren
	);
	const totalWishes = allChildren.reduce((sum, c) => sum + c.wishes.length, 0);

	return {
		totalChildren,
		averageKindness,
		totalWishes
	};
});
