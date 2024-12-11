<script lang="ts">
	import Project from '$lib/components/projects/Project.svelte';
	import { DRAW_3D } from '$lib/constants/projects';
</script>

<Project project={DRAW_3D}>
	<div class="flex items-stretch space-x-4">
		<p>
			This is one of, if not my most complicated program I've made on my calculator. Weighing in at
			a whopping {(7.36).toLocaleString()} kilobytes, this program allows rendering virtually any 3 dimensional
			shape, with the ability to rotate, translate, and scale at will. I was only able to make this thanks
			to my experience with OpenGL, which I learned through this
			<a target="_blank" class="text-blue-500" href="https://learnopengl.com/">book</a> that I highly
			recommend for people who want to learn 3D rendering. To be honest, the concept of the renderer
			itself is not that complex, but the implementation took a long time and a lot effort. Most of the
			work was implementing transforms and applying those to points. Fortunately, numpy provides a function
			to multiply matrices, which helped a lot. All that was left for me to do was actually implement
			the different types of transformation matrices, then multiply the coordinates of the points to
			draw with those matrices, and finally add some interactivity to allow the user to control the shape(s)
			being displayed using the calculator's keyboard.
		</p>
	</div>
</Project>
