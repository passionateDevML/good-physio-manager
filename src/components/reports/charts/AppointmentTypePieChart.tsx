
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AppointmentTypePieChartProps {
  data: {
    name: string;
    value: number;
  }[];
  colors?: string[];
}

export function AppointmentTypePieChart({ 
  data, 
  colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'] 
}: AppointmentTypePieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip formatter={(value) => [`${value} rendez-vous`, 'Nombre']} />
      </PieChart>
    </ResponsiveContainer>
  );
}
