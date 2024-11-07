<script lang="ts">
	import ProjectsTable from '$lib/components/projects/ProjectsTable.svelte';
</script>

<div class="flex flex-col space-y-4">
	<p class="text-2xl font-bold text-foreground">Projects</p>
	<p>
		I've been coding for at least 5 years now, but for most of that time period I was not taking it
		very seriously. Up to this point, I have tried out many different languages, and I have taken a
		liking for some, but not all. I've made basic scripts with Bash, Python, programs with Rust,
		C/C++, Ruby, ASM (I wouldn't recommend), Minecraft mods with Java. I also created a very basic
		<a class="text-blue-500" href="/projects/other/workout_app">workout app</a> for mobile devices
		using Dart along with Flutter, which was for my
		<a
			class="text-blue-500"
			href="https://pll.harvard.edu/course/cs50-introduction-computer-science">CS50</a
		>
		final project. To top it all off, I of course know JavaScript (along with HTML and CSS even if they
		aren't programming languages). I've used Vue in the past, but now I'm making this website with Svelte
		as I prefer it over Vue. My most worthy projects are available on my
		<a class="text-blue-500" href="https://github.com/Discusser">GitHub</a> profile
	</p>
	<p>You can find a non-exhaustive list of my projects below:</p>
	<ProjectsTable />
</div>
