
import React from 'react';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface TherapistFormProps {
  newTherapist: {
    name: string;
    email: string;
    specialization: string;
    password: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddTherapist: () => void;
  onCancel: () => void;
}

export const TherapistForm = ({ 
  newTherapist, 
  handleInputChange, 
  handleAddTherapist, 
  onCancel 
}: TherapistFormProps) => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Ajouter un thérapeute</DialogTitle>
        <DialogDescription>
          Créez un nouveau compte thérapeute. Le thérapeute recevra un email avec ses identifiants.
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
            value={newTherapist.name}
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
            value={newTherapist.email}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="specialization" className="text-right">
            Spécialité
          </Label>
          <Input
            id="specialization"
            name="specialization"
            value={newTherapist.specialization}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="password" className="text-right">
            Mot de passe
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={newTherapist.password}
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
          onClick={handleAddTherapist}
          disabled={!newTherapist.name || !newTherapist.email || !newTherapist.password}
        >
          Ajouter
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
