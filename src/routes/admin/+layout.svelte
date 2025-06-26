<script lang="ts">
	import { page } from '$app/stores';

	let { data, children } = $props();

	const navItems = [
		{ href: '/admin', label: 'Dashboard', icon: 'chart-bar' },
		{ href: '/admin/projects', label: 'Projects', icon: 'folder' },
		{ href: '/admin/donations', label: 'Donations', icon: 'cash' }
	];

	function isActive(path: string) {
		return (
			$page.url.pathname === path || ($page.url.pathname.startsWith(path) && path !== '/admin')
		);
	}

	// Check if we're on the login page
	const isLoginPage = $derived($page.url.pathname === '/admin/login');
</script>

{#if isLoginPage}
	{@render children()}
{:else}
	<div class="min-h-screen bg-gray-100">
		<nav class="bg-blue-600 text-white">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="flex h-16 items-center justify-between">
					<div class="flex items-center">
						<div class="flex-shrink-0">
							<span class="text-xl font-bold">Donation Admin</span>
						</div>
						<div class="hidden md:block">
							<div class="ml-10 flex items-baseline space-x-4">
								{#each navItems as item}
									<a
										href={item.href}
										class={isActive(item.href)
											? 'rounded-md bg-blue-700 px-3 py-2 text-sm font-medium text-white'
											: 'rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-500'}
									>
										{item.label}
									</a>
								{/each}
							</div>
						</div>
					</div>
					<div class="hidden md:block">
						<div class="ml-4 flex items-center md:ml-6">
							{#if data.user}
								<span class="mr-4">{data.user.email}</span>
								<a
									href="/admin/logout"
									class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
								>
									Logout
								</a>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</nav>

		<main class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
			{@render children()}
		</main>
	</div>
{/if}
