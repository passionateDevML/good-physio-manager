
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { DialogFooter } from "../ui/dialog";

interface Patient {
  id: string;
  name: string;
  gender?: string;
  age?: number;
  contact?: string;
  address?: string;
}

interface Therapist {
  id: string;
  name: string;
}

interface EvaluationFormProps {
  patients: { id: string; name: string }[];
  therapists: { id: string; name: string }[];
  onSave: (data: any) => void;
  onCancel: () => void;
  currentTherapist?: Therapist;
}

export const EvaluationForm: React.FC<EvaluationFormProps> = ({ 
  patients, 
  therapists, 
  onSave, 
  onCancel,
  currentTherapist 
}) => {
  const today = new Date();
  const [date, setDate] = useState<Date>(today);
  const [patientId, setPatientId] = useState<string>("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [therapistId, setTherapistId] = useState<string>(currentTherapist?.id || "");
  
  const [formData, setFormData] = useState({
    // Motif de Consultation
    consultationReason: "",
    symptomsDuration: "",
    medicalHistory: "",
    
    // Evaluation Iniciale
    jointMobility: "",
    muscleStrength: "",
    sensitivity: "",
    postureAlignment: "",
    heartRate: "",
    bloodPressure: "",
    
    // Analyse de la capacité fonctionnelle
    dailyActivitiesPercentage: 50,
    functionalityScale: "",
    
    // Diagnostic physiothérapeutique
    identifiedProblems: "",
    knownEtiology: "",
    
    // Objectifs de traitement
    reducePain: false,
    improveMotion: false,
    increaseMuscleStrength: false,
    otherObjectives: "",
    
    // Plan de traitement
    manualTherapy: "",
    therapeuticExercises: "",
    patientEducation: "",
    
    // Evaluation et suivi
    sessionFrequency: "",
    evaluationMethod: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string) => {
    setFormData((prev) => ({ ...prev, [name]: !prev[name as keyof typeof prev] }));
  };
  
  const handlePatientSelect = (id: string) => {
    setPatientId(id);
    // In a real app, you would fetch patient details here
    const patient = patients.find(p => p.id === id);
    if (patient) {
      setSelectedPatient({
        ...patient,
        gender: "Non spécifié", // Placeholder, would be fetched from database
        age: 0,
        contact: "",
        address: ""
      });
    }
  };

  const handleSubmit = () => {
    const evaluationData = {
      date,
      patientId,
      therapistId,
      ...formData,
    };
    onSave(evaluationData);
  };

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto p-1">
      <h2 className="text-xl font-bold text-center mb-6">FICHE D'EVALUATION PHYSIOTHERAPEUTIQUE</h2>
      
      {/* Date */}
      <div className="flex items-center gap-4">
        <Label className="w-24">Date :</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "dd/MM/yyyy", { locale: fr })
              ) : (
                <span>Choisir une date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
      
      {/* 1- Informations Personnelles */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">1- Informations Personnelles</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="patient">Patient</Label>
              <Combobox
                options={patients || []}
                value={patientId}
                onChange={handlePatientSelect}
                placeholder="Sélectionner un patient"
                emptyMessage="Aucun patient trouvé"
              />
            </div>
            <div>
              <Label htmlFor="therapist">Thérapeute</Label>
              <Combobox
                options={therapists || []}
                value={therapistId}
                onChange={(value) => setTherapistId(value)}
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
      
      {/* 2- Motif de Consultation */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">2- Motif de Consultation</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="consultationReason">Description</Label>
              <Textarea 
                id="consultationReason" 
                name="consultationReason"
                value={formData.consultationReason}
                onChange={handleInputChange}
                className="h-24"
              />
            </div>
            <div>
              <Label htmlFor="symptomsDuration">Durée des symptômes</Label>
              <Input 
                id="symptomsDuration" 
                name="symptomsDuration"
                value={formData.symptomsDuration}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="medicalHistory">Antécédents médicaux pertinents</Label>
              <Textarea 
                id="medicalHistory" 
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleInputChange}
                className="h-24"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 3- Evaluation Iniciale */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">3- Evaluation Initiale</h3>
          
          <h4 className="font-medium mb-2">Examen physique</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="jointMobility">Mobilité Articulaire</Label>
              <Textarea 
                id="jointMobility" 
                name="jointMobility"
                value={formData.jointMobility}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="muscleStrength">Force Musculaire</Label>
              <Textarea 
                id="muscleStrength" 
                name="muscleStrength"
                value={formData.muscleStrength}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="sensitivity">Sensibilité</Label>
              <Textarea 
                id="sensitivity" 
                name="sensitivity"
                value={formData.sensitivity}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="postureAlignment">Posture et Alignement</Label>
              <Textarea 
                id="postureAlignment" 
                name="postureAlignment"
                value={formData.postureAlignment}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <h4 className="font-medium mb-2">Signes vitaux</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="heartRate">Fréquence Cardiaque</Label>
              <Input 
                id="heartRate" 
                name="heartRate"
                value={formData.heartRate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="bloodPressure">Tension Artérielle</Label>
              <Input 
                id="bloodPressure" 
                name="bloodPressure"
                value={formData.bloodPressure}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 4- Analyse de la capacité fonctionnelle */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">4- Analyse de la capacité fonctionnelle</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="dailyActivitiesPercentage">
                Activités de la vie quotidienne (AVQ) : {formData.dailyActivitiesPercentage}%
              </Label>
              <Input 
                id="dailyActivitiesPercentage" 
                name="dailyActivitiesPercentage"
                type="range"
                min="0"
                max="100"
                value={formData.dailyActivitiesPercentage}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="functionalityScale">Echelle de fonctionnalité</Label>
              <Textarea 
                id="functionalityScale" 
                name="functionalityScale"
                value={formData.functionalityScale}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 5- Diagnostic physiothérapeutique */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">5- Diagnostic physiothérapeutique</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="identifiedProblems">Problèmes identifiés</Label>
              <Textarea 
                id="identifiedProblems" 
                name="identifiedProblems"
                value={formData.identifiedProblems}
                onChange={handleInputChange}
                className="h-24"
              />
            </div>
            <div>
              <Label htmlFor="knownEtiology">Étiologie si connue</Label>
              <Textarea 
                id="knownEtiology" 
                name="knownEtiology"
                value={formData.knownEtiology}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 6- Objectifs de traitement */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">6- Objectifs de traitement</h3>
          <p className="text-sm text-muted-foreground mb-4">À court et long terme</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="reducePain"
                checked={formData.reducePain}
                onChange={() => handleCheckboxChange("reducePain")}
                className="mr-2"
              />
              <Label htmlFor="reducePain" className="cursor-pointer">Réduire la douleur</Label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="improveMotion"
                checked={formData.improveMotion}
                onChange={() => handleCheckboxChange("improveMotion")}
                className="mr-2"
              />
              <Label htmlFor="improveMotion" className="cursor-pointer">Améliorer l'amplitude de mouvement</Label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="increaseMuscleStrength"
                checked={formData.increaseMuscleStrength}
                onChange={() => handleCheckboxChange("increaseMuscleStrength")}
                className="mr-2"
              />
              <Label htmlFor="increaseMuscleStrength" className="cursor-pointer">Augmenter la force musculaire</Label>
            </div>
          </div>
          
          <div>
            <Label htmlFor="otherObjectives">Autres objectifs</Label>
            <Textarea 
              id="otherObjectives" 
              name="otherObjectives"
              value={formData.otherObjectives}
              onChange={handleInputChange}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* 7- Plan de traitement */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">7- Plan de traitement</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="manualTherapy">Physiothérapie manuelle</Label>
              <Textarea 
                id="manualTherapy" 
                name="manualTherapy"
                value={formData.manualTherapy}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="therapeuticExercises">Exercices thérapeutiques</Label>
              <Textarea 
                id="therapeuticExercises" 
                name="therapeuticExercises"
                value={formData.therapeuticExercises}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="patientEducation">Éducation du patient</Label>
              <Textarea 
                id="patientEducation" 
                name="patientEducation"
                value={formData.patientEducation}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 8- Evaluation et suivi */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">8- Evaluation et suivi</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="sessionFrequency">Fréquence des séances</Label>
              <Input 
                id="sessionFrequency" 
                name="sessionFrequency"
                value={formData.sessionFrequency}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="evaluationMethod">Méthode d'évaluation pour le suivi</Label>
              <Textarea 
                id="evaluationMethod" 
                name="evaluationMethod"
                value={formData.evaluationMethod}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <DialogFooter>
        <Button variant="outline" onClick={onCancel} className="mr-2">
          Annuler
        </Button>
        <Button 
          className="bg-physio-500 hover:bg-physio-600"
          onClick={handleSubmit}
          disabled={!patientId || !therapistId}
        >
          Enregistrer l'évaluation
        </Button>
      </DialogFooter>
    </div>
  );
};
