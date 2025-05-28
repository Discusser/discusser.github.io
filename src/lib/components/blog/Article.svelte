<script lang="ts">
	import type { Article } from '$lib/constants/articles';
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	const {
		children,
		article,
		class: className,
		...restProps
	}: {
		children?: Snippet;
		article: Article;
		class?: string;
	} = $props();
</script>

<div class={twMerge('flex flex-col space-y-4', className)} {...restProps}>
	<div class="flex items-baseline space-x-4">
		<p class="text-foreground grow text-2xl font-bold">
			{article.title}
		</p>
		<span class="text-muted-foreground hidden text-sm sm:block">
			{article.date.toLocaleDateString()}
		</span>
	</div>
	<span class="text-muted-foreground block text-sm sm:hidden">
		{article.date.toLocaleDateString()}
	</span>

	{#if children}
		{@render children()}
	{/if}
</div>
