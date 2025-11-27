import React from 'react';
import { Activity, Minus, Square, X } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-10 flex items-center justify-between px-3 select-none shrink-0 z-50">
      <div className="flex items-center gap-2">
        <div className="text-blue-600">
          <Activity size={18} />
        </div>
        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">MediSolver AI</span>
      </div>
      
      {/* Decorative Window Controls for aesthetic */}
      <div className="flex items-center gap-4 text-gray-400">
        <div className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 rounded text-gray-500 border border-gray-200">v2.5 Lite</div>
      </div>
    </header>
  );
};

export default Header;