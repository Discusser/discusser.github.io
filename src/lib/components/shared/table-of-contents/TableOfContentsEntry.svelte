<script lang="ts">
	import type { TOCStack } from '@/lib/table-of-contents';
	import Self from './TableOfContentsEntry.svelte';
	import { cn } from '@/utils';

	let {
		class: className,
		items,
		...restProps
	}: {
		class?: string;
		items: TOCStack;
	} = $props();
</script>

<ol class={cn('list-decimal', className)} {...restProps}>
	{#each items as item (item)}
		{#if typeof item == 'string'}
			<li><a class="text-blue-500" href="#{encodeURI(item)}">{item}</a></li>
		{:else}
			<Self class={cn('', className)} {...restProps} items={item} />
		{/if}
	{/each}
</ol>
