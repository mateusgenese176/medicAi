export enum TriageLevel {
  AZUL = 'AZUL',
  VERDE = 'VERDE',
  AMARELO = 'AMARELO',
  LARANJA = 'LARANJA',
  VERMELHO = 'VERMELHO',
  PRETO = 'PRETO'
}

export interface Diagnosis {
  name: string;
  probability: string; // e.g., "Alta", "Média", "Baixa"
  reasoning: string[];
}

export interface CaseAnalysis {
  triageLevel: TriageLevel;
  triageReason: string;
  diagnoses: Diagnosis[];
  exams: string[];
  treatments: string[];
}
