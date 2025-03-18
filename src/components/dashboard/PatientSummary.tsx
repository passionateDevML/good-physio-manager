
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone, Mail, Calendar, ChevronRight } from 'lucide-react';

interface PatientSummaryProps {
  patient: {
    id: string;
    name: string;
    avatarUrl?: string;
    phone: string;
    email: string;
    nextAppointment?: {
      date: string;
      time: string;
    };
    progress: number;
  };
  className?: string;
}

export function PatientSummary({ patient, className }: PatientSummaryProps) {
  return (
    <div className={cn('card-premium p-5', className)}>
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 border-2 border-physio-100">
          <AvatarImage src={patient.avatarUrl} alt={patient.name} />
          <AvatarFallback className="bg-physio-100 text-physio-700 text-lg">
            {patient.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h3 className="font-semibold">{patient.name}</h3>
          <div className="flex mt-1 gap-3 text-muted-foreground text-xs">
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>{patient.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>{patient.email}</span>
            </div>
          </div>
        </div>
      </div>
      
      {patient.nextAppointment && (
        <div className="mt-4 p-3 bg-accent rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-physio-500" />
              <span className="text-sm font-medium">Prochain rendez-vous</span>
            </div>
            <span className="text-xs text-muted-foreground">{patient.nextAppointment.date}</span>
          </div>
          <p className="mt-1 text-sm">{patient.nextAppointment.time}</p>
        </div>
      )}
      
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Progrès du traitement</span>
          <span className="text-sm font-medium">{patient.progress}%</span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-physio-400 to-physio-500 rounded-full transition-all duration-1000 ease-in-out"
            style={{ width: `${patient.progress}%` }}
          />
        </div>
      </div>
      
      <Button variant="ghost" className="w-full justify-between mt-4 text-physio-500 hover:text-physio-600 hover:bg-physio-50">
        <span>Voir le dossier complet</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
