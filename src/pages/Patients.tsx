
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PatientCard } from '@/components/patient/PatientCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { UserPlus, Search, Filter } from 'lucide-react';
import { PatientForm } from '@/components/patient/PatientForm';
import { toast } from 'sonner';

// Mock data
const patientsData = [
  {
    id: '1',
    name: 'Sophie Martin',
    avatarUrl: '',
    age: 42,
    phone: '06 12 34 56 78',
    email: 'sophie.m@example.com',
    lastVisit: '15/05/2023',
    nextAppointment: '21/06/2023',
    condition: 'Lombalgie chronique',
    progress: 75
  },
  {
    id: '2',
    name: 'Thomas Dubois',
    avatarUrl: '',
    age: 35,
    phone: '06 23 45 67 89',
    email: 'thomas.d@example.com',
    lastVisit: '18/05/2023',
    nextAppointment: '25/05/2023',
    condition: 'Entorse de la cheville',
    progress: 45
  },
  {
    id: '3',
    name: 'Emma Petit',
    avatarUrl: '',
    age: 28,
    phone: '06 34 56 78 90',
    email: 'emma.p@example.com',
    lastVisit: '12/05/2023',
    condition: 'Réhabilitation post-opératoire',
    progress: 90
  },
  {
    id: '4',
    name: 'Lucas Bernard',
    avatarUrl: '',
    age: 52,
    phone: '06 45 67 89 01',
    email: 'lucas.b@example.com',
    lastVisit: '10/05/2023',
    nextAppointment: '24/05/2023',
    condition: 'Arthrite de l\'épaule',
    progress: 60
  },
  {
    id: '5',
    name: 'Chloé Rousseau',
    avatarUrl: '',
    age: 32,
    phone: '06 56 78 90 12',
    email: 'chloe.r@example.com',
    lastVisit: '08/05/2023',
    condition: 'Douleurs cervicales',
    progress: 30
  },
  {
    id: '6',
    name: 'Maxime Leroy',
    avatarUrl: '',
    age: 47,
    phone: '06 67 89 01 23',
    email: 'maxime.l@example.com',
    lastVisit: '05/05/2023',
    nextAppointment: '22/05/2023',
    condition: 'Problèmes posturaux',
    progress: 25
  },
  {
    id: '7',
    name: 'Julie Moreau',
    avatarUrl: '',
    age: 39,
    phone: '06 78 90 12 34',
    email: 'julie.m@example.com',
    lastVisit: '03/05/2023',
    nextAppointment: '19/05/2023',
    condition: 'Tendinite du coude',
    progress: 55
  },
  {
    id: '8',
    name: 'Antoine Girard',
    avatarUrl: '',
    age: 44,
    phone: '06 89 01 23 45',
    email: 'antoine.g@example.com',
    lastVisit: '30/04/2023',
    condition: 'Rééducation post-AVC',
    progress: 40
  }
];

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState(patientsData);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    condition: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentPatient(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPatient = () => {
    setIsEditing(false);
    setCurrentPatient({
      name: '',
      age: '',
      phone: '',
      email: '',
      condition: '',
    });
    setIsOpen(true);
  };

  const handleSavePatient = () => {
    if (isEditing) {
      // Update existing patient logic would go here
      toast.success('Patient mis à jour avec succès');
    } else {
      // Add new patient
      const newPatient = {
        id: (patients.length + 1).toString(),
        name: currentPatient.name,
        age: parseInt(currentPatient.age) || 0,
        phone: currentPatient.phone,
        email: currentPatient.email,
        lastVisit: new Date().toLocaleDateString('fr-FR'),
        condition: currentPatient.condition,
        progress: 0,
        avatarUrl: '',
      };
      
      setPatients([...patients, newPatient]);
      toast.success('Patient ajouté avec succès');
    }
    
    setIsOpen(false);
  };

  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Patients</h1>
          <p className="text-muted-foreground">Gérez les dossiers patients</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-physio-500 hover:bg-physio-600 flex items-center gap-2"
              onClick={handleAddPatient}
            >
              <UserPlus className="h-4 w-4" />
              <span>Nouveau patient</span>
            </Button>
          </DialogTrigger>
          <PatientForm 
            patient={currentPatient}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
            handleSavePatient={handleSavePatient}
            onCancel={() => setIsOpen(false)}
          />
        </Dialog>
      </div>
      
      <div className="bg-white rounded-xl border border-border/50 overflow-hidden mb-8 shadow-soft">
        <div className="p-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un patient..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="md:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            <span>Filtres</span>
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="px-4 border-b border-border/50">
            <TabsList className="bg-transparent h-auto p-0">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-physio-500 rounded-none h-12"
              >
                Tous les patients
              </TabsTrigger>
              <TabsTrigger 
                value="active" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-physio-500 rounded-none h-12"
              >
                Patients actifs
              </TabsTrigger>
              <TabsTrigger 
                value="recent" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-physio-500 rounded-none h-12"
              >
                Récents
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0 p-0">
            <div className="p-4">
              {filteredPatients.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredPatients.map((patient) => (
                    <PatientCard key={patient.id} patient={patient} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">Aucun patient ne correspond à votre recherche.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="active" className="mt-0 p-0">
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredPatients
                  .filter(patient => patient.nextAppointment)
                  .map((patient) => (
                    <PatientCard key={patient.id} patient={patient} />
                  ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-0 p-0">
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredPatients
                  .slice(0, 4)
                  .map((patient) => (
                    <PatientCard key={patient.id} patient={patient} />
                  ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
