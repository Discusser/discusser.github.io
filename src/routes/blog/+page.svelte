<script lang="ts">
	import ArticleCard from '$lib/components/blog/ArticleCard.svelte';
	import type { Article } from '$lib/constants/articles';
	import { articles } from '$lib/constants/articles';
</script>

<div class="flex flex-col space-y-4">
	<p class="text-foreground text-2xl font-bold">Blog</p>
	<div class="grid grid-cols-2 gap-4">
		{#each articles as article}
			<ArticleCard {article} />
		{/each}
	</div>
</div>
