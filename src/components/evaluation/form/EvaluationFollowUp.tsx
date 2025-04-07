
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EvaluationFollowUpProps {
  formData: {
    sessionFrequency: string;
    evaluationMethod: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const EvaluationFollowUp: React.FC<EvaluationFollowUpProps> = ({ 
  formData, 
  handleInputChange 
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-4">8- Evaluation et suivi</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="sessionFrequency">Fréquence des séances</Label>
            <Input 
              id="sessionFrequency" 
              name="sessionFrequency"
              value={formData.sessionFrequency}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="evaluationMethod">Méthode d'évaluation pour le suivi</Label>
            <Textarea 
              id="evaluationMethod" 
              name="evaluationMethod"
              value={formData.evaluationMethod}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
