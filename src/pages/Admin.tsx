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
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTherapist, setCurrentTherapist] = useState({
    id: '',
    name: '',
    email: '',
    specialization: '',
    password: '',
  });
  
  const handleAddTherapist = () => {
    setIsEditing(false);
    setCurrentTherapist({
      id: '',
      name: '',
      email: '',
      specialization: '',
      password: '',
    });
    setIsDialogOpen(true);
  };
  
  const handleEditTherapist = (therapist: Therapist) => {
    setIsEditing(true);
    setCurrentTherapist({
      id: therapist.id,
      name: therapist.name,
      email: therapist.email,
      specialization: therapist.specialization,
      password: '', // We don't want to show the password
    });
    setIsDialogOpen(true);
  };
  
  const handleSaveTherapist = () => {
    if (isEditing) {
      // Update existing therapist
      const updatedTherapists = therapists.map(therapist => {
        if (therapist.id === currentTherapist.id) {
          return {
            ...therapist,
            name: currentTherapist.name,
            specialization: currentTherapist.specialization,
          };
        }
        return therapist;
      });
      
      setTherapists(updatedTherapists);
      toast({
        title: "Thérapeute modifié",
        description: `${currentTherapist.name} a été modifié avec succès`,
      });
    } else {
      // Add new therapist
      const id = (therapists.length + 1).toString();
      const newTherapist: Therapist = {
        id,
        name: currentTherapist.name,
        email: currentTherapist.email,
        specialization: currentTherapist.specialization,
        status: 'active',
      };
      
      setTherapists([...therapists, newTherapist]);
      toast({
        title: "Thérapeute ajouté",
        description: `${newTherapist.name} a été ajouté avec succès`,
      });
    }
    
    setCurrentTherapist({ id: '', name: '', email: '', specialization: '', password: '' });
    setIsDialogOpen(false);
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
  
  const handleDeleteTherapist = (id: string) => {
    const updatedTherapists = therapists.filter(therapist => therapist.id !== id);
    setTherapists(updatedTherapists);
    
    toast({
      title: "Thérapeute supprimé",
      description: "Le thérapeute a été supprimé avec succès",
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentTherapist(prev => ({ ...prev, [name]: value }));
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
          <Button className="bg-physio-500 hover:bg-physio-600" onClick={handleAddTherapist}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un thérapeute
          </Button>
        </div>

        <TherapistList 
          therapists={therapists}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDeleteTherapist}
          onEdit={handleEditTherapist}
        />

        <SecuritySettings />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <TherapistForm 
            therapist={currentTherapist}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
            handleSaveTherapist={handleSaveTherapist}
            onCancel={() => setIsDialogOpen(false)}
          />
        </Dialog>
      </div>
    </Layout>
  );
}
