
import React from 'react';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Therapist } from './TherapistList';

interface TherapistFormProps {
  therapist: {
    id?: string;
    name: string;
    email: string;
    specialization: string;
    password: string;
  };
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveTherapist: () => void;
  onCancel: () => void;
}

export const TherapistForm = ({ 
  therapist, 
  isEditing,
  handleInputChange, 
  handleSaveTherapist, 
  onCancel 
}: TherapistFormProps) => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{isEditing ? 'Modifier un thérapeute' : 'Ajouter un thérapeute'}</DialogTitle>
        <DialogDescription>
          {isEditing 
            ? 'Modifiez les informations du thérapeute.' 
            : 'Créez un nouveau compte thérapeute. Le thérapeute recevra un email avec ses identifiants.'}
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
            value={therapist.name}
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
            value={therapist.email}
            onChange={handleInputChange}
            className="col-span-3"
            disabled={isEditing}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="specialization" className="text-right">
            Spécialité
          </Label>
          <Input
            id="specialization"
            name="specialization"
            value={therapist.specialization}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>
        {!isEditing && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Mot de passe
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={therapist.password}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
        )}
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button 
          className="bg-physio-500 hover:bg-physio-600"
          onClick={handleSaveTherapist}
          disabled={!therapist.name || (!isEditing && !therapist.password) || !therapist.email}
        >
          {isEditing ? 'Enregistrer' : 'Ajouter'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
