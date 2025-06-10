<script lang="ts">
  import type { PageData } from './$types';
  
  export let data: PageData;
</script>

<svelte:head>
  <title>Admin Dashboard | Donation Platform</title>
</svelte:head>

<div class="px-4 py-6">
  <h1 class="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Total Projects
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {data.stats.totalProjects}
        </dd>
      </div>
    </div>
    
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Active Projects
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {data.stats.activeProjects}
        </dd>
      </div>
    </div>
    
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Total Donations
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {data.stats.totalDonations}
        </dd>
      </div>
    </div>
    
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Total Amount
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          ${data.stats.totalAmount.toLocaleString()}
        </dd>
      </div>
    </div>
  </div>
  
  <div class="bg-white shadow rounded-lg">
    <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Recent Donations
      </h3>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Project
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Anonymous
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each data.recentDonations as donation}
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(donation.donation_date).toLocaleString()}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {donation.project_title}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${donation.amount.toLocaleString()}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {donation.is_anonymous ? 'Yes' : 'No'}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>