<script lang="ts">
	import Project from '$lib/components/projects/Project.svelte';
	import Video from '$lib/components/shared/Video.svelte';
	import { BOUNCING_SQUARES } from '$lib/constants/projects';
</script>

<Project project={BOUNCING_SQUARES}>
	<div
		class="flex flex-col items-center space-y-4 md:flex-row md:items-start md:space-x-4 md:space-y-0"
	>
		<p class="lg:flex-[5]">
			This program isn't really anything impressive, I just decided to make it because I was feeling
			bored. You can choose how many squares you want on the screen, and adjust their speed or size
			(individually when spawning new ones, or collectively). When a square hits the edge of the
			screen, it changes color and bounces off the edge, which gives mesmerizing patterns with
			vibrant colors. The version you see in the video is not the final version, as I added a few
			more features after recording that, but the principle stays the same.
		</p>
		<div class="lg:flex-[2]">
			<Video alt="A demonstration of the bouncing squares program" src="/bouncing_squares.mov" />
		</div>
	</div>
</Project>
