<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';
	import { Skeleton } from '$lib/components/ui/skeleton';

	let {
		alt,
		width,
		height,
		class: className,
		...restProps
	}: {
		alt?: string;
		width: string;
		height: string;
		class?: string;
	} & HTMLImgAttributes = $props();

	let loading: boolean = $state(true);
</script>

<div class="h-full space-y-2 text-center">
	<div
		class="h-full w-full"
		style="{width ? 'width:' + width + 'px;' : ''}{height ? 'height:' + height + 'px;' : ''}"
	>
		<Skeleton class="h-full w-full {!loading ? 'hidden' : ''}" />
		<img
			onload={() => (loading = false)}
			onerror={() => (loading = false)}
			{width}
			{height}
			{...restProps}
			{alt}
			class={twMerge(
				'flex h-full w-full items-center justify-center rounded-sm border-2 border-foreground/30 bg-secondary/50 hover:border-foreground/40 hover:bg-secondary/60',
				className,
				loading ? 'hidden' : ''
			)}
		/>
	</div>
	<p class="text-sm">{alt}</p>
</div>
