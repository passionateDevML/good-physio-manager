
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { AppointmentCard } from '@/components/dashboard/AppointmentCard';
import { PatientSummary } from '@/components/dashboard/PatientSummary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { LineChart, BarChart } from 'recharts';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar } from 'recharts';
import { CalendarClock, ChevronRight, Plus, UserPlus } from 'lucide-react';
import { PatientForm } from '@/components/patient/PatientForm';
import { AppointmentForm } from '@/components/appointment/AppointmentForm';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Mock data
const appointmentsData = [
  {
    patient: { name: 'Sophie Martin', avatarUrl: '' },
    time: '09:00 - 10:00',
    date: 'Aujourd\'hui',
    status: 'in-progress' as const,
    type: 'Séance de rééducation'
  },
  {
    patient: { name: 'Thomas Dubois', avatarUrl: '' },
    time: '10:30 - 11:30',
    date: 'Aujourd\'hui',
    status: 'scheduled' as const,
    type: 'Évaluation initiale'
  },
  {
    patient: { name: 'Emma Petit', avatarUrl: '' },
    time: '13:00 - 14:00',
    date: 'Aujourd\'hui',
    status: 'scheduled' as const,
    type: 'Traitement manuel'
  },
  {
    patient: { name: 'Lucas Bernard', avatarUrl: '' },
    time: '14:30 - 15:30',
    date: 'Aujourd\'hui',
    status: 'scheduled' as const,
    type: 'Suivi thérapeutique'
  },
];

const patientsData = [
  {
    id: '1',
    name: 'Sophie Martin',
    avatarUrl: '',
    phone: '06 12 34 56 78',
    email: 'sophie.m@example.com',
    nextAppointment: {
      date: 'Aujourd\'hui',
      time: '09:00 - 10:00'
    },
    progress: 75
  },
  {
    id: '2',
    name: 'Thomas Dubois',
    avatarUrl: '',
    phone: '06 23 45 67 89',
    email: 'thomas.d@example.com',
    nextAppointment: {
      date: 'Aujourd\'hui',
      time: '10:30 - 11:30'
    },
    progress: 45
  },
  {
    id: '3',
    name: 'Emma Petit',
    avatarUrl: '',
    phone: '06 34 56 78 90',
    email: 'emma.p@example.com',
    nextAppointment: {
      date: 'Aujourd\'hui',
      time: '13:00 - 14:00'
    },
    progress: 90
  }
];

const chartData = [
  { name: 'Lun', patients: 15, appointments: 18 },
  { name: 'Mar', patients: 18, appointments: 22 },
  { name: 'Mer', patients: 16, appointments: 19 },
  { name: 'Jeu', patients: 19, appointments: 23 },
  { name: 'Ven', patients: 22, appointments: 25 },
  { name: 'Sam', patients: 13, appointments: 15 },
  { name: 'Dim', patients: 0, appointments: 0 },
];

const evaluationData = [
  { name: 'Terminée', value: 65 },
  { name: 'En cours', value: 35 },
];

export default function Dashboard() {
  const [isPatientDialogOpen, setIsPatientDialogOpen] = useState(false);
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    condition: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentPatient(prev => ({ ...prev, [name]: value }));
  };

  const handleSavePatient = () => {
    toast.success('Patient ajouté avec succès');
    setIsPatientDialogOpen(false);
    // In a real app, we would add the patient to the state/database
  };

  const handleSaveAppointment = (appointmentData: any) => {
    toast.success('Rendez-vous créé avec succès');
    setIsAppointmentDialogOpen(false);
    // In a real app, we would add the appointment to the state/database
  };

  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground">Bienvenue sur votre espace Good Physio</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isPatientDialogOpen} onOpenChange={setIsPatientDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                <span>Nouveau patient</span>
              </Button>
            </DialogTrigger>
            <PatientForm 
              patient={currentPatient}
              isEditing={false}
              handleInputChange={handleInputChange}
              handleSavePatient={handleSavePatient}
              onCancel={() => setIsPatientDialogOpen(false)}
            />
          </Dialog>
          
          <Dialog open={isAppointmentDialogOpen} onOpenChange={setIsAppointmentDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-physio-500 hover:bg-physio-600 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Nouveau rendez-vous</span>
              </Button>
            </DialogTrigger>
            <AppointmentForm 
              onSave={handleSaveAppointment}
              onCancel={() => setIsAppointmentDialogOpen(false)}
            />
          </Dialog>
        </div>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Activité hebdomadaire</CardTitle>
                <CardDescription>Aperçu des patients et rendez-vous</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Voir le détail
              </Button>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="appointments" 
                    stroke="#0e96e6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="patients" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Rendez-vous du jour</CardTitle>
                <CardDescription>Vous avez 4 rendez-vous aujourd'hui</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-physio-500 hover:text-physio-600 hover:bg-physio-50 group"
                onClick={() => navigate('/appointments')}
              >
                <CalendarClock className="h-4 w-4 mr-1 group-hover:mr-2 transition-all" />
                <span>Voir l'agenda</span>
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointmentsData.map((appointment, index) => (
                <AppointmentCard key={index} {...appointment} />
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Dernières évaluations</CardTitle>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <span>Tout voir</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={evaluationData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis type="number" stroke="#888888" fontSize={12} />
                  <YAxis dataKey="name" type="category" stroke="#888888" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0e96e6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Patients à suivre</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground"
                onClick={() => navigate('/patients')}
              >
                <span>Voir tous</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            {patientsData.map((patient) => (
              <PatientSummary key={patient.id} patient={patient} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
