
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Filter, Dumbbell, Tag, FolderOpen } from 'lucide-react';
import { toast } from 'sonner';

// Mock data - Exercise types
const exerciseCategories = [
  'Tous',
  'Étirement',
  'Renforcement',
  'Mobilité',
  'Équilibre',
  'Proprioception',
  'Cardiovasculaire'
];

// Mock data - Exercise difficulty levels
const difficultyLevels = [
  { id: 'easy', label: 'Facile' },
  { id: 'medium', label: 'Moyen' },
  { id: 'hard', label: 'Difficile' }
];

// Mock data - Exercise list
const initialExercises = [
  {
    id: '1',
    name: 'Étirements des ischio-jambiers',
    category: 'Étirement',
    bodyPart: 'Jambes',
    difficulty: 'easy',
    description: 'S\'asseoir sur le sol les jambes tendues devant soi. Se pencher en avant pour toucher les orteils en gardant les genoux droits.',
    instructions: '1. Asseyez-vous sur le sol\n2. Tendez vos jambes devant vous\n3. Penchez-vous en avant sans plier les genoux\n4. Maintenez la position pendant 30 secondes\n5. Répétez 3 fois',
    imageUrl: '',
    videoUrl: '',
  },
  {
    id: '2',
    name: 'Pont fessier',
    category: 'Renforcement',
    bodyPart: 'Dos, Fessiers',
    difficulty: 'medium',
    description: 'Allongé sur le dos, jambes fléchies, soulever le bassin pour renforcer les muscles fessiers et lombaires.',
    instructions: '1. Allongez-vous sur le dos\n2. Pliez vos genoux, pieds à plat sur le sol\n3. Soulevez votre bassin vers le plafond\n4. Maintenez 3 secondes puis redescendez\n5. Répétez 10-15 fois',
    imageUrl: '',
    videoUrl: '',
  },
  {
    id: '3',
    name: 'Rotation du buste',
    category: 'Mobilité',
    bodyPart: 'Tronc',
    difficulty: 'easy',
    description: 'Exercice de rotation du tronc pour améliorer la mobilité du dos et de la colonne vertébrale.',
    instructions: '1. Tenez-vous debout, pieds écartés à la largeur des épaules\n2. Placez vos mains sur vos hanches\n3. Tournez lentement votre buste vers la droite\n4. Revenez au centre, puis tournez vers la gauche\n5. Répétez 10 fois de chaque côté',
    imageUrl: '',
    videoUrl: '',
  },
  {
    id: '4',
    name: 'Squat simple',
    category: 'Renforcement',
    bodyPart: 'Jambes, Fessiers',
    difficulty: 'medium',
    description: 'Exercice de renforcement pour les jambes et les fessiers.',
    instructions: '1. Tenez-vous debout, pieds écartés à la largeur des épaules\n2. Pliez les genoux comme pour vous asseoir\n3. Gardez le dos droit et les talons au sol\n4. Descendez jusqu\'à ce que les cuisses soient parallèles au sol\n5. Remontez et répétez 10-15 fois',
    imageUrl: '',
    videoUrl: '',
  },
  {
    id: '5',
    name: 'Exercice d\'équilibre sur une jambe',
    category: 'Équilibre',
    bodyPart: 'Jambes',
    difficulty: 'medium',
    description: 'Se tenir en équilibre sur une jambe pour améliorer la stabilité.',
    instructions: '1. Tenez-vous debout, pieds ensemble\n2. Soulevez lentement une jambe du sol\n3. Maintenez l\'équilibre pendant 30 secondes\n4. Changez de jambe\n5. Répétez 3 fois pour chaque jambe',
    imageUrl: '',
    videoUrl: '',
  },
  {
    id: '6',
    name: 'Étirements des épaules',
    category: 'Étirement',
    bodyPart: 'Épaules',
    difficulty: 'easy',
    description: 'Étirement pour soulager les tensions dans les épaules.',
    instructions: '1. Amenez un bras à l\'horizontale devant vous\n2. Avec l\'autre main, tirez doucement le bras vers votre poitrine\n3. Maintenez pendant 30 secondes\n4. Changez de bras\n5. Répétez 2 fois pour chaque bras',
    imageUrl: '',
    videoUrl: '',
  }
];

// Exercise form interface
interface ExerciseFormData {
  id?: string;
  name: string;
  category: string;
  bodyPart: string;
  difficulty: string;
  description: string;
  instructions: string;
  imageUrl: string;
  videoUrl: string;
}

// Exercise card component
const ExerciseCard = ({ 
  exercise, 
  onEdit 
}: { 
  exercise: ExerciseFormData, 
  onEdit: (exercise: ExerciseFormData) => void 
}) => {
  // Get the difficulty label
  const getDifficultyLabel = (id: string) => {
    const difficulty = difficultyLevels.find(d => d.id === id);
    return difficulty ? difficulty.label : id;
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{exercise.name}</CardTitle>
          <div className="flex gap-1">
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {exercise.category}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {exercise.bodyPart}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            {getDifficultyLabel(exercise.difficulty)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="py-2 flex-1">
        <p className="text-sm text-gray-600 line-clamp-3">{exercise.description}</p>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={() => onEdit(exercise)}
        >
          Voir les détails
        </Button>
      </CardFooter>
    </Card>
  );
};

// Main component
export default function ExerciseLibrary() {
  const [exercises, setExercises] = useState(initialExercises);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<ExerciseFormData>({
    name: '',
    category: 'Étirement',
    bodyPart: '',
    difficulty: 'medium',
    description: '',
    instructions: '',
    imageUrl: '',
    videoUrl: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentExercise(prev => ({ ...prev, [name]: value }));
  };

  // Filter exercises based on search and category
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = 
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.bodyPart.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Tous' || exercise.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Add or update exercise
  const handleSaveExercise = () => {
    if (isEditing) {
      // Update existing exercise
      setExercises(prev => 
        prev.map(ex => ex.id === currentExercise.id ? currentExercise : ex)
      );
      toast.success('Exercice mis à jour avec succès');
    } else {
      // Add new exercise
      const newExercise = {
        ...currentExercise,
        id: Math.random().toString(36).substring(2, 9),
      };
      
      setExercises(prev => [...prev, newExercise]);
      toast.success('Exercice ajouté avec succès');
    }
    
    setIsDialogOpen(false);
  };

  // Edit exercise handler
  const handleEditExercise = (exercise: ExerciseFormData) => {
    setCurrentExercise(exercise);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  // New exercise handler
  const handleNewExercise = () => {
    setCurrentExercise({
      name: '',
      category: 'Étirement',
      bodyPart: '',
      difficulty: 'medium',
      description: '',
      instructions: '',
      imageUrl: '',
      videoUrl: ''
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Bibliothèque d'exercices</h1>
          <p className="text-muted-foreground">Gérez vos exercices à assigner aux patients</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-physio-500 hover:bg-physio-600 flex items-center gap-2"
              onClick={handleNewExercise}
            >
              <Plus className="h-4 w-4" />
              <span>Nouvel exercice</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Modifier l\'exercice' : 'Ajouter un nouvel exercice'}</DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? 'Modifiez les détails de l\'exercice ci-dessous.'
                  : 'Remplissez le formulaire pour ajouter un nouvel exercice à votre bibliothèque.'
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom de l'exercice</Label>
                  <Input
                    id="name"
                    name="name"
                    value={currentExercise.name}
                    onChange={handleInputChange}
                    placeholder="Ex: Étirement des ischio-jambiers"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <select
                    id="category"
                    name="category"
                    value={currentExercise.category}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {exerciseCategories.filter(cat => cat !== 'Tous').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bodyPart">Partie du corps</Label>
                  <Input
                    id="bodyPart"
                    name="bodyPart"
                    value={currentExercise.bodyPart}
                    onChange={handleInputChange}
                    placeholder="Ex: Jambes, Dos, Épaules"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulté</Label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={currentExercise.difficulty}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {difficultyLevels.map(level => (
                      <option key={level.id} value={level.id}>{level.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={currentExercise.description}
                  onChange={handleInputChange}
                  placeholder="Brève description de l'exercice"
                  className="min-h-[60px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions détaillées</Label>
                <Textarea
                  id="instructions"
                  name="instructions"
                  value={currentExercise.instructions}
                  onChange={handleInputChange}
                  placeholder="Instructions étape par étape pour réaliser l'exercice"
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">URL de l'image (optionnel)</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    value={currentExercise.imageUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="videoUrl">URL de la vidéo (optionnel)</Label>
                  <Input
                    id="videoUrl"
                    name="videoUrl"
                    value={currentExercise.videoUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/video.mp4"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
              <Button onClick={handleSaveExercise}>Enregistrer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="bg-white rounded-xl border border-border/50 overflow-hidden mb-8 shadow-soft">
        <div className="p-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un exercice..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="md:w-auto flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filtres</span>
          </Button>
        </div>
        
        <Tabs defaultValue="Tous" className="w-full">
          <div className="px-4 border-b border-border/50 overflow-x-auto">
            <TabsList className="bg-transparent h-auto p-0 flex w-full">
              {exerciseCategories.map(category => (
                <TabsTrigger 
                  key={category}
                  value={category} 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-physio-500 rounded-none h-12 flex-shrink-0"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {exerciseCategories.map(category => (
            <TabsContent key={category} value={category} className="mt-0 p-0">
              <div className="p-4">
                {filteredExercises.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredExercises.map((exercise) => (
                      <ExerciseCard 
                        key={exercise.id} 
                        exercise={exercise} 
                        onEdit={handleEditExercise} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">Aucun exercice ne correspond à votre recherche.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
}
