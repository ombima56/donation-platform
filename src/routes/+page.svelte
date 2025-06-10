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

<!-- Footer -->
<footer class="bg-gray-800 text-white py-12">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 class="text-xl font-bold mb-4">Donation Platform</h3>
        <p class="text-gray-400">Supporting meaningful projects and creating positive change in communities.</p>
      </div>
      
      <div>
        <h4 class="font-semibold mb-4">Quick Links</h4>
        <ul class="space-y-2">
          <li><a href="/" class="text-gray-400 hover:text-white">Home</a></li>
          <li><a href="/about" class="text-gray-400 hover:text-white">About Us</a></li>
          <li><a href="/projects" class="text-gray-400 hover:text-white">Projects</a></li>
          <li><a href="/contact" class="text-gray-400 hover:text-white">Contact</a></li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-semibold mb-4">Legal</h4>
        <ul class="space-y-2">
          <li><a href="/terms" class="text-gray-400 hover:text-white">Terms of Service</a></li>
          <li><a href="/privacy" class="text-gray-400 hover:text-white">Privacy Policy</a></li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-semibold mb-4">Connect With Us</h4>
        <div class="flex space-x-4">
          <a href="/social/facebook" class="text-gray-400 hover:text-white">
            <span class="sr-only">Facebook</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
            </svg>
          </a>
          <a href="/social/twitter" class="text-gray-400 hover:text-white">
            <span class="sr-only">Twitter</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="/social/instagram" class="text-gray-400 hover:text-white">
            <span class="sr-only">Instagram</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
    
    <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
      <p>&copy; {new Date().getFullYear()} Donation Platform. All rights reserved.</p>
    </div>
  </div>
</footer>
