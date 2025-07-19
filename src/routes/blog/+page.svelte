<script lang="ts">
	import ArticleCard from '$lib/components/blog/ArticleCard.svelte';
	import { articles } from '$lib/constants/articles';
</script>

<div class="flex flex-col space-y-4">
	<p class="text-foreground text-2xl font-bold">Blog</p>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		{#each articles as article (article.title)}
			<ArticleCard {article} />
		{/each}
	</div>
</div>
