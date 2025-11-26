<script lang="ts">
	import { getChildDetails, addComment } from './data.remote';

	interface Props {
		childId: string;
	}

	let { childId }: Props = $props();

	const detailsForm = $derived(addComment.for(childId));

	function formatDate(date: Date): string {
		return new Date(date).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}
</script>

<div class="child-details">
	<svelte:boundary>
		{#snippet pending()}
			<div class="details-loading">Loading details...</div>
		{/snippet}

		{@const details = await getChildDetails(childId)}
		{#if details}
			<div class="details-content">
				<div class="wishes-section">
					<h3>🎁 Wish List</h3>
					<ul class="wishes-list">
						{#each details.wishes as wish}
							<li class="wish-item">{wish.name}</li>
						{/each}
					</ul>
				</div>

				<div class="comments-section">
					<h3>📝 Santa's Notes</h3>
					{#if details.comments.length === 0}
						<p class="no-comments">No notes yet for this child.</p>
					{:else}
						<ul class="comments-list">
							{#each details.comments as comment}
								<li class="comment-item">
									<span class="comment-text">{comment.text}</span>
									<span class="comment-date">{formatDate(comment.timestamp)}</span>
								</li>
							{/each}
						</ul>
					{/if}

					<form {...detailsForm} class="add-comment-form" onclick={(e) => e.stopPropagation()}>
						<input type="hidden" name="childId" value={childId} />
						<div class="form-row">
							<input
								{...detailsForm.fields.commentText.as('text')}
								placeholder="Add a note about this child..."
								class="comment-input"
							/>
							<button type="submit" class="submit-btn">Add Note</button>
						</div>
						{#each detailsForm.fields.commentText.issues() as issue}
							<p class="form-error">{issue.message}</p>
						{/each}
					</form>
				</div>
			</div>
		{/if}
	</svelte:boundary>
</div>

<style>
	.child-details {
		border-top: 3px dashed #228b22;
		padding: 1.5rem;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(212, 236, 212, 0.5) 100%);
	}

	.details-loading {
		text-align: center;
		padding: 1rem;
		color: #1a4d1a;
		font-style: italic;
	}

	.details-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	.wishes-section h3,
	.comments-section h3 {
		margin: 0 0 1rem;
		color: #1a4d1a;
		font-size: 1.3rem;
		border-bottom: 2px solid #228b22;
		padding-bottom: 0.5rem;
	}

	.wishes-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.wish-item {
		padding: 0.6rem 1rem;
		margin-bottom: 0.5rem;
		background: linear-gradient(145deg, #fff, #e8f5e8);
		border-radius: 10px;
		border: 2px solid #90ee90;
		font-size: 1rem;
		color: #1a4d1a;
	}

	.wish-item::before {
		content: '🎄 ';
	}

	.comments-list {
		list-style: none;
		padding: 0;
		margin: 0 0 1rem;
	}

	.comment-item {
		padding: 0.8rem 1rem;
		margin-bottom: 0.5rem;
		background: linear-gradient(145deg, #fffef0, #f5f5dc);
		border-radius: 10px;
		border: 2px solid #daa520;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.comment-text {
		color: #1a4d1a;
		font-size: 0.95rem;
	}

	.comment-date {
		font-size: 0.8rem;
		color: #666;
		font-style: italic;
	}

	.no-comments {
		color: #666;
		font-style: italic;
		margin: 0 0 1rem;
	}

	.add-comment-form {
		margin-top: 1rem;
	}

	.form-row {
		display: flex;
		gap: 0.5rem;
	}

	.comment-input {
		flex: 1;
		padding: 0.7rem 1rem;
		border: 3px solid #228b22;
		border-radius: 10px;
		font-family: inherit;
		font-size: 0.95rem;
		background: #fff;
		transition: all 0.2s ease;
	}

	.comment-input:focus {
		outline: none;
		border-color: #ffd700;
		box-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
	}

	.submit-btn {
		padding: 0.7rem 1.2rem;
		background: linear-gradient(145deg, #c41e3a, #8b0000);
		color: #fff;
		border: 3px solid #ffd700;
		border-radius: 10px;
		font-family: inherit;
		font-size: 0.95rem;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.submit-btn:hover {
		background: linear-gradient(145deg, #d42a46, #a00000);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	.submit-btn:active {
		transform: translateY(0);
	}

	.form-error {
		margin: 0.5rem 0 0;
		color: #c41e3a;
		font-size: 0.85rem;
		font-weight: bold;
	}

	@media (max-width: 768px) {
		.details-content {
			grid-template-columns: 1fr;
		}
	}
</style>
