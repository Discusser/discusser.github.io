<script lang="ts">
	import Project from '$lib/components/projects/Project.svelte';
	import Image from '$lib/components/shared/Image.svelte';
	import { DRAW_2D } from '$lib/constants/projects';
</script>

<Project project={DRAW_2D}>
	<div class="flex items-stretch space-x-4">
		<!-- <Image width="500" height="300" src="/" alt="Preview of the Draw 2D program" /> -->
		<p>
			This is one of the first programs that I made on my calculator, and it sort of served as a
			stepping stone towards greater programs. It's very basic, and allows you to draw pixels
			individually, adjust brush size, move the cursor, change the color.
		</p>
	</div>
</Project>
