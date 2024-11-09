<script lang="ts">
	import NavAnchor from '$lib/components/shared/NavAnchor.svelte';
	import { Button } from '$lib/components/ui/button';
	import { IconMoon, IconSun } from '@tabler/icons-svelte';
	import { toggleMode } from 'mode-watcher';
</script>

<div class="sticky top-0 z-50 w-full bg-background">
	<div class="flex flex-grow justify-center p-4">
		<div class="flex w-1/2 justify-center">
			<div class="flex items-center space-x-8">
				<NavAnchor href="/">Home</NavAnchor>
				<NavAnchor fuzzy href="/projects">Projects</NavAnchor>
				<NavAnchor fuzzy href="/blog">Blog</NavAnchor>
				<NavAnchor fuzzy href="/hobbies">Hobbies</NavAnchor>
			</div>
			<div class="flex-grow">
				<Button onclick={toggleMode} class="float-right" variant="outline" size="icon">
					<IconSun
						class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
					/>
					<IconMoon
						class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>
			</div>
		</div>
	</div>
	<hr />
</div>
