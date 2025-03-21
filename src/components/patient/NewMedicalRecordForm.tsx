import React, { useState } from 'react';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface NewMedicalRecordFormProps {
  onClose: () => void;
  onSave: (record: any) => void;
  existingPatients?: { id: string; name: string }[];
}

export const NewMedicalRecordForm = ({ onClose, onSave, existingPatients = [] }: NewMedicalRecordFormProps) => {
  const [formData, setFormData] = useState({
    existingPatientId: '',
    newPatient: true,
    name: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    condition: '',
    status: 'En traitement',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePatientTypeChange = (isNewPatient: boolean) => {
    setFormData(prev => ({ 
      ...prev, 
      newPatient: isNewPatient,
      name: isNewPatient ? prev.name : '',
      existingPatientId: isNewPatient ? '' : prev.existingPatientId
    }));
  };

  const handleExistingPatientSelect = (patientId: string) => {
    const selectedPatient = existingPatients.find(p => p.id === patientId);
    setFormData(prev => ({ 
      ...prev, 
      existingPatientId: patientId,
      name: selectedPatient?.name || ''
    }));
  };

  const handleSubmit = () => {
    // Form validation
    if (formData.newPatient) {
      if (!formData.name || !formData.condition || !formData.status) {
        toast.error('Veuillez remplir tous les champs obligatoires');
        return;
      }
    } else {
      if (!formData.existingPatientId || !formData.condition || !formData.status) {
        toast.error('Veuillez sélectionner un patient et remplir les champs obligatoires');
        return;
      }
    }

    // Create a new patient record
    const newPatient = {
      id: Math.floor(Math.random() * 1000), // Generate random ID for demo
      name: formData.name,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      condition: formData.condition,
      status: formData.status,
      lastUpdated: new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      medicalHistory: [
        { 
          date: new Date().toLocaleDateString('fr-FR', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
          }), 
          description: `Première consultation pour ${formData.condition}` 
        }
      ],
    };

    onSave(newPatient);
    toast.success('Dossier médical créé avec succès');
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Nouveau dossier médical</DialogTitle>
        <DialogDescription>
          Créez un nouveau dossier médical pour un patient
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        {/* Patient Type Selection */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Type de patient</Label>
          <div className="col-span-3 flex gap-4">
            <div className="flex items-center gap-2">
              <input 
                type="radio" 
                id="newPatient" 
                checked={formData.newPatient} 
                onChange={() => handlePatientTypeChange(true)}
              />
              <Label htmlFor="newPatient" className="cursor-pointer">Nouveau patient</Label>
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="radio" 
                id="existingPatient" 
                checked={!formData.newPatient} 
                onChange={() => handlePatientTypeChange(false)}
              />
              <Label htmlFor="existingPatient" className="cursor-pointer">Patient existant</Label>
            </div>
          </div>
        </div>

        {/* Existing Patient Selection */}
        {!formData.newPatient && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="existingPatientId" className="text-right">
              Sélectionner un patient <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={formData.existingPatientId} 
              onValueChange={(value) => handleExistingPatientSelect(value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner un patient" />
              </SelectTrigger>
              <SelectContent>
                {existingPatients.map(patient => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Patient Information (only show if new patient) */}
        {formData.newPatient && (
          <>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateOfBirth" className="text-right">
                Date de naissance
              </Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="text"
                placeholder="JJ/MM/AAAA"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Genre
              </Label>
              <Select 
                value={formData.gender} 
                onValueChange={(value) => handleSelectChange('gender', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Homme">Homme</SelectItem>
                  <SelectItem value="Femme">Femme</SelectItem>
                  <SelectItem value="Autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Téléphone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Adresse
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </>
        )}

        {/* Medical Information */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="condition" className="text-right">
            Condition <span className="text-red-500">*</span>
          </Label>
          <Input
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleInputChange}
            className="col-span-3"
            required
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">
            Statut <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formData.status} 
            onValueChange={(value) => handleSelectChange('status', value)}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="En traitement">En traitement</SelectItem>
              <SelectItem value="Suivi régulier">Suivi régulier</SelectItem>
              <SelectItem value="Rétabli">Rétabli</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button 
          className="bg-physio-500 hover:bg-physio-600"
          onClick={handleSubmit}
        >
          Créer
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
