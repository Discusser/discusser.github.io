<script>
	import { copyToClipboard } from '$lib/utils/index';
</script>

<div class="space-y-2">
	<p class="text-foreground text-2xl font-bold">Contact</p>
	<p>
		You can contact me via <a
			target="_blank"
			class="text-blue-500"
			href="mailto:discussercodes@gmail.com">mail</a
		>, or on Discord:
	</p>
	<div class="grid w-1/2 auto-cols-min grid-cols-2 gap-y-2">
		<span>Email</span>
		<a
			target="_blank"
			href="mailto:discussercodes@gmail.com"
			class="hover:text-foreground underline">discussercodes@gmail.com</a
		>
		<span>GitHub</span>
		<a target="_blank" href="https://github.com/Discusser" class="underline">Discusser</a>
		<span>Discord</span>
		<div class="flex justify-start">
			<button on:click={() => copyToClipboard('Discusser')} class="underline decoration-dotted">
				Discusser
			</button>
		</div>
	</div>
</div>
