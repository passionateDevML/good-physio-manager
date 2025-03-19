
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Settings } from 'lucide-react';

export const SecuritySettings = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [settings, setSettings] = useState({
    passwordPolicy: 'Les mots de passe doivent contenir au moins 8 caractères, incluant une majuscule, un chiffre et un caractère spécial.',
    sessionTimeout: '2 heures'
  });
  
  const [formValues, setFormValues] = useState({
    passwordPolicy: settings.passwordPolicy,
    sessionTimeout: settings.sessionTimeout
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
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
              <Input
                id="sessionTimeout"
                name="sessionTimeout"
                value={formValues.sessionTimeout}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveSettings}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
