<script lang="ts">
	import hljs from 'highlight.js';
	import { onMount, type Snippet } from 'svelte';

	let {
		children,
		language,
		nohl = false,
		class: className,
		...restProps
	}: {
		children: Snippet;
		language?: string;
		nohl?: boolean;
		class?: string;
	} = $props();

	let codeElement: HTMLElement;

	onMount(() => {
		if (!nohl) {
			hljs.highlightElement(codeElement);
		}
	});
</script>

<pre class={className} {...restProps}><code
		class={language != undefined ? 'language-' + language : ''}
		bind:this={codeElement}>{@render children()}</code
	></pre>
