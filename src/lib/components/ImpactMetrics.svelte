<script lang="ts">
  interface Metric {
    id: number;
    value: string;
    label: string;
    icon: string;
    description: string;
  }
  
  const metrics: Metric[] = [
    {
      id: 1,
      value: "10,000+",
      label: "Lives Impacted",
      icon: "👥",
      description: "People whose lives have been improved through our projects"
    },
    {
      id: 2,
      value: "KES 5M+",
      label: "Funds Raised",
      icon: "💰",
      description: "Total amount raised for community development projects"
    },
    {
      id: 3,
      value: "150+",
      label: "Projects Completed",
      icon: "🎯",
      description: "Successfully completed projects across various sectors"
    },
    {
      id: 4,
      value: "2,500+",
      label: "Active Donors",
      icon: "❤️",
      description: "Generous individuals supporting our mission"
    }
  ];
</script>

<section class="py-16 bg-gradient-hero text-white">
  <div class="container mx-auto px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-display font-bold mb-4">
          Our Impact in Numbers
        </h2>
        <p class="text-xl opacity-90 max-w-2xl mx-auto">
          Together, we're creating measurable change in communities across Kenya.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each metrics as metric, index}
          <div 
            class="text-center animate-slide-up"
            style="animation-delay: {index * 200}ms"
          >
            <div class="mb-4">
              <div class="text-5xl mb-2 animate-bounce-subtle" style="animation-delay: {index * 300}ms">
                {metric.icon}
              </div>
              <div class="text-4xl font-bold mb-1">{metric.value}</div>
              <div class="text-xl font-semibold opacity-90">{metric.label}</div>
            </div>
            <p class="text-sm opacity-80">{metric.description}</p>
          </div>
        {/each}
      </div>
      
      <!-- Call to action -->
      <div class="text-center mt-12">
        <p class="text-lg opacity-90 mb-6">
          Join thousands of donors making a difference every day
        </p>
        <a 
          href="/projects" 
          class="btn-secondary bg-white text-primary-700 hover:bg-neutral-100 shadow-large"
        >
          Start Making Impact Today
        </a>
      </div>
    </div>
  </div>
</section>
