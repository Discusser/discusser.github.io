<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import NavBar from '$lib/components/shared/NavBar.svelte';
	import Footer from '$lib/components/shared/Footer.svelte';
	import SideNav from '$lib/components/shared/SideNav.svelte';
</script>

<div class="flex min-h-screen flex-col">
	<ModeWatcher />
	<Toaster />
	<NavBar />

	<div class="flex flex-grow p-4">
		<div class="absolute hidden w-1/4 lg:block">
			<SideNav />
		</div>
		<div class="flex flex-grow justify-center">
			<div class="w-full lg:w-1/2">
				<slot />
			</div>
		</div>
	</div>

	<Footer />
</div>
