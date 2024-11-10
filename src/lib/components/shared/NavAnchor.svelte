<script lang="ts">
	import { page } from '$app/stores';
	import { isAnchorActive } from '$lib/utils/index';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	let {
		href,
		target,
		fuzzy,
		children,
		class: className,
		...restProps
	}: {
		children: Snippet;
		href: string;
		target?: string;
		fuzzy?: boolean;
		class?: string;
	} & HTMLAnchorAttributes = $props();
</script>

<a
	{href}
	{target}
	class={twMerge(
		'text-lg',
		isAnchorActive($page.url.pathname, href, fuzzy) ? 'font-displayBold' : 'font-display',
		className
	)}
	{...restProps}
>
	{@render children()}
</a>
