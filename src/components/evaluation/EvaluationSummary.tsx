
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EvaluationSummaryProps {
  evaluation: any;
  onScoreClick?: (evaluation: any) => void;
  showActionButtons?: boolean;
}

export const EvaluationSummary: React.FC<EvaluationSummaryProps> = ({ 
  evaluation, 
  onScoreClick,
  showActionButtons = false
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{evaluation.title || "Évaluation physiothérapeutique"}</CardTitle>
          {evaluation.status === 'pending' && onScoreClick && showActionButtons && (
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
          {evaluation.dailyActivitiesPercentage !== undefined && (
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">AVQ:</span>
              <span className="font-medium text-green-600">
                {evaluation.dailyActivitiesPercentage}%
              </span>
            </div>
          )}
          {evaluation.score && (
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">Score:</span>
              <span className="font-medium text-green-600">
                {evaluation.score}
              </span>
            </div>
          )}
          {evaluation.consultationReason && (
            <div className="mt-2">
              <span className="text-muted-foreground block mb-1">Motif:</span>
              <span className="line-clamp-2">{evaluation.consultationReason}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
