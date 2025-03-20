
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { StatCard } from '../StatCard';
import { AppointmentsBarChart } from '../charts/AppointmentsBarChart';
import { ConditionPieChart } from '../charts/ConditionPieChart';
import { Users, FileBarChart, FileText } from 'lucide-react';

const monthlyAppointments = [
  { name: 'Jan', count: 35 },
  { name: 'Fév', count: 42 },
  { name: 'Mar', count: 55 },
  { name: 'Avr', count: 40 },
  { name: 'Mai', count: 45 },
  { name: 'Juin', count: 50 },
];

const conditionDistribution = [
  { name: 'Lombalgie', value: 35 },
  { name: 'Entorse', value: 25 },
  { name: 'Tendinite', value: 20 },
  { name: 'Arthrose', value: 15 },
  { name: 'Autre', value: 5 },
];

export function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Patients"
          description="Tous les patients enregistrés"
          value="152"
          change="+24 depuis le mois dernier"
          icon={Users}
        />
        <StatCard
          title="Rendez-vous Mensuels"
          description="Nombre de consultations"
          value="267"
          change="+12% par rapport au mois précédent"
          icon={FileBarChart}
        />
        <StatCard
          title="Taux de Satisfaction"
          description="Basé sur les retours patients"
          value="94.2%"
          change="+2.1% par rapport au trimestre précédent"
          icon={FileText}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Rendez-vous mensuels</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <AppointmentsBarChart data={monthlyAppointments} />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Distribution des conditions</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ConditionPieChart data={conditionDistribution} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
