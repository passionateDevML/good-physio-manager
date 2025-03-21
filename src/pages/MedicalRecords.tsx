import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, PlusCircle, Search, Calendar, User, Activity, ClipboardList, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { NewMedicalRecordForm } from '@/components/patient/NewMedicalRecordForm';

// Define interfaces for type safety
interface Patient {
  id: number;
  name: string;
  lastUpdated: string;
  condition: string;
  status: string;
  dateOfBirth?: string;
  gender?: string;
  phone?: string;
  email?: string;
  address?: string;
  medicalHistory?: MedicalHistoryItem[];
  treatments?: TreatmentItem[];
  notes?: string;
}

interface MedicalHistoryItem {
  date: string;
  description: string;
}

interface TreatmentItem {
  date: string;
  type: string;
  description: string;
}

// Initial sample data
const initialPatients: Patient[] = [
  { 
    id: 1, 
    name: 'Jean Dupont', 
    lastUpdated: '15 Mar 2025', 
    condition: 'Lombalgie', 
    status: 'En traitement',
    dateOfBirth: '12/05/1978',
    gender: 'Homme',
    phone: '06 12 34 56 78',
    email: 'jean.dupont@email.com',
    address: '15 rue de Paris, 75001 Paris',
    medicalHistory: [
      { date: '10/02/2025', description: 'Première consultation pour douleurs lombaires' },
      { date: '25/02/2025', description: 'Diagnostic de lombalgie chronique' }
    ],
    treatments: [
      { date: '01/03/2025', type: 'Kinésithérapie', description: 'Exercices de renforcement musculaire' },
      { date: '10/03/2025', type: 'Massage thérapeutique', description: 'Massage des tissus profonds' }
    ],
    notes: 'Patient assidu qui suit rigoureusement son programme d\'exercices. Amélioration progressive.'
  },
  { 
    id: 2, 
    name: 'Marie Lambert', 
    lastUpdated: '10 Mar 2025', 
    condition: 'Entorse de la cheville', 
    status: 'Rétabli',
    dateOfBirth: '23/09/1985',
    gender: 'Femme',
    phone: '06 23 45 67 89',
    email: 'marie.lambert@email.com',
    address: '8 avenue Victor Hugo, 75016 Paris',
    medicalHistory: [
      { date: '15/01/2025', description: 'Entorse de la cheville gauche (grade 2) suite à une chute' }
    ],
    treatments: [
      { date: '20/01/2025', type: 'Physiothérapie', description: 'RICE protocol, attelle' },
      { date: '05/02/2025', type: 'Exercices', description: 'Rééducation proprioceptive' },
      { date: '25/02/2025', type: 'Évaluation finale', description: 'Récupération complète, fin du traitement' }
    ],
    notes: 'Récupération excellente. Conseils donnés pour la reprise sportive progressive.'
  },
  { 
    id: 3, 
    name: 'Pierre Martin', 
    lastUpdated: '08 Mar 2025', 
    condition: 'Tendinite', 
    status: 'En traitement',
    dateOfBirth: '04/11/1990',
    gender: 'Homme',
    phone: '06 34 56 78 90',
    email: 'pierre.martin@email.com',
    address: '25 boulevard Saint-Michel, 75005 Paris',
    medicalHistory: [
      { date: '01/03/2025', description: 'Consultation pour douleur au coude droit' },
      { date: '05/03/2025', description: 'Diagnostic de tendinite (épicondylite latérale)' }
    ],
    treatments: [
      { date: '05/03/2025', type: 'Physiothérapie', description: 'Ultrasons, thérapie manuelle' },
      { date: '08/03/2025', type: 'Exercices', description: 'Étirements et renforcement ciblés' }
    ],
    notes: 'Patient travaille sur ordinateur, conseils d\'ergonomie donnés. Orthèse prescrite pour la nuit.'
  },
  { 
    id: 4, 
    name: 'Sophie Dubois', 
    lastUpdated: '05 Mar 2025', 
    condition: 'Réhabilitation post-opératoire', 
    status: 'En traitement',
    dateOfBirth: '17/06/1965',
    gender: 'Femme',
    phone: '06 45 67 89 01',
    email: 'sophie.dubois@email.com',
    address: '12 rue Montorgueil, 75002 Paris',
    medicalHistory: [
      { date: '15/02/2025', description: 'Intervention chirurgicale - prothèse de genou droit' },
      { date: '01/03/2025', description: 'Début de la rééducation post-opératoire' }
    ],
    treatments: [
      { date: '01/03/2025', type: 'Mobilisation passive', description: 'Récupération amplitude articulaire' },
      { date: '05/03/2025', type: 'Kiné', description: 'Renforcement musculaire léger, marche assistée' }
    ],
    notes: 'Progrès satisfaisants considérant l\'âge et la condition générale. Légère inflammation occasionnelle.'
  },
  { 
    id: 5, 
    name: 'Thomas Bernard', 
    lastUpdated: '01 Mar 2025', 
    condition: 'Arthrose', 
    status: 'Suivi régulier',
    dateOfBirth: '30/08/1950',
    gender: 'Homme',
    phone: '06 56 78 90 12',
    email: 'thomas.bernard@email.com',
    address: '45 rue des Martyrs, 75009 Paris',
    medicalHistory: [
      { date: '10/01/2025', description: 'Consultation pour douleurs articulaires chroniques' },
      { date: '15/01/2025', description: 'Diagnostic d\'arthrose de la hanche gauche (grade 3)' }
    ],
    treatments: [
      { date: '20/01/2025', type: 'Hydrothérapie', description: 'Séances en piscine' },
      { date: '01/02/2025', type: 'Massage', description: 'Thérapie manuelle douce' },
      { date: '01/03/2025', type: 'Suivi', description: 'Évaluation et ajustements du programme' }
    ],
    notes: 'Condition chronique nécessitant un suivi régulier. Amélioration de la mobilité mais douleurs persistantes.'
  }
];

interface PatientRecordProps {
  patient: Patient;
  onClose: () => void;
}

const PatientRecord: React.FC<PatientRecordProps> = ({ patient, onClose }) => {
  return (
    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <div className="flex items-center justify-between">
          <DialogTitle className="text-xl">Dossier médical</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <DialogDescription>
          Informations complètes du patient
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-4">
        {/* Patient Info Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-physio-100 text-physio-700 text-2xl">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 flex-1">
                <div>
                  <p className="text-muted-foreground text-sm">Nom</p>
                  <p className="font-medium">{patient.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Date de naissance</p>
                  <p>{patient.dateOfBirth}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Genre</p>
                  <p>{patient.gender}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Téléphone</p>
                  <p>{patient.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Email</p>
                  <p>{patient.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Adresse</p>
                  <p>{patient.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Medical Condition */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">État de santé actuel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
              <div>
                <p className="text-muted-foreground text-sm">Condition</p>
                <p className="font-medium">{patient.condition}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Statut</p>
                <Badge className={`${
                  patient.status === 'En traitement'
                    ? 'bg-amber-100 text-amber-700'
                    : patient.status === 'Rétabli'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {patient.status}
                </Badge>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Dernière mise à jour</p>
                <p>{patient.lastUpdated}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Medical History */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-physio-500" />
              <CardTitle className="text-lg">Historique médical</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {patient.medicalHistory?.map((item, index) => (
                <div key={index} className="border-l-2 border-physio-200 pl-4 pb-3">
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Treatments */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-physio-500" />
              <CardTitle className="text-lg">Traitements</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patient.treatments?.map((treatment, index) => (
                <div key={index} className="bg-slate-50 p-3 rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{treatment.type}</h4>
                      <p className="text-sm text-muted-foreground">{treatment.date}</p>
                    </div>
                  </div>
                  <p className="mt-2">{treatment.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Notes */}
        {patient.notes && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{patient.notes}</p>
            </CardContent>
          </Card>
        )}
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button variant="outline" onClick={onClose}>
          Fermer
        </Button>
      </div>
    </DialogContent>
  );
};

export default function MedicalRecords() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isRecordDialogOpen, setIsRecordDialogOpen] = useState(false);
  const [isNewRecordDialogOpen, setIsNewRecordDialogOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  
  const handleViewRecord = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsRecordDialogOpen(true);
  };
  
  const handleAddNewRecord = (newPatient: Patient) => {
    setPatients(prev => [newPatient, ...prev]);
  };
  
  const filteredPatients = patients.filter(patient => {
    if (searchQuery === '') return true;
    
    const query = searchQuery.toLowerCase();
    return (
      patient.name.toLowerCase().includes(query) ||
      patient.condition.toLowerCase().includes(query) ||
      `GP-${patient.id.toString().padStart(4, '0')}`.toLowerCase().includes(query)
    );
  });
  
  const filterByStatus = (status: string) => {
    if (status === 'all') return filteredPatients;
    return filteredPatients.filter(p => p.status === status);
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dossiers Médicaux</h1>
          <p className="text-muted-foreground">
            Consultez et gérez les dossiers médicaux des patients
          </p>
        </div>
        <Button 
          className="bg-physio-500 hover:bg-physio-600" 
          onClick={() => setIsNewRecordDialogOpen(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouveau dossier
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un patient par nom, ID ou condition..."
            className="pl-8 w-full lg:w-[400px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="En traitement">En traitement</TabsTrigger>
          <TabsTrigger value="Suivi régulier">Suivi régulier</TabsTrigger>
          <TabsTrigger value="Rétabli">Rétablis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-physio-100 text-physio-700">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{patient.name}</CardTitle>
                      <CardDescription>ID: GP-{patient.id.toString().padStart(4, '0')}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">Condition:</span>
                      <span>{patient.condition}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">Dernière mise à jour:</span>
                      <span>{patient.lastUpdated}</span>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleViewRecord(patient)}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Voir le dossier
                      </Button>
                      <Badge className={`ml-2 ${
                        patient.status === 'En traitement'
                          ? 'bg-amber-100 text-amber-700'
                          : patient.status === 'Rétabli'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {patient.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {['En traitement', 'Suivi régulier', 'Rétabli'].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filterByStatus(status).length > 0 ? (
                filterByStatus(status).map((patient) => (
                  <Card key={patient.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-physio-100 text-physio-700">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{patient.name}</CardTitle>
                          <CardDescription>ID: GP-{patient.id.toString().padStart(4, '0')}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <div className="flex justify-between mb-1">
                          <span className="text-muted-foreground">Condition:</span>
                          <span>{patient.condition}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-muted-foreground">Dernière mise à jour:</span>
                          <span>{patient.lastUpdated}</span>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleViewRecord(patient)}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Voir le dossier
                          </Button>
                          <Badge className={`ml-2 ${
                            patient.status === 'En traitement'
                              ? 'bg-amber-100 text-amber-700'
                              : patient.status === 'Rétabli'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {patient.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-muted-foreground">
                  Aucun patient trouvé dans cette catégorie
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      {/* View Record Dialog */}
      <Dialog open={isRecordDialogOpen} onOpenChange={setIsRecordDialogOpen}>
        {selectedPatient && (
          <PatientRecord 
            patient={selectedPatient} 
            onClose={() => setIsRecordDialogOpen(false)} 
          />
        )}
      </Dialog>
      
      {/* New Record Dialog */}
      <Dialog open={isNewRecordDialogOpen} onOpenChange={setIsNewRecordDialogOpen}>
        <NewMedicalRecordForm 
          onClose={() => setIsNewRecordDialogOpen(false)}
          onSave={handleAddNewRecord}
        />
      </Dialog>
    </Layout>
  );
}
