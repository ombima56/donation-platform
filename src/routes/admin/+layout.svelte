<script lang="ts">
  import { page } from '$app/stores';
  
  let { data } = $props();
  
  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: 'chart-bar' },
    { href: '/admin/projects', label: 'Projects', icon: 'folder' },
    { href: '/admin/donations', label: 'Donations', icon: 'cash' }
  ];
  
  function isActive(path: string) {
    return $page.url.pathname === path || 
           ($page.url.pathname.startsWith(path) && path !== '/admin');
  }
  
  // Check if we're on the login page
  const isLoginPage = $derived($page.url.pathname === '/admin/login');
</script>

{#if isLoginPage}
  <slot />
{:else}
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-blue-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
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
                      ? 'bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium' 
                      : 'text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium'}
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
                <a href="/admin/logout" class="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                  Logout
                </a>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
{/if}
