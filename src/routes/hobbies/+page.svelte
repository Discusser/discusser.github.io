<script lang="ts">
	import BooksTable from '$lib/components/hobbies/BooksTable.svelte';
	import PianoTable from '$lib/components/hobbies/PianoTable.svelte';
</script>

<div class="flex flex-col space-y-4">
	<p class="text-2xl font-bold text-foreground">Hobbies</p>
	<p>
		In my free time, aside from programming, I like playing the piano, working out, and reading. On
		this page you can find most of the pieces that I've played on the piano, aswell as most of the
		books I've read. I decided to do this so I can just keep track of those things.
	</p>
	<p class="text-2xl font-bold text-foreground">Piano</p>
	<p>
		Below is a list of most of the pieces I've learned on the piano ever since the summer of 2023:
	</p>
	<PianoTable />
	<p class="text-2xl font-bold text-foreground">Reading</p>
	<p>Below is a list of the most notable books I've read:</p>
	<BooksTable />
</div>
