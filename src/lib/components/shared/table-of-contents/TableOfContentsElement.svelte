<script lang="ts">
	import Linkable from '@/components/shared/Linkable.svelte';

	let {
		title,
		level = 0,
		...restProps
	}: {
		title: string;
		level?: number;
	} = $props();
</script>

<div data-toc-level={level} data-toc-title={title} {...restProps}>
	<Linkable id={encodeURIComponent(title)}
		><p class="text-foreground text-xl font-bold">{title}</p></Linkable
	>
</div>
