
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TreatmentObjectivesProps {
  formData: {
    reducePain: boolean;
    improveMotion: boolean;
    increaseMuscleStrength: boolean;
    otherObjectives: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (name: string) => void;
}

export const TreatmentObjectives: React.FC<TreatmentObjectivesProps> = ({ 
  formData, 
  handleInputChange,
  handleCheckboxChange
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-4">6- Objectifs de traitement</h3>
        <p className="text-sm text-muted-foreground mb-4">À court et long terme</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="reducePain"
              checked={formData.reducePain}
              onChange={() => handleCheckboxChange("reducePain")}
              className="mr-2"
            />
            <Label htmlFor="reducePain" className="cursor-pointer">Réduire la douleur</Label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="improveMotion"
              checked={formData.improveMotion}
              onChange={() => handleCheckboxChange("improveMotion")}
              className="mr-2"
            />
            <Label htmlFor="improveMotion" className="cursor-pointer">Améliorer l'amplitude de mouvement</Label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="increaseMuscleStrength"
              checked={formData.increaseMuscleStrength}
              onChange={() => handleCheckboxChange("increaseMuscleStrength")}
              className="mr-2"
            />
            <Label htmlFor="increaseMuscleStrength" className="cursor-pointer">Augmenter la force musculaire</Label>
          </div>
        </div>
        
        <div>
          <Label htmlFor="otherObjectives">Autres objectifs</Label>
          <Textarea 
            id="otherObjectives" 
            name="otherObjectives"
            value={formData.otherObjectives}
            onChange={handleInputChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};
