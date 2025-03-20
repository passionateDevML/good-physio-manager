
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { StatCard } from '../StatCard';
import { PerformanceLineChart } from '../charts/PerformanceLineChart';
import { BarChart3 } from 'lucide-react';

const performanceData = [
  { month: 'Jan', completed: 28, cancelled: 7 },
  { month: 'Fév', completed: 34, cancelled: 8 },
  { month: 'Mar', completed: 45, cancelled: 10 },
  { month: 'Avr', completed: 34, cancelled: 6 },
  { month: 'Mai', completed: 38, cancelled: 7 },
  { month: 'Juin', completed: 42, cancelled: 8 },
];

export function PerformanceTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Performance de la clinique
        </CardTitle>
        <CardDescription>
          Indicateurs de performance sur les 6 derniers mois
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Taux de complétion"
            description="Rendez-vous réalisés"
            value="85%"
            change="+3% par rapport au mois précédent"
          />
          <StatCard
            title="Durée moyenne"
            description="Temps de traitement"
            value="45 min"
            change="-2 min par rapport au mois précédent"
          />
          <StatCard
            title="Satisfaction"
            description="Note moyenne"
            value="4.8/5"
            change="+0.1 par rapport au trimestre précédent"
          />
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Évolution des performances</h3>
          <div className="h-[350px]">
            <PerformanceLineChart data={performanceData} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
