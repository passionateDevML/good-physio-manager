
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export interface ProfileData {
  name: string;
  email: string;
  phone: string;
}

interface ProfileSettingsProps {
  initialData?: ProfileData;
}

export function ProfileSettings({ initialData }: ProfileSettingsProps) {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState<ProfileData>(
    initialData || {
      name: 'Dr. Michel Bernard',
      email: 'michel.bernard@goodphysio.fr',
      phone: '+33 6 12 34 56 78'
    }
  );

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = () => {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations de profil ont été enregistrées avec succès."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations de profil</CardTitle>
        <CardDescription>
          Gérez vos informations personnelles et professionnelles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input 
              id="name" 
              name="name" 
              value={profileData.name} 
              onChange={handleProfileChange} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={profileData.email} 
              onChange={handleProfileChange} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input 
              id="phone" 
              name="phone" 
              value={profileData.phone} 
              onChange={handleProfileChange} 
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="bg-physio-500 hover:bg-physio-600" onClick={handleProfileSave}>
            Enregistrer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
