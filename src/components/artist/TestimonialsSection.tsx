import { Quote } from 'lucide-react';
import { Testimonial } from '@/data/artists';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="gold-text">Depoimentos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            O que dizem os contratantes sobre nossas apresentações
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="glass-card p-8 relative hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/20" />
              
              <p className="text-foreground/90 text-lg leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4">
                {testimonial.photo && (
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                  />
                )}
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
