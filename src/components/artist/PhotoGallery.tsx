import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoGalleryProps {
  photos: string[];
  artistName: string;
}

export const PhotoGallery = ({ photos, artistName }: PhotoGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  
  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1);
    }
  };
  
  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <section id="photos" className="py-20 md:py-32 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="gold-text">Galeria</span> de Fotos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Registros dos melhores momentos de {artistName} nos palcos
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group hover-lift"
              onClick={() => openLightbox(index)}
            >
              <img
                src={photo}
                alt={`${artistName} - Foto ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <img
            src={photos[selectedIndex]}
            alt={`${artistName} - Foto ${selectedIndex + 1}`}
            className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-4 text-muted-foreground text-sm">
            {selectedIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
};
