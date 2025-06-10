<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

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
<header class="bg-white shadow-sm sticky top-0 z-50">
	<div class="container mx-auto px-4">
		<div class="flex justify-between items-center py-4">
			<a href="/" class="text-2xl font-bold text-blue-600">DonationPlatform</a>
			
			<!-- Desktop Navigation -->
			<nav class="hidden md:flex space-x-8">
				<a href="/" class={`font-medium ${isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Home</a>
				<a href="/about" class={`font-medium ${isActive('/about') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>About</a>
				<a href="/projects" class={`font-medium ${isActive('/projects') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Projects</a>
				<a href="/contact" class={`font-medium ${isActive('/contact') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Contact</a>
			</nav>
			
			<div class="hidden md:block">
				<a href="/admin/login" class="text-gray-600 hover:text-blue-600 font-medium mr-4">Admin Login</a>
				<a href="/projects" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
					Donate Now
				</a>
			</div>
			
			<!-- Mobile menu button -->
			<button 
				class="md:hidden text-gray-600" 
				onclick={toggleMenu}
				aria-label="Toggle menu"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
		</div>
	</div>
	
	<!-- Mobile Navigation -->
	{#if isMenuOpen}
		<div class="md:hidden bg-white border-t border-gray-200 py-2">
			<div class="container mx-auto px-4">
				<nav class="flex flex-col space-y-3 py-3">
					<a href="/" class="font-medium px-3 py-2 rounded hover:bg-gray-100" onclick={closeMenu}>Home</a>
					<a href="/about" class="font-medium px-3 py-2 rounded hover:bg-gray-100" onclick={closeMenu}>About</a>
					<a href="/projects" class="font-medium px-3 py-2 rounded hover:bg-gray-100" onclick={closeMenu}>Projects</a>
					<a href="/contact" class="font-medium px-3 py-2 rounded hover:bg-gray-100" onclick={closeMenu}>Contact</a>
					<a href="/admin/login" class="font-medium px-3 py-2 rounded hover:bg-gray-100" onclick={closeMenu}>Admin Login</a>
					<a href="/projects" class="bg-blue-600 text-white font-medium px-3 py-2 rounded hover:bg-blue-700" onclick={closeMenu}>Donate Now</a>
				</nav>
			</div>
		</div>
	{/if}
</header>

<slot />

<footer class="bg-gray-800 text-white py-12">
	<div class="container mx-auto px-4">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div>
				<h3 class="text-xl font-semibold mb-4">DonationPlatform</h3>
				<p class="text-gray-300">
					Connecting donors with impactful social projects across Kenya.
				</p>
			</div>
			
			<div>
				<h3 class="text-xl font-semibold mb-4">Quick Links</h3>
				<ul class="space-y-2">
					<li><a href="/" class="text-gray-300 hover:text-white">Home</a></li>
					<li><a href="/about" class="text-gray-300 hover:text-white">About Us</a></li>
					<li><a href="/projects" class="text-gray-300 hover:text-white">Projects</a></li>
					<li><a href="/contact" class="text-gray-300 hover:text-white">Contact</a></li>
				</ul>
			</div>
			
			<div>
				<h3 class="text-xl font-semibold mb-4">Contact Us</h3>
				<p class="text-gray-300 mb-2">Email: info@donationplatform.com</p>
				<p class="text-gray-300 mb-2">Phone: +254 700 123 456</p>
			</div>
		</div>
		
		<div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
			<p>&copy; {new Date().getFullYear()} DonationPlatform. All rights reserved.</p>
		</div>
	</div>
</footer>
