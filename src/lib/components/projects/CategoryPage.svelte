<script lang="ts">
	import ProjectDisplay from '@/components/projects/ProjectDisplay.svelte';
	import type { Category } from '@/constants/projects';
	import type { Snippet } from 'svelte';

	const {
		title,
		category,
		closingText,
		children
	}: {
		title: string;
		category: Category;
		closingText?: string;
		children: Snippet;
	} = $props();

	const defaultClosingText = `You can find most of my ${title} projects here:`;
</script>

<div class="flex flex-col space-y-4">
	<p class="text-foreground text-2xl font-bold">{title}</p>
	{@render children()}
	{#if closingText !== null}
		<p>{closingText ?? defaultClosingText}</p>
	{/if}

	<ProjectDisplay {category} />
</div>
