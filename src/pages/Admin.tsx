import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Therapist {
  id: string;
  name: string;
  email: string;
  specialization: string;
  password?: string;
  active: boolean;
}

const initialTherapists: Therapist[] = [
  {
    id: '1',
    name: 'Dr. Jane Doe',
    email: 'jane.doe@example.com',
    specialization: 'Orthopedic',
    active: true,
  },
  {
    id: '2',
    name: 'Dr. John Smith',
    email: 'john.smith@example.com',
    specialization: 'Neurology',
    active: false,
  },
];

interface TherapistFormProps {
  isEdit: boolean;
  therapist: Therapist | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const TherapistForm: React.FC<TherapistFormProps> = ({ isEdit, therapist, onSubmit, onCancel }) => {
  const [name, setName] = useState(therapist?.name || '');
  const [email, setEmail] = useState(therapist?.email || '');
  const [specialization, setSpecialization] = useState(therapist?.specialization || '');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (therapist) {
      setName(therapist.name);
      setEmail(therapist.email);
      setSpecialization(therapist.specialization);
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

interface TherapistListProps {
  therapists: Therapist[];
  onEdit: (therapist: Therapist) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const TherapistList: React.FC<TherapistListProps> = ({ therapists, onEdit, onDelete, onToggleStatus }) => {
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

export default function Admin() {
  const [therapists, setTherapists] = useState<Therapist[]>(initialTherapists);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTherapist, setCurrentTherapist: any] = useState<Therapist | null>(null);
  const [dialogType, setDialogType] = useState<'add' | 'edit'>('add');

  const handleEditTherapist = (therapist: Therapist) => {
    setCurrentTherapist(therapist);
    setDialogType('edit');
    setIsDialogOpen(true);
  };

  const handleDeleteTherapist = (id: string) => {
    setTherapists(therapists.filter(therapist => therapist.id !== id));
    toast.success("Thérapeute supprimé avec succès");
  };

  const handleTherapistListProps = () => {
    return {
      therapists,
      onEdit: handleEditTherapist,
      onDelete: handleDeleteTherapist,
      onToggleStatus: (id: string) => {
        console.log(`Toggle status for therapist with ID ${id}`);
      }
    };
  };

  const updateTherapist = (data: any) => {
    setTherapists(therapists.map(therapist => {
      if (therapist.id === currentTherapist.id) {
        return { ...therapist, ...data };
      }
      return therapist;
    }));
    toast.success("Thérapeute mis à jour avec succès");
    setIsDialogOpen(false);
  };

  const addTherapist = (data: any) => {
    const newTherapist = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email,
      specialization: data.specialization,
      password: data.password,
      active: true
    };
    
    setTherapists([...therapists, newTherapist]);
    toast.success("Thérapeute ajouté avec succès");
    setIsDialogOpen(false);
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Administration</h1>
        <p className="text-muted-foreground">Gérez les paramètres de votre cabinet</p>
      </div>
      
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Thérapeutes</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-physio-500 hover:bg-physio-600"
                  onClick={() => {
                    setCurrentTherapist(null);
                    setDialogType('add');
                  }}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Ajouter un thérapeute
                </Button>
              </DialogTrigger>
              <TherapistForm
                isEdit={dialogType === 'edit'}
                therapist={currentTherapist}
                onSubmit={dialogType === 'edit' ? updateTherapist : addTherapist}
                onCancel={() => setIsDialogOpen(false)}
              />
            </Dialog>
          </div>
          <CardDescription>
            Gérez les thérapeutes de votre cabinet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TherapistList {...handleTherapistListProps()} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Statistiques</CardTitle>
          <CardDescription>
            Aperçu rapide des statistiques de votre cabinet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Nombre total de patients: <strong>120</strong></p>
          <p>Nombre total de rendez-vous ce mois-ci: <strong>85</strong></p>
        </CardContent>
      </Card>
    </Layout>
  );
}
