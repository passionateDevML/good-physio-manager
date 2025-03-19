
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DateNavigationProps {
  date: Date;
  onPrevDay: () => void;
  onNextDay: () => void;
  onSelectDate: (date: Date) => void;
}

export function DateNavigation({ date, onPrevDay, onNextDay, onSelectDate }: DateNavigationProps) {
  // Format today's date
  const formattedDate = format(date, 'dd MMMM yyyy', { locale: fr });
  
  // Day name
  const dayName = format(date, 'EEEE', { locale: fr });
  const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
  
  return (
    <div className="p-4 bg-white border-b border-border/50 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div>
          <h2 className="font-semibold">{capitalizedDayName}</h2>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={onPrevDay}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={onNextDay}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="ml-2 h-8 flex items-center gap-2"
            >
              <CalendarIcon className="h-4 w-4" />
              <span className="text-sm">Calendrier</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && onSelectDate(newDate)}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
