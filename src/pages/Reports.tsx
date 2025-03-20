
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  BarChart3, 
  Download, 
  FileBarChart, 
  FileText, 
  PieChart, 
  Search,
  Users, 
  FileDown,
  Calendar,
  FileCsv,
  FilePdf
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPickChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { initialAppointments } from '@/components/appointment/AppointmentTypes';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [exportOptions, setExportOptions] = useState({
    format: "csv",
    includeCharts: true,
    dateRange: "month"
  });
  
  // Sample data for charts
  const monthlyAppointments = [
    { name: 'Jan', count: 35 },
    { name: 'Fév', count: 42 },
    { name: 'Mar', count: 55 },
    { name: 'Avr', count: 40 },
    { name: 'Mai', count: 45 },
    { name: 'Juin', count: 50 },
  ];

  const conditionDistribution = [
    { name: 'Lombalgie', value: 35 },
    { name: 'Entorse', value: 25 },
    { name: 'Tendinite', value: 20 },
    { name: 'Arthrose', value: 15 },
    { name: 'Autre', value: 5 },
  ];

  const performanceData = [
    { month: 'Jan', completed: 28, cancelled: 7 },
    { month: 'Fév', completed: 34, cancelled: 8 },
    { month: 'Mar', completed: 45, cancelled: 10 },
    { month: 'Avr', completed: 34, cancelled: 6 },
    { month: 'Mai', completed: 38, cancelled: 7 },
    { month: 'Juin', completed: 42, cancelled: 8 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Mock patients data for the patients tab
  const patients = [
    { id: '1', name: 'Sophie Martin', sessions: 12, lastVisit: '15/05/2023', condition: 'Lombalgie' },
    { id: '2', name: 'Thomas Dubois', sessions: 8, lastVisit: '18/05/2023', condition: 'Entorse' },
    { id: '3', name: 'Emma Petit', sessions: 15, lastVisit: '12/05/2023', condition: 'Réhabilitation' },
    { id: '4', name: 'Lucas Bernard', sessions: 6, lastVisit: '10/05/2023', condition: 'Arthrite' },
    { id: '5', name: 'Julie Moreau', sessions: 10, lastVisit: '03/05/2023', condition: 'Tendinite' },
  ];

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleExportData = () => {
    // In a real implementation, this would generate and download the file
    setIsExportDialogOpen(false);
    toast.success(
      `Rapport exporté en format ${exportOptions.format.toUpperCase()}`,
      {
        description: `Les données du rapport "${getActiveTabName()}" ont été exportées.`,
        duration: 5000,
      }
    );
  };

  const getActiveTabName = () => {
    switch(activeTab) {
      case 'overview': return 'Vue d\'ensemble';
      case 'patients': return 'Patients';
      case 'appointments': return 'Rendez-vous';
      case 'performance': return 'Performance';
      default: return 'Rapport';
    }
  };

  const formatCurrentDate = () => {
    return format(new Date(), 'dd MMMM yyyy', { locale: fr });
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rapports et Analyses</h1>
          <p className="text-muted-foreground">
            Consultez les rapports et analyses de performance de la clinique
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter les données
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsExportDialogOpen(true)}>
              <FileDown className="mr-2 h-4 w-4" />
              Exporter avec options
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              toast.success('Rapport CSV téléchargé', {
                description: `Le rapport complet a été exporté au format CSV.`
              });
            }}>
              <FileCsv className="mr-2 h-4 w-4" />
              Télécharger en CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              toast.success('Rapport PDF téléchargé', {
                description: `Le rapport complet a été exporté au format PDF.`
              });
            }}>
              <FilePdf className="mr-2 h-4 w-4" />
              Télécharger en PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                  <CardDescription>Tous les patients enregistrés</CardDescription>
                </div>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">152</div>
                <p className="text-xs text-muted-foreground">
                  +24 depuis le mois dernier
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium">Rendez-vous Mensuels</CardTitle>
                  <CardDescription>Nombre de consultations</CardDescription>
                </div>
                <FileBarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">267</div>
                <p className="text-xs text-muted-foreground">
                  +12% par rapport au mois précédent
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium">Taux de Satisfaction</CardTitle>
                  <CardDescription>Basé sur les retours patients</CardDescription>
                </div>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">
                  +2.1% par rapport au trimestre précédent
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Rendez-vous mensuels</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyAppointments}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value} RDV`, 'Rendez-vous']}
                      labelFormatter={(label) => `Mois: ${label}`}
                    />
                    <Bar dataKey="count" fill="#475be8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Distribution des conditions</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPickChart>
                    <Pie
                      data={conditionDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {conditionDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={(value) => [`${value} patients`, 'Patients']} />
                  </RechartsPickChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Users className="h-5 w-5" />
                Liste des patients
              </CardTitle>
              <CardDescription>
                Historique des patients et statistiques
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un patient..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Nombre de séances</TableHead>
                      <TableHead>Dernière visite</TableHead>
                      <TableHead>Condition</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map(patient => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.name}</TableCell>
                        <TableCell>{patient.sessions}</TableCell>
                        <TableCell>{patient.lastVisit}</TableCell>
                        <TableCell>{patient.condition}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <FileBarChart className="h-5 w-5" />
                Statistiques des rendez-vous
              </CardTitle>
              <CardDescription>
                Analyse des rendez-vous sur les 6 derniers mois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Types de rendez-vous</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPickChart>
                        <Pie
                          data={[
                            { name: 'Rééducation', value: 40 },
                            { name: 'Évaluation', value: 25 },
                            { name: 'Traitement manuel', value: 20 },
                            { name: 'Suivi', value: 15 },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {conditionDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip formatter={(value) => [`${value} rendez-vous`, 'Nombre']} />
                      </RechartsPickChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Rendez-vous par jour</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { day: 'Lun', count: 8 },
                          { day: 'Mar', count: 10 },
                          { day: 'Mer', count: 12 },
                          { day: 'Jeu', count: 9 },
                          { day: 'Ven', count: 11 },
                        ]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} RDV`, 'Rendez-vous']} />
                        <Bar dataKey="count" fill="#475be8" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Rendez-vous récents</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {initialAppointments.slice(0, 5).map(appointment => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium">{appointment.patient.name}</TableCell>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell>{appointment.type}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                              appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                              appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {appointment.status === 'scheduled' ? 'Planifié' :
                               appointment.status === 'completed' ? 'Terminé' :
                               appointment.status === 'cancelled' ? 'Annulé' : 'En cours'}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance de la clinique
              </CardTitle>
              <CardDescription>
                Indicateurs de performance sur les 6 derniers mois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-medium">Taux de complétion</CardTitle>
                      <CardDescription>Rendez-vous réalisés</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">85%</div>
                    <p className="text-xs text-muted-foreground">
                      +3% par rapport au mois précédent
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-medium">Durée moyenne</CardTitle>
                      <CardDescription>Temps de traitement</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45 min</div>
                    <p className="text-xs text-muted-foreground">
                      -2 min par rapport au mois précédent
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
                      <CardDescription>Note moyenne</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.8/5</div>
                    <p className="text-xs text-muted-foreground">
                      +0.1 par rapport au trimestre précédent
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Évolution des performances</h3>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="completed" stroke="#00C49F" name="Terminés" />
                      <Line type="monotone" dataKey="cancelled" stroke="#FF8042" name="Annulés" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Export Data Dialog */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Exporter les données du rapport</DialogTitle>
            <DialogDescription>
              Personnalisez votre export pour le rapport "{getActiveTabName()}"
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="format" className="text-right">
                Format
              </Label>
              <Select
                value={exportOptions.format}
                onValueChange={(value) => setExportOptions({...exportOptions, format: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="range" className="text-right">
                Période
              </Label>
              <Select
                value={exportOptions.dateRange}
                onValueChange={(value) => setExportOptions({...exportOptions, dateRange: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner une période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="quarter">Ce trimestre</SelectItem>
                  <SelectItem value="year">Cette année</SelectItem>
                  <SelectItem value="all">Toutes les données</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeCharts" 
                    checked={exportOptions.includeCharts}
                    onCheckedChange={(checked) => 
                      setExportOptions({...exportOptions, includeCharts: checked as boolean})
                    }
                  />
                  <Label htmlFor="includeCharts">Inclure les graphiques</Label>
                </div>
              </div>
            </div>
            <div className="col-span-4 text-sm text-muted-foreground">
              <p>Rapport généré à la date du {formatCurrentDate()}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleExportData} className="bg-physio-500 hover:bg-physio-600">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
