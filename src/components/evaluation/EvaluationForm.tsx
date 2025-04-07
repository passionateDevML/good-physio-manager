
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { EvaluationFormProps, EvaluationFormData, Patient } from "./form/FormTypes";
import { DateSelector } from "./form/DateSelector";
import { PersonalInfo } from "./form/PersonalInfo";
import { ConsultationSection } from "./form/ConsultationSection";
import { InitialEvaluation } from "./form/InitialEvaluation";
import { FunctionalCapacity } from "./form/FunctionalCapacity";
import { DiagnosisSection } from "./form/DiagnosisSection";
import { TreatmentObjectives } from "./form/TreatmentObjectives";
import { TreatmentPlan } from "./form/TreatmentPlan";
import { EvaluationFollowUp } from "./form/EvaluationFollowUp";

export const EvaluationForm: React.FC<EvaluationFormProps> = ({ 
  patients = [], 
  therapists = [], 
  onSave, 
  onCancel,
  currentTherapist 
}) => {
  const today = new Date();
  const [date, setDate] = useState<Date>(today);
  const [patientId, setPatientId] = useState<string>("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [therapistId, setTherapistId] = useState<string>(currentTherapist?.id || "");
  
  // Ensure arrays are properly initialized
  const safePatients = Array.isArray(patients) ? patients : [];
  const safeTherapists = Array.isArray(therapists) ? therapists : [];
  
  const [formData, setFormData] = useState<EvaluationFormData>({
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
    const patient = safePatients.find(p => p.id === id);
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

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  const handleTherapistSelect = (id: string) => {
    setTherapistId(id);
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
      <DateSelector date={date} onDateChange={handleDateChange} />
      
      {/* 1- Informations Personnelles */}
      <PersonalInfo 
        patients={safePatients}
        therapists={safeTherapists}
        patientId={patientId}
        therapistId={therapistId}
        selectedPatient={selectedPatient}
        onPatientSelect={handlePatientSelect}
        onTherapistSelect={handleTherapistSelect}
      />
      
      {/* 2- Motif de Consultation */}
      <ConsultationSection 
        formData={formData}
        handleInputChange={handleInputChange}
      />
      
      {/* 3- Evaluation Iniciale */}
      <InitialEvaluation 
        formData={formData}
        handleInputChange={handleInputChange}
      />
      
      {/* 4- Analyse de la capacité fonctionnelle */}
      <FunctionalCapacity 
        formData={formData}
        handleInputChange={handleInputChange}
      />
      
      {/* 5- Diagnostic physiothérapeutique */}
      <DiagnosisSection 
        formData={formData}
        handleInputChange={handleInputChange}
      />
      
      {/* 6- Objectifs de traitement */}
      <TreatmentObjectives 
        formData={formData}
        handleInputChange={handleInputChange}
        handleCheckboxChange={handleCheckboxChange}
      />
      
      {/* 7- Plan de traitement */}
      <TreatmentPlan 
        formData={formData}
        handleInputChange={handleInputChange}
      />
      
      {/* 8- Evaluation et suivi */}
      <EvaluationFollowUp 
        formData={formData}
        handleInputChange={handleInputChange}
      />
      
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
