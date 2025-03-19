
import React from 'react';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface PatientFormProps {
  patient: {
    id?: string;
    name: string;
    age: string;
    phone: string;
    email: string;
    condition: string;
  };
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSavePatient: () => void;
  onCancel: () => void;
}

export const PatientForm = ({ 
  patient, 
  isEditing,
  handleInputChange, 
  handleSavePatient, 
  onCancel 
}: PatientFormProps) => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{isEditing ? 'Modifier un patient' : 'Ajouter un patient'}</DialogTitle>
        <DialogDescription>
          {isEditing 
            ? 'Modifiez les informations du patient.' 
            : 'Ajoutez un nouveau patient à votre suivi.'}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Nom
          </Label>
          <Input
            id="name"
            name="name"
            value={patient.name}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="age" className="text-right">
            Âge
          </Label>
          <Input
            id="age"
            name="age"
            type="number"
            value={patient.age}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            Téléphone
          </Label>
          <Input
            id="phone"
            name="phone"
            value={patient.phone}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={patient.email}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="condition" className="text-right">
            Condition
          </Label>
          <Input
            id="condition"
            name="condition"
            value={patient.condition}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button 
          className="bg-physio-500 hover:bg-physio-600"
          onClick={handleSavePatient}
          disabled={!patient.name || !patient.email}
        >
          {isEditing ? 'Enregistrer' : 'Ajouter'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
