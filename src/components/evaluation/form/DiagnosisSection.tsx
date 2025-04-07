
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DiagnosisSectionProps {
  formData: {
    identifiedProblems: string;
    knownEtiology: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const DiagnosisSection: React.FC<DiagnosisSectionProps> = ({ 
  formData, 
  handleInputChange 
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-4">5- Diagnostic physiothérapeutique</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="identifiedProblems">Problèmes identifiés</Label>
            <Textarea 
              id="identifiedProblems" 
              name="identifiedProblems"
              value={formData.identifiedProblems}
              onChange={handleInputChange}
              className="h-24"
            />
          </div>
          <div>
            <Label htmlFor="knownEtiology">Étiologie si connue</Label>
            <Textarea 
              id="knownEtiology" 
              name="knownEtiology"
              value={formData.knownEtiology}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
