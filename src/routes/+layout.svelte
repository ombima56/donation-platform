<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	// Using $derived instead of $: for Svelte 5 runes mode
	const isActive = $derived((path: string) => $page.url.pathname === path);
</script>

<!-- Navigation -->
<header
	class="shadow-soft sticky top-0 z-50 border-b border-neutral-100 bg-white/95 backdrop-blur-sm"
>
	<div class="container mx-auto px-4">
		<div class="flex items-center justify-between py-4">
			<a
				href="/"
				class="font-display text-gradient text-2xl font-bold transition-transform duration-200 hover:scale-105"
			>
				DonationPlatform
			</a>

			<!-- Desktop Navigation -->
			<nav class="hidden space-x-8 md:flex">
				<a
					href="/"
					class={`font-medium transition-colors duration-200 ${isActive('/') ? 'text-primary-600 border-primary-600 border-b-2 pb-1' : 'hover:text-primary-600 text-neutral-600'}`}
					>Home</a
				>
				<a
					href="/about"
					class={`font-medium transition-colors duration-200 ${isActive('/about') ? 'text-primary-600 border-primary-600 border-b-2 pb-1' : 'hover:text-primary-600 text-neutral-600'}`}
					>About</a
				>
				<a
					href="/projects"
					class={`font-medium transition-colors duration-200 ${isActive('/projects') ? 'text-primary-600 border-primary-600 border-b-2 pb-1' : 'hover:text-primary-600 text-neutral-600'}`}
					>Projects</a
				>
				<a
					href="/contact"
					class={`font-medium transition-colors duration-200 ${isActive('/contact') ? 'text-primary-600 border-primary-600 border-b-2 pb-1' : 'hover:text-primary-600 text-neutral-600'}`}
					>Contact</a
				>
			</nav>

			<div class="hidden items-center space-x-4 md:flex">
				<a
					href="/admin/login"
					class="hover:text-primary-600 font-medium text-neutral-600 transition-colors duration-200"
					>Admin Login</a
				>
				<a
					href="/projects"
					class="btn-primary shadow-colored hover:shadow-large transform hover:scale-105"
				>
					Donate Now
				</a>
			</div>

			<!-- Mobile menu button -->
			<button class="text-gray-600 md:hidden" onclick={toggleMenu} aria-label="Toggle menu">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>
		</div>
	</div>

	<!-- Mobile Navigation -->
	{#if isMenuOpen}
		<div class="border-t border-gray-200 bg-white py-2 md:hidden">
			<div class="container mx-auto px-4">
				<nav class="flex flex-col space-y-3 py-3">
					<a href="/" class="rounded px-3 py-2 font-medium hover:bg-gray-100" onclick={closeMenu}
						>Home</a
					>
					<a
						href="/about"
						class="rounded px-3 py-2 font-medium hover:bg-gray-100"
						onclick={closeMenu}>About</a
					>
					<a
						href="/projects"
						class="rounded px-3 py-2 font-medium hover:bg-gray-100"
						onclick={closeMenu}>Projects</a
					>
					<a
						href="/contact"
						class="rounded px-3 py-2 font-medium hover:bg-gray-100"
						onclick={closeMenu}>Contact</a
					>
					<a
						href="/admin/login"
						class="rounded px-3 py-2 font-medium hover:bg-gray-100"
						onclick={closeMenu}>Admin Login</a
					>
					<a
						href="/projects"
						class="rounded bg-blue-600 px-3 py-2 font-medium text-white hover:bg-blue-700"
						onclick={closeMenu}>Donate Now</a
					>
				</nav>
			</div>
		</div>
	{/if}
</header>

{@render children()}

<!-- Include the Footer component on all pages -->
<Footer />
