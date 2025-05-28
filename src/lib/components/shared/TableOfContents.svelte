<script lang="ts">
	import { cn } from '@/utils';
	import { onMount } from 'svelte';
	import type { TOC, TOCElem } from '@/lib/tableOfContents';

	let {
		tableOfContents,
		class: className,
		...restProps
	}: {
		tableOfContents: TOC;
		class?: string;
	} = $props();

	let container: HTMLDivElement;
	let stack: Array<HTMLUListElement | HTMLLIElement> = [];

	function createAnchor(elem: TOCElem, listItem: HTMLLIElement) {
		let anchor = document.createElement('a');
		anchor.textContent = elem.title;
		anchor.href = '#' + elem.id;
		anchor.classList += 'text-blue-500';
		listItem.appendChild(anchor);
	}

	function applyListStyles(elem: HTMLLIElement | HTMLUListElement) {
		elem.classList += 'list-decimal';
	}

	function processTOCLayer(layer: TOC) {
		let currentElement = stack.at(-1);
		if (currentElement == null) return;

		if (layer.length > 0) {
			for (const elem of layer) {
				let listItem = document.createElement('li');
				applyListStyles(listItem);
				if ('title' in elem && 'id' in elem) {
					createAnchor(elem, listItem);

					currentElement.appendChild(listItem);
				} else {
					createAnchor(elem[0], listItem);

					let list = document.createElement('ul');
					applyListStyles(list);
					stack.push(list);
					processTOCLayer(elem[1]);
					listItem.appendChild(list);
					currentElement.appendChild(listItem);
				}
				stack.pop();
			}
		}
	}

	onMount(() => {
		let tocRoot = document.createElement('ul');
		applyListStyles(tocRoot);
		stack.push(tocRoot);
		processTOCLayer(tableOfContents);
		container.appendChild(tocRoot);
	});
</script>

<div class={cn('', className)} {...restProps}>
	<p class="text-foreground text-xl font-bold">Table of Contents</p>
	<div bind:this={container}></div>
</div>
