<script>
	import { getHolidayStats } from './data.remote';

	const stats = await getHolidayStats();
</script>

<div class="stats-banner">
	<div class="stat-item">
		<span class="stat-icon">👧👦</span>
		<span class="stat-value">{stats.totalChildren}</span>
		<span class="stat-label">Children</span>
	</div>
	<div class="stat-item">
		<span class="stat-icon">⭐</span>
		<span class="stat-value">{stats.averageKindness}%</span>
		<span class="stat-label">Avg. Kindness</span>
	</div>
	<div class="stat-item">
		<span class="stat-icon">🎁</span>
		<span class="stat-value">{stats.totalWishes}</span>
		<span class="stat-label">Total Wishes</span>
	</div>
</div>

<style>
	.stats-banner {
		display: flex;
		justify-content: space-around;
		gap: 1rem;
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: linear-gradient(145deg, #c41e3a, #8b0000);
		border-radius: 16px;
		border: 4px solid #ffd700;
		box-shadow:
			0 6px 24px rgba(0, 0, 0, 0.3),
			inset 0 2px 8px rgba(255, 255, 255, 0.1);
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.3rem;
		padding: 0.5rem 1rem;
	}

	.stat-icon {
		font-size: 2rem;
	}

	.stat-value {
		font-size: 2rem;
		font-weight: bold;
		color: #fff;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	}

	.stat-label {
		font-size: 0.85rem;
		color: #ffcccc;
		text-transform: uppercase;
		letter-spacing: 1px;
	}
</style>
