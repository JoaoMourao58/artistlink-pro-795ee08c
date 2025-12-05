import { useState } from 'react';
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, MapPin, Calendar as CalendarIcon, Check, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Show {
  id: string;
  date: string;
  city: string;
  venue: string;
  status: 'confirmed' | 'available' | 'pending';
  notes?: string;
}

interface ShowsCalendarProps {
  shows: Show[];
  onSelectShow: (show: Show) => void;
  onSelectDate: (date: Date) => void;
}

const statusConfig = {
  confirmed: { icon: Check, label: 'Confirmado', className: 'bg-green-500/20 text-green-400 border-green-500/30' },
  available: { icon: CalendarIcon, label: 'Disponível', className: 'bg-primary/20 text-primary border-primary/30' },
  pending: { icon: Clock, label: 'Pendente', className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
};

export const ShowsCalendar = ({ shows, onSelectShow, onSelectDate }: ShowsCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDayOfWeek = getDay(monthStart);
  const emptyDays = Array(startDayOfWeek).fill(null);

  const getShowsForDay = (day: Date) => {
    return shows.filter(show => isSameDay(new Date(show.date), day));
  };

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h3 className="font-display text-xl font-bold capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Week days header */}
        {weekDays.map((day) => (
          <div
            key={day}
            className="h-10 flex items-center justify-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}

        {/* Empty cells for start of month */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="h-24" />
        ))}

        {/* Calendar days */}
        {days.map((day) => {
          const dayShows = getShowsForDay(day);
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={day.toISOString()}
              onClick={() => onSelectDate(day)}
              className={cn(
                "h-24 p-1 border border-border/50 rounded-lg cursor-pointer transition-colors hover:bg-secondary/30",
                isToday && "border-primary/50 bg-primary/5"
              )}
            >
              <div className={cn(
                "text-xs font-medium mb-1",
                isToday && "text-primary"
              )}>
                {format(day, 'd')}
              </div>
              <div className="space-y-1 overflow-hidden">
                {dayShows.slice(0, 2).map((show) => {
                  const config = statusConfig[show.status];
                  return (
                    <div
                      key={show.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectShow(show);
                      }}
                      className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded border truncate cursor-pointer hover:opacity-80 transition-opacity",
                        config.className
                      )}
                    >
                      {show.city}
                    </div>
                  );
                })}
                {dayShows.length > 2 && (
                  <div className="text-[10px] text-muted-foreground px-1">
                    +{dayShows.length - 2} mais
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center">
        {Object.entries(statusConfig).map(([key, config]) => {
          const Icon = config.icon;
          return (
            <div key={key} className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className={cn("w-3 h-3 rounded border", config.className)} />
              <span>{config.label}</span>
            </div>
          );
        })}
      </div>

      {/* Shows List */}
      <div className="space-y-3">
        <h4 className="font-semibold text-sm text-muted-foreground">
          Shows em {format(currentMonth, 'MMMM', { locale: ptBR })}
        </h4>
        <div className="space-y-2">
          {shows
            .filter(show => {
              const showDate = new Date(show.date);
              return showDate >= monthStart && showDate <= monthEnd;
            })
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((show) => {
              const config = statusConfig[show.status];
              const Icon = config.icon;
              return (
                <div
                  key={show.id}
                  onClick={() => onSelectShow(show)}
                  className="glass-card p-3 flex items-center gap-3 cursor-pointer hover:bg-secondary/50 transition-colors"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center border",
                    config.className
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{show.city}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {show.venue}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {format(new Date(show.date), 'dd/MM')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(show.date), 'EEE', { locale: ptBR })}
                    </div>
                  </div>
                </div>
              );
            })}
          {shows.filter(show => {
            const showDate = new Date(show.date);
            return showDate >= monthStart && showDate <= monthEnd;
          }).length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              Nenhum show neste mês
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
