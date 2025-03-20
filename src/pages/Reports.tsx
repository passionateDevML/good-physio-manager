
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileDown, FileSpreadsheet, FileOutput } from 'lucide-react';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { OverviewTab } from '@/components/reports/tabs/OverviewTab';
import { PatientsTab } from '@/components/reports/tabs/PatientsTab';
import { AppointmentsTab } from '@/components/reports/tabs/AppointmentsTab';
import { PerformanceTab } from '@/components/reports/tabs/PerformanceTab';
import { ExportDialog } from '@/components/reports/ExportDialog';

export default function Reports() {
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
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

  const sections = [
    { value: 'overview', label: 'Vue d\'ensemble' },
    { value: 'patients', label: 'Patients' },
    { value: 'appointments', label: 'Rendez-vous' },
    { value: 'performance', label: 'Performance' }
  ];

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
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Télécharger en CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              toast.success('Rapport PDF téléchargé', {
                description: `Le rapport complet a été exporté au format PDF.`
              });
            }}>
              <FileOutput className="mr-2 h-4 w-4" />
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
          <OverviewTab />
        </TabsContent>
        
        <TabsContent value="patients" className="space-y-4">
          <PatientsTab />
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <AppointmentsTab />
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <PerformanceTab />
        </TabsContent>
      </Tabs>

      <ExportDialog
        open={isExportDialogOpen}
        onOpenChange={setIsExportDialogOpen}
        sections={sections}
        defaultSection={activeTab}
      />
    </Layout>
  );
}
