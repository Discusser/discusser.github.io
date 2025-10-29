<script lang="ts">
	import { books } from '$lib/constants/books';
	import * as Table from '$lib/components/ui/table';
	import StarRating from '$lib/components/shared/StarRating.svelte';
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
			{#each books as book (book.name)}
				<Table.Row>
					<Table.Cell>{book.name}</Table.Cell>
					<Table.Cell>{book.author}</Table.Cell>
					<Table.Cell>
						<StarRating rating={book.rating} />
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
