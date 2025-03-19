
import React, { useState } from 'react';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for patient selection
const patientOptions = [
  { id: '1', name: 'Sophie Martin' },
  { id: '2', name: 'Thomas Dubois' },
  { id: '3', name: 'Emma Petit' },
  { id: '4', name: 'Lucas Bernard' },
  { id: '5', name: 'Chloé Rousseau' },
  { id: '6', name: 'Maxime Leroy' },
  { id: '7', name: 'Julie Moreau' },
  { id: '8', name: 'Antoine Girard' },
];

// Mock data for appointment types
const appointmentTypes = [
  'Séance de rééducation',
  'Évaluation initiale',
  'Traitement manuel',
  'Suivi thérapeutique',
  'Rééducation post-opératoire'
];

// Mock time slots
const timeSlots = [
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00',
];

interface AppointmentFormProps {
  onSave: (appointmentData: any) => void;
  onCancel: () => void;
}

export const AppointmentForm = ({ onSave, onCancel }: AppointmentFormProps) => {
  const [appointmentData, setAppointmentData] = useState({
    patientId: '',
    date: new Date(),
    time: '',
    type: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAppointmentData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setAppointmentData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setAppointmentData(prev => ({ ...prev, date }));
    }
  };

  const handleSaveAppointment = () => {
    onSave(appointmentData);
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Nouveau rendez-vous</DialogTitle>
        <DialogDescription>
          Planifiez un nouveau rendez-vous avec un patient.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="patient" className="text-right">
            Patient
          </Label>
          <div className="col-span-3">
            <Select 
              value={appointmentData.patientId} 
              onValueChange={(value) => handleSelectChange('patientId', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un patient" />
              </SelectTrigger>
              <SelectContent>
                {patientOptions.map(patient => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Date</Label>
          <div className="col-span-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !appointmentData.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {appointmentData.date ? (
                    format(appointmentData.date, "PPP", { locale: fr })
                  ) : (
                    <span>Choisir une date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={appointmentData.date}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="time" className="text-right">
            Horaire
          </Label>
          <div className="col-span-3">
            <Select 
              value={appointmentData.time} 
              onValueChange={(value) => handleSelectChange('time', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un horaire" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map(slot => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="type" className="text-right">
            Type
          </Label>
          <div className="col-span-3">
            <Select 
              value={appointmentData.type} 
              onValueChange={(value) => handleSelectChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type de rendez-vous" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="notes" className="text-right">
            Notes
          </Label>
          <Input
            id="notes"
            name="notes"
            value={appointmentData.notes}
            onChange={handleInputChange}
            className="col-span-3"
            placeholder="Notes pour le rendez-vous"
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button 
          className="bg-physio-500 hover:bg-physio-600"
          onClick={handleSaveAppointment}
          disabled={!appointmentData.patientId || !appointmentData.time || !appointmentData.type}
        >
          Créer le rendez-vous
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
