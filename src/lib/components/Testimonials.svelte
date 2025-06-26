<script lang="ts">
  interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    avatar?: string;
    rating: number;
  }
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Regular Donor",
      content: "This platform makes it so easy to support causes I care about. The transparency and regular updates give me confidence that my donations are making a real impact.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Project Beneficiary",
      content: "Thanks to the generous donors on this platform, our community school now has clean water and proper sanitation. The difference it has made is incredible.",
      rating: 5
    },
    {
      id: 3,
      name: "Emma Williams",
      role: "Monthly Supporter",
      content: "I love how I can track the progress of projects I've supported. Seeing the real-world impact of my contributions motivates me to give more.",
      rating: 5
    }
  ];
  
  function renderStars(rating: number) {
    return '⭐'.repeat(rating);
  }
</script>

<section class="py-16 bg-neutral-50">
  <div class="container mx-auto px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-display font-bold text-neutral-800 mb-4">
          What Our Community Says
        </h2>
        <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
          Real stories from donors and beneficiaries who are part of our mission to create positive change.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each testimonials as testimonial, index}
          <div 
            class="card p-6 animate-fade-in hover:shadow-large transition-all duration-300"
            style="animation-delay: {index * 200}ms"
          >
            <div class="mb-4">
              <div class="text-2xl mb-2">{renderStars(testimonial.rating)}</div>
              <blockquote class="text-neutral-700 italic">
                "{testimonial.content}"
              </blockquote>
            </div>
            
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div class="font-semibold text-neutral-800">{testimonial.name}</div>
                <div class="text-sm text-neutral-600">{testimonial.role}</div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
