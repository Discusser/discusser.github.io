<script lang="ts">
	import Video from '$lib/components/shared/Video.svelte';
</script>

<div class="flex flex-col space-y-4">
	<p class="text-2xl font-bold text-foreground">Bouncing Squares</p>
	<p></p>
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
</div>
