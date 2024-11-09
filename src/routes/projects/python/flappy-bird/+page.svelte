<script lang="ts">
	import Project from '$lib/components/projects/Project.svelte';
	import Image from '$lib/components/shared/Image.svelte';
	import { FLAPPY_BIRD } from '$lib/constants/projects';
</script>

<Project project={FLAPPY_BIRD}>
	<div class="flex items-stretch space-x-4">
		<!-- <Image width="500" height="300" src="/" alt="Preview of the Flappy Bird program" /> -->
		<p>
			This program is a clone of the very famous mobile game, Flappy Bird. It was surprisingly easy
			to make. The bird itself is a square, and the pipes are just rectangles. Since you only need
			to check for collision on the y-axis that the bird is on, it's very trivial to implement.
			Generating pipes just involves some random numbers along with some fine-tuned settings to
			avoid having height differences between pipes that are too large or too small. Performance is
			not an issue either, since there are at most a few pipes that exist at once (once a pipe
			leaves the screen, it stops existing in memory). Finally, rendering is also very simple, since
			everything is just rectangles. To make the game more addicting, I also added an option to
			restart when you lose.
		</p>
	</div>
</Project>
