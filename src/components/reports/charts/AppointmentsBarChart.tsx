
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AppointmentsBarChartProps {
  data: {
    name: string;
    count: number;
  }[];
}

export function AppointmentsBarChart({ data }: AppointmentsBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip 
          formatter={(value) => [`${value} RDV`, 'Rendez-vous']}
          labelFormatter={(label) => `Mois: ${label}`}
        />
        <Bar dataKey="count" fill="#475be8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
