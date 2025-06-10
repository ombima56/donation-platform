<script lang="ts">
  import type { PageData } from './$types';
  
  let { data } = $props<{ data: PageData }>();
  
  // Form state
  let amount = $state(1000);
  let phoneNumber = $state('');
  let isAnonymous = $state(false);
  let isSubmitting = $state(false);
  
  // Predefined amounts
  const predefinedAmounts = [500, 1000, 2000, 5000];
  
  async function handleSubmit(event: SubmitEvent) {
    isSubmitting = true;
    
    try {
      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount,
          phone: phoneNumber,
          projectId: data.project.id,
          isAnonymous
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Redirect to thank you page with transaction details
        window.location.href = `/thank-you?txn=${result.transactionId}`;
      } else {
        throw new Error(result.error || 'Payment failed');
      }
    } catch (error) {
      alert(`Payment error: ${error.message}`);
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Donate to {data.project.title} | Donation Platform</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
  <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
    <h1 class="text-2xl font-bold mb-6">Donate to {data.project.title}</h1>
    
    <form on:submit|preventDefault={handleSubmit}>
      <div class="mb-6">
        <label class="block text-gray-700 mb-2">Select Amount (KES)</label>
        <div class="grid grid-cols-2 gap-2 mb-2">
          {#each predefinedAmounts as presetAmount}
            <button 
              type="button"
              class="py-2 px-4 border rounded-md {amount === presetAmount ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}"
              on:click={() => amount = presetAmount}
            >
              KES {presetAmount}
            </button>
          {/each}
        </div>
        <input 
          type="number" 
          bind:value={amount}
          min="10"
          class="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      
      <div class="mb-6">
        <label class="block text-gray-700 mb-2">M-Pesa Phone Number</label>
        <input 
          type="tel"
          bind:value={phoneNumber}
          placeholder="e.g. 254712345678"
          class="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <p class="text-sm text-gray-500 mt-1">Enter your M-Pesa registered phone number</p>
      </div>
      
      <div class="mb-6">
        <label class="flex items-center">
          <input type="checkbox" bind:checked={isAnonymous} class="mr-2">
          Make my donation anonymous
        </label>
      </div>
      
      <button 
        type="submit"
        class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : 'Donate via M-Pesa'}
      </button>
    </form>
  </div>
</main>
