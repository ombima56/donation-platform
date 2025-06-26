<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import TrustBadges from '$lib/components/TrustBadges.svelte';
	import ImpactMetrics from '$lib/components/ImpactMetrics.svelte';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();
</script>

<svelte:head>
	<title>Donation Platform</title>
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-hero relative overflow-hidden text-white">
	<div class="absolute inset-0 bg-black/10"></div>
	<div class="relative container mx-auto px-4 py-24">
		<div class="flex flex-col items-center md:flex-row">
			<div class="animate-fade-in mb-12 md:mb-0 md:w-1/2">
				<h1
					class="font-display mb-6 text-5xl leading-tight font-bold text-white drop-shadow-lg md:text-6xl"
				>
					Make a Difference Today
				</h1>
				<p class="mb-8 text-xl leading-relaxed text-white/90 md:text-2xl">
					Support meaningful projects and help create positive change in communities around you.
				</p>
				<div class="flex flex-col gap-4 sm:flex-row">
					<a
						href="/projects"
						class="text-primary-700 shadow-large rounded-xl bg-white px-8 py-4 text-center font-bold transition-all duration-300 hover:scale-105 hover:bg-neutral-50"
					>
						Explore Projects
					</a>
					<a
						href="/about"
						class="rounded-xl border-2 border-white bg-transparent px-8 py-4 text-center font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-white/10"
					>
						Learn More
					</a>
				</div>
			</div>
			<div class="md:w-1/2">
				<img
					src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
					alt="People helping each other"
					class="rounded-lg shadow-xl"
				/>
			</div>
		</div>
	</div>
</section>

<!-- Impact Metrics Section -->
<ImpactMetrics />

<!-- Featured Projects Section -->
<section id="projects" class="bg-gray-50 py-16">
	<div class="container mx-auto px-4">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-3xl font-bold">Featured Projects</h2>
			<p class="mx-auto max-w-2xl text-gray-600">
				Browse our curated selection of impactful projects and find a cause that resonates with you.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each data.projects || [] as project}
				<ProjectCard {project} />
			{/each}
		</div>

		{#if !data.projects || data.projects.length === 0}
			<div class="py-12 text-center">
				<p class="text-gray-500">No projects available at the moment. Please check back later.</p>
			</div>
		{/if}
	</div>
</section>

<!-- How It Works Section -->
<section class="bg-white py-16">
	<div class="container mx-auto px-4">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-3xl font-bold">How It Works</h2>
			<p class="mx-auto max-w-2xl text-gray-600">
				Making a difference is easy with our simple donation process.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<div class="p-6 text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8 text-blue-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-semibold">1. Find a Project</h3>
				<p class="text-gray-600">
					Browse through our projects and find a cause that speaks to you.
				</p>
			</div>

			<div class="p-6 text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8 text-green-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-semibold">2. Make a Donation</h3>
				<p class="text-gray-600">Contribute any amount via M-Pesa to support the project.</p>
			</div>

			<div class="p-6 text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8 text-purple-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 10V3L4 14h7v7l9-11h-7z"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-semibold">3. Create Impact</h3>
				<p class="text-gray-600">Your donation directly helps the project reach its goals.</p>
			</div>
		</div>
	</div>
</section>

<!-- Testimonials Section -->
<Testimonials />

<!-- Trust Badges Section -->
<TrustBadges />

<!-- CTA Section -->
<section class="bg-gradient-hero py-16 text-white">
	<div class="container mx-auto px-4 text-center">
		<h2 class="font-display mb-4 text-3xl font-bold">Ready to Make a Difference?</h2>
		<p class="mx-auto mb-8 max-w-2xl text-xl opacity-90">
			Join thousands of donors who are creating positive change through their contributions.
		</p>
		<a
			href="/projects"
			class="btn-secondary text-primary-700 shadow-large bg-white hover:bg-neutral-100"
		>
			Start Donating Today
		</a>
	</div>
</section>
