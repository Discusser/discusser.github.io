<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import NavBar from '$lib/components/shared/NavBar.svelte';
	import Footer from '$lib/components/shared/Footer.svelte';
	import SideNav from '$lib/components/shared/SideNav.svelte';
</script>

<div class="flex h-screen flex-col">
	<ModeWatcher />
	<Toaster />
	<NavBar />

	<div class="flex flex-grow items-start space-x-4 p-4">
		<div class="w-1/4">
			<SideNav />
		</div>
		<div class="w-1/2">
			<slot />
		</div>
	</div>

	<Footer />
</div>
