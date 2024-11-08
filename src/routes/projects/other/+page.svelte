<script lang="ts">
	import ProjectsTable from '$lib/components/projects/ProjectsTable.svelte';
</script>

<div class="flex flex-col space-y-4">
	<p class="text-2xl font-bold text-foreground">Other</p>
	<p>On this page you can find all my projects that don't fit into any of the other categories:</p>
	<ProjectsTable categories={['other']} />
</div>
