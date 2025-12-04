import { Instagram, Youtube, Facebook, Globe, Music } from 'lucide-react';
import { Artist } from '@/data/artists';

interface SocialLinksProps {
  socialLinks: Artist['socialLinks'];
  artistName: string;
}

const socialIcons = {
  spotify: Music,
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  website: Globe,
};

const socialLabels = {
  spotify: 'Spotify',
  instagram: 'Instagram',
  youtube: 'YouTube',
  facebook: 'Facebook',
  website: 'Website',
};

export const SocialLinks = ({ socialLinks, artistName }: SocialLinksProps) => {
  const links = Object.entries(socialLinks).filter(([_, url]) => url);

  if (links.length === 0) return null;

  return (
    <section id="social" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="gold-text">Siga</span> nas Redes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Acompanhe {artistName} nas redes sociais
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {links.map(([platform, url]) => {
            const Icon = socialIcons[platform as keyof typeof socialIcons];
            const label = socialLabels[platform as keyof typeof socialLabels];

            return (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 flex items-center gap-3 hover:bg-secondary/80 transition-all duration-300 hover:scale-105 group min-w-[160px] justify-center"
              >
                <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-medium">{label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
