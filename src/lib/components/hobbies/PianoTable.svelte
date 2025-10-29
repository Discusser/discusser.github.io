<script lang="ts">
	import { pieces } from '$lib/constants/piano-pieces';
	import * as Table from '$lib/components/ui/table';
</script>

<div class="max-h-96 overflow-scroll">
	<Table.Root>
		<Table.Header>
			<Table.Row class="*:font-display-bold text-base">
				<Table.Head>Name</Table.Head>
				<Table.Head>Composer</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each pieces as piece (piece.name)}
				<Table.Row>
					<Table.Cell>{piece.name}</Table.Cell>
					<Table.Cell>{piece.composer}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
