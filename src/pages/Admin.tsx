
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TherapistList, Therapist } from '@/components/admin/TherapistList';
import { TherapistForm } from '@/components/admin/TherapistForm';
import { SecuritySettings } from '@/components/admin/SecuritySettings';

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
            <TherapistForm 
              newTherapist={newTherapist}
              handleInputChange={handleInputChange}
              handleAddTherapist={handleAddTherapist}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </Dialog>
        </div>

        <TherapistList 
          therapists={therapists}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDeleteTherapist}
        />

        <SecuritySettings />
      </div>
    </Layout>
  );
}
