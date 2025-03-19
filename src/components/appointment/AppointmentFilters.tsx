
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

interface AppointmentFiltersProps {
  filters: {
    type: string;
    status: string;
  };
  onFilterChange: (filterType: 'type' | 'status', value: string) => void;
  onApplyFilters: () => void;
}

export function AppointmentFilters({ filters, onFilterChange, onApplyFilters }: AppointmentFiltersProps) {
  return (
    <Card className="shadow-soft">
      <div className="p-4 bg-white border-b border-border/50">
        <h2 className="font-semibold">Filtres</h2>
      </div>
      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Type de rendez-vous</h3>
          <div className="space-y-2">
            {['Tous', 'Évaluation', 'Rééducation', 'Suivi'].map((type) => (
              <div key={type} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`type-${type}`} 
                  className="h-4 w-4 rounded border-gray-300 text-physio-600 focus:ring-physio-500"
                  checked={filters.type === type}
                  onChange={() => onFilterChange('type', type)}
                />
                <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Statut</h3>
          <div className="space-y-2">
            {['Tous', 'Planifié', 'Terminé', 'Annulé'].map((status) => (
              <div key={status} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`status-${status}`} 
                  className="h-4 w-4 rounded border-gray-300 text-physio-600 focus:ring-physio-500"
                  checked={filters.status === status}
                  onChange={() => onFilterChange('status', status)}
                />
                <label htmlFor={`status-${status}`} className="ml-2 text-sm text-gray-700">
                  {status}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <Button 
          className="w-full flex items-center gap-2"
          onClick={onApplyFilters}
        >
          <Filter className="h-4 w-4" />
          <span>Appliquer les filtres</span>
        </Button>
      </CardContent>
    </Card>
  );
}
