
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export const SecuritySettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Paramètres de sécurité</CardTitle>
        <CardDescription>
          Configuration des règles de sécurité pour les comptes utilisateurs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Politique de mot de passe</Label>
          <Alert>
            <AlertDescription>
              Les mots de passe doivent contenir au moins 8 caractères, incluant une majuscule, un chiffre et un caractère spécial.
            </AlertDescription>
          </Alert>
        </div>

        <div className="space-y-2">
          <Label>Session d'activité</Label>
          <Alert>
            <AlertDescription>
              Les utilisateurs seront automatiquement déconnectés après 2 heures d'inactivité.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Modifier les paramètres de sécurité</Button>
      </CardFooter>
    </Card>
  );
};
