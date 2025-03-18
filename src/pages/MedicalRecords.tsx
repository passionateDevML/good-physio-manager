
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, PlusCircle, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function MedicalRecords() {
  const patients = [
    { id: 1, name: 'Jean Dupont', lastUpdated: '15 Mar 2025', condition: 'Lombalgie', status: 'En traitement' },
    { id: 2, name: 'Marie Lambert', lastUpdated: '10 Mar 2025', condition: 'Entorse de la cheville', status: 'Rétabli' },
    { id: 3, name: 'Pierre Martin', lastUpdated: '08 Mar 2025', condition: 'Tendinite', status: 'En traitement' },
    { id: 4, name: 'Sophie Dubois', lastUpdated: '05 Mar 2025', condition: 'Réhabilitation post-opératoire', status: 'En traitement' },
    { id: 5, name: 'Thomas Bernard', lastUpdated: '01 Mar 2025', condition: 'Arthrose', status: 'Suivi régulier' },
  ];

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dossiers Médicaux</h1>
          <p className="text-muted-foreground">
            Consultez et gérez les dossiers médicaux des patients
          </p>
        </div>
        <Button className="bg-physio-500 hover:bg-physio-600">
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
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="treatment">En traitement</TabsTrigger>
          <TabsTrigger value="followup">Suivi régulier</TabsTrigger>
          <TabsTrigger value="recovered">Rétablis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {patients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-md transition-shadow cursor-pointer">
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
                      <Button variant="outline" size="sm" className="w-full">
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
        
        <TabsContent value="treatment" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {patients.filter(p => p.status === 'En traitement').map((patient) => (
              <Card key={patient.id} className="hover:shadow-md transition-shadow cursor-pointer">
                {/* Same card content as above */}
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
                      <Button variant="outline" size="sm" className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        Voir le dossier
                      </Button>
                      <Badge className="ml-2 bg-amber-100 text-amber-700">
                        {patient.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Similar TabsContent for other tabs omitted for brevity */}
      </Tabs>
    </Layout>
  );
}
