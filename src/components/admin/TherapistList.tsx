
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, UserCog } from 'lucide-react';

export interface Therapist {
  id: string;
  name: string;
  email: string;
  specialization: string;
  status: 'active' | 'inactive';
}

interface TherapistListProps {
  therapists: Therapist[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (therapist: Therapist) => void;
}

export const TherapistList = ({ 
  therapists, 
  onToggleStatus, 
  onDelete,
  onEdit
}: TherapistListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCog className="h-5 w-5" />
          Thérapeutes
        </CardTitle>
        <CardDescription>
          Liste des thérapeutes enregistrés dans le système
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Spécialité</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {therapists.map((therapist) => (
              <TableRow key={therapist.id}>
                <TableCell className="font-medium">{therapist.name}</TableCell>
                <TableCell>{therapist.email}</TableCell>
                <TableCell>{therapist.specialization}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    therapist.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {therapist.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onToggleStatus(therapist.id)}
                    >
                      {therapist.status === 'active' ? 'Désactiver' : 'Activer'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="h-8 w-8 text-amber-600 hover:text-amber-700"
                      onClick={() => onEdit(therapist)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-700"
                      onClick={() => onDelete(therapist.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Total: {therapists.length} thérapeutes</p>
      </CardFooter>
    </Card>
  );
};
