import { useParams } from 'react-router-dom';
import { useArtist, useArtistProjects, useArtistShows, useTrackPageView, useTrackButtonClick } from '@/hooks/useArtists';
import { useWhatsAppLink } from '@/hooks/useWhatsAppLink';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Clock, Users, Calendar, MapPin, Music, Play, CheckCircle, QrCode } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ContractorMode = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: artist, isLoading: artistLoading } = useArtist(slug || '');
  const { data: projects } = useArtistProjects(artist?.id || '');
  const { data: shows } = useArtistShows(artist?.id || '');
  const trackPageView = useTrackPageView();
  const trackButtonClick = useTrackButtonClick();
  const whatsAppLink = useWhatsAppLink();

  useEffect(() => {
    if (artist?.id) {
      trackPageView.mutate(artist.id);
    }
  }, [artist?.id]);

  const handleWhatsApp = async () => {
    if (!artist) return;
    trackButtonClick.mutate({ artistId: artist.id, buttonType: 'whatsapp_contractor' });
    try {
      const link = await whatsAppLink.mutateAsync({ 
        artistId: artist.id, 
        artistName: artist.name 
      });
      window.open(link, '_blank');
    } catch (error) {
      console.error('Error getting WhatsApp link:', error);
    }
  };

  const availableDates = shows?.filter(s => s.status === 'available') || [];

  if (artistLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Artista não encontrado</h1>
          <a href="/" className="text-primary hover:underline">Voltar ao início</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Compact Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14">
          <span className="font-display text-lg font-bold gold-text">JC Shows</span>
          <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">Modo Contratante</span>
        </div>
      </header>

      <main className="container py-8 max-w-4xl">
        {/* Hero Card */}
        <div className="glass-card overflow-hidden mb-8">
          <div className="relative aspect-video">
            {artist.main_video_url ? (
              <iframe
                src={artist.main_video_url}
                title={artist.name}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : artist.banner_url ? (
              <img
                src={artist.banner_url}
                alt={artist.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                <Play className="w-16 h-16 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="font-display text-3xl font-bold mb-1">{artist.name}</h1>
                <p className="text-muted-foreground">{artist.genre}</p>
              </div>
              <Button 
                onClick={handleWhatsApp}
                className="whatsapp-button shrink-0"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Contratar
              </Button>
            </div>

            <p className="text-foreground/80">{artist.bio}</p>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Shows/Projects */}
          <div className="glass-card p-6">
            <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
              <Music className="w-5 h-5 text-primary" />
              Shows Disponíveis
            </h2>
            
            <div className="space-y-3">
              {projects?.slice(0, 3).map((project) => (
                <div key={project.id} className="p-4 rounded-lg bg-secondary/50">
                  <h3 className="font-semibold mb-1">{project.name}</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {project.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Dates */}
          <div className="glass-card p-6">
            <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Datas Disponíveis
            </h2>
            
            {availableDates.length > 0 ? (
              <div className="space-y-3">
                {availableDates.slice(0, 4).map((show) => (
                  <div key={show.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div>
                      <div className="font-medium">
                        {format(parseISO(show.date), "dd 'de' MMMM", { locale: ptBR })}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {show.city}
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-whatsapp" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Consulte disponibilidade pelo WhatsApp
              </p>
            )}
          </div>
        </div>

        {/* Technical Info */}
        {projects && projects[0] && (
          <div className="glass-card p-6 mb-8">
            <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Ficha Técnica
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Formação</h3>
                <p className="text-muted-foreground">{projects[0].technical_info}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Repertório</h3>
                <div className="flex flex-wrap gap-2">
                  {projects[0].repertoire?.slice(0, 6).map((song, i) => (
                    <span key={i} className="text-sm px-2 py-1 rounded bg-secondary/50">
                      {song}
                    </span>
                  ))}
                  {(projects[0].repertoire?.length || 0) > 6 && (
                    <span className="text-sm text-muted-foreground">
                      +{(projects[0].repertoire?.length || 0) - 6} mais
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Footer */}
        <div className="glass-card p-8 text-center">
          <h2 className="font-display text-2xl font-bold mb-2">
            Interessado em contratar?
          </h2>
          <p className="text-muted-foreground mb-6">
            Entre em contato pelo WhatsApp para mais informações sobre valores e disponibilidade
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleWhatsApp}
              size="lg"
              className="whatsapp-button text-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Falar com JC Shows
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="glass-button border-border/50"
            >
              <QrCode className="w-5 h-5 mr-2" />
              Baixar Press Kit
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <a href={`/artista/${artist.slug}`} className="hover:text-primary transition-colors">
            Ver página completa do artista →
          </a>
        </div>
      </main>
    </div>
  );
};

export default ContractorMode;
