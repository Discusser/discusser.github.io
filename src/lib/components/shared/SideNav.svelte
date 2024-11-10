<script lang="ts">
	import NavAnchor from '$lib/components/shared/NavAnchor.svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	let {
		class: className,
		onclick,
		...restProps
	}: {
		class?: string;
		onclick?: MouseEventHandler<HTMLAnchorElement>;
	} = $props();
</script>

<div class={className} {...restProps}>
	<ul>
		<li><NavAnchor {onclick} href="/">Home</NavAnchor></li>
		<li>
			<NavAnchor {onclick} href="/projects">Projects</NavAnchor>
			<ul>
				<li><NavAnchor {onclick} fuzzy href="/projects/web">Web</NavAnchor></li>
				<li><NavAnchor {onclick} fuzzy href="/projects/cpp">C/C++</NavAnchor></li>
				<li><NavAnchor {onclick} fuzzy href="/projects/python">Python</NavAnchor></li>
				<li><NavAnchor {onclick} fuzzy href="/projects/other">Other</NavAnchor></li>
			</ul>
		</li>
		<li><NavAnchor {onclick} href="/blog">Blog</NavAnchor></li>
		<li><NavAnchor {onclick} href="/hobbies">Hobbies</NavAnchor></li>
	</ul>
</div>
