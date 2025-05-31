<script lang="ts">
	import ProjectCard from '@/components/projects/ProjectCard.svelte';
	import { Category, projects } from '@/constants/projects';
</script>

<div class="flex flex-col space-y-4">
	<p class="text-foreground text-2xl font-bold">Other</p>
	<p>On this page you can find all my projects that don't fit into any of the other categories:</p>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		{#each projects as project}
			{#if project.category == Category.Other}
				<ProjectCard {project} />
			{/if}
		{/each}
	</div>
</div>
