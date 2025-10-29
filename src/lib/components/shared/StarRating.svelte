<script lang="ts">
	const { rating }: { rating: number } = $props();

	let ratingContainer: HTMLDivElement | undefined = $state();
	let ratingSpan: HTMLSpanElement | undefined = $state();

	$effect(() => {
		if (ratingContainer && ratingSpan) {
			const ratingValue = parseFloat(ratingSpan.textContent ?? '0');
			ratingContainer.style.width = `${(ratingValue / 5) * 100}%`;
		}
	});
</script>

<div class="relative m-0 w-fit p-0 text-xl">
	<div class="absolute top-0 left-0 block w-0 overflow-hidden p-0" bind:this={ratingContainer}>
		<span class="hidden" bind:this={ratingSpan}>{rating}</span>
		<span class="inline-block text-yellow-500">★★★★★</span>
	</div>
	<div class="z-0 block p-0"><span>★★★★★</span></div>
</div>
