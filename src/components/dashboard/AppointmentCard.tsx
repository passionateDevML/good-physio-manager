
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Clock, 
  Calendar
} from 'lucide-react';

interface AppointmentCardProps {
  patient: {
    name: string;
    avatarUrl?: string;
  };
  time: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  type: string;
  className?: string;
}

export function AppointmentCard({ patient, time, date, status, type, className }: AppointmentCardProps) {
  const statusConfig = {
    'scheduled': { label: 'Planifié', color: 'bg-amber-100 text-amber-700' },
    'completed': { label: 'Terminé', color: 'bg-emerald-100 text-emerald-700' },
    'cancelled': { label: 'Annulé', color: 'bg-rose-100 text-rose-700' },
    'in-progress': { label: 'En cours', color: 'bg-physio-100 text-physio-700' },
  };

  return (
    <div className={cn('card-premium p-4 hover-scale', className)}>
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10 border border-border">
          <AvatarImage src={patient.avatarUrl} alt={patient.name} />
          <AvatarFallback className="bg-physio-100 text-physio-700">
            {patient.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate">{patient.name}</h3>
          <p className="text-muted-foreground text-xs">{type}</p>
        </div>
        
        <Badge className={cn('ml-auto', statusConfig[status].color)}>
          {statusConfig[status].label}
        </Badge>
      </div>
      
      <div className="mt-4 flex items-center text-muted-foreground text-xs gap-4">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}
