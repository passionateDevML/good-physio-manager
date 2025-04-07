
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FunctionalCapacityProps {
  formData: {
    dailyActivitiesPercentage: number;
    functionalityScale: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const FunctionalCapacity: React.FC<FunctionalCapacityProps> = ({ 
  formData, 
  handleInputChange 
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-4">4- Analyse de la capacité fonctionnelle</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="dailyActivitiesPercentage">
              Activités de la vie quotidienne (AVQ) : {formData.dailyActivitiesPercentage}%
            </Label>
            <Input 
              id="dailyActivitiesPercentage" 
              name="dailyActivitiesPercentage"
              type="range"
              min="0"
              max="100"
              value={formData.dailyActivitiesPercentage}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="functionalityScale">Echelle de fonctionnalité</Label>
            <Textarea 
              id="functionalityScale" 
              name="functionalityScale"
              value={formData.functionalityScale}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
