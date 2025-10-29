<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
	import * as Avatar from '$lib/components/ui/avatar';
</script>

<div class="my-8 flex flex-col items-center space-y-2">
	<Avatar.Root class="h-16 w-16">
		<Avatar.Image src="discusser_avatar.png" alt="@avatar" />
		<Avatar.Fallback><Skeleton class="h-full w-full" /></Avatar.Fallback>
	</Avatar.Root>
	<div class="text-center">
		<p class="text-foreground text-2xl font-bold">Discusser</p>
		<p>I like programming</p>
	</div>
</div>
