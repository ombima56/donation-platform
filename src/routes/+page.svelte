<script lang="ts">
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import type { PageData } from './$types';
  
  export let data: PageData;
</script>

<svelte:head>
  <title>Donation Platform</title>
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
  <div class="container mx-auto px-4 py-20">
    <div class="flex flex-col md:flex-row items-center">
      <div class="md:w-1/2 mb-10 md:mb-0">
        <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-4">Make a Difference Today</h1>
        <p class="text-xl mb-8 text-blue-100">Support meaningful projects and help create positive change in communities around you.</p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="/projects" class="bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg text-center">
            Explore Projects
          </a>
          <a href="/about" class="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-8 rounded-lg text-center">
            Learn More
          </a>
        </div>
      </div>
      <div class="md:w-1/2">
        <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="People helping each other" class="rounded-lg shadow-xl" />
      </div>
    </div>
  </div>
</section>

<!-- Stats Section -->
<section class="bg-white py-12">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div class="bg-blue-50 p-6 rounded-lg">
        <div class="text-4xl font-bold text-blue-600 mb-2">100+</div>
        <div class="text-gray-600">Projects Funded</div>
      </div>
      <div class="bg-green-50 p-6 rounded-lg">
        <div class="text-4xl font-bold text-green-600 mb-2">$2M+</div>
        <div class="text-gray-600">Donations Raised</div>
      </div>
      <div class="bg-purple-50 p-6 rounded-lg">
        <div class="text-4xl font-bold text-purple-600 mb-2">50K+</div>
        <div class="text-gray-600">Lives Impacted</div>
      </div>
    </div>
  </div>
</section>

<!-- Featured Projects Section -->
<section id="projects" class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold mb-4">Featured Projects</h2>
      <p class="text-gray-600 max-w-2xl mx-auto">Browse our curated selection of impactful projects and find a cause that resonates with you.</p>
    </div>
    
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
</section>

<!-- How It Works Section -->
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold mb-4">How It Works</h2>
      <p class="text-gray-600 max-w-2xl mx-auto">Making a difference is easy with our simple donation process.</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="text-center p-6">
        <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">1. Find a Project</h3>
        <p class="text-gray-600">Browse through our projects and find a cause that speaks to you.</p>
      </div>
      
      <div class="text-center p-6">
        <div class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">2. Make a Donation</h3>
        <p class="text-gray-600">Contribute any amount via M-Pesa to support the project.</p>
      </div>
      
      <div class="text-center p-6">
        <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">3. Create Impact</h3>
        <p class="text-gray-600">Your donation directly helps the project reach its goals.</p>
      </div>
    </div>
  </div>
</section>

<!-- Testimonials Section -->
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold mb-4">What People Say</h2>
      <p class="text-gray-600 max-w-2xl mx-auto">Hear from our community of donors and project creators.</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center mb-4">
          <div class="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
            <span class="text-blue-600 font-bold text-xl">JD</span>
          </div>
          <div>
            <h4 class="font-semibold">John Doe</h4>
            <p class="text-gray-500 text-sm">Donor</p>
          </div>
        </div>
        <p class="text-gray-600">"The donation process was incredibly simple, and I love being able to see the direct impact of my contribution."</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center mb-4">
          <div class="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
            <span class="text-green-600 font-bold text-xl">JS</span>
          </div>
          <div>
            <h4 class="font-semibold">Jane Smith</h4>
            <p class="text-gray-500 text-sm">Project Creator</p>
          </div>
        </div>
        <p class="text-gray-600">"This platform has helped us reach our funding goals faster than we ever expected. The support has been amazing."</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center mb-4">
          <div class="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
            <span class="text-purple-600 font-bold text-xl">MJ</span>
          </div>
          <div>
            <h4 class="font-semibold">Mark Johnson</h4>
            <p class="text-gray-500 text-sm">Beneficiary</p>
          </div>
        </div>
        <p class="text-gray-600">"The funds raised through this platform have made a real difference in our community. We're grateful for every donation."</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="bg-blue-600 text-white py-16">
  <div class="container mx-auto px-4 text-center">
    <h2 class="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
    <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Join thousands of donors who are creating positive change through their contributions.</p>
    <a href="/projects" class="bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg inline-block">
      Donate Now
    </a>
  </div>
</section>

