import { useParams } from 'react-router-dom';
import { useArtist, useArtistProjects, useArtistShows, useArtistTestimonials, useArtistPhotos, useArtistVideos, useTrackPageView } from '@/hooks/useArtists';
import { useEffect } from 'react';
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
  const { data: artist, isLoading: artistLoading } = useArtist(slug || '');
  const { data: projects } = useArtistProjects(artist?.id || '');
  const { data: shows } = useArtistShows(artist?.id || '');
  const { data: testimonials } = useArtistTestimonials(artist?.id || '');
  const { data: photos } = useArtistPhotos(artist?.id || '');
  const { data: videos } = useArtistVideos(artist?.id || '');
  const trackPageView = useTrackPageView();

  useEffect(() => {
    if (artist?.id) {
      trackPageView.mutate(artist.id);
    }
  }, [artist?.id]);

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
          <p className="text-muted-foreground mb-4">O artista que você procura não existe.</p>
          <a href="/" className="text-primary hover:underline">Voltar ao início</a>
        </div>
      </div>
    );
  }

  // Transform data for components
  const artistData = {
    id: artist.id,
    slug: artist.slug,
    name: artist.name,
    genre: artist.genre,
    bio: artist.bio,
    bannerUrl: artist.banner_url || '',
    mainVideoUrl: artist.main_video_url || '',
    socialLinks: (artist.social_links || {}) as Record<string, string>,
    pressKitUrl: artist.press_kit_url
  };

  const projectsData = (projects || []).map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    videoUrl: p.video_url || '',
    duration: p.duration || '',
    technicalInfo: p.technical_info || '',
    repertoire: p.repertoire || [],
    photos: p.photos || []
  }));

  const showsData = (shows || []).map(s => ({
    id: s.id,
    date: s.date,
    city: s.city,
    venue: s.venue,
    status: s.status as 'confirmed' | 'available'
  }));

  const testimonialsData = (testimonials || []).map(t => ({
    id: t.id,
    name: t.name,
    role: t.role,
    text: t.text,
    photo: t.photo_url
  }));

  const photosUrls = (photos || []).map(p => p.url);
  const videosUrls = (videos || []).map(v => v.url);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection artist={{
        id: artistData.id,
        ...artistData
      }} />
      
      {artistData.mainVideoUrl && (
        <VideoSection mainVideoUrl={artistData.mainVideoUrl} artistName={artistData.name} />
      )}
      
      {projectsData.length > 0 && (
        <ProjectsSection projects={projectsData} artistName={artistData.name} />
      )}
      
      {showsData.length > 0 && (
        <AgendaSection 
          shows={showsData} 
          artistId={artistData.id}
          artistName={artistData.name} 
        />
      )}
      
      {photosUrls.length > 0 && (
        <PhotoGallery photos={photosUrls} artistName={artistData.name} />
      )}
      
      {videosUrls.length > 0 && (
        <VideoGallery videos={videosUrls} artistName={artistData.name} />
      )}
      
      {testimonialsData.length > 0 && (
        <TestimonialsSection testimonials={testimonialsData} />
      )}
      
      {Object.keys(artistData.socialLinks).length > 0 && (
        <SocialLinks socialLinks={artistData.socialLinks} artistName={artistData.name} />
      )}
      
      <PressKitSection artistName={artistData.name} pressKitUrl={artistData.pressKitUrl} />
      <Footer />
      <FloatingWhatsApp artistId={artistData.id} artistName={artistData.name} />
    </div>
  );
};

export default ArtistPage;
