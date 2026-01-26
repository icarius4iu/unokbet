import React, { useState, useMemo } from 'react';
import { getCalendarEvents, type CalendarEvent } from '../../services/firebaseFirestore/calendar';

export interface Promo extends CalendarEvent { }

interface CalendarWidgetProps {
    initialPromos?: Promo[];
}

const CATEGORIES = {
    apuesta_gratis: { label: 'Apuesta Gratis', icon: 'fas fa-gift', color: 'primary' },
    giros_gratis: { label: 'Giros Gratis', icon: 'fas fa-dice', color: 'gray' },
    supercuotas: { label: 'Supercuotas', icon: 'fas fa-chart-line', color: 'accent-orange' },
};

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({ initialPromos = [] }) => {
    // State
    const [events, setEvents] = useState<Promo[]>(initialPromos);
    const [isLoading, setIsLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date()); // Default to today
    const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    React.useEffect(() => {
        const fetchEvents = async () => {
            try {
                const fetchedEvents = await getCalendarEvents();
                // Map Firestore model to Widget model if needed (currently they match closely)
                // The widget expects 'image' but service has 'imageUrl'. Let's handle that mapping if needed, 
                // but for now I'll cast it since I can fix the interface or the map.
                // Actually, the widget uses `event.image`, let's check line 272.
                // The interface `Promo` had `image?: string`. The service `CalendarEvent` has `imageUrl?: string`.
                // I should map it.
                const mappedEvents = fetchedEvents.map(e => ({
                    ...e,
                    image: e.imageUrl || '',
                }));
                setEvents(mappedEvents);
            } catch (error) {
                console.error("Failed to load calendar events", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Helper: Get local date string (YYYY-MM-DD) without timezone shift
    const getLocalDateStr = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Helper Functions
    const getDaysToShow = () => {
        const days = [];
        if (viewMode === 'day') {
            days.push(new Date(currentDate));
        } else {
            // Find start of week (assuming Monday start for this specific UI)
            const start = new Date(currentDate);
            for (let i = 0; i < 7; i++) {
                const d = new Date(start);
                d.setDate(start.getDate() + i);
                days.push(d);
            }
        }
        return days;
    };

    const daysToShow = getDaysToShow();

    // Navigation
    const navigate = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentDate);
        const offset = viewMode === 'week' ? 7 : 1;
        newDate.setDate(newDate.getDate() + (direction === 'next' ? offset : -offset));
        setCurrentDate(newDate);
    };

    // Logic to process events for layout
    const processedEvents = useMemo(() => {
        // 1. Filter
        let filtered = activeFilter
            ? events.filter((p: Promo) => p.category === activeFilter)
            : events;

        // 2. Map to display range
        const viewStart = daysToShow[0];
        const viewEnd = daysToShow[daysToShow.length - 1];
        const viewStartStr = getLocalDateStr(viewStart);
        const viewEndStr = getLocalDateStr(viewEnd);

        // Filter out events strictly outside the view
        filtered = filtered.filter((p: Promo) => p.endDate >= viewStartStr && p.startDate <= viewEndStr);

        // 3. Calculate Layout
        // We need to determine grid columns (1-based)
        const eventsWithLayout = filtered.map((p: Promo) => {
            // Parse dates without timezone issues
            const eventStart = new Date(p.startDate + 'T00:00:00');
            const eventEnd = new Date(p.endDate + 'T00:00:00');
            const viewStartTime = new Date(viewStartStr + 'T00:00:00').getTime();

            const startDiff = Math.floor((eventStart.getTime() - viewStartTime) / (1000 * 60 * 60 * 24));
            const duration = Math.floor((eventEnd.getTime() - eventStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;

            let colStart = Math.max(1, startDiff + 1);
            let colSpan = duration;

            // Adjust for clipping on left side (event started before view)
            if (startDiff < 0) {
                colStart = 1;
                colSpan = duration + startDiff; // reduce span by days before view 
            }

            // Adjust for clipping on right side (event ends after view)
            const endCol = colStart + colSpan - 1;
            if (endCol > 7) {
                colSpan = 7 - colStart + 1;
            }

            // Ensure colSpan is at least 1
            colSpan = Math.max(1, colSpan);

            return { ...p, colStart, colSpan };
        });

        // 4. Packing Algorithm (Simple greedy)
        const expandedEvents: any[] = [];
        const rows: boolean[][] = []; // rows[rowIndex][dayIndex (0-6)] = occupied

        // Sort by colStart, then colSpan (longest first) for better packing
        eventsWithLayout.sort((a: any, b: any) => {
            if (a.colStart !== b.colStart) return a.colStart - b.colStart;
            return b.colSpan - a.colSpan;
        });

        for (const event of eventsWithLayout) {
            let rowIndex = 0;
            let placed = false;

            while (!placed) {
                // Check if this row has space for the event's days
                if (!rows[rowIndex]) rows[rowIndex] = new Array(7).fill(false);

                let fits = true;
                // Check slots corresponding to event columns (0-indexed for array)
                const startIdx = event.colStart - 1;
                const endIdx = startIdx + event.colSpan;

                for (let i = startIdx; i < endIdx; i++) {
                    if (rows[rowIndex][i]) {
                        fits = false;
                        break;
                    }
                }

                if (fits) {
                    // Place it
                    for (let i = startIdx; i < endIdx; i++) {
                        rows[rowIndex][i] = true;
                    }
                    expandedEvents.push({ ...event, rowIndex });
                    placed = true;
                } else {
                    rowIndex++;
                }
            }
        }

        return { events: expandedEvents, rowCount: rows.length };

    }, [activeFilter, viewMode, currentDate, events]);

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen pb-20">

            <div className="bg-secondary pt-32 pb-16 px-4 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl transform translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-full bg-accent-orange/5 blur-3xl transform -translate-x-1/2"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
                        Calendario de Promociones
                    </h1>
                    <p className="text-gray-300 text-lg mb-10">
                        Visualiza promociones de 1 día, varios días o toda la semana
                    </p>

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {Object.entries(CATEGORIES).map(([key, config]) => (
                            <button
                                key={key}
                                onClick={() => setActiveFilter(activeFilter === key ? null : key)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-medium border ${activeFilter === key || activeFilter === null
                                    ? key === 'apuesta_gratis' ? 'bg-primary/20 text-primary border-primary shadow-[0_0_15px_rgba(12,242,242,0.3)]'
                                        : key === 'giros_gratis' ? 'bg-white/10 text-white border-white/20'
                                            : 'bg-accent-orange/20 text-accent-orange border-accent-orange shadow-[0_0_15px_rgba(242,127,27,0.3)]'
                                    : 'bg-transparent text-gray-500 border-gray-700 hover:border-gray-500'
                                    } ${activeFilter !== null && activeFilter !== key ? 'opacity-40' : ''}`}
                            >
                                <i className={config.icon}></i> {config.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                <div className="bg-surface-dark/90 backdrop-blur-md border border-white/5 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('prev')} className="w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-secondary flex items-center justify-center transition-all">
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <button onClick={() => navigate('next')} className="w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-secondary flex items-center justify-center transition-all">
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <i className="far fa-calendar text-primary"></i>
                        <span className="text-white font-bold text-lg capitalize font-display">
                            {daysToShow[0].toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })} - {daysToShow[daysToShow.length - 1].toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>

                    <div className="flex items-center bg-secondary rounded-lg p-1 border border-white/5">
                        <button
                            onClick={() => setViewMode('week')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'week' ? 'bg-primary text-secondary shadow-sm font-bold' : 'text-gray-400 hover:text-white'}`}
                        >
                            <i className="fas fa-calendar-week mr-1"></i> Semana
                        </button>
                        <button
                            onClick={() => setViewMode('day')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'day' ? 'bg-primary text-secondary shadow-sm font-bold' : 'text-gray-400 hover:text-white'}`}
                        >
                            <i className="fas fa-calendar-day mr-1"></i> Día
                        </button>
                    </div>
                </div>
            </div>

            {/* CALENDAR GRID */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className={`bg-surface-darker/50 rounded-2xl overflow-hidden border border-white/5 shadow-2xl relative`}>

                    {/* Headers Grid */}
                    <div className={`grid ${viewMode === 'week' ? 'grid-cols-7' : 'grid-cols-1'} border-b border-white/5`}>
                        {daysToShow.map((date, i) => {
                            // Mock today check relative to real date
                            const todayStr = new Date().toISOString().split('T')[0];
                            const dateStr = date.toISOString().split('T')[0];
                            const isToday = dateStr === todayStr;
                            return (
                                <div key={i} className={`p-4 text-center border-r border-white/5 last:border-r-0 ${isToday ? 'bg-primary/10' : 'bg-surface-dark'}`}>
                                    <p className={`text-sm font-medium uppercase mb-1 ${isToday ? 'text-primary' : 'text-gray-400'}`}>
                                        {date.toLocaleDateString('es-ES', { weekday: 'short' })}
                                    </p>
                                    <p className={`text-2xl font-bold font-display ${isToday ? 'text-white' : 'text-gray-500'}`}>
                                        {date.getDate()}
                                    </p>
                                </div>
                            )
                        })}
                    </div>

                    {/* Body - We use CSS Grid for precise placement */}
                    <div className="relative bg-surface-darker min-h-[600px] overflow-hidden">
                        {/* Background Columns/Grid Lines */}
                        <div className={`absolute inset-0 grid ${viewMode === 'week' ? 'grid-cols-7' : 'grid-cols-1'} pointer-events-none`}>
                            {daysToShow.map((_, i) => (
                                <div key={i} className="border-r border-white/5 h-full last:border-r-0"></div>
                            ))}
                        </div>

                        {/* Events Container */}
                        <div className="relative p-2 z-10 w-full" style={{
                            display: 'grid',
                            gridTemplateColumns: viewMode === 'week' ? 'repeat(7, 1fr)' : '1fr',
                            gridAutoRows: 'minmax(70px, auto)',
                            gap: '4px'
                        }}>
                            {/* We manually place items based on calculated rows */}
                            {processedEvents.events.map((event: any) => {
                                const todayStr = new Date().toISOString().split('T')[0];
                                const isExpired = event.endDate < todayStr;
                                const categoryStyle = CATEGORIES[event.category as keyof typeof CATEGORIES];

                                return (
                                    <div
                                        key={event.id}
                                        className={`
                                        relative rounded-lg border p-3 flex items-center gap-3 overflow-hidden group cursor-pointer transition-all hover:scale-[1.01] hover:z-20
                                        ${isExpired
                                                ? 'bg-gray-800/80 border-gray-600 grayscale opacity-60'
                                                : event.category === 'apuesta_gratis' ? 'bg-blue-600/20 border-blue-500 hover:bg-blue-600/30'
                                                    : event.category === 'giros_gratis' ? 'bg-gray-600/20 border-gray-500 hover:bg-gray-600/30'
                                                        : 'bg-indigo-600/20 border-indigo-500 hover:bg-indigo-600/30'
                                            }
                                    `}
                                        style={{
                                            gridColumnStart: event.colStart,
                                            gridColumnEnd: `span ${event.colSpan}`,
                                            gridRowStart: event.rowIndex + 1,
                                        }}
                                    >
                                        <img src={event.image} alt="" className="w-10 h-10 rounded-md object-cover border border-white/10 flex-shrink-0" />
                                        <div className="min-w-0 overflow-hidden">
                                            <p className="text-white text-xs font-bold truncate">{event.title}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] bg-black/40 px-1.5 py-0.5 rounded text-white border border-white/10 whitespace-nowrap">
                                                    <i className={`${categoryStyle.icon} mr-1 text-${categoryStyle.color}-400`}></i>
                                                    {event.benefit}
                                                </span>
                                            </div>
                                        </div>

                                        {isExpired && (
                                            <div className="absolute top-1 right-1">
                                                <span className="text-[9px] font-bold uppercase bg-gray-600 text-white px-1.5 py-0.5 rounded">Exp</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
