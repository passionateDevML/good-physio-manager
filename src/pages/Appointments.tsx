
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppointmentForm } from '@/components/appointment/AppointmentForm';
import { AppointmentItem } from '@/components/appointment/AppointmentItem';
import { CalendarView } from '@/components/appointment/CalendarView';
import { AppointmentFilters } from '@/components/appointment/AppointmentFilters';
import { DateNavigation } from '@/components/appointment/DateNavigation';
import { initialAppointments, Appointment } from '@/components/appointment/AppointmentTypes';
import { toast } from 'sonner';

export default function Appointments() {
  const [date, setDate] = useState<Date>(new Date());
  const [appointmentsList, setAppointmentsList] = useState<Appointment[]>(initialAppointments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: 'Tous',
    status: 'Tous'
  });
  
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

  const handleSaveAppointment = (appointmentData: any) => {
    // Find patient name from ID
    const patientName = appointmentData.patientId === '1' ? 'Sophie Martin' : 
                         appointmentData.patientId === '2' ? 'Thomas Dubois' : 
                         appointmentData.patientId === '3' ? 'Emma Petit' : 
                         'Patient';

    const newAppointment: Appointment = {
      id: (appointmentsList.length + 1).toString(),
      patient: { name: patientName, avatarUrl: '' },
      time: appointmentData.time,
      type: appointmentData.type,
      status: 'scheduled',
      notes: appointmentData.notes
    };
    
    setAppointmentsList([...appointmentsList, newAppointment]);
    setIsDialogOpen(false);
    toast.success('Rendez-vous créé avec succès');
  };

  const handleStatusChange = (id: string, newStatus: 'scheduled' | 'completed' | 'cancelled' | 'in-progress') => {
    const updatedAppointments = appointmentsList.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    );
    setAppointmentsList(updatedAppointments);
    
    const statusLabels = {
      'completed': 'terminé',
      'cancelled': 'annulé',
      'in-progress': 'en cours',
      'scheduled': 'planifié'
    };
    
    toast.success(`Rendez-vous marqué comme ${statusLabels[newStatus]}`);
  };

  const handleFilterChange = (filterType: 'type' | 'status', value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const applyFilters = () => {
    // Prepare filtered list based on filters
    toast.success('Filtres appliqués avec succès');
  };

  // Filter appointments based on selected filters
  const filteredAppointments = appointmentsList.filter(app => {
    // Filter by type
    if (filters.type !== 'Tous' && !app.type.includes(filters.type)) {
      return false;
    }
    
    // Filter by status
    if (filters.status === 'Planifié' && app.status !== 'scheduled') return false;
    if (filters.status === 'Terminé' && app.status !== 'completed') return false;
    if (filters.status === 'Annulé' && app.status !== 'cancelled') return false;
    
    return true;
  });

  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Rendez-vous</h1>
          <p className="text-muted-foreground">Gérez votre agenda et vos rendez-vous</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-physio-500 hover:bg-physio-600 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Nouveau rendez-vous</span>
            </Button>
          </DialogTrigger>
          <AppointmentForm 
            onSave={handleSaveAppointment}
            onCancel={() => setIsDialogOpen(false)}
          />
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <Card className="overflow-hidden shadow-soft">
            <DateNavigation 
              date={date}
              onPrevDay={handlePrevDay}
              onNextDay={handleNextDay}
              onSelectDate={setDate}
            />
            
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
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                      <AppointmentItem 
                        key={appointment.id} 
                        appointment={appointment} 
                        onStatusChange={handleStatusChange}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Aucun rendez-vous ne correspond à vos critères
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="calendar" className="mt-0 p-0">
                <CalendarView date={date} appointments={filteredAppointments} />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        
        <div className="order-1 lg:order-2">
          <AppointmentFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
            onApplyFilters={applyFilters}
          />
        </div>
      </div>
    </Layout>
  );
}
