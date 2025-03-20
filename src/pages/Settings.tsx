
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SecuritySettings } from '@/components/admin/SecuritySettings';
import { Shield, User, BellRing, PaintBucket } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { toast } = useToast();
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    desktop: true,
    mobile: false,
    appointmentReminders: true,
    marketingEmails: false
  });

  const [profileData, setProfileData] = useState({
    name: 'Dr. Michel Bernard',
    email: 'michel.bernard@goodphysio.fr',
    phone: '+33 6 12 34 56 78'
  });

  const [interfaceSettings, setInterfaceSettings] = useState({
    language: 'fr',
    theme: 'light'
  });

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
  };

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

  const handleInterfaceChange = (field: string, value: string) => {
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
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">
          Gérez vos préférences et configurations du système
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <BellRing className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="interface" className="flex items-center gap-2">
            <PaintBucket className="h-4 w-4" />
            Interface
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Sécurité
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
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
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notifications</CardTitle>
              <CardDescription>
                Configurez comment et quand vous souhaitez être notifié
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Canaux de notification</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notif">Email</Label>
                  <Switch 
                    id="email-notif" 
                    checked={notificationSettings.email}
                    onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="desktop-notif">Notifications bureau</Label>
                  <Switch 
                    id="desktop-notif" 
                    checked={notificationSettings.desktop}
                    onCheckedChange={(checked) => handleNotificationChange('desktop', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="mobile-notif">Notifications mobiles</Label>
                  <Switch 
                    id="mobile-notif" 
                    checked={notificationSettings.mobile}
                    onCheckedChange={(checked) => handleNotificationChange('mobile', checked)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Types de notifications</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="appointment-reminders">Rappels de rendez-vous</Label>
                  <Switch 
                    id="appointment-reminders" 
                    checked={notificationSettings.appointmentReminders}
                    onCheckedChange={(checked) => handleNotificationChange('appointmentReminders', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="marketing-emails">Emails marketing</Label>
                  <Switch 
                    id="marketing-emails" 
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interface">
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
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
