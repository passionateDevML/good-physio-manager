
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Therapist } from '@/pages/Admin';

interface AdminTherapistListProps {
  therapists: Therapist[];
  onEdit: (therapist: Therapist) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export const AdminTherapistList: React.FC<AdminTherapistListProps> = ({ 
  therapists, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>A list of your therapists.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Spécialisation</TableHead>
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
                <Switch
                  id={`active-${therapist.id}`}
                  checked={therapist.active}
                  onCheckedChange={() => onToggleStatus(therapist.id)}
                />
                <Label htmlFor={`active-${therapist.id}`} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {therapist.active ? 'Active' : 'Inactive'}
                </Label>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => onEdit(therapist)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(therapist.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>
              {therapists.length} thérapeutes au total
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
