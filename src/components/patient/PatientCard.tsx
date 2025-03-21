
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface PatientCardProps {
  patient: {
    id: string;
    name: string;
    age?: number;
    phone?: string;
    email?: string;
    lastVisit?: string;
    nextAppointment?: string;
    condition?: string;
    progress?: number;
    avatarUrl?: string;
  };
}

export function PatientCard({ patient }: PatientCardProps) {
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const handleViewMedicalRecord = () => {
    navigate(`/records?patientId=${patient.id}&name=${encodeURIComponent(patient.name)}`);
  };

  const handleViewAppointments = () => {
    navigate(`/appointments?patientId=${patient.id}&name=${encodeURIComponent(patient.name)}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarFallback className="bg-gradient-to-br from-physio-100 to-physio-200 text-physio-700">
              {getInitials(patient.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{patient.name}</CardTitle>
            {patient.age && <div className="text-sm text-muted-foreground">{patient.age} ans</div>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        {patient.condition && (
          <div className="mb-3">
            <div className="text-sm font-medium mb-1">Condition</div>
            <Badge variant="outline" className="bg-slate-50">
              {patient.condition}
            </Badge>
          </div>
        )}
        
        {patient.progress !== undefined && (
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Progression</span>
              <span>{patient.progress}%</span>
            </div>
            <Progress value={patient.progress} className="h-2" />
          </div>
        )}
        
        <div className="space-y-2 text-sm">
          {patient.phone && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Téléphone:</span>
              <span>{patient.phone}</span>
            </div>
          )}
          
          {patient.email && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="truncate max-w-[140px]">{patient.email}</span>
            </div>
          )}
          
          {patient.lastVisit && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dernière visite:</span>
              <span>{patient.lastVisit}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center justify-center"
          onClick={handleViewMedicalRecord}
        >
          <FileText className="h-4 w-4 mr-1" /> Dossier
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center justify-center"
          onClick={handleViewAppointments}
        >
          <Calendar className="h-4 w-4 mr-1" /> RDV
        </Button>
      </CardFooter>
    </Card>
  );
}
