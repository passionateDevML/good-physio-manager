
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MoreHorizontal, Check, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface AppointmentItemProps {
  appointment: {
    id: string;
    patient: { name: string; avatarUrl: string };
    time: string;
    type: string;
    status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
    notes?: string;
  };
  onStatusChange: (id: string, status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress') => void;
}

export function AppointmentItem({ appointment, onStatusChange }: AppointmentItemProps) {
  const statusConfig = {
    'scheduled': { label: 'Planifié', color: 'bg-amber-100 text-amber-700' },
    'completed': { label: 'Terminé', color: 'bg-emerald-100 text-emerald-700' },
    'cancelled': { label: 'Annulé', color: 'bg-rose-100 text-rose-700' },
    'in-progress': { label: 'En cours', color: 'bg-physio-100 text-physio-700' },
  };
  
  return (
    <Card className="hover:shadow-glass transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-border">
              <AvatarImage src={appointment.patient.avatarUrl} alt={appointment.patient.name} />
              <AvatarFallback className="bg-physio-100 text-physio-700">
                {appointment.patient.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="font-medium text-sm">{appointment.patient.name}</h3>
              <div className="flex items-center text-xs text-muted-foreground gap-3 mt-1">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{appointment.time}</span>
                </div>
                <span>{appointment.type}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className={cn(statusConfig[appointment.status].color)}>
              {statusConfig[appointment.status].label}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  className="cursor-pointer flex items-center gap-2"
                  onClick={() => onStatusChange(appointment.id, 'completed')}
                >
                  <Check className="h-4 w-4" />
                  <span>Marquer comme terminé</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer flex items-center gap-2"
                  onClick={() => onStatusChange(appointment.id, 'cancelled')}
                >
                  <X className="h-4 w-4" />
                  <span>Annuler</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {appointment.notes && (
          <div className="mt-3 p-2 bg-muted rounded-md text-xs">
            {appointment.notes}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
