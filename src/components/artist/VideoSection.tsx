import { Play } from 'lucide-react';

interface VideoSectionProps {
  mainVideoUrl: string;
  artistName: string;
}

export const VideoSection = ({ mainVideoUrl, artistName }: VideoSectionProps) => {
  return (
    <section id="video-section" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">
            <span className="gold-text">Assista</span> ao Vivo
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conheça o talento e a energia de {artistName} em apresentações inesquecíveis
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden glass-card group">
            <iframe
              src={mainVideoUrl}
              title={`${artistName} - Vídeo Principal`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
