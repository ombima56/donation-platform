<script lang="ts">
  let { 
    size = 'md', 
    color = 'primary',
    text = ''
  } = $props<{
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'primary' | 'secondary' | 'white';
    text?: string;
  }>();
  
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };
  
  const colorClasses = {
    primary: 'border-primary-600',
    secondary: 'border-secondary-600',
    white: 'border-white'
  };
</script>

<div class="flex items-center justify-center space-x-2">
  <div 
    class="animate-spin rounded-full border-2 border-transparent border-t-current {sizeClasses[size]} {colorClasses[color]}"
  ></div>
  {#if text}
    <span class="text-sm font-medium">{text}</span>
  {/if}
</div>
