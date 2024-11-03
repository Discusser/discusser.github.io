<script lang="ts">
	import { page } from '$app/stores';
	import { isAnchorActive } from '$lib/utils/index';
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	let {
		href,
		target,
		fuzzy,
		children,
		class: className,
		...others
	}: {
		children: Snippet;
		href: string;
		target?: string;
		fuzzy?: boolean;
		class?: string;
	} = $props();
</script>

<a
	{href}
	{target}
	class={twMerge(
		'text-lg',
		isAnchorActive($page.url.pathname, href, fuzzy) ? 'font-displayBold' : 'font-display',
		className
	)}
	{...others}
>
	{@render children()}
</a>
