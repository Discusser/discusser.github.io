<script lang="ts">
	import ProjectsTable from '$lib/components/projects/ProjectsTable.svelte';
</script>

<div class="flex flex-col space-y-4">
	<p class="text-2xl font-bold text-foreground">Python</p>
	<p>
		In my opinion, Python is an amazing language for scripting, but it can get quite cumbersome to
		use for more complicated purposes. The main thing that I dislike is the lack of real types
		(Python only has type hints, which technically only exist to the editor), which in turn causes
		most Python libraries to be untyped, or to have weird types, which can make the editor think
		that your code is wrong when it's completely fine, or think that your code is fine when it's
		totally wrong. On top of that, Python is an interpreted language, which just makes it harder to
		spot these types of errors. However, the calculator (<a
			target="_blank"
			href="https://www.numworks.com/">NumWorks</a
		>) I got for school has a Python editor, which I use when I'm bored in class. With this, I've
		made a few different projects, ranging from simple games like snake, or flappy bird, to more
		sophisticated programs, such as my <i>magnum opus</i>, a 3D renderer. On top of that, I also
		like to use Python for making small scripts for my own needs.
	</p>
	<p>
		Programming on the calculator is quite slow, since the keyboard is not the same, and therefore
		typing is a lot slower. On top of that, I only have very basic functions for rendering provided
		by the calculator's libraries. The rendering library, Kandinsky, gives four functions: <code
			>get_pixel</code
		>, <code>set_pixel</code>, <code>draw_string</code>, <code>fill_rect</code>. This works fairly
		well, up until you decide that you want to draw diagonal lines. With traditional 3D engines,
		this isn't a problem, since every object is just made up of triangles, and the triangles can
		have diagonal lines or straight lines with any issues. However, on my calculator, I guess the
		developers didn't bother making their rendering library too complicated, therefore I'm stuck
		with a suboptimal solution for rendering, which leads to awful performance, especially
		considering that my programs run on a calculator, and not a computer. Either way, with all the
		experience I have from writing programs on my calculator, I've found ways to draw all types of
		shapes, but at the cost of performance.
	</p>
	<p>You can find most of my Python projects here:</p>
	<ProjectsTable categories={['python']} />
</div>
