
import React, { useState, useEffect } from 'react';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Therapist } from '@/pages/Admin';

interface TherapistFormDialogProps {
  isEdit: boolean;
  therapist: Therapist | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const TherapistFormDialog: React.FC<TherapistFormDialogProps> = ({ 
  isEdit, 
  therapist, 
  onSubmit, 
  onCancel 
}) => {
  const [name, setName] = useState(therapist?.name || '');
  const [email, setEmail] = useState(therapist?.email || '');
  const [specialization, setSpecialization] = useState(therapist?.specialization || '');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (therapist) {
      setName(therapist.name);
      setEmail(therapist.email);
      setSpecialization(therapist.specialization);
    } else {
      // Reset form when adding a new therapist
      setName('');
      setEmail('');
      setSpecialization('');
      setPassword('');
    }
  }, [therapist]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, specialization, password });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{isEdit ? 'Modifier le thérapeute' : 'Ajouter un thérapeute'}</DialogTitle>
        <DialogDescription>
          {isEdit ? 'Modifier les informations du thérapeute.' : 'Ajouter un nouveau thérapeute à la liste.'}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Nom
          </Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="col-span-3"
            required
            disabled={isEdit}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="specialization" className="text-right">
            Spécialisation
          </Label>
          <Input
            type="text"
            id="specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="col-span-3"
            required
          />
        </div>
        {!isEdit && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Mot de passe
            </Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
        )}
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            {isEdit ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
