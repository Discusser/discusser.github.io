<script lang="ts">
	import { IconBrandGithub, IconMail } from '@tabler/icons-svelte';
</script>

<hr />
<div class="flex justify-around p-8">
	<p class="text-muted-foreground/50">Web page made by Discusser with Svelte</p>
	<div class="flex space-x-4">
		<a
			class="text-muted-foreground hover:text-muted-foreground/80"
			href="mailto:discussercodes@gmail.com"
		>
			<IconMail />
		</a>
		<a
			class="text-muted-foreground hover:text-muted-foreground/80"
			href="https://github.com/Discusser"
		>
			<IconBrandGithub />
		</a>
	</div>
</div>
