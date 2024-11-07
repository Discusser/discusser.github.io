<script lang="ts">
	import NavAnchor from '$lib/components/shared/NavAnchor.svelte';
</script>

<div>
	<ul>
		<li><NavAnchor href="/">Home</NavAnchor></li>
		<li>
			<NavAnchor href="/projects">Projects</NavAnchor>
			<ul>
				<li><NavAnchor href="/projects/web">Web</NavAnchor></li>
				<li><NavAnchor href="/projects/cpp">C/C++</NavAnchor></li>
				<li><NavAnchor href="/projects/python">Python</NavAnchor></li>
			</ul>
		</li>
		<li><NavAnchor href="/blog">Blog</NavAnchor></li>
		<li><NavAnchor href="/hobbies">Hobbies</NavAnchor></li>
	</ul>
</div>
