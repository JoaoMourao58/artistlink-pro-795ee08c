import { Play, MessageCircle } from 'lucide-react';
import { Artist } from '@/data/artists';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  artist: Artist;
}

export const HeroSection = ({ artist }: HeroSectionProps) => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Olá! Gostaria de informações sobre contratação do show de ${artist.name}.`);
    window.open(`https://wa.me/${artist.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-end pb-12 md:pb-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${artist.bannerUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-3xl animate-fade-up">
          {/* Genre Tag */}
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/20 text-primary border border-primary/30 mb-6">
            {artist.genre}
          </span>

          {/* Artist Name */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="gold-text">{artist.name}</span>
          </h1>

          {/* Bio */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            {artist.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleWhatsApp}
              size="lg"
              className="whatsapp-button group text-lg"
            >
              <MessageCircle className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Contratar Show
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="glass-button text-foreground border-border/50 text-lg px-8"
              onClick={() => document.getElementById('video-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="mr-2 h-5 w-5" />
              Ver Vídeo
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
};
