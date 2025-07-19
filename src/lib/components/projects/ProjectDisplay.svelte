<script lang="ts">
	import { projects, type Category } from '@/constants/projects';
	import ProjectCard from './ProjectCard.svelte';
	import { cn } from '@/utils';
	import Input from '@/components/shared/Input.svelte';
	import { setContext } from 'svelte';

	const {
		category,
		class: className,
		...restProps
	}: {
		category?: Category;
		class?: string;
	} = $props();

	let searchFilter = $state('');
</script>

<div class={cn('space-y-4', className)} {...restProps}>
	<div class="flex">
		<div class="w-1/3">
			<Input type="text" placeholder="Search..." bind:value={searchFilter} />
		</div>
	</div>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		{#each projects as project (project.name)}
			{#if (category == undefined || project.category == category) && project.name
					.toLowerCase()
					.includes(searchFilter.toLowerCase())}
				<ProjectCard {project} />
			{/if}
		{/each}
	</div>
</div>
