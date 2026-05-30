import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
  parseISO,
  isAfter,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Plus,
  Trash2,
  ExternalLink,
  Clock,
  CalendarHeart,
  ArrowLeft,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

/* ─── Types ─── */
interface CalendarEvent {
  id: string;
  title: string;
  date: string;   // ISO date string YYYY-MM-DD
  time: string;    // HH:mm
  description: string;
}

/* ─── localStorage helpers ─── */
const STORAGE_KEY = 'couple-calendar-events';

const loadEvents = (): CalendarEvent[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveEvents = (events: CalendarEvent[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

/* ─── Google Calendar URL builder ─── */
const buildGoogleCalendarUrl = (evt: CalendarEvent): string => {
  // Format date+time into Google Calendar's expected yyyyMMddTHHmmss format
  const dateStr = evt.date.replace(/-/g, '');
  const timeStr = evt.time.replace(/:/g, '') + '00';
  const start = `${dateStr}T${timeStr}`;
  // Default 1-hour duration
  const [h, m] = evt.time.split(':').map(Number);
  const endH = String(h + 1).padStart(2, '0');
  const endTime = `${endH}${String(m).padStart(2, '0')}00`;
  const end = `${dateStr}T${endTime}`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: evt.title,
    dates: `${start}/${end}`,
    details: evt.description || '',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

/* ─── Component ─── */
const CoupleCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(loadEvents);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formTime, setFormTime] = useState('19:00');
  const [formDesc, setFormDesc] = useState('');

  // Persist events to localStorage whenever they change
  useEffect(() => {
    saveEvents(events);
  }, [events]);

  /* Calendar grid computation */
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const gridStart = startOfWeek(monthStart, { locale: ptBR });
    const gridEnd = endOfWeek(monthEnd, { locale: ptBR });

    const days: Date[] = [];
    let day = gridStart;
    while (day <= gridEnd) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  }, [currentMonth]);

  /* Events for a given day */
  const getEventsForDay = (day: Date) =>
    events.filter((e) => isSameDay(parseISO(e.date), day));

  /* Upcoming events (sorted, future only) */
  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return events
      .filter((e) => isAfter(parseISO(e.date), addDays(now, -1)))
      .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
      .slice(0, 8);
  }, [events]);

  /* Handlers */
  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setIsAddMode(false);
    setFormTitle('');
    setFormTime('19:00');
    setFormDesc('');
  };

  const handleAddEvent = () => {
    if (!selectedDate || !formTitle.trim()) return;
    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      title: formTitle.trim(),
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: formTime,
      description: formDesc.trim(),
    };
    setEvents((prev) => [...prev, newEvent]);
    setIsAddMode(false);
    setFormTitle('');
    setFormTime('19:00');
    setFormDesc('');
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const dayEvents = selectedDate ? getEventsForDay(selectedDate) : [];

  return (
    <div className="min-h-screen bg-background paper-texture text-foreground pb-16">
      {/* Header */}
      <header className="px-6 pt-8 pb-6  space-y-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-handwritten text-lg"
        >
          <ArrowLeft size={18} /> Voltar ao cartão
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CalendarHeart className="mx-auto text-primary mb-2" size={32} />
          <h1 className="text-4xl font-serif">Nossos Momentos</h1>
          <p className="font-handwritten text-xl text-muted-foreground">
            planeje cada instante juntos ♥
          </p>
        </motion.div>
      </header>

      {/* Main layout: Calendar + Upcoming */}
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* ─── Calendar Panel ─── */}
        <div className="editorial-panel p-4 sm:p-6">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            >
              <ChevronLeft size={20} />
            </Button>
            <h2 className="text-xl font-serif capitalize">
              {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            >
              <ChevronRight size={20} />
            </Button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((wd) => (
              <div
                key={wd}
                className=" text-xs uppercase tracking-wider text-muted-foreground font-medium py-1"
              >
                {wd}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => {
              const inMonth = isSameMonth(day, currentMonth);
              const today = isToday(day);
              const hasEvents = getEventsForDay(day).length > 0;
              const isSelected = selectedDate && isSameDay(day, selectedDate);

              return (
                <button
                  key={i}
                  onClick={() => handleDayClick(day)}
                  className={`
                    relative aspect-square flex flex-col items-center justify-center rounded-none text-sm transition-all
                    ${!inMonth ? 'opacity-25 pointer-events-none' : 'hover:bg-secondary cursor-pointer'}
                    ${today ? 'ring-2 ring-primary/60 font-bold' : ''}
                    ${isSelected ? 'bg-primary text-primary-foreground' : ''}
                  `}
                >
                  {format(day, 'd')}
                  {hasEvents && (
                    <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Upcoming Moments Panel ─── */}
        <div className="editorial-panel p-4 sm:p-6 h-fit lg:sticky lg:top-6">
          <h3 className="text-lg font-serif flex items-center gap-2 mb-4">
            <Heart size={16} className="text-primary" fill="currentColor" />
            Próximos Momentos
          </h3>

          {upcomingEvents.length === 0 ? (
            <p className="font-handwritten text-muted-foreground  py-8">
              Nenhum momento agendado ainda... 💫
            </p>
          ) : (
            <ul className="space-y-3">
              {upcomingEvents.map((evt) => (
                <li
                  key={evt.id}
                  className="p-3 rounded-none bg-secondary/50 border border-foreground space-y-1"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-medium text-sm">{evt.title}</span>
                    <a
                      href={buildGoogleCalendarUrl(evt)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Adicionar ao Google Calendar"
                      className="text-primary hover:text-primary/80 shrink-0"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock size={12} />
                    <span>
                      {format(parseISO(evt.date), "dd 'de' MMM", { locale: ptBR })} às {evt.time}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ─── Day Detail / Add Event Modal ─── */}
      <Dialog open={!!selectedDate} onOpenChange={(open) => !open && setSelectedDate(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {selectedDate && format(selectedDate, "dd 'de' MMMM, yyyy", { locale: ptBR })}
            </DialogTitle>
            <DialogDescription className="font-handwritten text-base text-muted-foreground">
              {isAddMode ? 'Crie um momento especial ♥' : 'Seus momentos neste dia'}
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {isAddMode ? (
              /* ── Add event form ── */
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 pt-2"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium">Título</label>
                  <Input
                    placeholder="Ex: Jantar Romântico"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Horário</label>
                  <Input
                    type="time"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Descrição / Anotações</label>
                  <Textarea
                    placeholder="Algo especial para lembrar..."
                    rows={3}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="ghost"
                    className="flex-1"
                    onClick={() => setIsAddMode(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleAddEvent}
                    disabled={!formTitle.trim()}
                  >
                    <Heart size={14} className="mr-1" /> Salvar
                  </Button>
                </div>
              </motion.div>
            ) : (
              /* ── Day events list ── */
              <motion.div
                key="list"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-3 pt-2"
              >
                {dayEvents.length === 0 ? (
                  <p className=" text-muted-foreground font-handwritten text-lg py-4">
                    Nenhum momento aqui ainda...
                  </p>
                ) : (
                  dayEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="p-4 rounded-none bg-secondary/50 border border-foreground space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{evt.title}</h4>
                        <button
                          onClick={() => handleDeleteEvent(evt.id)}
                          className="text-destructive/70 hover:text-destructive transition-colors"
                          title="Excluir evento"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock size={14} /> {evt.time}
                      </div>
                      {evt.description && (
                        <p className="text-sm text-muted-foreground">{evt.description}</p>
                      )}
                      <a
                        href={buildGoogleCalendarUrl(evt)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors mt-1"
                      >
                        <ExternalLink size={12} /> Adicionar ao Google Calendar
                      </a>
                    </div>
                  ))
                )}

                <Button
                  className="w-full"
                  onClick={() => setIsAddMode(true)}
                >
                  <Plus size={16} className="mr-1" /> Novo Momento
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoupleCalendar;
