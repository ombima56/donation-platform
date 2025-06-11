<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';
  
  export let data: PageData;
  export let form;
  
  let showCreateForm = false;
  let isSubmitting = false;
  
  function toggleCreateForm() {
    showCreateForm = !showCreateForm;
  }
</script>

<svelte:head>
  <title>Manage Projects | Admin Dashboard</title>
</svelte:head>

<div class="px-4 py-6">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-semibold text-gray-900">Projects</h1>
    <button 
      type="button"
      class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
      onclick={toggleCreateForm}
    >
      {showCreateForm ? 'Cancel' : 'Add New Project'}
    </button>
  </div>
  
  {#if showCreateForm}
    <div class="bg-white shadow rounded-lg mb-6 p-4">
      <h2 class="text-lg font-medium mb-4">Create New Project</h2>
      
      <form method="POST" action="?/create" use:enhance={() => {
        isSubmitting = true;
        return ({ result, update }) => {
          isSubmitting = false;
          if (result.type === 'success') {
            showCreateForm = false;
          }
          update();
        };
      }}>
        {#if form?.message && !form.success}
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {form.message}
          </div>
        {/if}
        
        <div class="grid grid-cols-1 gap-6">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              required
              class="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              id="description" 
              name="description" 
              rows="4"
              required
              class="w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
          
          <div>
            <label for="imageUrl" class="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
            <input 
              type="url" 
              id="imageUrl" 
              name="imageUrl"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label for="targetAmount" class="block text-sm font-medium text-gray-700 mb-1">Target Amount (KES)</label>
            <input 
              type="number" 
              id="targetAmount" 
              name="targetAmount"
              min="1"
              required
              class="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <button 
              type="submit"
              class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </div>
      </form>
    </div>
  {/if}
  
  <div class="bg-white shadow rounded-lg overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Project
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Target
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Created
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        {#each data.projects as project}
          <tr>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                {#if project.image_url}
                  <div class="flex-shrink-0 h-10 w-10 mr-3">
                    <img class="h-10 w-10 rounded-full object-cover" src={project.image_url} alt={project.title} />
                  </div>
                {/if}
                <div>
                  <div class="text-sm font-medium text-gray-900">{project.title}</div>
                  <div class="text-sm text-gray-500 truncate max-w-xs">{project.description}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              ${project.target_amount.toLocaleString()}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {new Date(project.created_at).toLocaleDateString()}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${project.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {project.is_active ? 'Active' : 'Inactive'}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <form method="POST" action="?/toggleActive" use:enhance>
                <input type="hidden" name="id" value={project.id} />
                <input type="hidden" name="isActive" value={project.is_active} />
                <button 
                  type="submit" 
                  class={`text-sm ${project.is_active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                >
                  {project.is_active ? 'Deactivate' : 'Activate'}
                </button>
              </form>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
