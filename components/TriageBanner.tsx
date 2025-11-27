import React from 'react';
import { TriageLevel } from '../types';
import { AlertCircle, Home, Bed, Activity, Ambulance } from 'lucide-react';

interface TriageBannerProps {
  level: TriageLevel;
  reason: string;
}

const TriageConfig: Record<TriageLevel, { color: string; bg: string; text: string; label: string; icon: React.ReactNode; borderColor: string }> = {
  [TriageLevel.AZUL]: {
    color: 'bg-blue-600',
    bg: 'bg-blue-50',
    text: 'text-blue-900',
    borderColor: 'border-blue-200',
    label: 'AMBULATORIAL',
    icon: <Home size={20} />
  },
  [TriageLevel.VERDE]: {
    color: 'bg-green-600',
    bg: 'bg-green-50',
    text: 'text-green-900',
    borderColor: 'border-green-200',
    label: 'IDEALMENTE AMBULATORIAL',
    icon: <Home size={20} />
  },
  [TriageLevel.AMARELO]: {
    color: 'bg-yellow-500',
    bg: 'bg-yellow-50',
    text: 'text-yellow-900',
    borderColor: 'border-yellow-200',
    label: 'OBSERVAÇÃO',
    icon: <Activity size={20} />
  },
  [TriageLevel.LARANJA]: {
    color: 'bg-orange-600',
    bg: 'bg-orange-50',
    text: 'text-orange-900',
    borderColor: 'border-orange-200',
    label: 'CONSIDERAR INTERNAÇÃO',
    icon: <Bed size={20} />
  },
  [TriageLevel.VERMELHO]: {
    color: 'bg-red-600',
    bg: 'bg-red-50',
    text: 'text-red-900',
    borderColor: 'border-red-200',
    label: 'INTERNAÇÃO IMEDIATA',
    icon: <Ambulance size={20} />
  },
  [TriageLevel.PRETO]: {
    color: 'bg-gray-800',
    bg: 'bg-gray-100',
    text: 'text-gray-900',
    borderColor: 'border-gray-300',
    label: 'UTI / EMERGÊNCIA',
    icon: <AlertCircle size={20} />
  }
};

const TriageBanner: React.FC<TriageBannerProps> = ({ level, reason }) => {
  const config = TriageConfig[level];

  return (
    <div className={`rounded-lg border shadow-sm p-4 mb-6 ${config.bg} ${config.borderColor}`}>
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-md shrink-0 ${config.color} text-white`}>
          {config.icon}
        </div>
        <div>
          <h2 className={`text-sm font-bold tracking-wide uppercase mb-1 ${config.text}`}>
            {config.label}
          </h2>
          <p className={`text-sm ${config.text} opacity-90 leading-relaxed`}>
            {reason}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TriageBanner;