import * as v from 'valibot';
import { query, form, command } from '$app/server';

interface WishItem {
	id: string;
	name: string;
}

interface Comment {
	id: string;
	text: string;
	timestamp: Date;
}

interface Child {
	id: string;
	name: string;
	kindness: number; // 0-100
	processed: boolean;
	wishes: WishItem[];
	comments: Comment[];
}

// Mock database
const childrenDb: Child[] = [
	{
		id: '1',
		name: 'Emma Thompson',
		kindness: 92,
		processed: false,
		wishes: [
			{ id: 'w1', name: 'Teddy Bear' },
			{ id: 'w2', name: 'LEGO Set' },
			{ id: 'w3', name: 'Art Supplies' }
		],
		comments: [{ id: 'c1', text: 'Always shares with friends!', timestamp: new Date('2025-11-20') }]
	},
	{
		id: '2',
		name: 'Oliver Smith',
		kindness: 78,
		processed: true,
		wishes: [
			{ id: 'w4', name: 'Video Game Console' },
			{ id: 'w5', name: 'Skateboard' }
		],
		comments: []
	},
	{
		id: '3',
		name: 'Sophia Garcia',
		kindness: 95,
		processed: false,
		wishes: [
			{ id: 'w6', name: 'Science Kit' },
			{ id: 'w7', name: 'Telescope' },
			{ id: 'w8', name: 'Book Collection' },
			{ id: 'w9', name: 'Puzzle Set' }
		],
		comments: [
			{ id: 'c2', text: 'Helped neighbors with groceries', timestamp: new Date('2025-11-15') },
			{ id: 'c3', text: 'Volunteers at animal shelter', timestamp: new Date('2025-11-22') }
		]
	},
	{
		id: '4',
		name: 'Liam Johnson',
		kindness: 65,
		processed: false,
		wishes: [{ id: 'w10', name: 'Remote Control Car' }],
		comments: [{ id: 'c4', text: 'Improving behavior lately', timestamp: new Date('2025-11-18') }]
	},
	{
		id: '5',
		name: 'Ava Williams',
		kindness: 88,
		processed: true,
		wishes: [
			{ id: 'w11', name: 'Dollhouse' },
			{ id: 'w12', name: 'Craft Kit' },
			{ id: 'w13', name: 'Bicycle' }
		],
		comments: []
	},
	{
		id: '6',
		name: 'Noah Brown',
		kindness: 45,
		processed: false,
		wishes: [
			{ id: 'w14', name: 'Robot Toy' },
			{ id: 'w15', name: 'Building Blocks' },
			{ id: 'w16', name: 'Train Set' },
			{ id: 'w17', name: 'Action Figures' },
			{ id: 'w18', name: 'Board Games' }
		],
		comments: [{ id: 'c5', text: 'Needs to work on sharing', timestamp: new Date('2025-11-10') }]
	}
];

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
