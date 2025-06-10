<script lang="ts">
  let name = $state('');
  let email = $state('');
  let message = $state('');
  let submitted = $state(false);
  let error = $state('');

  async function handleSubmit() {
    if (!name || !email || !message) {
      error = 'Please fill out all fields';
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Reset form and show success message
      name = '';
      email = '';
      message = '';
      error = '';
      submitted = true;
    } catch (err) {
      error = 'Something went wrong. Please try again.';
    }
  }
</script>

<svelte:head>
  <title>Contact Us | Donation Platform</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Contact Us</h1>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <p class="mb-6">
        Have questions about our platform or need assistance with your donation? 
        Fill out the form below and our team will get back to you as soon as possible.
      </p>
      
      {#if submitted}
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p>Thank you for your message! We'll get back to you soon.</p>
        </div>
      {:else}
        <form onsubmit|preventDefault={handleSubmit} class="space-y-4">
          {#if error}
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{error}</p>
            </div>
          {/if}
          
          <div>
            <label for="name" class="block text-gray-700 mb-2">Your Name</label>
            <input 
              type="text" 
              id="name" 
              bind:value={name} 
              class="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label for="email" class="block text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              id="email" 
              bind:value={email} 
              class="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label for="message" class="block text-gray-700 mb-2">Message</label>
            <textarea 
              id="message" 
              bind:value={message} 
              rows="5" 
              class="w-full p-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg"
          >
            Send Message
          </button>
        </form>
      {/if}
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Our Office</h2>
        <p class="mb-2">123 Donation Street</p>
        <p class="mb-2">Nairobi, Kenya</p>
        <p class="mb-2">P.O. Box 12345-00100</p>
      </div>
      
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Contact Information</h2>
        <p class="mb-2">Email: info@donationplatform.com</p>
        <p class="mb-2">Phone: +254 700 123 456</p>
        <p class="mb-2">Hours: Monday-Friday, 9am-5pm</p>
      </div>
    </div>
  </div>
</main>
