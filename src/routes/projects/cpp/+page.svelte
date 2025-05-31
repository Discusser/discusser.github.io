<script lang="ts">
	import ProjectCard from '@/components/projects/ProjectCard.svelte';
	import { Category, projects } from '@/constants/projects';
</script>

<div class="flex flex-col space-y-4">
	<p class="text-foreground text-2xl font-bold">C/C++</p>
	<p>
		I've mainly used C++ so far to create simple command line programs, GUI apps with GTK, and to
		learn a bit about rendering with OpenGL. I'd like to say I have some experience with the
		language but it's very complicated and quite old, so I'm basically a beginner compared to some
		other people.
	</p>
	<p>You can find most of my C++ projects here:</p>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		{#each projects as project}
			{#if project.category == Category.Cpp}
				<ProjectCard {project} />
			{/if}
		{/each}
	</div>
</div>
