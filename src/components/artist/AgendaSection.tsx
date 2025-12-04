import { Calendar, MapPin, CheckCircle, Clock } from 'lucide-react';
import { Show } from '@/data/artists';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AgendaSectionProps {
  shows: Show[];
  whatsappNumber: string;
  artistName: string;
}

export const AgendaSection = ({ shows, whatsappNumber, artistName }: AgendaSectionProps) => {
  const handleBookDate = (show: Show) => {
    const message = encodeURIComponent(
      `Olá! Gostaria de verificar disponibilidade de ${artistName} para a data ${format(parseISO(show.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} em ${show.city}.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="agenda" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="gold-text">Agenda</span> de Shows
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Próximas apresentações e datas disponíveis para contratação
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {shows.map((show, index) => (
            <div
              key={show.id}
              className={`glass-card p-6 flex flex-col md:flex-row md:items-center gap-4 hover-lift ${
                show.status === 'confirmed' ? 'border-l-4 border-l-primary' : 'border-l-4 border-l-whatsapp'
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Date */}
              <div className="flex-shrink-0 text-center md:text-left md:w-32">
                <div className="font-display text-3xl font-bold text-primary">
                  {format(parseISO(show.date), 'dd')}
                </div>
                <div className="text-muted-foreground text-sm uppercase tracking-wide">
                  {format(parseISO(show.date), 'MMM yyyy', { locale: ptBR })}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-semibold">{show.city}</span>
                </div>
                <div className="text-muted-foreground text-sm">{show.venue}</div>
              </div>

              {/* Status / Action */}
              <div className="flex-shrink-0">
                {show.status === 'confirmed' ? (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Confirmado
                  </span>
                ) : (
                  <button
                    onClick={() => handleBookDate(show)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-whatsapp/20 text-whatsapp text-sm font-medium hover:bg-whatsapp/30 transition-colors"
                  >
                    <Clock className="w-4 h-4" />
                    Data Disponível
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
