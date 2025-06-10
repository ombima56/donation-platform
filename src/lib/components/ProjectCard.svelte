<script lang="ts">
  import type { Project } from '$lib/types';
  
  export let project: Project;
  
  // Calculate progress percentage
  $: progressPercent = Math.min(
    Math.round((getTotalDonations() / project.targetAmount) * 100),
    100
  );
  
  function getTotalDonations() {
    // This would be replaced with actual data
    return Math.floor(Math.random() * project.targetAmount * 0.7); // Placeholder for demo
  }
</script>

<div class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
  {#if project.imageUrl}
    <img src={project.imageUrl} alt={project.title} class="w-full h-48 object-cover" />
  {:else}
    <div class="w-full h-48 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  {/if}
  
  <div class="p-6">
    <div class="flex justify-between items-start mb-2">
      <h2 class="text-xl font-semibold text-gray-800">{project.title}</h2>
      <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Active</span>
    </div>
    
    <p class="text-gray-600 mb-6 line-clamp-3">{project.description}</p>
    
    <div class="mb-6">
      <div class="flex justify-between text-sm mb-1">
        <span class="font-medium">${getTotalDonations().toLocaleString()}</span>
        <span class="text-gray-500">${project.targetAmount.toLocaleString()} goal</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5 mb-1">
        <div class="bg-blue-600 h-2.5 rounded-full" style="width: {progressPercent}%"></div>
      </div>
      <div class="text-xs text-gray-500">{progressPercent}% funded</div>
    </div>
    
    <div class="flex space-x-3">
      <a href="/projects/{project.id}" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-2 px-4 rounded-lg transition-colors">
        View Details
      </a>
      <a href="/donate/{project.id}" class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
        Donate
      </a>
    </div>
  </div>
</div>
