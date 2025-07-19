<script lang="ts">
	import { cn } from '@/utils';
	import { IconChevronDown, IconChevronRight } from '@tabler/icons-svelte';
	import type { Snippet } from 'svelte';

	let {
		title,
		children,
		class: className,
		...restProps
	}: {
		title: string;
		children: Snippet;
		class?: string;
	} = $props();

	let collapsed = $state(true);

	function onClick() {
		collapsed = !collapsed;
	}
</script>

<div {...restProps}>
	<button
		class={cn(
			'bg-muted flex w-full items-center space-x-1 px-2 py-1 hover:cursor-pointer',
			className
		)}
		type="button"
		onclick={onClick}
	>
		{#if collapsed}
			<IconChevronRight size={16} />
		{:else}
			<IconChevronDown size={16} />
		{/if}
		<span>
			{title}
		</span>
	</button>
	<div
		class="mt-2 ml-2 grid {collapsed
			? 'grid-rows-[0fr]'
			: 'grid-rows-[1fr]'} transition-[grid-template-rows]"
	>
		<div class="overflow-hidden">
			{@render children()}
		</div>
	</div>
</div>
