<script lang="ts">
  import { enhance } from '$app/forms';
  
  let { form } = $props();
  let isSubmitting = $state(false);
</script>

<svelte:head>
  <title>Admin Login | Donation Platform</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden">
    <div class="p-6 sm:p-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900 mb-2">
          Admin Login
        </h2>
        <p class="text-gray-600">
          Sign in to access the admin dashboard
        </p>
      </div>
      
      <form method="POST" use:enhance={() => {
        isSubmitting = true;
        return ({ update }) => {
          isSubmitting = false;
          update();
        };
      }} class="mt-8 space-y-6">
        {#if form?.message}
          <div class="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm">{form.message}</p>
              </div>
            </div>
          </div>
        {/if}
        
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input id="email" name="email" type="email" autocomplete="email" required 
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
              placeholder="admin@example.com">
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required 
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
              placeholder="••••••••">
          </div>
        </div>

        <div>
          <button type="submit" 
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150 ease-in-out"
            disabled={isSubmitting}>
            {#if isSubmitting}
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            {:else}
              Sign in
            {/if}
          </button>
        </div>
        
        <div class="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
          <h3 class="text-sm font-medium text-blue-800 mb-1">Demo Credentials</h3>
          <div class="text-xs text-blue-700 font-mono bg-blue-100 p-2 rounded">
            <div><span class="font-semibold">Email:</span> admin@example.com</div>
            <div><span class="font-semibold">Password:</span> admin123</div>
          </div>
          <p class="text-xs text-blue-600 mt-2">
            Make sure to run <code class="bg-blue-100 px-1 py-0.5 rounded">npm run seed-admin</code> to create this user
          </p>
        </div>
      </form>
    </div>
  </div>
</div>
