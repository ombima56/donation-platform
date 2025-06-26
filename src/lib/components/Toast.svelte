<script lang="ts">
  import { onMount } from 'svelte';
  
  let { 
    message = '', 
    type = 'info', 
    duration = 5000, 
    onClose = () => {} 
  } = $props<{
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    onClose?: () => void;
  }>();
  
  let visible = $state(false);
  let timeoutId: number;
  
  const typeStyles = {
    success: 'bg-secondary-50 border-secondary-200 text-secondary-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-accent-50 border-accent-200 text-accent-800',
    info: 'bg-primary-50 border-primary-200 text-primary-800'
  };
  
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };
  
  onMount(() => {
    visible = true;
    timeoutId = setTimeout(() => {
      close();
    }, duration);
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  });
  
  function close() {
    visible = false;
    setTimeout(() => {
      onClose();
    }, 300);
  }
</script>

<div 
  class="fixed top-4 right-4 z-50 transform transition-all duration-300 {visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}"
>
  <div class="card max-w-sm p-4 border-l-4 {typeStyles[type]} shadow-large">
    <div class="flex items-start space-x-3">
      <span class="text-lg">{icons[type]}</span>
      <div class="flex-1">
        <p class="font-medium">{message}</p>
      </div>
      <button 
        onclick={close}
        class="text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
      >
        ✕
      </button>
    </div>
  </div>
</div>
