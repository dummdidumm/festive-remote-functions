<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';
	import { getChildrenList, toggleProcessed } from './data.remote';
	import ChildDetails from './ChildDetails.svelte';

	const expandedIds = new SvelteSet<string>();

	function toggleExpand(id: string) {
		if (expandedIds.has(id)) {
			expandedIds.delete(id);
		} else {
			expandedIds.add(id);
		}
	}

	function toggleExpandAll() {
		if (expandedIds.size > 0) {
			expandedIds.clear();
		} else {
			for (const child of list) {
				expandedIds.add(child.id);
			}
		}
	}

	async function handleToggleProcessed(e: Event, childId: string) {
		e.stopPropagation();
		await toggleProcessed(childId);
	}

	function getKindnessColor(kindness: number): string {
		if (kindness >= 80) return '#22c55e';
		if (kindness >= 60) return '#84cc16';
		if (kindness >= 40) return '#eab308';
		return '#ef4444';
	}

	const list = $derived(await getChildrenList());
</script>

<svelte:head>
	<title>🎅 Santa's Dashboard</title>
</svelte:head>

<div class="dashboard">
	<header class="header">
		<h1>🎅 Santa's Workshop Dashboard</h1>
		<p class="subtitle">Managing children's wish lists</p>
	</header>

	<div class="wish-list-container">
		<div class="list-header">
			<div class="header-checkbox-cell"></div>
			<div class="header-name-cell">Name</div>
			<div class="header-kindness-cell">Kindness Level</div>
			<div class="header-wishes-cell">Wishes</div>
			<button class="expand-all-btn" onclick={toggleExpandAll}>
				{expandedIds.size > 0 ? 'Collapse All ▲' : 'Expand All ▼'}
			</button>
		</div>
		{#each list as child}
			<div class="child-row" class:expanded={expandedIds.has(child.id)}>
				<button class="child-header" onclick={() => toggleExpand(child.id)}>
					<div
						class="checkbox-cell"
						onclick={(e) => e.stopPropagation()}
						onkeydown={(e) => e.stopPropagation()}
						role="presentation"
					>
						<label class="checkbox-wrapper">
							<input
								type="checkbox"
								checked={child.processed}
								onchange={(e) => handleToggleProcessed(e, child.id)}
							/>
							<span class="checkmark"></span>
						</label>
					</div>

					<div class="name-cell">
						<span class="child-name" class:processed={child.processed}>{child.name}</span>
					</div>

					<div class="kindness-cell">
						<div class="kindness-bar-container">
							<div
								class="kindness-bar"
								style="width: {child.kindness}%; background-color: {getKindnessColor(
									child.kindness
								)};"
							></div>
							<span class="kindness-label">{child.kindness}%</span>
						</div>
					</div>

					<div class="wishes-count-cell">
						<span class="wishes-badge">🎁 {child.wishCount}</span>
					</div>

					<div class="expand-icon">
						{expandedIds.has(child.id) ? '▲' : '▼'}
					</div>
				</button>

				{#if expandedIds.has(child.id)}
					<ChildDetails childId={child.id} />
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	:global(html) {
		scrollbar-gutter: stable;
	}

	:global(body) {
		margin: 0;
		font-family: 'Comic Sans MS', 'Chalkboard', 'Comic Neue', cursive, sans-serif;
		background: linear-gradient(135deg, #0d3d0d 0%, #1a5c1a 50%, #0d3d0d 100%);
		min-height: 100vh;
	}

	.dashboard {
		max-width: 1000px;
		margin: 0 auto;
		padding: 2rem;
	}

	.header {
		text-align: center;
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: linear-gradient(145deg, #2d8a2d, #1e6b1e);
		border-radius: 20px;
		border: 4px solid #ffd700;
		box-shadow:
			0 8px 32px rgba(0, 0, 0, 0.3),
			inset 0 2px 10px rgba(255, 255, 255, 0.1);
	}

	.header h1 {
		margin: 0;
		font-size: 2.5rem;
		color: #fff;
		text-shadow:
			3px 3px 0 #1a4d1a,
			-1px -1px 0 #3d9e3d;
		letter-spacing: 2px;
	}

	.subtitle {
		margin: 0.5rem 0 0;
		color: #b8e6b8;
		font-size: 1.1rem;
	}

	.wish-list-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.list-header {
		display: flex;
		align-items: center;
		padding: 0.8rem 1.5rem;
		background: linear-gradient(145deg, #1e6b1e, #145214);
		border-radius: 12px;
		border: 3px solid #ffd700;
		gap: 1rem;
		font-weight: bold;
		color: #fff;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
	}

	.header-checkbox-cell {
		flex-shrink: 0;
		width: 28px;
	}

	.header-name-cell {
		flex: 1;
		min-width: 150px;
		font-size: 1rem;
	}

	.header-kindness-cell {
		flex: 1;
		max-width: 200px;
		font-size: 1rem;
		text-align: center;
	}

	.header-wishes-cell {
		flex-shrink: 0;
		font-size: 1rem;
		width: 80px;
		text-align: center;
	}

	.expand-all-btn {
		flex-shrink: 0;
		padding: 0.5rem 1rem;
		background: linear-gradient(145deg, #ffd700, #daa520);
		color: #1a4d1a;
		border: 2px solid #fff;
		border-radius: 8px;
		font-family: inherit;
		font-size: 0.85rem;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.expand-all-btn:hover {
		background: linear-gradient(145deg, #ffe44d, #e6b800);
		box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
	}

	.expand-all-btn:active {
		transform: translateY(0);
	}

	.child-row {
		background: linear-gradient(145deg, #f0fff0, #d4ecd4);
		border-radius: 16px;
		border: 3px solid #228b22;
		box-shadow:
			0 4px 15px rgba(0, 0, 0, 0.2),
			inset 0 2px 5px rgba(255, 255, 255, 0.5);
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.child-row:hover {
		box-shadow:
			0 6px 20px rgba(0, 0, 0, 0.25),
			inset 0 2px 5px rgba(255, 255, 255, 0.5);
	}

	.child-row.expanded {
		border-color: #ffd700;
		box-shadow:
			0 8px 30px rgba(255, 215, 0, 0.3),
			inset 0 2px 5px rgba(255, 255, 255, 0.5);
	}

	.child-header {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 1rem 1.5rem;
		border: none;
		background: transparent;
		cursor: pointer;
		font-family: inherit;
		text-align: left;
		gap: 1rem;
	}

	.checkbox-cell {
		flex-shrink: 0;
	}

	.checkbox-wrapper {
		display: inline-block;
		position: relative;
		cursor: pointer;
	}

	.checkbox-wrapper input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	.checkmark {
		display: inline-block;
		height: 28px;
		width: 28px;
		background: #fff;
		border: 3px solid #228b22;
		border-radius: 6px;
		transition: all 0.2s ease;
	}

	.checkbox-wrapper:hover .checkmark {
		background: #e8f5e8;
	}

	.checkbox-wrapper input:checked ~ .checkmark {
		background: #228b22;
		border-color: #1a6b1a;
	}

	.checkbox-wrapper input:checked ~ .checkmark::after {
		content: '✓';
		display: block;
		text-align: center;
		color: #fff;
		font-size: 18px;
		font-weight: bold;
		line-height: 28px;
	}

	.name-cell {
		flex: 1;
		min-width: 150px;
	}

	.child-name {
		font-size: 1.2rem;
		font-weight: bold;
		color: #1a4d1a;
	}

	.child-name.processed {
		text-decoration: line-through;
		opacity: 0.6;
	}

	.kindness-cell {
		flex: 1;
		max-width: 200px;
	}

	.kindness-bar-container {
		position: relative;
		height: 24px;
		background: #c0dfc0;
		border-radius: 12px;
		border: 2px solid #228b22;
		overflow: hidden;
	}

	.kindness-bar {
		height: 100%;
		border-radius: 10px;
		transition: width 0.5s ease;
	}

	.kindness-label {
		position: absolute;
		right: 8px;
		top: 50%;
		transform: translateY(-50%);
		font-size: 0.85rem;
		font-weight: bold;
		color: #1a4d1a;
		text-shadow: 0 0 3px rgba(255, 255, 255, 0.8);
	}

	.wishes-count-cell {
		flex-shrink: 0;
		min-width: 80px;
	}

	.wishes-badge {
		display: inline-block;
		padding: 0.4rem 0.8rem;
		background: linear-gradient(145deg, #c41e3a, #8b0000);
		color: #fff;
		border-radius: 20px;
		font-size: 1rem;
		font-weight: bold;
		border: 2px solid #ffd700;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	.expand-icon {
		flex-shrink: 0;
		min-width: 120px;
		font-size: 1rem;
		color: #228b22;
		font-weight: bold;
		text-align: right;
	}

	@media (max-width: 768px) {
		.dashboard {
			padding: 1rem;
		}

		.header h1 {
			font-size: 1.8rem;
		}

		.list-header {
			display: none;
		}

		.child-header {
			flex-wrap: wrap;
			padding: 1rem;
		}

		.kindness-cell {
			max-width: none;
			width: 100%;
			order: 5;
			margin-top: 0.5rem;
		}
	}
</style>
