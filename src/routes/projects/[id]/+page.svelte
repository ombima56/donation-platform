<script lang="ts">
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  $: progressPercent = Math.min(
    Math.round((data.totalDonated / data.project.targetAmount) * 100),
    100
  );
</script>

<svelte:head>
  <title>{data.project.title} | Donation Platform</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
  <div class="max-w-3xl mx-auto">
    <a href="/" class="text-blue-600 hover:underline mb-4 inline-block">← Back to projects</a>
    
    {#if data.project.imageUrl}
      <img src={data.project.imageUrl} alt={data.project.title} class="w-full h-64 object-cover rounded-lg mb-6" />
    {/if}
    
    <h1 class="text-3xl font-bold mb-4">{data.project.title}</h1>
    
    <div class="mb-6">
      <div class="w-full bg-gray-200 rounded-full h-3">
        <div class="bg-blue-600 h-3 rounded-full" style="width: {progressPercent}%"></div>
      </div>
      <div class="flex justify-between mt-2">
        <span class="font-medium">${data.totalDonated.toLocaleString()} raised</span>
        <span class="text-gray-600">${data.project.targetAmount.toLocaleString()} goal</span>
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