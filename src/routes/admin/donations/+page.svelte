<script lang="ts">
  import type { PageData } from './$types';
  import { page } from '$app/stores';
  
  let { data } = $props();
  
  // Format date for display
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString();
  }
  
  // Format currency
  function formatCurrency(amount: number) {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }
  
  // Build URL with updated query parameters
  function buildFilterUrl(params: Record<string, string | null>) {
    const url = new URL($page.url);
    
    // Update or remove each parameter
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === '') {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, value);
      }
    });
    
    return url.toString();
  }
  
  // Toggle sort order
  function toggleSort(field: string) {
    const newSortBy = field;
    const newSortOrder = 
      data.filters.sortBy === field && data.filters.sortOrder === 'desc' 
        ? 'asc' 
        : 'desc';
    
    window.location.href = buildFilterUrl({
      sort: newSortBy,
      order: newSortOrder
    });
  }
  
  // Reset all filters
  function resetFilters() {
    window.location.href = '/admin/donations';
  }
  
  // State for filter form
  let projectFilter = $state(data.filters.projectId || '');
  let minAmountFilter = $state(data.filters.minAmount || '');
  let maxAmountFilter = $state(data.filters.maxAmount || '');
  
  // Apply filters
  function applyFilters() {
    window.location.href = buildFilterUrl({
      project: projectFilter,
      min: minAmountFilter,
      max: maxAmountFilter,
      sort: data.filters.sortBy,
      order: data.filters.sortOrder
    });
  }
</script>

<svelte:head>
  <title>Manage Donations | Admin Dashboard</title>
</svelte:head>

<div class="px-4 py-6">
  <h1 class="text-2xl font-semibold text-gray-900 mb-6">Donations</h1>
  
  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Total Donations
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {data.stats.count}
        </dd>
      </div>
    </div>
    
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Total Amount
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {formatCurrency(data.stats.total || 0)}
        </dd>
      </div>
    </div>
  </div>
  
  <!-- Filters -->
  <div class="bg-white shadow rounded-lg mb-6">
    <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Filter Donations
      </h3>
    </div>
    <div class="p-4 sm:p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label for="project" class="block text-sm font-medium text-gray-700 mb-1">Project</label>
          <select 
            id="project" 
            bind:value={projectFilter}
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">All Projects</option>
            {#each data.projects as project}
              <option value={project.id}>{project.title}</option>
            {/each}
          </select>
        </div>
        
        <div>
          <label for="min-amount" class="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
          <input 
            type="number" 
            id="min-amount" 
            bind:value={minAmountFilter}
            placeholder="Min amount" 
            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label for="max-amount" class="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
          <input 
            type="number" 
            id="max-amount" 
            bind:value={maxAmountFilter}
            placeholder="Max amount" 
            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      
      <div class="mt-4 flex justify-end space-x-3">
        <button 
          type="button" 
          class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onclick={resetFilters}
        >
          Reset
        </button>
        <button 
          type="button" 
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onclick={applyFilters}
        >
          Apply Filters
        </button>
      </div>
    </div>
  </div>
  
  <!-- Donations Table -->
  <div class="bg-white shadow rounded-lg overflow-hidden">
    <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Donations List
      </h3>
    </div>
    
    {#if data.donations.length === 0}
      <div class="p-6 text-center text-gray-500">
        No donations found matching your criteria.
      </div>
    {:else}
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  class="group inline-flex items-center" 
                  onclick={() => toggleSort('date')}
                >
                  Date
                  {#if data.filters.sortBy === 'date'}
                    <span class="ml-1 text-gray-400 group-hover:text-gray-500">
                      {data.filters.sortOrder === 'desc' ? '↓' : '↑'}
                    </span>
                  {/if}
                </button>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  class="group inline-flex items-center" 
                  onclick={() => toggleSort('amount')}
                >
                  Amount
                  {#if data.filters.sortBy === 'amount'}
                    <span class="ml-1 text-gray-400 group-hover:text-gray-500">
                      {data.filters.sortOrder === 'desc' ? '↓' : '↑'}
                    </span>
                  {/if}
                </button>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Receipt
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Anonymous
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each data.donations as donation}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(donation.donation_date)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <a href="/admin/projects?id={donation.project_id}" class="text-blue-600 hover:text-blue-900 hover:underline">
                    {donation.project_title}
                  </a>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {formatCurrency(donation.amount)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {donation.mpesa_receipt_number || 'Pending'}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {donation.is_anonymous ? 'Yes' : 'No'}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>