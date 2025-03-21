
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export interface InterfacePreferences {
  language: string;
  theme: string;
}

interface InterfaceSettingsProps {
  initialSettings?: InterfacePreferences;
}

export function InterfaceSettings({ initialSettings }: InterfaceSettingsProps) {
  const { toast } = useToast();
  const [interfaceSettings, setInterfaceSettings] = useState<InterfacePreferences>(
    initialSettings || {
      language: 'fr',
      theme: 'light'
    }
  );

  const handleInterfaceChange = (field: keyof InterfacePreferences, value: string) => {
    setInterfaceSettings(prev => ({ ...prev, [field]: value }));
    
    if (field === 'theme') {
      toast({
        title: "Thème modifié",
        description: `Le thème a été changé en mode ${value === 'light' ? 'clair' : 'sombre'}.`
      });
    }
    
    if (field === 'language') {
      toast({
        title: "Langue modifiée",
        description: `La langue a été changée en ${value === 'fr' ? 'français' : 'anglais'}.`
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences d'interface</CardTitle>
        <CardDescription>
          Personnalisez l'apparence et le comportement de l'application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="language">Langue</Label>
            <Select 
              value={interfaceSettings.language} 
              onValueChange={(value) => handleInterfaceChange('language', value)}
            >
              <SelectTrigger id="language">
                <SelectValue placeholder="Sélectionner une langue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="theme">Thème</Label>
            <Select 
              value={interfaceSettings.theme} 
              onValueChange={(value) => handleInterfaceChange('theme', value)}
            >
              <SelectTrigger id="theme">
                <SelectValue placeholder="Sélectionner un thème" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Clair</SelectItem>
                <SelectItem value="dark">Sombre</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
