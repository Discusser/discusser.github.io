<script lang="ts">
	import { cn } from '@/utils';
	import { tocState } from './state.svelte';
	import TableOfContentsEntry from './TableOfContentsEntry.svelte';

	let {
		class: className,
		...restProps
	}: {
		class?: string;
	} = $props();

	tocState.hasToc = true;
	tocState.tocStack = [];

	$effect(() => {
		return () => {
			tocState.hasToc = false;
			tocState.tocStack = [];
		};
	});
</script>

<div class={cn('', className)} {...restProps}>
	<p class="text-foreground text-xl font-bold">Table of Contents</p>
	<div>
		<TableOfContentsEntry items={tocState.tocStack} />
	</div>
</div>
