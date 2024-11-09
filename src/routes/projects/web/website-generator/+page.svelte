<script lang="ts">
	import Project from '$lib/components/projects/Project.svelte';
	import { WEBSITE_GENERATOR } from '$lib/constants/projects';
</script>

<Project project={WEBSITE_GENERATOR}>
	<p>
		This program is a basic static website generator written in TypeScript. I wrote it purely out of
		curiosity, and also because I wanted to write an HTML parser. The code used to parse the HTML is
		in no way a model to be followed, as I wrote it in a short interval without really paying
		attention to quality of code, and solely focusing on making it work. Either way, I'm still proud
		of this project since it just works. Even if I wouldn't recommend using this, instructions on
		how to use the program aswell as examples are available on the <a
			href="https://github.com/Discusser/website-generator"
			target="_blank"
			class="text-blue-500">GitHub repository</a
		>.
	</p>
</Project>
