import React, { useState } from 'react';
import Header from './components/Header';
import TriageBanner from './components/TriageBanner';
import DiagnosisCard from './components/DiagnosisCard';
import ActionPlan from './components/ActionPlan';
import { analyzeCase } from './services/geminiService';
import { CaseAnalysis } from './types';
import { Sparkles, Eraser, Activity, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CaseAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeCase(input);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Falha na análise. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#F0F3F9] text-gray-900 overflow-hidden">
      <Header />

      <main className="flex-1 flex flex-col md:flex-row p-3 gap-3 overflow-hidden">
        
        {/* Input Panel (Sidebar style on Desktop) */}
        <div className="w-full md:w-[400px] lg:w-[450px] flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden shrink-0">
          <div className="h-10 border-b border-gray-100 flex items-center justify-between px-4 bg-gray-50/50">
             <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-blue-500"></span>
               <h2 className="text-xs font-bold text-gray-600 uppercase tracking-wider">Entrada de Dados</h2>
             </div>
             {input && (
                <button 
                  onClick={handleClear} 
                  disabled={loading}
                  className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                >
                  <Eraser size={12} /> Limpar
                </button>
             )}
          </div>

          <div className="flex-1 relative bg-white">
            <textarea
              className="w-full h-full p-4 resize-none border-none focus:ring-0 text-sm leading-relaxed placeholder-gray-400 text-gray-700"
              placeholder="Cole a anamnese ou descreva o caso clínico aqui..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              spellCheck={false}
            />
          </div>

          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <button
              onClick={handleAnalyze}
              disabled={loading || !input.trim()}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-semibold shadow-sm transition-all
                ${loading || !input.trim() 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]'}`}
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
                  <span>Processando...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Analisar Caso</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Panel (Main Content) */}
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden min-h-0 relative">
          
          <div className="h-10 border-b border-gray-100 flex items-center px-4 bg-gray-50/50 shrink-0">
             <h2 className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-2">
               <Activity size={14} className="text-gray-400" />
               Resultado da Análise
             </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
            {error ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
                  <Activity size={24} />
                </div>
                <h3 className="text-gray-900 font-medium mb-1">Erro na análise</h3>
                <p className="text-sm text-gray-500 max-w-xs">{error}</p>
              </div>
            ) : !result ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-60">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                  <Activity size={32} />
                </div>
                <h3 className="text-gray-900 font-medium mb-1">Aguardando dados</h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  Insira a anamnese no painel à esquerda e clique em "Analisar Caso" para gerar o raciocínio clínico.
                </p>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-10">
                
                <TriageBanner level={result.triageLevel} reason={result.triageReason} />

                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2 border-b border-gray-100 pb-2">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Hipóteses Diagnósticas</h3>
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {result.diagnoses.length}
                    </span>
                  </div>
                  <div className="grid gap-3">
                    {result.diagnoses.map((diag, idx) => (
                      <DiagnosisCard key={idx} diagnosis={diag} index={idx} />
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                   <div className="flex items-center gap-2 mb-2 border-b border-gray-100 pb-2">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Plano Terapêutico & Investigação</h3>
                  </div>
                  <ActionPlan exams={result.exams} treatments={result.treatments} />
                </div>

              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;