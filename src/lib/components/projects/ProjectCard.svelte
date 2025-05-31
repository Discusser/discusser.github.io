<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import type { Project } from '@/constants/projects';
	import { cn } from '@/utils';
	import { IconBrandGithub } from '@tabler/icons-svelte';
	import { Button } from '@/components/ui/button';
	import { getGithubURLForProject, getPageURLForProject } from '@/utils/index';

	const {
		project,
		class: className,
		...restProps
	}: {
		project: Project;
		class?: string;
	} = $props();
</script>

<div class={cn('flex', className)} {...restProps}>
	<Card.Root class="flex-grow justify-between">
		<Card.Header>
			<Card.Title>
				<div class="relative flex">
					{#if project.hasPage}
						<a href={getPageURLForProject(project)} class="text-blue-500">{project.label}</a>
					{:else}
						<span class="text-muted-foreground">{project.label}</span>
					{/if}
					{#if project.hasGithub}
						<Button
							class="absolute right-0 hover:cursor-pointer"
							variant="ghost"
							size="icon"
							href={getGithubURLForProject(project)}
							target="_blank"
						>
							<IconBrandGithub />
						</Button>
					{/if}
				</div>
			</Card.Title>
			<div class="mt-1 flex flex-wrap space-x-1 font-normal">
				<span class="text-muted-foreground bg-muted mb-1 rounded-md px-1 py-0.5 text-xs">
					{project.category}
				</span>
			</div>
		</Card.Header>
		<Card.Content class="text-muted-foreground">
			{project.notes}
		</Card.Content>
	</Card.Root>
</div>
