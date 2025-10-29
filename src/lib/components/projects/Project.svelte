<script lang="ts">
	import type { Project } from '$lib/constants/projects';
	import { getGithubURLForProject } from '$lib/utils/index';
	import { IconBrandGithub } from '@tabler/icons-svelte';
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import { Button } from '$lib/components/ui/button';

	const {
		children,
		project,
		class: className,
		...restProps
	}: {
		children?: Snippet;
		project: Project;
		class?: string;
	} = $props();
</script>

<div class={twMerge('flex flex-col space-y-4', className)} {...restProps}>
	<div class="flex items-center space-x-4">
		<p class=" text-foreground text-2xl font-bold">
			{project.label}
		</p>
		{#if project.hasGithub}
			<Button target="_blank" href={getGithubURLForProject(project)} variant="outline" size="icon">
				<IconBrandGithub />
			</Button>
		{/if}
	</div>

	{#if children}
		{@render children()}
	{/if}
</div>
