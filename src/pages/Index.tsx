import { Link } from 'react-router-dom';
import { artists } from '@/data/artists';
import { MessageCircle, Star, Calendar, Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container relative z-10 text-center py-20">
          {/* Logo/Brand */}
          <div className="mb-8 animate-fade-up">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-primary/20 text-primary border border-primary/30 mb-6">
              Plataforma Oficial de Artistas
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="gold-text">ArtistLink</span> Pro
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            JC Shows & Eventos Edition
          </p>

          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-12 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            A plataforma profissional para apresentação e contratação de artistas. 
            Encontre o show perfeito para seu evento.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground text-sm uppercase tracking-wide">Artistas</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground text-sm uppercase tracking-wide">Projetos</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground text-sm uppercase tracking-wide">Shows/Ano</div>
            </div>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <Button 
              size="lg" 
              className="gold-gradient text-primary-foreground font-semibold text-lg px-8 shadow-gold hover:opacity-90 transition-opacity"
              onClick={() => document.getElementById('artists')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Artistas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </section>

      {/* Artists Grid */}
      <section id="artists" className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Nossos <span className="gold-text">Artistas</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Conheça nosso elenco de artistas exclusivos e encontre o show ideal para seu evento
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist, index) => (
              <Link
                key={artist.id}
                to={`/artista/${artist.slug}`}
                className="glass-card overflow-hidden hover-lift group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={artist.bannerUrl}
                    alt={artist.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center shadow-gold">
                      <Play className="w-7 h-7 text-primary-foreground ml-1" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display text-2xl font-bold group-hover:text-primary transition-colors">
                        {artist.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{artist.genre}</p>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <Star className="w-4 h-4 fill-primary" />
                      <span className="text-sm font-medium">5.0</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {artist.bio}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      {artist.projects.length} projetos
                    </span>
                    <span className="flex items-center gap-1.5 text-whatsapp font-medium">
                      <MessageCircle className="w-4 h-4" />
                      Contratar
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title">
              Precisa de um <span className="gold-text">Show</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Entre em contato conosco e encontraremos o artista perfeito para seu evento. 
              Atendemos todo o Brasil.
            </p>
            <Button 
              size="lg" 
              className="whatsapp-button text-lg"
              onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Falar com JC Shows
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="gold-text font-display font-bold text-lg">JC Shows</span>
              <span>& Eventos</span>
            </div>
            <div>
              © {new Date().getFullYear()} ArtistLink Pro - Todos os direitos reservados
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
