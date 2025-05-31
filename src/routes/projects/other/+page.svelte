<script lang="ts">
	import ProjectDisplay from '@/components/projects/ProjectDisplay.svelte';
	import { Category } from '@/constants/projects';
</script>

<div class="flex flex-col space-y-4">
	<p class="text-foreground text-2xl font-bold">Other</p>
	<p>On this page you can find all my projects that don't fit into any of the other categories:</p>

	<ProjectDisplay category={Category.Other} />
</div>
