import { MessageCircle } from 'lucide-react';
import { useWhatsAppLink } from '@/hooks/useWhatsAppLink';

interface FloatingWhatsAppProps {
  artistId: string;
  artistName: string;
}

export const FloatingWhatsApp = ({ artistId, artistName }: FloatingWhatsAppProps) => {
  const whatsAppLink = useWhatsAppLink();

  const handleClick = async () => {
    try {
      const link = await whatsAppLink.mutateAsync({ artistId, artistName });
      window.open(link, '_blank');
    } catch (error) {
      console.error('Error getting WhatsApp link:', error);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={whatsAppLink.isPending}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-whatsapp hover:bg-whatsapp/90 flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 animate-pulse-gold group disabled:opacity-50"
      aria-label="Contratar via WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-2 rounded-lg bg-card text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Contratar Show
      </span>
    </button>
  );
};
