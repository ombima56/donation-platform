<script lang="ts">
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import type { PageData } from './$types';
  
  export let data: PageData;
</script>

<svelte:head>
  <title>Projects | Donation Platform</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
  <div class="max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Projects</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each data.projects || [] as project}
        <ProjectCard {project} />
      {/each}
    </div>
    
    {#if !data.projects || data.projects.length === 0}
      <div class="text-center py-12">
        <p class="text-gray-500">No projects available at the moment. Please check back later.</p>
      </div>
    {/if}
  </div>
</main>