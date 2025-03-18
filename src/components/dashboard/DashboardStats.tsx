
import React from 'react';
import { Users, CalendarClock, Activity, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  trend?: number;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

const StatCard = ({ title, value, description, icon: Icon, trend, color = 'blue' }: StatCardProps) => {
  const colorClasses = {
    blue: 'from-physio-50 to-physio-100 text-physio-500',
    green: 'from-emerald-50 to-emerald-100 text-emerald-500',
    purple: 'from-violet-50 to-violet-100 text-violet-500',
    orange: 'from-amber-50 to-amber-100 text-amber-500',
  };

  return (
    <div className="card-premium p-6 flex flex-col gap-4 animate-zoom-in">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className={`rounded-full p-3 bg-gradient-to-br ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend !== undefined && (
          <div className={`flex items-center text-xs font-medium ${trend >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {trend >= 0 ? '+' : ''}{trend}%
            <TrendingUp className={`h-3 w-3 ml-1 ${trend < 0 && 'rotate-180'}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Patients Actifs"
        value="127"
        description="8 nouveaux cette semaine"
        icon={Users}
        trend={12}
        color="blue"
      />
      <StatCard
        title="Rendez-vous du Jour"
        value="24"
        description="3 en attente de confirmation"
        icon={CalendarClock}
        color="green"
      />
      <StatCard
        title="Taux de Présence"
        value="94%"
        description="2% de mieux que le mois dernier"
        icon={Activity}
        trend={2}
        color="purple"
      />
      <StatCard
        title="Évaluations"
        value="32"
        description="18 évaluations cette semaine"
        icon={Activity}
        trend={-5}
        color="orange"
      />
    </div>
  );
}
