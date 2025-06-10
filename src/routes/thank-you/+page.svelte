<script lang="ts">
  import type { PageData } from './$types';
  
  export let data: PageData;
</script>

<svelte:head>
  <title>Thank You | Donation Platform</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
  <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
    <div class="mb-6">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h1 class="text-2xl font-bold mb-2">Thank You for Your Donation!</h1>
      <p class="text-gray-600">Your support makes a difference.</p>
    </div>
    
    <div class="bg-gray-50 rounded-lg p-4 mb-6 text-left">
      <div class="mb-2">
        <span class="text-gray-500">Project:</span>
        <span class="font-medium ml-2">{data.donation.project_title}</span>
      </div>
      <div class="mb-2">
        <span class="text-gray-500">Amount:</span>
        <span class="font-medium ml-2">KES {data.donation.amount.toLocaleString()}</span>
      </div>
      <div>
        <span class="text-gray-500">Transaction ID:</span>
        <span class="font-medium ml-2">{data.donation.id}</span>
      </div>
      {#if data.donation.mpesa_receipt_number}
        <div class="mt-2">
          <span class="text-gray-500">M-Pesa Receipt:</span>
          <span class="font-medium ml-2">{data.donation.mpesa_receipt_number}</span>
        </div>
      {:else}
        <div class="mt-2 text-yellow-600">
          <p>Payment processing. We'll update once confirmed.</p>
        </div>
      {/if}
    </div>
    
    <a href="/" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md">
      Return to Home
    </a>
  </div>
</main>