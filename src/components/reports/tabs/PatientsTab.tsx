
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Search, Users } from 'lucide-react';

const patients = [
  { id: '1', name: 'Sophie Martin', sessions: 12, lastVisit: '15/05/2023', condition: 'Lombalgie' },
  { id: '2', name: 'Thomas Dubois', sessions: 8, lastVisit: '18/05/2023', condition: 'Entorse' },
  { id: '3', name: 'Emma Petit', sessions: 15, lastVisit: '12/05/2023', condition: 'Réhabilitation' },
  { id: '4', name: 'Lucas Bernard', sessions: 6, lastVisit: '10/05/2023', condition: 'Arthrite' },
  { id: '5', name: 'Julie Moreau', sessions: 10, lastVisit: '03/05/2023', condition: 'Tendinite' },
];

export function PatientsTab() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Users className="h-5 w-5" />
          Liste des patients
        </CardTitle>
        <CardDescription>
          Historique des patients et statistiques
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un patient..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Nombre de séances</TableHead>
                <TableHead>Dernière visite</TableHead>
                <TableHead>Condition</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map(patient => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.sessions}</TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>{patient.condition}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
