
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, UserCog } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Therapist {
  id: string;
  name: string;
  email: string;
  specialization: string;
  status: 'active' | 'inactive';
}

export default function Admin() {
  const { toast } = useToast();
  
  // For demo purposes, we'll use a mock list of therapists
  const [therapists, setTherapists] = useState<Therapist[]>([
    { id: '1', name: 'Dr. Sophie Dupont', email: 'sophie.dupont@goodphysio.com', specialization: 'Physiothérapie', status: 'active' },
    { id: '2', name: 'Dr. Thomas Martin', email: 'thomas.martin@goodphysio.com', specialization: 'Ostéopathie', status: 'active' },
    { id: '3', name: 'Dr. Julie Robert', email: 'julie.robert@goodphysio.com', specialization: 'Kinésithérapie', status: 'inactive' },
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTherapist, setNewTherapist] = useState({
    name: '',
    email: '',
    specialization: '',
    password: '',
  });
  
  const handleAddTherapist = () => {
    const id = (therapists.length + 1).toString();
    const therapist: Therapist = {
      id,
      name: newTherapist.name,
      email: newTherapist.email,
      specialization: newTherapist.specialization,
      status: 'active',
    };
    
    setTherapists([...therapists, therapist]);
    setNewTherapist({ name: '', email: '', specialization: '', password: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Thérapeute ajouté",
      description: `${therapist.name} a été ajouté avec succès`,
    });
  };
  
  const handleDeleteTherapist = (id: string) => {
    const updatedTherapists = therapists.filter(therapist => therapist.id !== id);
    setTherapists(updatedTherapists);
    
    toast({
      title: "Thérapeute supprimé",
      description: "Le thérapeute a été supprimé avec succès",
    });
  };
  
  const handleToggleStatus = (id: string) => {
    const updatedTherapists = therapists.map(therapist => {
      if (therapist.id === id) {
        return {
          ...therapist,
          status: therapist.status === 'active' ? 'inactive' : 'active'
        };
      }
      return therapist;
    });
    
    setTherapists(updatedTherapists);
    
    toast({
      title: "Statut modifié",
      description: "Le statut du thérapeute a été mis à jour",
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTherapist(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion des utilisateurs</h1>
            <p className="text-muted-foreground">
              Gérez les comptes thérapeutes et leurs permissions
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-physio-500 hover:bg-physio-600">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un thérapeute
              </Button>
            </DialogTrigger>
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
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
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
          </Dialog>
        </div>

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
                          onClick={() => handleToggleStatus(therapist.id)}
                        >
                          {therapist.status === 'active' ? 'Désactiver' : 'Activer'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-8 w-8 text-amber-600 hover:text-amber-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteTherapist(therapist.id)}
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

        <Card>
          <CardHeader>
            <CardTitle>Paramètres de sécurité</CardTitle>
            <CardDescription>
              Configuration des règles de sécurité pour les comptes utilisateurs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Politique de mot de passe</Label>
              <Alert>
                <AlertDescription>
                  Les mots de passe doivent contenir au moins 8 caractères, incluant une majuscule, un chiffre et un caractère spécial.
                </AlertDescription>
              </Alert>
            </div>

            <div className="space-y-2">
              <Label>Session d'activité</Label>
              <Alert>
                <AlertDescription>
                  Les utilisateurs seront automatiquement déconnectés après 2 heures d'inactivité.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Modifier les paramètres de sécurité</Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
