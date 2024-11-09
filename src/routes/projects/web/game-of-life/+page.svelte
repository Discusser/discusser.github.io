<script lang="ts">
	import Project from '$lib/components/projects/Project.svelte';
	import { GAME_OF_LIFE } from '$lib/constants/projects';
</script>

<Project project={GAME_OF_LIFE}>
	<p>
		This is an implementation of Conway's Game of Life written in TypeScript. You can adjust the
		speed of game, draw/erase cells by dragging or clicking on the grid, adjust the zoom level, and
		pause or resume the game. That's about all there is to the game anyway, so it's not like I
		could've added anything else.
	</p>
	<p>
		You can try it out <a
			class="text-blue-500"
			target="_blank"
			href="https://discusser.is-a.dev/game-of-life/">here</a
		>.
	</p>
</Project>
