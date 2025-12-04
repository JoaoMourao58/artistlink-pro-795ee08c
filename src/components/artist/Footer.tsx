import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="gold-text font-display font-bold text-lg">JC Shows</span>
            <span>& Eventos</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>para artistas</span>
          </div>

          <div>
            © {new Date().getFullYear()} ArtistLink Pro
          </div>
        </div>
      </div>
    </footer>
  );
};
