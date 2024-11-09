<script lang="ts">
	import Image from '$lib/components/shared/Image.svelte';
</script>

<div class="flex flex-col space-y-4">
	<p class="text-2xl font-bold text-foreground">Draw 2D</p>
	<p></p>
	<div class="flex items-stretch space-x-4">
		<div class="flex-[2]">
			<Image height="300" src="/" alt="Preview of the Draw 2D program" />
		</div>
		<p class="flex-[3]">
			This is one of the first programs that I made on my calculator, and it sort of served as a
			stepping stone towards greater programs. It's very basic, and allows you to draw pixels
			individually, adjust brush size, move the cursor, change the color.
		</p>
	</div>
</div>
