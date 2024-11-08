<script lang="ts">
	import ProjectsTable from '$lib/components/projects/ProjectsTable.svelte';
</script>

<div class="flex flex-col space-y-4">
	<p class="text-2xl font-bold text-foreground">C/C++</p>
	<p>
		I've mainly used C++ so far to create simple command line programs, GUI apps with GTK, and to
		learn a bit about rendering with OpenGL. I'd like to say I have some experience with the
		language but it's very complicated and quite old, so I'm basically a beginner compared to some
		other people.
	</p>
	<p>You can find most of my C++ projects here:</p>
	<ProjectsTable categories={['cpp']} />
</div>
