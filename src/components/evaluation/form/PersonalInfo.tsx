
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";

interface Patient {
  id: string;
  name: string;
  gender?: string;
  age?: number;
  contact?: string;
  address?: string;
}

interface PersonalInfoProps {
  patients: { id: string; name: string }[];
  therapists: { id: string; name: string }[];
  patientId: string;
  therapistId: string;
  selectedPatient: Patient | null;
  onPatientSelect: (id: string) => void;
  onTherapistSelect: (id: string) => void;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({
  patients,
  therapists,
  patientId,
  therapistId,
  selectedPatient,
  onPatientSelect,
  onTherapistSelect
}) => {
  // Ensure arrays are properly initialized
  const safePatients = Array.isArray(patients) ? patients : [];
  const safeTherapists = Array.isArray(therapists) ? therapists : [];

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-4">1- Informations Personnelles</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="patient">Patient</Label>
            <Combobox
              options={safePatients}
              value={patientId}
              onChange={onPatientSelect}
              placeholder="Sélectionner un patient"
              emptyMessage="Aucun patient trouvé"
            />
          </div>
          <div>
            <Label htmlFor="therapist">Thérapeute</Label>
            <Combobox
              options={safeTherapists}
              value={therapistId}
              onChange={onTherapistSelect}
              placeholder="Sélectionner un thérapeute"
              emptyMessage="Aucun thérapeute trouvé"
            />
          </div>
        </div>
        
        {selectedPatient && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gender">Sexe</Label>
              <Input id="gender" value={selectedPatient.gender || ""} disabled />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input id="age" value={selectedPatient.age || ""} disabled />
            </div>
            <div>
              <Label htmlFor="contact">Contact</Label>
              <Input id="contact" value={selectedPatient.contact || ""} disabled />
            </div>
            <div>
              <Label htmlFor="address">Domicile</Label>
              <Input id="address" value={selectedPatient.address || ""} disabled />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
