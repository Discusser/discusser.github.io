<script lang="ts">
	import Project from '$lib/components/projects/Project.svelte';
	import Video from '$lib/components/shared/Video.svelte';
	import { MAZE_GENERATOR } from '$lib/constants/projects';
</script>

<Project project={MAZE_GENERATOR}>
	<p>
		This program generates what are known as perfect mazes, meaning mazes that have one solution
		only. The mazes are generated using the
		<a
			target="_blank"
			class="text-blue-500"
			href="https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_depth-first_search"
			>Recursive Backtracker</a
		> algorithm, and the solution is drawn. You can configure the size of the maze to your liking. This
		program is actually very simple to replicate, and it's something that I did in a few hours because
		I felt like learning about maze generation. The algorithm itself is quite simple and intuitive once
		you understand how it works. There are different types of maze generating algorithms, but I chose
		this one because it is one of the simplest ones. Mazes generated with the recursive backtracker algorithm
		tend to have a low branching factor, which essentially means that there are not a lot of branches
		in the mazes, making the mazes somewhat easier to solve.
	</p>
	<p>
		You can try it out <a
			class="text-blue-500"
			target="_blank"
			href="https://discusser.is-a.dev/maze-generator/">here</a
		>.
	</p>
	<Video alt="A demonstration of the maze generator" src="/maze_generator.mp4" />
</Project>
