<script lang="ts">
  // No special imports needed for this basic page
</script>

<svelte:head>
  <title>About Us | Donation Platform</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
  <div class="max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">About Our Donation Platform</h1>
    
    <div class="prose max-w-none">
      <p class="mb-4">
        Our donation platform connects generous donors with impactful social projects across the country. 
        We believe in transparency, efficiency, and making a real difference in communities.
      </p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
      <p class="mb-4">
        To create a seamless bridge between those who want to help and those who need support, 
        ensuring that every donation makes a meaningful impact on people's lives.
      </p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li>Browse through our curated list of verified social projects</li>
        <li>Select a project that resonates with your values</li>
        <li>Make a secure donation via M-Pesa</li>
        <li>Receive confirmation of your contribution</li>
        <li>Track the project's progress and impact</li>
      </ol>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">Why Choose Us</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>100% Transparency:</strong> Track exactly where your donations go</li>
        <li><strong>No Signup Required:</strong> Donate anonymously and quickly</li>
        <li><strong>Secure Payments:</strong> Integrated with M-Pesa for safe transactions</li>
        <li><strong>Verified Projects:</strong> All projects are thoroughly vetted</li>
        <li><strong>Direct Impact:</strong> Your donations go directly to the projects</li>
      </ul>
    </div>
    
    <div class="mt-10 bg-blue-50 p-6 rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">Ready to Make a Difference?</h2>
      <p class="mb-4">Join thousands of donors who are creating positive change through our platform.</p>
      <a href="/projects" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg">
        View Projects
      </a>
    </div>
  </div>
</main>