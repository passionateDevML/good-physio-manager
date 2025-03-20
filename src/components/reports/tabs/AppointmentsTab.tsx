
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { FileBarChart } from 'lucide-react';
import { initialAppointments } from '@/components/appointment/AppointmentTypes';
import { AppointmentTypePieChart } from '../charts/AppointmentTypePieChart';
import { AppointmentsByDayChart } from '../charts/AppointmentsByDayChart';

const appointmentTypes = [
  { name: 'Rééducation', value: 40 },
  { name: 'Évaluation', value: 25 },
  { name: 'Traitement manuel', value: 20 },
  { name: 'Suivi', value: 15 },
];

const appointmentsByDay = [
  { day: 'Lun', count: 8 },
  { day: 'Mar', count: 10 },
  { day: 'Mer', count: 12 },
  { day: 'Jeu', count: 9 },
  { day: 'Ven', count: 11 },
];

export function AppointmentsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <FileBarChart className="h-5 w-5" />
          Statistiques des rendez-vous
        </CardTitle>
        <CardDescription>
          Analyse des rendez-vous sur les 6 derniers mois
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Types de rendez-vous</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <AppointmentTypePieChart data={appointmentTypes} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Rendez-vous par jour</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <AppointmentsByDayChart data={appointmentsByDay} />
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Rendez-vous récents</h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialAppointments.slice(0, 5).map(appointment => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.patient.name}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.type}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {appointment.status === 'scheduled' ? 'Planifié' :
                         appointment.status === 'completed' ? 'Terminé' :
                         appointment.status === 'cancelled' ? 'Annulé' : 'En cours'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
