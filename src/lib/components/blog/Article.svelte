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
	<div class="flex items-center space-x-4">
		<p class=" text-foreground text-2xl font-bold">
			{article.title}
		</p>
	</div>

	{#if children}
		{@render children()}
	{/if}
</div>
