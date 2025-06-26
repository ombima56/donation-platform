<script lang="ts">
  interface TrustBadge {
    id: number;
    icon: string;
    title: string;
    description: string;
  }
  
  const badges: TrustBadge[] = [
    {
      id: 1,
      icon: "🔒",
      title: "Secure Payments",
      description: "All transactions are encrypted and processed through secure M-Pesa integration"
    },
    {
      id: 2,
      icon: "📊",
      title: "100% Transparency",
      description: "Track exactly how your donations are used with detailed progress reports"
    },
    {
      id: 3,
      icon: "✅",
      title: "Verified Projects",
      description: "Every project is thoroughly vetted and monitored by our team"
    },
    {
      id: 4,
      icon: "🏆",
      title: "Proven Impact",
      description: "Over 10,000 lives improved through successful project completions"
    }
  ];
</script>

<section class="py-12 bg-white border-t border-neutral-200">
  <div class="container mx-auto px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-8">
        <h3 class="text-2xl font-display font-bold text-neutral-800 mb-2">
          Why Donors Trust Us
        </h3>
        <p class="text-neutral-600">
          Your security and impact are our top priorities
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each badges as badge, index}
          <div 
            class="text-center p-4 animate-slide-up"
            style="animation-delay: {index * 150}ms"
          >
            <div class="text-4xl mb-3 animate-float" style="animation-delay: {index * 500}ms">
              {badge.icon}
            </div>
            <h4 class="font-semibold text-neutral-800 mb-2">{badge.title}</h4>
            <p class="text-sm text-neutral-600">{badge.description}</p>
          </div>
        {/each}
      </div>
      
      <!-- Security badges -->
      <div class="mt-12 pt-8 border-t border-neutral-100">
        <div class="flex flex-wrap justify-center items-center gap-8 opacity-60">
          <div class="flex items-center space-x-2">
            <span class="text-2xl">🔐</span>
            <span class="text-sm font-medium text-neutral-700">SSL Encrypted</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-2xl">📱</span>
            <span class="text-sm font-medium text-neutral-700">M-Pesa Verified</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-2xl">🛡️</span>
            <span class="text-sm font-medium text-neutral-700">Data Protected</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-2xl">✨</span>
            <span class="text-sm font-medium text-neutral-700">Trusted Platform</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
