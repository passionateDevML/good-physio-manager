
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { collection, query, getDocs, doc, setDoc, updateDoc, deleteDoc, where } from 'firebase/firestore';
import { createUser } from '@/utils/auth';
import { useFirebase } from '@/context/FirebaseContext';
import { AdminTherapistList } from '@/components/admin/AdminTherapistList';
import { TherapistFormDialog } from '@/components/admin/TherapistFormDialog';
import { AdminStats } from '@/components/admin/AdminStats';

export interface Therapist {
  id: string;
  name: string;
  email: string;
  specialization: string;
  password?: string;
  active: boolean;
}

export default function Admin() {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTherapist, setCurrentTherapist] = useState<Therapist | null>(null);
  const [dialogType, setDialogType] = useState<'add' | 'edit'>('add');
  const { db } = useFirebase();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const therapistsRef = collection(db, 'users');
        const q = query(therapistsRef, where('role', '==', 'therapist'));
        const querySnapshot = await getDocs(q);
        
        const fetchedTherapists: Therapist[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedTherapists.push({
            id: doc.id,
            name: data.name,
            email: data.email,
            specialization: data.specialization || '',
            active: data.active !== false,
          });
        });
        
        setTherapists(fetchedTherapists);
      } catch (error) {
        console.error('Error fetching therapists:', error);
        toast.error('Erreur lors du chargement des thérapeutes');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTherapists();
  }, [db]);

  const handleEditTherapist = (therapist: Therapist) => {
    setCurrentTherapist(therapist);
    setDialogType('edit');
    setIsDialogOpen(true);
  };

  const handleDeleteTherapist = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      
      setTherapists(therapists.filter(therapist => therapist.id !== id));
      toast.success("Thérapeute supprimé avec succès");
    } catch (error) {
      console.error('Error deleting therapist:', error);
      toast.error("Erreur lors de la suppression du thérapeute");
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const therapistToUpdate = therapists.find(t => t.id === id);
      if (!therapistToUpdate) return;
      
      const newStatus = !therapistToUpdate.active;
      
      await updateDoc(doc(db, 'users', id), {
        active: newStatus
      });
      
      setTherapists(therapists.map(therapist => {
        if (therapist.id === id) {
          return { ...therapist, active: newStatus };
        }
        return therapist;
      }));
      
      toast.success(`Thérapeute ${newStatus ? 'activé' : 'désactivé'} avec succès`);
    } catch (error) {
      console.error('Error toggling therapist status:', error);
      toast.error("Erreur lors de la mise à jour du statut");
    }
  };

  const updateTherapist = async (data: { name: string, specialization: string }) => {
    try {
      if (!currentTherapist) return;
      
      await updateDoc(doc(db, 'users', currentTherapist.id), {
        name: data.name,
        specialization: data.specialization
      });
      
      setTherapists(therapists.map(therapist => {
        if (therapist.id === currentTherapist.id) {
          return { 
            ...therapist, 
            name: data.name, 
            specialization: data.specialization 
          };
        }
        return therapist;
      }));
      
      toast.success("Thérapeute mis à jour avec succès");
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error updating therapist:', error);
      toast.error("Erreur lors de la mise à jour du thérapeute");
    }
  };

  const addTherapist = async (data: { name: string, email: string, specialization: string, password: string }) => {
    try {
      const success = await createUser(
        data.email, 
        data.password, 
        data.name, 
        'therapist'
      );
      
      if (success) {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', data.email));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const newDoc = querySnapshot.docs[0];
          
          await updateDoc(doc(db, 'users', newDoc.id), {
            specialization: data.specialization,
            active: true
          });
          
          const newTherapist: Therapist = {
            id: newDoc.id,
            name: data.name,
            email: data.email,
            specialization: data.specialization,
            active: true
          };
          
          setTherapists([...therapists, newTherapist]);
          toast.success("Thérapeute ajouté avec succès");
        }
      } else {
        toast.error("Erreur lors de la création du thérapeute");
      }
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error adding therapist:', error);
      toast.error("Erreur lors de l'ajout du thérapeute");
    }
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
              <TherapistFormDialog
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
          <AdminTherapistList 
            therapists={therapists}
            onEdit={handleEditTherapist}
            onDelete={handleDeleteTherapist}
            onToggleStatus={handleToggleStatus}
          />
        </CardContent>
      </Card>
      
      <AdminStats />
    </Layout>
  );
}
