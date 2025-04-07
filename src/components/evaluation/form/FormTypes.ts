
export interface Patient {
  id: string;
  name: string;
  gender?: string;
  age?: number;
  contact?: string;
  address?: string;
}

export interface Therapist {
  id: string;
  name: string;
}

export interface EvaluationFormData {
  // Motif de Consultation
  consultationReason: string;
  symptomsDuration: string;
  medicalHistory: string;
  
  // Evaluation Iniciale
  jointMobility: string;
  muscleStrength: string;
  sensitivity: string;
  postureAlignment: string;
  heartRate: string;
  bloodPressure: string;
  
  // Analyse de la capacité fonctionnelle
  dailyActivitiesPercentage: number;
  functionalityScale: string;
  
  // Diagnostic physiothérapeutique
  identifiedProblems: string;
  knownEtiology: string;
  
  // Objectifs de traitement
  reducePain: boolean;
  improveMotion: boolean;
  increaseMuscleStrength: boolean;
  otherObjectives: string;
  
  // Plan de traitement
  manualTherapy: string;
  therapeuticExercises: string;
  patientEducation: string;
  
  // Evaluation et suivi
  sessionFrequency: string;
  evaluationMethod: string;
}

export interface EvaluationFormProps {
  patients: { id: string; name: string }[];
  therapists: { id: string; name: string }[];
  onSave: (data: any) => void;
  onCancel: () => void;
  currentTherapist?: Therapist;
}
