
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

interface ScoreDialogProps {
  evaluation: any;
  onSave: (id: string, score: string) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export const ScoreDialog: React.FC<ScoreDialogProps> = ({ 
  evaluation, 
  onSave, 
  onCancel,
  isOpen
}) => {
  const [score, setScore] = useState("");
  const [maxScore, setMaxScore] = useState("100");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
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
