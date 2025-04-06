import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle, Search } from 'lucide-react';
import { toast } from 'sonner';
import { EvaluationForm } from '@/components/evaluation/EvaluationForm';
import { ScoreDialog } from '@/components/evaluation/ScoreDialog';
import { EvaluationSummary } from '@/components/evaluation/EvaluationSummary';

// Initialize mock data for patients and therapists with explicit empty arrays as fallbacks
const patients = [
  { id: '1', name: 'Jean Dupont' },
  { id: '2', name: 'Marie Lambert' },
  { id: '3', name: 'Pierre Lefebvre' },
  { id: '4', name: 'Sophie Martin' },
  { id: '5', name: 'Luc Moreau' }
] || [];

const therapists = [
  { id: '1', name: 'Dr. Martin' },
  { id: '2', name: 'Dr. Bernard' },
  { id: '3', name: 'Dr. Dubois' }
] || [];

// Current therapist (would come from auth context in a real app)
const currentTherapist = {
  id: '1',
  name: 'Dr. Martin'
};

// Mock initial evaluations data
const initialEvaluations = [
  {
    id: '1',
    title: 'Évaluation initiale',
    patientName: 'Jean Dupont',
    date: new Date('2025-03-15'),
    therapist: 'Dr. Martin',
    status: 'pending',
    consultationReason: 'Douleur lombaire persistante depuis 3 semaines',
    dailyActivitiesPercentage: 65
  },
  {
    id: '2',
    title: 'Évaluation initiale',
    patientName: 'Pierre Lefebvre',
    date: new Date('2025-03-18'),
    therapist: 'Dr. Martin',
    status: 'pending',
    consultationReason: 'Raideur au niveau du cou',
    dailyActivitiesPercentage: 80
  },
  {
    id: '3',
    title: 'Réévaluation',
    patientName: 'Marie Lambert',
    date: new Date('2025-03-10'),
    therapist: 'Dr. Bernard',
    score: '85/100',
    status: 'completed',
    consultationReason: 'Suivi post-opératoire',
    dailyActivitiesPercentage: 70
  },
  {
    id: '4',
    title: 'Réévaluation',
    patientName: 'Luc Moreau',
    date: new Date('2025-03-05'),
    therapist: 'Dr. Bernard',
    score: '72/100',
    status: 'completed',
    consultationReason: 'Contrôle de progression',
    dailyActivitiesPercentage: 55
  }
];

export default function Evaluations() {
  const [evaluations, setEvaluations] = useState(initialEvaluations || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<any | null>(null);
  const [isScoreDialogOpen, setIsScoreDialogOpen] = useState(false);
  
  const handleCreateEvaluation = (data: any) => {
    const safePatients = Array.isArray(patients) ? patients : [];
    const safeTherapists = Array.isArray(therapists) ? therapists : [];
    
    const patient = safePatients.find(p => p.id === data.patientId);
    const therapist = safeTherapists.find(t => t.id === data.therapistId);
    
    if (!patient || !therapist) {
      toast.error('Patient ou thérapeute invalide');
      return;
    }
    
    const newEvaluation = {
      id: (evaluations.length + 1).toString(),
      title: 'Évaluation physiothérapeutique',
      patientName: patient.name,
      date: data.date,
      therapist: therapist.name,
      status: 'pending' as const,
      consultationReason: data.consultationReason,
      dailyActivitiesPercentage: data.dailyActivitiesPercentage,
      ...data
    };
    
    setEvaluations([...evaluations, newEvaluation]);
    setIsDialogOpen(false);
    toast.success('Évaluation créée avec succès');
  };
  
  const handleOpenScoreDialog = (evaluation: any) => {
    setSelectedEvaluation(evaluation);
    setIsScoreDialogOpen(true);
  };

  const handleSaveScore = (id: string, score: string) => {
    setEvaluations(prevEvaluations => 
      prevEvaluations.map(evaluation => 
        evaluation.id === id 
          ? { ...evaluation, score, status: 'completed' as const } 
          : evaluation
      )
    );
    setIsScoreDialogOpen(false);
    toast.success('Score ajouté avec succès');
  };
  
  // Ensure we're always filtering a valid array
  const filteredEvaluations = Array.isArray(evaluations) 
    ? evaluations.filter(evaluation => {
        if (searchQuery === '') return true;
        
        const lowercaseQuery = searchQuery.toLowerCase();
        return (
          evaluation.patientName.toLowerCase().includes(lowercaseQuery) ||
          evaluation.title.toLowerCase().includes(lowercaseQuery) ||
          evaluation.therapist.toLowerCase().includes(lowercaseQuery) ||
          (evaluation.consultationReason && 
            evaluation.consultationReason.toLowerCase().includes(lowercaseQuery))
        );
      })
    : [];
  
  const pendingEvaluations = filteredEvaluations.filter(e => e.status === 'pending');
  const completedEvaluations = filteredEvaluations.filter(e => e.status === 'completed');

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Évaluations</h1>
          <p className="text-muted-foreground">
            Gérez les évaluations physiothérapeutiques des patients
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-physio-500 hover:bg-physio-600">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouvelle évaluation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>Nouvelle évaluation</DialogTitle>
              <DialogDescription>
                Créez une nouvelle évaluation physiothérapeutique pour un patient.
              </DialogDescription>
            </DialogHeader>
            {isDialogOpen && (
              <EvaluationForm 
                patients={patients}
                therapists={therapists}
                onSave={handleCreateEvaluation}
                onCancel={() => setIsDialogOpen(false)}
                currentTherapist={currentTherapist}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher une évaluation par patient, date, motif ou type..."
            className="pl-8 w-full lg:w-[400px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="completed">Complétées</TabsTrigger>
          <TabsTrigger value="all">Toutes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingEvaluations.length > 0 ? (
              pendingEvaluations.map((evaluation) => (
                <EvaluationSummary
                  key={evaluation.id}
                  evaluation={evaluation}
                  onScoreClick={handleOpenScoreDialog}
                  showActionButtons={true}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-muted-foreground">
                Aucune évaluation en attente
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {completedEvaluations.length > 0 ? (
              completedEvaluations.map((evaluation) => (
                <EvaluationSummary
                  key={evaluation.id}
                  evaluation={evaluation}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-muted-foreground">
                Aucune évaluation complétée
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvaluations.length > 0 ? (
              filteredEvaluations.map((evaluation) => (
                <EvaluationSummary
                  key={evaluation.id}
                  evaluation={evaluation}
                  onScoreClick={evaluation.status === 'pending' ? handleOpenScoreDialog : undefined}
                  showActionButtons={true}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-muted-foreground">
                Aucune évaluation trouvée
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {selectedEvaluation && (
        <ScoreDialog
          evaluation={selectedEvaluation}
          onSave={handleSaveScore}
          onCancel={() => setIsScoreDialogOpen(false)}
          isOpen={isScoreDialogOpen}
        />
      )}
    </Layout>
  );
}
