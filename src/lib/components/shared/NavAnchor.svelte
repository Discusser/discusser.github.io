<script lang="ts">
	import { page } from '$app/stores';
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	let {
		href,
		target,
		children,
		class: className,
		...others
	}: {
		children: Snippet;
		href: string;
		target?: string;
		class?: string;
	} = $props();
</script>

<a
	{href}
	{target}
	class={twMerge(
		'text-lg',
		$page.url.pathname == href ? 'font-displayBold' : 'font-display',
		className
	)}
	{...others}
>
	{@render children()}
</a>
