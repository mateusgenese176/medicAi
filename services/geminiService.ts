import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CaseAnalysis, TriageLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    triageLevel: {
      type: Type.STRING,
      enum: [
        TriageLevel.AZUL,
        TriageLevel.VERDE,
        TriageLevel.AMARELO,
        TriageLevel.LARANJA,
        TriageLevel.VERMELHO,
        TriageLevel.PRETO
      ],
      description: "Classificação de risco para internação: AZUL (Ambulatorial), VERDE (Idealmente ambulatorial), AMARELO (Observação), LARANJA (Considerar internar), VERMELHO (Internar), PRETO (UTI)."
    },
    triageReason: {
      type: Type.STRING,
      description: "Explicação curta e direta do motivo da classificação de risco."
    },
    diagnoses: {
      type: Type.ARRAY,
      description: "Lista de possíveis diagnósticos diferenciais.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Nome da doença ou condição." },
          probability: { type: Type.STRING, description: "Probabilidade clínica (Alta, Média, Baixa)." },
          reasoning: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Lista de 2 a 3 pontos chaves que justificam este diagnóstico baseado na anamnese."
          }
        },
        required: ["name", "probability", "reasoning"]
      }
    },
    exams: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Lista de exames laboratoriais ou de imagem sugeridos para confirmação diagnóstica."
    },
    treatments: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Lista de medidas terapêuticas imediatas ou de manutenção sugeridas."
    }
  },
  required: ["triageLevel", "triageReason", "diagnoses", "exams", "treatments"]
};

export const analyzeCase = async (anamnesis: string): Promise<CaseAnalysis> => {
  const model = "gemini-2.5-flash-lite"; // Optimized for speed/low-latency as requested
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: `Você é um médico especialista em Medicina Interna e Emergência de alto nível. 
      Analise a seguinte anamnese clínica detalhadamente.
      Sua tarefa é fornecer um raciocínio clínico estruturado, incluindo estratificação de risco, diagnósticos diferenciais prováveis e plano de cuidado.
      
      Anamnese:
      "${anamnesis}"
      
      Responda estritamente no formato JSON solicitado.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.3, 
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from AI");
    }

    return JSON.parse(text) as CaseAnalysis;
  } catch (error) {
    console.error("Error analyzing case:", error);
    throw error;
  }
};