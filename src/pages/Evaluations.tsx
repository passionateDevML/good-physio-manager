
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle, Search, Award } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Combobox } from '@/components/ui/combobox';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface Evaluation {
  id: string;
  title: string;
  patientName: string;
  date: Date;
  therapist: string;
  score?: string;
  status: 'pending' | 'completed';
}

// Mock data
const initialEvaluations: Evaluation[] = [
  {
    id: '1',
    title: 'Évaluation initiale',
    patientName: 'Jean Dupont',
    date: new Date('2025-03-15'),
    therapist: 'Dr. Martin',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Évaluation initiale',
    patientName: 'Pierre Lefebvre',
    date: new Date('2025-03-18'),
    therapist: 'Dr. Martin',
    status: 'pending'
  },
  {
    id: '3',
    title: 'Réévaluation',
    patientName: 'Marie Lambert',
    date: new Date('2025-03-10'),
    therapist: 'Dr. Bernard',
    score: '85/100',
    status: 'completed'
  },
  {
    id: '4',
    title: 'Réévaluation',
    patientName: 'Luc Moreau',
    date: new Date('2025-03-05'),
    therapist: 'Dr. Bernard',
    score: '72/100',
    status: 'completed'
  }
];

// Mock patient data
const patients = [
  { id: '1', name: 'Jean Dupont' },
  { id: '2', name: 'Marie Lambert' },
  { id: '3', name: 'Pierre Lefebvre' },
  { id: '4', name: 'Sophie Martin' },
  { id: '5', name: 'Luc Moreau' }
];

// Mock therapist data
const therapists = [
  { id: '1', name: 'Dr. Martin' },
  { id: '2', name: 'Dr. Bernard' },
  { id: '3', name: 'Dr. Dubois' }
];

interface EvaluationFormProps {
  onSave: (data: Omit<Evaluation, 'id'>) => void;
  onCancel: () => void;
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: 'Évaluation initiale',
    patientId: '',
    date: new Date(),
    therapistId: '',
    status: 'pending'
  });

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({ ...prev, date }));
    }
  };

  const handleSubmit = () => {
    const patientName = patients.find(p => p.id === formData.patientId)?.name || '';
    const therapist = therapists.find(t => t.id === formData.therapistId)?.name || '';
    
    if (!patientName || !therapist) {
      toast.error('Veuillez sélectionner un patient et un thérapeute');
      return;
    }

    onSave({
      title: formData.title,
      patientName,
      date: formData.date,
      therapist,
      status: 'pending' as const
    });
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Nouvelle évaluation</DialogTitle>
        <DialogDescription>
          Planifiez une nouvelle évaluation pour un patient.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Type
          </Label>
          <Select 
            value={formData.title} 
            onValueChange={(value) => handleSelectChange('title', value)}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Type d'évaluation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Évaluation initiale">Évaluation initiale</SelectItem>
              <SelectItem value="Réévaluation">Réévaluation</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="patient" className="text-right">
            Patient
          </Label>
          <div className="col-span-3">
            <Combobox
              options={patients}
              value={formData.patientId}
              onChange={(value) => handleSelectChange('patientId', value)}
              placeholder="Sélectionner un patient"
              emptyMessage="Aucun patient trouvé"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Date</Label>
          <div className="col-span-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? (
                    format(formData.date, "dd MMMM yyyy", { locale: fr })
                  ) : (
                    <span>Choisir une date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={handleDateChange}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="therapist" className="text-right">
            Thérapeute
          </Label>
          <div className="col-span-3">
            <Combobox
              options={therapists}
              value={formData.therapistId}
              onChange={(value) => handleSelectChange('therapistId', value)}
              placeholder="Sélectionner un thérapeute"
              emptyMessage="Aucun thérapeute trouvé"
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button 
          className="bg-physio-500 hover:bg-physio-600"
          onClick={handleSubmit}
          disabled={!formData.patientId || !formData.therapistId}
        >
          Créer l'évaluation
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

// New component for scoring evaluations
interface ScoreEvaluationDialogProps {
  evaluation: Evaluation;
  onSave: (id: string, score: string) => void;
  onCancel: () => void;
  isOpen: boolean;
}

const ScoreEvaluationDialog: React.FC<ScoreEvaluationDialogProps> = ({ 
  evaluation, 
  onSave, 
  onCancel,
  isOpen
}) => {
  const [score, setScore] = useState("");
  const [maxScore, setMaxScore] = useState("100");
  const [isValid, setIsValid] = useState(false);

  React.useEffect(() => {
    // Validate that score is a number and not greater than maxScore
    const scoreNum = parseInt(score);
    const maxScoreNum = parseInt(maxScore);
    
    setIsValid(
      !isNaN(scoreNum) && 
      !isNaN(maxScoreNum) && 
      scoreNum >= 0 && 
      scoreNum <= maxScoreNum && 
      maxScoreNum > 0
    );
  }, [score, maxScore]);

  const handleSubmit = () => {
    if (isValid) {
      onSave(evaluation.id, `${score}/${maxScore}`);
      setScore("");
      setMaxScore("100");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Attribuer un score</AlertDialogTitle>
          <AlertDialogDescription>
            Attribuez un score à l'évaluation pour {evaluation.patientName}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Input 
              type="number"
              placeholder="Score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              min="0"
              max={maxScore}
              className="text-right"
            />
            <span className="text-lg font-medium">/</span>
            <Input 
              type="number"
              placeholder="Max"
              value={maxScore}
              onChange={(e) => setMaxScore(e.target.value)}
              min="1"
              className="text-right"
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Annuler</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleSubmit}
            disabled={!isValid}
            className="bg-physio-500 hover:bg-physio-600"
          >
            Enregistrer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Evaluation card component to make the code more reusable
interface EvaluationCardProps {
  evaluation: Evaluation;
  onScoreClick?: (evaluation: Evaluation) => void;
}

const EvaluationCard: React.FC<EvaluationCardProps> = ({ evaluation, onScoreClick }) => {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{evaluation.title}</CardTitle>
          {evaluation.status === 'pending' && onScoreClick && (
            <Button 
              size="sm" 
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onScoreClick(evaluation);
              }}
              title="Attribuer un score"
            >
              <Award size={16} />
              <span className="sr-only">Attribuer un score</span>
            </Button>
          )}
        </div>
        <CardDescription>Patient: {evaluation.patientName}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-muted-foreground">
              {evaluation.status === 'pending' ? 'Date programmée:' : 'Date complétée:'}
            </span>
            <span>{format(evaluation.date, 'dd MMM yyyy', { locale: fr })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Thérapeute:</span>
            <span>{evaluation.therapist}</span>
          </div>
          {evaluation.score && (
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">Score:</span>
              <span className="font-medium text-green-600">
                {evaluation.score}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function Evaluations() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>(initialEvaluations);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null);
  const [isScoreDialogOpen, setIsScoreDialogOpen] = useState(false);
  
  const handleCreateEvaluation = (data: Omit<Evaluation, 'id'>) => {
    const newEvaluation: Evaluation = {
      id: (evaluations.length + 1).toString(),
      ...data
    };
    
    setEvaluations([...evaluations, newEvaluation]);
    setIsDialogOpen(false);
    toast.success('Évaluation créée avec succès');
  };
  
  const handleOpenScoreDialog = (evaluation: Evaluation) => {
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
  
  const filteredEvaluations = evaluations.filter(evaluation => {
    if (searchQuery === '') return true;
    
    const lowercaseQuery = searchQuery.toLowerCase();
    return (
      evaluation.patientName.toLowerCase().includes(lowercaseQuery) ||
      evaluation.title.toLowerCase().includes(lowercaseQuery) ||
      evaluation.therapist.toLowerCase().includes(lowercaseQuery)
    );
  });
  
  const pendingEvaluations = filteredEvaluations.filter(e => e.status === 'pending');
  const completedEvaluations = filteredEvaluations.filter(e => e.status === 'completed');

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Évaluations</h1>
          <p className="text-muted-foreground">
            Gérez toutes les évaluations initiales et réévaluations des patients
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-physio-500 hover:bg-physio-600">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouvelle évaluation
            </Button>
          </DialogTrigger>
          <EvaluationForm 
            onSave={handleCreateEvaluation}
            onCancel={() => setIsDialogOpen(false)}
          />
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher une évaluation par patient, date ou type..."
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
                <EvaluationCard
                  key={evaluation.id}
                  evaluation={evaluation}
                  onScoreClick={handleOpenScoreDialog}
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
                <EvaluationCard
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
                <EvaluationCard
                  key={evaluation.id}
                  evaluation={evaluation}
                  onScoreClick={evaluation.status === 'pending' ? handleOpenScoreDialog : undefined}
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
        <ScoreEvaluationDialog
          evaluation={selectedEvaluation}
          onSave={handleSaveScore}
          onCancel={() => setIsScoreDialogOpen(false)}
          isOpen={isScoreDialogOpen}
        />
      )}
    </Layout>
  );
}
