<script lang="ts">
	import type { Project } from '$lib/types';
	import { onMount } from 'svelte';

	let { project } = $props<{ project: Project }>();

	// Handle different property names and ensure we have a valid number
	const targetAmount = $derived(project.targetAmount || project.target_amount || 0);

	// State for total donations
	let totalDonations = $state(0);

	// Calculate progress percentage with additional safety checks
	const progressPercent = $derived(
		targetAmount > 0 ? Math.min(Math.round((totalDonations / targetAmount) * 100), 100) : 0
	);

	// Fetch the actual donations for this project
	async function fetchDonations() {
		try {
			const response = await fetch(`/api/projects/${project.id}/donations`);
			if (response.ok) {
				const data = await response.json();
				totalDonations = data.totalAmount || 0;
			}
		} catch (error) {
			console.error('Error fetching donations:', error);
			totalDonations = 0;
		}
	}

	// Image handling
	let imageError = $state(false);
	let imageUrl = $state('');

	// Update image URL when project changes
	$effect(() => {
		const url = project.imageUrl || project.image_url;
		imageUrl = url || 'https://via.placeholder.com/400x200?text=No+Image';
		imageError = false;
	});

	function handleImageError() {
		imageError = true;
		imageUrl = 'https://via.placeholder.com/400x200?text=Image+Not+Available';
	}

	// Preload image and fetch donations when component mounts
	onMount(() => {
		if (project.imageUrl || project.image_url) {
			const img = new Image();
			img.onerror = handleImageError;
			img.src = imageUrl;
		}

		// Fetch actual donations
		fetchDonations();
	});
</script>

<div class="card-hover group">
	{#if imageError}
		<div
			class="flex h-52 w-full items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200"
		>
			<span class="text-sm font-medium text-neutral-500">Image not available</span>
		</div>
	{:else}
		<div class="relative overflow-hidden">
			<img
				src={imageUrl}
				alt={project.title || 'Project image'}
				class="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
				onerror={handleImageError}
			/>
			<div
				class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
			></div>
		</div>
	{/if}

	<div class="p-6">
		<div class="mb-3 flex items-start justify-between">
			<h2
				class="font-display group-hover:text-primary-600 text-xl font-semibold text-neutral-800 transition-colors duration-200"
			>
				{project.title}
			</h2>
			<span
				class="bg-secondary-100 text-secondary-800 border-secondary-200 rounded-full border px-3 py-1 text-xs font-medium"
				>Active</span
			>
		</div>

		<p class="mb-6 line-clamp-3 leading-relaxed text-neutral-600">{project.description}</p>

		<div class="mb-6">
			<div class="mb-2 flex justify-between text-sm">
				<span class="font-semibold text-neutral-800">KES {totalDonations.toLocaleString()}</span>
				<span class="text-neutral-500">KES {targetAmount.toLocaleString()} goal</span>
			</div>
			<div class="progress-bar mb-2 h-3">
				<div class="progress-fill h-full rounded-full" style="width: {progressPercent}%"></div>
			</div>
			<div class="text-xs font-medium text-neutral-500">{progressPercent}% funded</div>
		</div>

		<div class="flex space-x-3">
			<a href="/projects/{project.id}" class="btn-outline flex-1 px-4 py-2.5 text-center text-sm">
				View Details
			</a>
			<a
				href="/donate/{project.id}"
				class="btn-secondary transform px-4 py-2.5 text-sm transition-all duration-200 hover:scale-105"
			>
				Donate
			</a>
		</div>
	</div>
</div>
