import React from 'react';
import { ClipboardList, Stethoscope } from 'lucide-react';

interface ActionPlanProps {
  exams: string[];
  treatments: string[];
}

const ActionPlan: React.FC<ActionPlanProps> = ({ exams, treatments }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Exams Section */}
      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        <div className="bg-gray-50/50 px-4 py-2 border-b border-gray-100 flex items-center gap-2">
          <ClipboardList className="text-gray-500" size={16} />
          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Exames</h3>
        </div>
        <div className="p-4">
          {exams.length > 0 ? (
            <ul className="space-y-2">
              {exams.map((exam, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>{exam}</span>
                </li>
              ))}
            </ul>
          ) : (
             <p className="text-gray-400 text-xs italic">Nenhum exame sugerido.</p>
          )}
        </div>
      </div>

      {/* Treatments Section */}
      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        <div className="bg-gray-50/50 px-4 py-2 border-b border-gray-100 flex items-center gap-2">
          <Stethoscope className="text-gray-500" size={16} />
          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Conduta</h3>
        </div>
        <div className="p-4">
          {treatments.length > 0 ? (
            <ul className="space-y-2">
              {treatments.map((treatment, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>{treatment}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-xs italic">Nenhuma conduta específica sugerida.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionPlan;