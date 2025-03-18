
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Phone, 
  Mail, 
  Calendar, 
  Activity,
  FileText
} from 'lucide-react';

interface PatientCardProps {
  patient: {
    id: string;
    name: string;
    avatarUrl?: string;
    age: number;
    phone: string;
    email: string;
    lastVisit: string;
    nextAppointment?: string;
    condition: string;
    progress: number;
  };
  onClick?: () => void;
  className?: string;
}

export function PatientCard({ patient, onClick, className }: PatientCardProps) {
  return (
    <div 
      className={cn(
        'card-premium p-5 flex flex-col gap-4 animate-zoom-in cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 border-2 border-physio-100">
          <AvatarImage src={patient.avatarUrl} alt={patient.name} />
          <AvatarFallback className="bg-physio-100 text-physio-700 text-lg">
            {patient.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h3 className="font-semibold">{patient.name}</h3>
          <p className="text-sm text-muted-foreground">{patient.age} ans</p>
        </div>
        
        <div className="rounded-full bg-physio-50 p-1">
          <div 
            className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-br from-physio-400 to-physio-600"
          >
            <span className="text-xs font-semibold text-white">{patient.progress}%</span>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground space-y-2">
        <div className="flex items-center gap-2">
          <Phone className="h-3 w-3" />
          <span>{patient.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-3 w-3" />
          <span>{patient.email}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Activity className="h-4 w-4 text-physio-500" />
          <span>{patient.condition}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-amber-500" />
          <span>Dernier RDV: {patient.lastVisit}</span>
        </div>
        
        {patient.nextAppointment && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-emerald-500" />
            <span>Prochain RDV: {patient.nextAppointment}</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-2 mt-auto">
        <Button className="flex-1" variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-1" />
          Dossier
        </Button>
        <Button className="flex-1 bg-physio-500 hover:bg-physio-600" size="sm">
          <Calendar className="h-4 w-4 mr-1" />
          RDV
        </Button>
      </div>
    </div>
  );
}
