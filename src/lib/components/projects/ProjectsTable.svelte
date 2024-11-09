<script lang="ts">
	import { projects, columns } from '$lib/constants/projects';
	import { createSvelteTable, FlexRender } from '$lib/components/ui/data-table/index';
	import * as Table from '$lib/components/ui/table';
	import { getCoreRowModel } from '@tanstack/table-core';

	let {
		categories
	}: {
		categories?: string[];
	} = $props();

	const table = createSvelteTable({
		data: projects,
		columns: columns,
		getCoreRowModel: getCoreRowModel()
	});
</script>

<div class="max-h-96 overflow-scroll">
	<Table.Root>
		<Table.Header>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<Table.Row>
					{#each headerGroup.headers as header (header.id)}
						<Table.Head>
							{#if !header.isPlaceholder}
								<FlexRender
									content={header.column.columnDef.header}
									context={header.getContext()}
								/>
							{/if}
						</Table.Head>
					{/each}
				</Table.Row>
			{/each}
		</Table.Header>
		<Table.Body>
			{#each table.getRowModel().rows as row (row.id)}
				{#if !categories || categories.includes(row.original.category)}
					<Table.Row data-state={row.getIsSelected() && 'selected'}>
						{#each row.getVisibleCells() as cell (cell.id)}
							<Table.Cell>
								<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
							</Table.Cell>
						{/each}
					</Table.Row>
				{/if}
			{/each}
		</Table.Body>
	</Table.Root>
</div>
