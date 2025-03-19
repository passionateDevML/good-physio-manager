
export interface Appointment {
  id: string;
  patient: { 
    name: string; 
    avatarUrl: string;
  };
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  notes?: string;
}

export const initialAppointments: Appointment[] = [
  {
    id: '1',
    patient: { name: 'Sophie Martin', avatarUrl: '' },
    time: '09:00 - 10:00',
    type: 'Séance de rééducation',
    status: 'scheduled',
    notes: 'Exercices de mobilité + massages'
  },
  {
    id: '2',
    patient: { name: 'Thomas Dubois', avatarUrl: '' },
    time: '10:30 - 11:30',
    type: 'Évaluation initiale',
    status: 'scheduled',
    notes: 'Première évaluation complète'
  },
  {
    id: '3',
    patient: { name: 'Emma Petit', avatarUrl: '' },
    time: '13:00 - 14:00',
    type: 'Traitement manuel',
    status: 'scheduled',
    notes: 'Manipulation vertébrale'
  },
  {
    id: '4',
    patient: { name: 'Lucas Bernard', avatarUrl: '' },
    time: '14:30 - 15:30',
    type: 'Suivi thérapeutique',
    status: 'scheduled',
    notes: 'Bilan de progression'
  },
  {
    id: '5',
    patient: { name: 'Julie Moreau', avatarUrl: '' },
    time: '16:00 - 17:00',
    type: 'Rééducation post-opératoire',
    status: 'scheduled',
    notes: 'Contrôle de la mobilité'
  }
];

// Export the type for use in other components
export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'in-progress';

// Status label mapping
export const statusLabels = {
  'scheduled': 'Planifié',
  'completed': 'Terminé', 
  'cancelled': 'Annulé',
  'in-progress': 'En cours'
};
