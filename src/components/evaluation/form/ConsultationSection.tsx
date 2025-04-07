
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ConsultationSectionProps {
  formData: {
    consultationReason: string;
    symptomsDuration: string;
    medicalHistory: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({ 
  formData, 
  handleInputChange 
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-4">2- Motif de Consultation</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="consultationReason">Description</Label>
            <Textarea 
              id="consultationReason" 
              name="consultationReason"
              value={formData.consultationReason}
              onChange={handleInputChange}
              className="h-24"
            />
          </div>
          <div>
            <Label htmlFor="symptomsDuration">Durée des symptômes</Label>
            <Input 
              id="symptomsDuration" 
              name="symptomsDuration"
              value={formData.symptomsDuration}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="medicalHistory">Antécédents médicaux pertinents</Label>
            <Textarea 
              id="medicalHistory" 
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleInputChange}
              className="h-24"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
