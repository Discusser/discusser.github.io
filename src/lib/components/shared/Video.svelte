<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLVideoAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	let {
		src,
		children,
		alt,
		class: className,
		...restProps
	}: {
		children?: Snippet;
		src: string;
		alt?: string;
		class?: string;
	} & HTMLVideoAttributes = $props();
</script>

<!-- svelte-ignore a11y_media_has_caption -->
<div class="space-y-2 text-center">
	<video
		{...restProps}
		controls
		{src}
		class={twMerge(
			'flex h-full w-full items-center justify-center rounded-sm hover:bg-secondary/20',
			className
		)}
	>
		{@render children?.()}
		<source {src} />
		<p>
			Your browser can't display videos! Download the video <a href={src}>here</a>
		</p>
	</video>
	<p class="text-sm">{alt}</p>
</div>
