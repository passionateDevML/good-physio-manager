
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Filter, 
  Plus,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Check,
  X
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// Mock data
const appointments = [
  {
    id: '1',
    patient: { name: 'Sophie Martin', avatarUrl: '' },
    time: '09:00 - 10:00',
    type: 'Séance de rééducation',
    status: 'scheduled',
    notes: 'Exercices de mobilité + massages'
  },
  {
    id: '2',
    patient: { name: 'Thomas Dubois', avatarUrl: '' },
    time: '10:30 - 11:30',
    type: 'Évaluation initiale',
    status: 'scheduled',
    notes: 'Première évaluation complète'
  },
  {
    id: '3',
    patient: { name: 'Emma Petit', avatarUrl: '' },
    time: '13:00 - 14:00',
    type: 'Traitement manuel',
    status: 'scheduled',
    notes: 'Manipulation vertébrale'
  },
  {
    id: '4',
    patient: { name: 'Lucas Bernard', avatarUrl: '' },
    time: '14:30 - 15:30',
    type: 'Suivi thérapeutique',
    status: 'scheduled',
    notes: 'Bilan de progression'
  },
  {
    id: '5',
    patient: { name: 'Julie Moreau', avatarUrl: '' },
    time: '16:00 - 17:00',
    type: 'Rééducation post-opératoire',
    status: 'scheduled',
    notes: 'Contrôle de la mobilité'
  }
];

interface AppointmentItemProps {
  appointment: typeof appointments[0];
}

function AppointmentItem({ appointment }: AppointmentItemProps) {
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
            <Badge className={cn(statusConfig[appointment.status as keyof typeof statusConfig].color)}>
              {statusConfig[appointment.status as keyof typeof statusConfig].label}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Marquer comme terminé</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
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

export default function Appointments() {
  const [date, setDate] = useState<Date>(new Date());
  
  // Format today's date
  const formattedDate = format(date, 'dd MMMM yyyy', { locale: fr });
  
  // Day name
  const dayName = format(date, 'EEEE', { locale: fr });
  const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
  
  const handlePrevDay = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    setDate(newDate);
  };
  
  const handleNextDay = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    setDate(newDate);
  };

  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Rendez-vous</h1>
          <p className="text-muted-foreground">Gérez votre agenda et vos rendez-vous</p>
        </div>
        <Button className="bg-physio-500 hover:bg-physio-600 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Nouveau rendez-vous</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <Card className="overflow-hidden shadow-soft">
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
                  onClick={handlePrevDay}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleNextDay}
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
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <Tabs defaultValue="list" className="w-full">
              <div className="px-4 bg-white border-b border-border/50">
                <TabsList className="bg-transparent h-auto p-0">
                  <TabsTrigger 
                    value="list" 
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-physio-500 rounded-none h-12"
                  >
                    Liste
                  </TabsTrigger>
                  <TabsTrigger 
                    value="calendar" 
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-physio-500 rounded-none h-12"
                  >
                    Agenda
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="list" className="mt-0 p-0">
                <div className="p-4 space-y-3">
                  {appointments.map((appointment) => (
                    <AppointmentItem key={appointment.id} appointment={appointment} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="calendar" className="mt-0 p-0">
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  Vue agenda à venir
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        
        <div className="order-1 lg:order-2">
          <Card className="shadow-soft">
            <div className="p-4 bg-white border-b border-border/50">
              <h2 className="font-semibold">Filtres</h2>
            </div>
            <CardContent className="p-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Type de rendez-vous</h3>
                <div className="space-y-2">
                  {['Tous', 'Évaluation', 'Rééducation', 'Suivi'].map((type) => (
                    <div key={type} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`type-${type}`} 
                        className="h-4 w-4 rounded border-gray-300 text-physio-600 focus:ring-physio-500"
                        defaultChecked={type === 'Tous'}
                      />
                      <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Statut</h3>
                <div className="space-y-2">
                  {['Tous', 'Planifié', 'Terminé', 'Annulé'].map((status) => (
                    <div key={status} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`status-${status}`} 
                        className="h-4 w-4 rounded border-gray-300 text-physio-600 focus:ring-physio-500"
                        defaultChecked={status === 'Tous'}
                      />
                      <label htmlFor={`status-${status}`} className="ml-2 text-sm text-gray-700">
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button className="w-full flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Appliquer les filtres</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
