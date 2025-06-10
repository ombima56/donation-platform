<script lang="ts">
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  // Handle case where targetAmount might be undefined or use target_amount
  $: targetAmount = data.project.targetAmount || data.project.target_amount || 0;
  
  // Safely calculate progress percentage
  $: progressPercent = targetAmount > 0 
    ? Math.min(Math.round((data.totalDonated / targetAmount) * 100), 100)
    : 0;

  // Ensure image URL is valid
  $: imageUrl = data.project.imageUrl || data.project.image_url || 'https://via.placeholder.com/800x400?text=No+Image';
</script>

<svelte:head>
  <title>{data.project.title} | Donation Platform</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
  <div class="max-w-3xl mx-auto">
    <a href="/projects" class="text-blue-600 hover:underline mb-4 inline-block">← Back to projects</a>
    
    <img 
      src={imageUrl} 
      alt={data.project.title} 
      class="w-full h-64 object-cover rounded-lg mb-6" 
      on:error={(e) => {
        e.currentTarget.src = 'https://via.placeholder.com/800x400?text=No+Image';
      }}
    />
    
    <h1 class="text-3xl font-bold mb-4">{data.project.title}</h1>
    
    <div class="mb-6">
      <div class="w-full bg-gray-200 rounded-full h-3">
        <div class="bg-blue-600 h-3 rounded-full" style="width: {progressPercent}%"></div>
      </div>
      <div class="flex justify-between mt-2">
        <span class="font-medium">KES {data.totalDonated.toLocaleString()} raised</span>
        <span class="text-gray-600">KES {targetAmount.toLocaleString()} goal</span>
      </div>
    </div>
    
    <div class="prose max-w-none mb-8">
      <p>{data.project.description}</p>
    </div>
    
    <a href="/donate/{data.project.id}" class="block text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
      Donate Now
    </a>
  </div>
</main>
