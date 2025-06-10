<script lang="ts">
  import type { Project } from '$lib/types';
  
  export let project: Project;
  
  // Handle different property names and ensure we have a valid number
  $: targetAmount = project.targetAmount || project.target_amount || 0;
  
  // Calculate progress percentage with additional safety checks
  $: progressPercent = targetAmount > 0 
    ? Math.min(Math.round((getTotalDonations() / targetAmount) * 100), 100)
    : 0;
  
  function getTotalDonations() {
    if (!project || targetAmount <= 0) return 0;
    // This would be replaced with actual data
    return Math.floor(Math.random() * targetAmount * 0.7); // Placeholder for demo
  }

  // Ensure image URL is valid
  $: imageUrl = project.imageUrl || project.image_url || 'https://via.placeholder.com/400x200?text=No+Image';
</script>

<div class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
  <img 
    src={imageUrl} 
    alt={project.title || 'Project image'} 
    class="w-full h-48 object-cover"
    on:error={(e) => {
      e.currentTarget.src = 'https://via.placeholder.com/400x200?text=No+Image';
    }}
  />
  
  <div class="p-6">
    <div class="flex justify-between items-start mb-2">
      <h2 class="text-xl font-semibold text-gray-800">{project.title}</h2>
      <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Active</span>
    </div>
    
    <p class="text-gray-600 mb-6 line-clamp-3">{project.description}</p>
    
    <div class="mb-6">
      <div class="flex justify-between text-sm mb-1">
        <span class="font-medium">KES {getTotalDonations().toLocaleString()}</span>
        <span class="text-gray-500">KES {targetAmount.toLocaleString()} goal</span>
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
