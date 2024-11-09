<script lang="ts">
	import Project from '$lib/components/projects/Project.svelte';
	import { MINESWEEPER } from '$lib/constants/projects';
</script>

<Project project={MINESWEEPER}>
	<p>
		This is a clone of Minesweeper that I made mainly to try out Nuxt.js, which is just a framework
		built on top on Vue. The game is pretty simple, but quite addicting.
	</p>
	<p>
		You can try it <a
			href="https://discusser.is-a.dev/Minesweeper/"
			target="_blank"
			class="text-blue-500">here</a
		>.
	</p>
</Project>
