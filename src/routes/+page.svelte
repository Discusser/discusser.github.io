<script lang="ts">
	import AboutMe from '$lib/components/home/AboutMe.svelte';
	import ContactMe from '$lib/components/home/ContactMe.svelte';
	import Profile from '$lib/components/home/Profile.svelte';
</script>

<div class="flex flex-col space-y-4">
	<Profile />
	<AboutMe />
	<ContactMe />
</div>
