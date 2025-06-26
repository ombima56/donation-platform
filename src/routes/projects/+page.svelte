<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();

	// Search and filter state
	let searchQuery = $state('');
	let selectedCategory = $state('all');
	let sortBy = $state('newest');

	// Categories (you can expand this based on your project categories)
	const categories = [
		{ value: 'all', label: 'All Categories' },
		{ value: 'education', label: 'Education' },
		{ value: 'health', label: 'Health' },
		{ value: 'environment', label: 'Environment' },
		{ value: 'community', label: 'Community' }
	];

	const sortOptions = [
		{ value: 'newest', label: 'Newest First' },
		{ value: 'oldest', label: 'Oldest First' },
		{ value: 'progress', label: 'Most Progress' },
		{ value: 'amount', label: 'Highest Goal' }
	];

	// Filtered and sorted projects
	const filteredProjects = $derived(() => {
		let filtered = data.projects || [];

		// Filter by search query
		if (searchQuery.trim()) {
			filtered = filtered.filter(
				(project) =>
					project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					project.description.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		// Filter by category (if you have categories in your data)
		if (selectedCategory !== 'all') {
			// This assumes you have a category field in your project data
			// filtered = filtered.filter(project => project.category === selectedCategory);
		}

		// Sort projects
		switch (sortBy) {
			case 'oldest':
				return filtered.sort(
					(a, b) => new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
				);
			case 'progress':
				return filtered.sort((a, b) => {
					const aProgress = (a.totalDonated || 0) / (a.targetAmount || a.target_amount || 1);
					const bProgress = (b.totalDonated || 0) / (b.targetAmount || b.target_amount || 1);
					return bProgress - aProgress;
				});
			case 'amount':
				return filtered.sort(
					(a, b) =>
						(b.targetAmount || b.target_amount || 0) - (a.targetAmount || a.target_amount || 0)
				);
			default: // newest
				return filtered.sort(
					(a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
				);
		}
	});
</script>

<svelte:head>
	<title>Projects | Donation Platform</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
	<div class="mx-auto max-w-6xl">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="font-display mb-4 text-4xl font-bold text-neutral-800">Discover Projects</h1>
			<p class="mx-auto max-w-2xl text-xl text-neutral-600">
				Browse our collection of impactful projects and find a cause that resonates with you.
			</p>
		</div>

		<!-- Search and Filters -->
		<div class="card mb-8 p-6">
			<div class="flex flex-col gap-4 lg:flex-row">
				<!-- Search -->
				<div class="flex-1">
					<div class="relative">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<span class="text-neutral-400">🔍</span>
						</div>
						<input
							type="text"
							bind:value={searchQuery}
							placeholder="Search projects..."
							class="form-input w-full pl-10"
						/>
					</div>
				</div>

				<!-- Category Filter -->
				<div class="lg:w-48">
					<select bind:value={selectedCategory} class="form-input w-full">
						{#each categories as category}
							<option value={category.value}>{category.label}</option>
						{/each}
					</select>
				</div>

				<!-- Sort -->
				<div class="lg:w-48">
					<select bind:value={sortBy} class="form-input w-full">
						{#each sortOptions as option}
							<option value={option.value}>{option.label}</option>
						{/each}
					</select>
				</div>
			</div>

			<!-- Results count -->
			<div class="mt-4 text-sm text-neutral-600">
				Showing {filteredProjects.length} of {(data.projects || []).length} projects
			</div>
		</div>

		<!-- Projects Grid -->
		{#if filteredProjects.length > 0}
			<div class="animate-fade-in grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each filteredProjects as project, index}
					<div style="animation-delay: {index * 100}ms" class="animate-slide-up">
						<ProjectCard {project} />
					</div>
				{/each}
			</div>
		{:else}
			<div class="py-16 text-center">
				<div class="mb-4 text-6xl">🔍</div>
				<h3 class="mb-2 text-xl font-semibold text-neutral-800">No projects found</h3>
				<p class="mb-6 text-neutral-600">Try adjusting your search or filter criteria</p>
				<button
					onclick={() => {
						searchQuery = '';
						selectedCategory = 'all';
					}}
					class="btn-primary"
				>
					Clear Filters
				</button>
			</div>
		{/if}
	</div>
</main>
