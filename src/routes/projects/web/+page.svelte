<script lang="ts">
	import ProjectCard from '@/components/projects/ProjectCard.svelte';
	import { Category, projects } from '@/constants/projects';
</script>

<div class="flex flex-col space-y-4">
	<p class="text-foreground text-2xl font-bold">Web</p>
	<p>
		Web development is great, because you can make practically anything on the web. You can make
		games, tools, or actual websites. I know how to use JS, HTML, and CSS. On top of that, I've
		tried a few web frameworks over time such as Vue and Svelte (and also React very briefly), and
		my favorite so far is Svelte, which is what I'm using for this website. I also highly prefer
		TypeScript over JavaScript, simply because of types. I can't stand using a language where you
		aren't certain of the type of the object you're dealing with.
	</p>
	<p>You can find most of my web projects here:</p>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		{#each projects as project}
			{#if project.category == Category.Web}
				<ProjectCard {project} />
			{/if}
		{/each}
	</div>
</div>
