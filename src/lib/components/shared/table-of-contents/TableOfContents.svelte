<script lang="ts">
	import { cn } from '@/utils';
	import { onMount, type Snippet } from 'svelte';
	import type { TOC, TOCElem } from '@/lib/table-of-contents';

	let {
		// tableOfContents,
		class: className,
		...restProps
	}: {
		// tableOfContents: TOC;
		class?: string;
	} = $props();

	let container: HTMLDivElement;
	let stack: Array<HTMLUListElement> = [];
	let previousElement: HTMLLIElement;

	function applyListStyles(elem: HTMLLIElement | HTMLUListElement) {
		elem.classList += 'list-decimal';
	}

	function processTOCElements() {
		const elements = document.querySelectorAll('div[data-toc-level]');
		elements.forEach((elem) => {
			let levelString = elem.getAttribute('data-toc-level');
			if (levelString == null) return;
			let level = parseInt(levelString);
			let title = elem.getAttribute('data-toc-title');
			let currentLevel = stack.length - 1;

			let listItem = document.createElement('li');
			let anchor = document.createElement('a');
			anchor.textContent = title;
			anchor.href = '#' + title; // TODO: Convert title to id
			anchor.classList += 'text-blue-500';
			listItem.appendChild(anchor);

			if (level > currentLevel) {
				let list = document.createElement('ul');
				applyListStyles(list);
				previousElement.appendChild(list);
				stack.push(list);
			} else if (level < currentLevel) {
				stack.pop();
			}

			stack.at(-1)?.appendChild(listItem);

			previousElement = listItem;
		});
	}

	onMount(() => {
		let tocRoot = document.createElement('ul');
		applyListStyles(tocRoot);
		stack.push(tocRoot);
		processTOCElements();
		container.appendChild(tocRoot);
	});
</script>

<div class={cn('', className)} {...restProps}>
	<p class="text-foreground text-xl font-bold">Table of Contents</p>
	<div bind:this={container}></div>
</div>
