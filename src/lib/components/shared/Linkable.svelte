<script lang="ts">
	import { cn } from '@/utils';
	import type { Snippet } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { IconHash } from '@tabler/icons-svelte';

	let {
		id,
		children,
		class: className,
		...restProps
	}: {
		id: string;
		children: Snippet;
		class?: string;
	} = $props();

	let buttonVisible = $state(false);

	function onMouseEnter() {
		buttonVisible = true;
	}

	function onMouseLeave() {
		buttonVisible = false;
	}

	function gotoLink() {
		window.location.hash = id;
	}
</script>

<div
	class={cn('relative flex scroll-mt-24 items-center', className)}
	{...restProps}
	{id}
	onmouseenter={onMouseEnter}
	onmouseleave={onMouseLeave}
>
	{@render children()}
	<div class="relative flex items-center">
		<div class="absolute h-12 w-12"></div>
		<Button
			class="hover:text-foreground absolute left-2 h-8 w-8 text-blue-500 transition-all 
			hover:cursor-pointer {buttonVisible ? 'opacity-100' : 'opacity-0'}"
			variant="outline"
			size="icon"
			onclick={gotoLink}
		>
			<IconHash />
		</Button>
	</div>
</div>
