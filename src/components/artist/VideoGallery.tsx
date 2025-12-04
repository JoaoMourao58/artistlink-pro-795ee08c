import { Play } from 'lucide-react';

interface VideoGalleryProps {
  videos: string[];
  artistName: string;
}

export const VideoGallery = ({ videos, artistName }: VideoGalleryProps) => {
  return (
    <section id="videos" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="gold-text">Mais</span> Vídeos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore mais performances e apresentações de {artistName}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div
              key={index}
              className="glass-card overflow-hidden hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-video">
                <iframe
                  src={video}
                  title={`${artistName} - Vídeo ${index + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
