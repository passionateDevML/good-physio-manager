
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Settings, Save, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

export const SecuritySettings = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [settings, setSettings] = useState({
    passwordPolicy: 'Les mots de passe doivent contenir au moins 8 caractères, incluant une majuscule, un chiffre et un caractère spécial.',
    sessionTimeout: '2 heures',
    twoFactorAuth: false,
    dataRetention: '3 ans'
  });
  
  const [formValues, setFormValues] = useState({
    passwordPolicy: settings.passwordPolicy,
    sessionTimeout: settings.sessionTimeout,
    twoFactorAuth: settings.twoFactorAuth,
    dataRetention: settings.dataRetention
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormValues(prev => ({ ...prev, twoFactorAuth: checked }));
  };

  const handleSaveSettings = () => {
    setSettings(formValues);
    setIsDialogOpen(false);
    toast({
      title: "Paramètres mis à jour",
      description: "Les paramètres de sécurité ont été mis à jour avec succès."
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Paramètres de sécurité
          </CardTitle>
          <CardDescription>
            Configuration des règles de sécurité pour les comptes utilisateurs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Politique de mot de passe</Label>
            <Alert>
              <AlertDescription>
                {settings.passwordPolicy}
              </AlertDescription>
            </Alert>
          </div>

          <div className="space-y-2">
            <Label>Session d'activité</Label>
            <Alert>
              <AlertDescription>
                Les utilisateurs seront automatiquement déconnectés après {settings.sessionTimeout} d'inactivité.
              </AlertDescription>
            </Alert>
          </div>

          <div className="space-y-2">
            <Label>Authentification à deux facteurs</Label>
            <Alert>
              <AlertDescription className="flex items-center gap-2">
                {settings.twoFactorAuth ? (
                  <span className="text-green-600 font-medium">Activée pour tous les utilisateurs</span>
                ) : (
                  <span className="text-amber-600 font-medium flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    Désactivée
                  </span>
                )}
              </AlertDescription>
            </Alert>
          </div>

          <div className="space-y-2">
            <Label>Conservation des données</Label>
            <Alert>
              <AlertDescription>
                Les données des patients sont conservées pendant {settings.dataRetention} après la dernière visite.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
            Modifier les paramètres de sécurité
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier les paramètres de sécurité</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="passwordPolicy" className="text-right">
                Politique de mot de passe
              </Label>
              <Input
                id="passwordPolicy"
                name="passwordPolicy"
                value={formValues.passwordPolicy}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sessionTimeout" className="text-right">
                Durée de session
              </Label>
              <Select 
                value={formValues.sessionTimeout}
                onValueChange={(value) => handleSelectChange('sessionTimeout', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner une durée" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30 minutes">30 minutes</SelectItem>
                  <SelectItem value="1 heure">1 heure</SelectItem>
                  <SelectItem value="2 heures">2 heures</SelectItem>
                  <SelectItem value="4 heures">4 heures</SelectItem>
                  <SelectItem value="8 heures">8 heures</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="twoFactorAuth" className="text-right">
                Authentification à deux facteurs
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Checkbox 
                  id="twoFactorAuth" 
                  checked={formValues.twoFactorAuth}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="twoFactorAuth" className="text-sm font-normal">
                  Exiger pour tous les utilisateurs
                </Label>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dataRetention" className="text-right">
                Conservation des données
              </Label>
              <Select 
                value={formValues.dataRetention}
                onValueChange={(value) => handleSelectChange('dataRetention', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner une durée" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 an">1 an</SelectItem>
                  <SelectItem value="3 ans">3 ans</SelectItem>
                  <SelectItem value="5 ans">5 ans</SelectItem>
                  <SelectItem value="10 ans">10 ans</SelectItem>
                  <SelectItem value="Indéfiniment">Indéfiniment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveSettings} className="bg-physio-500 hover:bg-physio-600">
              <Save className="mr-2 h-4 w-4" />
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
