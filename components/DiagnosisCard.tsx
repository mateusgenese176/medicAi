import React from 'react';
import { Diagnosis } from '../types';
import { Check } from 'lucide-react';

interface DiagnosisCardProps {
  diagnosis: Diagnosis;
  index: number;
}

const DiagnosisCard: React.FC<DiagnosisCardProps> = ({ diagnosis, index }) => {
  const isHighProb = diagnosis.probability.toLowerCase().includes('alta');
  
  return (
    <div className="group bg-white rounded-md border border-gray-200 hover:border-blue-300 transition-colors duration-200 overflow-hidden">
      <div className="px-4 py-3 flex justify-between items-center bg-gray-50/50 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-gray-200 text-[10px] font-bold text-gray-600">
            {index + 1}
          </span>
          <h3 className="text-sm font-semibold text-gray-900">{diagnosis.name}</h3>
        </div>
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
          isHighProb 
            ? 'bg-blue-100 text-blue-700' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {diagnosis.probability}
        </span>
      </div>
      
      <div className="p-4">
        <ul className="space-y-2">
          {diagnosis.reasoning.map((point, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 leading-snug">
              <Check size={14} className="text-blue-500 shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiagnosisCard;