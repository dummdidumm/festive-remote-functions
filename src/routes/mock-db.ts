interface WishItem {
	id: string;
	name: string;
}

export interface Comment {
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

export const childrenDb: Child[] = [
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
