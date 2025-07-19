<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import type { Article } from '@/constants/articles';
	import { cn } from '@/utils';

	const {
		article,
		class: className,
		...restProps
	}: {
		article: Article;
		class?: string;
	} = $props();
</script>

<div class={cn('flex', className)} {...restProps}>
	<Card.Root class="flex-grow justify-between">
		<Card.Header>
			<Card.Title
				><a href={'/blog/articles/' + article.id} class="text-blue-500">{article.title}</a
				></Card.Title
			>
			{#if article.tags != undefined}
				<div class="mt-1 flex flex-wrap space-x-1">
					{#each article.tags as tag (tag)}
						<span class="text-muted-foreground bg-muted mb-1 rounded-md px-1 py-0.5 text-xs">
							{tag}
						</span>
					{/each}
				</div>
			{/if}
		</Card.Header>
		<Card.Content class="text-muted-foreground">
			{article.description}
		</Card.Content>
		<Card.Footer>
			<span class="text-muted-foreground text-sm">
				{article.date.toLocaleDateString()}
			</span>
		</Card.Footer>
	</Card.Root>
</div>
