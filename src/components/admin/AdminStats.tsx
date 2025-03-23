
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const AdminStats: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiques</CardTitle>
        <CardDescription>
          Aperçu rapide des statistiques de votre cabinet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Nombre total de patients: <strong>120</strong></p>
        <p>Nombre total de rendez-vous ce mois-ci: <strong>85</strong></p>
      </CardContent>
    </Card>
  );
};
