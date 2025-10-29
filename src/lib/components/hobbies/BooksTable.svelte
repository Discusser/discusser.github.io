<script lang="ts">
	import { books } from '$lib/constants/books';
	import * as Table from '$lib/components/ui/table';

	const ratingContainers: HTMLDivElement[] = $state([]);
	const ratings: HTMLSpanElement[] = $state([]);

	$effect(() => {
		for (let i = 0; i < ratingContainers.length; i++) {
			const container = ratingContainers.at(i);
			if (container) {
				const rating = parseFloat(ratings.at(i)?.textContent ?? '0');
				container.style.width = `${(rating / 5) * 100}%`;
			}
		}
	});
</script>

<div class="max-h-96 overflow-scroll">
	<Table.Root>
		<Table.Header>
			<Table.Row class="*:font-display-bold text-base">
				<Table.Head>Name</Table.Head>
				<Table.Head>Author</Table.Head>
				<Table.Head>Rating</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each books as book, i (book.name)}
				<Table.Row>
					<Table.Cell>{book.name}</Table.Cell>
					<Table.Cell>{book.author}</Table.Cell>
					<Table.Cell>
						<div class="relative m-0 w-fit p-0 text-xl">
							<div
								class="absolute top-0 left-0 block w-0 overflow-hidden p-0"
								bind:this={ratingContainers[i]}
							>
								<span class="hidden" bind:this={ratings[i]}>{book.rating}</span>
								<span class="inline-block text-yellow-500">🟊🟊🟊🟊🟊</span>
							</div>
							<div class="z-0 block p-0"><span>🟊🟊🟊🟊🟊</span></div>
						</div>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
