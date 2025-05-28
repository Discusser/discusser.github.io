<script lang="ts">
	import hljs from 'highlight.js';
	import { onMount, type Snippet } from 'svelte';

	let {
		children,
		language,
		nohl = false,
		...restProps
	}: {
		children: Snippet;
		language?: string;
		nohl?: boolean;
	} = $props();

	let codeElement: HTMLElement;

	onMount(() => {
		if (!nohl) {
			hljs.highlightElement(codeElement);
		}
	});
</script>

<pre {...restProps}><code
		class={language != undefined ? 'language-' + language : ''}
		bind:this={codeElement}>{@render children()}</code
	></pre>
