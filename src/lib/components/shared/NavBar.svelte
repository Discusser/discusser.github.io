<script lang="ts">
	import NavAnchor from '$lib/components/shared/NavAnchor.svelte';
	import { Button } from '$lib/components/ui/button';
	import { IconMenu2, IconMoon, IconSun, IconX } from '@tabler/icons-svelte';
	import { toggleMode } from 'mode-watcher';
	import SideNav from '$lib/components/shared/SideNav.svelte';

	let sidebarOpen = $state(false);

	const toggleSidebar = () => {
		sidebarOpen = !sidebarOpen;
	};

	$effect(() => {
		if (sidebarOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	});
</script>

<div class="sticky top-0 z-50 w-full bg-background">
	{#if sidebarOpen}
		<div
			class="absolute left-0 top-0 z-100 h-screen w-screen space-y-4 bg-background p-4 opacity-95 lg:hidden"
		>
			<Button variant="outline" size="icon" onclick={toggleSidebar}>
				<IconX />
			</Button>
			<SideNav class="-ml-4" onclick={toggleSidebar} />
		</div>
	{/if}
	<div class="flex grow justify-center p-4">
		<div class="flex w-full justify-start lg:w-1/2 lg:justify-center">
			<Button variant="outline" size="icon" class="mr-4 lg:mr-0 lg:hidden" onclick={toggleSidebar}>
				<IconMenu2 />
			</Button>
			<div class="hidden sm:flex sm:grow sm:items-center sm:space-x-8">
				<NavAnchor href="/">Home</NavAnchor>
				<NavAnchor fuzzy href="/projects">Projects</NavAnchor>
				<NavAnchor fuzzy href="/blog">Blog</NavAnchor>
				<NavAnchor fuzzy href="/hobbies">Hobbies</NavAnchor>
			</div>
			<div>
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
