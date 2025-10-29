<script lang="ts">
	import CategoryPage from '@/components/projects/CategoryPage.svelte';
	import { Category } from '@/constants/projects';
</script>

<CategoryPage title="Other" category={Category.Other} closingText={null}>
	<p>On this page you can find all my projects that don't fit into any of the other categories:</p>
</CategoryPage>
