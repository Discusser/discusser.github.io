<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import NavBar from '$lib/components/shared/NavBar.svelte';
	import Footer from '$lib/components/shared/Footer.svelte';
</script>

<div class="flex h-screen flex-col">
	<ModeWatcher />
	<Toaster />
	<NavBar />

	<div class="w-1/2 flex-grow self-center">
		<slot />
	</div>

	<Footer />
</div>
