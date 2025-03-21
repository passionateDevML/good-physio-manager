
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { UserPlus, Search, Trash2, Edit, Shield, User, Users, Building, Settings } from 'lucide-react';
import { TherapistForm } from '@/components/admin/TherapistForm';
import { TherapistList } from '@/components/admin/TherapistList';
import { SecuritySettings } from '@/components/admin/SecuritySettings';
import { toast } from 'sonner';

// Define a Therapist type
interface Therapist {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  specialization: string;
}

// Mock data
const therapists: Therapist[] = [
  { id: '1', name: 'Dr. Marie Dupont', email: 'marie.d@goodphysio.com', status: 'active', specialization: 'Rhumatologie' },
  { id: '2', name: 'Dr. Thomas Bernard', email: 'thomas.b@goodphysio.com', status: 'active', specialization: 'Orthopédie' },
  { id: '3', name: 'Dr. Sophie Martin', email: 'sophie.m@goodphysio.com', status: 'inactive', specialization: 'Pédiatrie' },
  { id: '4', name: 'Dr. Lucas Petit', email: 'lucas.p@goodphysio.com', status: 'active', specialization: 'Neurologie' },
  { id: '5', name: 'Dr. Emma Leroy', email: 'emma.l@goodphysio.com', status: 'active', specialization: 'Gériatrie' },
];

const clinicSettings = {
  name: 'Centre de Physiothérapie Saint-Michel',
  address: '23 rue Saint-Michel, 75005 Paris',
  phone: '01 23 45 67 89',
  email: 'contact@goodphysio.com',
  schedule: {
    monday: '9:00 - 18:00',
    tuesday: '9:00 - 18:00',
    wednesday: '9:00 - 18:00',
    thursday: '9:00 - 18:00',
    friday: '9:00 - 17:00',
    saturday: '9:00 - 12:00',
    sunday: 'Fermé'
  },
  maxAppointmentsPerDay: 20,
  defaultAppointmentDuration: 45
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState('therapists');
  const [searchTerm, setSearchTerm] = useState('');
  const [therapistList, setTherapistList] = useState<Therapist[]>(therapists);
  const [isTherapistFormOpen, setIsTherapistFormOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentTherapist, setCurrentTherapist] = useState<Therapist | null>(null);
  const [clinicInfo, setClinicInfo] = useState(clinicSettings);

  const filteredTherapists = therapistList.filter(
    therapist => 
      therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewTherapist = () => {
    setEditing(false);
    setCurrentTherapist(null);
    setIsTherapistFormOpen(true);
  };

  const handleEditTherapist = (therapist: Therapist) => {
    setEditing(true);
    setCurrentTherapist(therapist);
    setIsTherapistFormOpen(true);
  };

  const handleSaveTherapist = (therapist: Therapist) => {
    if (editing && currentTherapist) {
      // Edit existing therapist
      setTherapistList(
        therapistList.map(t => t.id === currentTherapist.id ? therapist : t)
      );
      toast.success('Thérapeute modifié avec succès');
    } else {
      // Add new therapist
      const newTherapist: Therapist = {
        ...therapist,
        id: (therapistList.length + 1).toString(),
        status: therapist.status as "active" | "inactive"
      };
      setTherapistList([...therapistList, newTherapist]);
      toast.success('Thérapeute ajouté avec succès');
    }
    setIsTherapistFormOpen(false);
  };

  const handleDeleteTherapist = (id: string) => {
    setTherapistList(therapistList.filter(t => t.id !== id));
    toast.success('Thérapeute supprimé avec succès');
  };

  const handleUpdateClinicInfo = (field: string, value: string) => {
    setClinicInfo({
      ...clinicInfo,
      [field]: value
    });
    toast.success('Informations mises à jour');
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Administration</h1>
          <p className="text-muted-foreground">
            Gérez les paramètres de la clinique et les utilisateurs
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-transparent p-0 border-b border-border/50 w-full h-auto space-x-6">
          <TabsTrigger 
            value="therapists" 
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-physio-500 rounded-none h-12 px-1"
          >
            <Users className="h-4 w-4 mr-2" />
            Thérapeutes
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-physio-500 rounded-none h-12 px-1"
          >
            <Shield className="h-4 w-4 mr-2" />
            Sécurité
          </TabsTrigger>
          <TabsTrigger 
            value="clinic" 
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-physio-500 rounded-none h-12 px-1"
          >
            <Building className="h-4 w-4 mr-2" />
            Clinique
          </TabsTrigger>
          <TabsTrigger 
            value="system" 
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-physio-500 rounded-none h-12 px-1"
          >
            <Settings className="h-4 w-4 mr-2" />
            Système
          </TabsTrigger>
        </TabsList>

        <TabsContent value="therapists" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un thérapeute..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={isTherapistFormOpen} onOpenChange={setIsTherapistFormOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-physio-500 hover:bg-physio-600 flex items-center gap-2"
                  onClick={handleNewTherapist}
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Ajouter un thérapeute</span>
                </Button>
              </DialogTrigger>
              <TherapistForm
                therapist={currentTherapist}
                isEditing={editing}
                onSave={handleSaveTherapist}
                onCancel={() => setIsTherapistFormOpen(false)}
              />
            </Dialog>
          </div>

          <TherapistList 
            therapists={filteredTherapists}
            onEdit={handleEditTherapist}
            onDelete={handleDeleteTherapist}
          />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="clinic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations de la clinique</CardTitle>
              <CardDescription>
                Personnalisez les informations générales de votre clinique
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="clinicName">Nom de la clinique</Label>
                  <Input 
                    id="clinicName" 
                    value={clinicInfo.name}
                    onChange={(e) => handleUpdateClinicInfo('name', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="clinicAddress">Adresse</Label>
                  <Input 
                    id="clinicAddress" 
                    value={clinicInfo.address}
                    onChange={(e) => handleUpdateClinicInfo('address', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="clinicPhone">Téléphone</Label>
                  <Input 
                    id="clinicPhone" 
                    value={clinicInfo.phone}
                    onChange={(e) => handleUpdateClinicInfo('phone', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="clinicEmail">Email</Label>
                  <Input 
                    id="clinicEmail" 
                    value={clinicInfo.email}
                    onChange={(e) => handleUpdateClinicInfo('email', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-3">Horaires d'ouverture</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Jour</TableHead>
                      <TableHead>Heures</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(clinicInfo.schedule).map(([day, hours]) => (
                      <TableRow key={day}>
                        <TableCell className="capitalize">{day}</TableCell>
                        <TableCell>
                          <Input 
                            value={hours}
                            onChange={(e) => handleUpdateClinicInfo(`schedule.${day}`, e.target.value)}
                            className="w-full"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Paramètres des rendez-vous</CardTitle>
              <CardDescription>
                Configurez les options par défaut pour les rendez-vous
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="maxAppointments">Nombre maximum de rendez-vous par jour</Label>
                  <Input 
                    id="maxAppointments" 
                    type="number"
                    value={clinicInfo.maxAppointmentsPerDay}
                    onChange={(e) => handleUpdateClinicInfo('maxAppointmentsPerDay', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="appointmentDuration">Durée par défaut des rendez-vous (min)</Label>
                  <Input 
                    id="appointmentDuration" 
                    type="number"
                    value={clinicInfo.defaultAppointmentDuration}
                    onChange={(e) => handleUpdateClinicInfo('defaultAppointmentDuration', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres système</CardTitle>
              <CardDescription>
                Configuration avancée du système
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="dataRetention">Durée de conservation des données (jours)</Label>
                  <Input 
                    id="dataRetention" 
                    type="number"
                    defaultValue={365}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="backupFrequency">Fréquence des sauvegardes</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="backupFrequency" className="mt-1">
                      <SelectValue placeholder="Sélectionner une fréquence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Toutes les heures</SelectItem>
                      <SelectItem value="daily">Quotidienne</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                      <SelectItem value="monthly">Mensuelle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="bg-physio-500 hover:bg-physio-600">
                  Sauvegarder la configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
