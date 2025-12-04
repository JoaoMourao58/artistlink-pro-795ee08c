import { useParams } from 'react-router-dom';
import { getArtistBySlug } from '@/data/artists';
import { HeroSection } from '@/components/artist/HeroSection';
import { VideoSection } from '@/components/artist/VideoSection';
import { ProjectsSection } from '@/components/artist/ProjectsSection';
import { AgendaSection } from '@/components/artist/AgendaSection';
import { PhotoGallery } from '@/components/artist/PhotoGallery';
import { VideoGallery } from '@/components/artist/VideoGallery';
import { TestimonialsSection } from '@/components/artist/TestimonialsSection';
import { SocialLinks } from '@/components/artist/SocialLinks';
import { PressKitSection } from '@/components/artist/PressKitSection';
import { FloatingWhatsApp } from '@/components/artist/FloatingWhatsApp';
import { Footer } from '@/components/artist/Footer';

const ArtistPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const artist = getArtistBySlug(slug || '');

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Artista não encontrado</h1>
          <p className="text-muted-foreground">O artista que você procura não existe.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroSection artist={artist} />
      <VideoSection mainVideoUrl={artist.mainVideoUrl} artistName={artist.name} />
      <ProjectsSection projects={artist.projects} artistName={artist.name} />
      <AgendaSection 
        shows={artist.shows} 
        whatsappNumber={artist.whatsappNumber} 
        artistName={artist.name} 
      />
      <PhotoGallery photos={artist.photos} artistName={artist.name} />
      <VideoGallery videos={artist.videos} artistName={artist.name} />
      <TestimonialsSection testimonials={artist.testimonials} />
      <SocialLinks socialLinks={artist.socialLinks} artistName={artist.name} />
      <PressKitSection artistName={artist.name} pressKitUrl={artist.pressKitUrl} />
      <Footer />
      <FloatingWhatsApp whatsappNumber={artist.whatsappNumber} artistName={artist.name} />
    </div>
  );
};

export default ArtistPage;
