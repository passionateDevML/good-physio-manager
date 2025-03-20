
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceData {
  month: string;
  completed: number;
  cancelled: number;
}

interface PerformanceLineChartProps {
  data: PerformanceData[];
}

export function PerformanceLineChart({ data }: PerformanceLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="completed" stroke="#00C49F" name="Terminés" />
        <Line type="monotone" dataKey="cancelled" stroke="#FF8042" name="Annulés" />
      </LineChart>
    </ResponsiveContainer>
  );
}
