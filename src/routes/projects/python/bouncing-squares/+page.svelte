<script lang="ts">
	import Project from '$lib/components/projects/Project.svelte';
	import Video from '$lib/components/shared/Video.svelte';
	import { BOUNCING_SQUARES } from '$lib/constants/projects';
</script>

<Project project={BOUNCING_SQUARES}>
	<div class="flex space-x-4">
		<div class="flex-[2]">
			<Video alt="A demonstration of the bouncing squares program" src="/bouncing_squares.mov" />
		</div>
		<p class="flex-[3]">
			This program isn't really anything impressive, I just decided to make it because I was feeling
			bored. You can choose how many squares you want on the screen, and adjust their speed or size
			(individually when spawning new ones, or collectively). When a square hits the edge of the
			screen, it changes color and bounces off the edge, which gives mesmerizing patterns with
			vibrant colors. The version you see in the video is not the final version, as I added a few
			more features after recording that, but the principle stays the same.
		</p>
	</div>
</Project>
