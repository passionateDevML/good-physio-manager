
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TreatmentPlanProps {
  formData: {
    manualTherapy: string;
    therapeuticExercises: string;
    patientEducation: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const TreatmentPlan: React.FC<TreatmentPlanProps> = ({ 
  formData, 
  handleInputChange 
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-4">7- Plan de traitement</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="manualTherapy">Physiothérapie manuelle</Label>
            <Textarea 
              id="manualTherapy" 
              name="manualTherapy"
              value={formData.manualTherapy}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="therapeuticExercises">Exercices thérapeutiques</Label>
            <Textarea 
              id="therapeuticExercises" 
              name="therapeuticExercises"
              value={formData.therapeuticExercises}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="patientEducation">Éducation du patient</Label>
            <Textarea 
              id="patientEducation" 
              name="patientEducation"
              value={formData.patientEducation}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
