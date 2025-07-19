<script lang="ts">
	import Linkable from '@/components/shared/Linkable.svelte';
	import type { TOCStack } from '@/lib/table-of-contents';
	import { tocState } from './state.svelte';

	let {
		title,
		level = 0,
		...restProps
	}: {
		title: string;
		level?: number;
	} = $props();

	const sizes = ['text-xl', 'text-lg', 'text-base'];
	let cssTextSize = level >= sizes.length ? sizes.at(-1) : sizes[level];
	let positionString = $state('');

	function onCreate(_div: HTMLDivElement) {
		if (tocState.hasToc == false) return;

		let currentLevel = level;
		let tocStack: TOCStack = tocState.tocStack;
		let previousLevel = 0;
		let curr: string | TOCStack | undefined = tocStack;
		let currentList: TOCStack = tocStack;

		while (curr != null && previousLevel != currentLevel) {
			if (Array.isArray(curr)) {
				if (curr.length == 0) break;
				curr = curr.at(-1);
				if (Array.isArray(curr)) {
					previousLevel++;
					currentList = curr;
				}
			}
			break;
		}

		if (currentLevel > previousLevel) {
			currentList.push([title]);
		} else if (currentLevel == previousLevel) {
			currentList.push(title);
		}
	}
</script>

<div {...restProps} use:onCreate>
	<Linkable id={encodeURIComponent(title)} class="grow"
		><p class="text-foreground {cssTextSize} font-bold">{positionString} {title}</p></Linkable
	>
</div>
