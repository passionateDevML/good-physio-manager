
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface InitialEvaluationProps {
  formData: {
    jointMobility: string;
    muscleStrength: string;
    sensitivity: string;
    postureAlignment: string;
    heartRate: string;
    bloodPressure: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const InitialEvaluation: React.FC<InitialEvaluationProps> = ({ 
  formData, 
  handleInputChange 
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-4">3- Evaluation Initiale</h3>
        
        <h4 className="font-medium mb-2">Examen physique</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="jointMobility">Mobilité Articulaire</Label>
            <Textarea 
              id="jointMobility" 
              name="jointMobility"
              value={formData.jointMobility}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="muscleStrength">Force Musculaire</Label>
            <Textarea 
              id="muscleStrength" 
              name="muscleStrength"
              value={formData.muscleStrength}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="sensitivity">Sensibilité</Label>
            <Textarea 
              id="sensitivity" 
              name="sensitivity"
              value={formData.sensitivity}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="postureAlignment">Posture et Alignement</Label>
            <Textarea 
              id="postureAlignment" 
              name="postureAlignment"
              value={formData.postureAlignment}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <h4 className="font-medium mb-2">Signes vitaux</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="heartRate">Fréquence Cardiaque</Label>
            <Input 
              id="heartRate" 
              name="heartRate"
              value={formData.heartRate}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="bloodPressure">Tension Artérielle</Label>
            <Input 
              id="bloodPressure" 
              name="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
