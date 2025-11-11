import React from 'react';
import { PostMode } from '../types';
import { Layers, FileText, Sparkles } from 'lucide-react';

interface InputSectionProps {
  topic: string;
  mode: PostMode;
  isLoading: boolean;
  onTopicChange: (val: string) => void;
  onModeChange: (val: PostMode) => void;
  onSubmit: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  topic,
  mode,
  isLoading,
  onTopicChange,
  onModeChange,
  onSubmit,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 transition-all">
      <div className="space-y-6">
        
        {/* Mode Selection */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Selecciona el formato
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => onModeChange(PostMode.SINGLE)}
              className={`relative flex items-center p-4 border-2 rounded-xl transition-all ${
                mode === PostMode.SINGLE
                  ? 'border-[#0077b5] bg-blue-50 ring-1 ring-[#0077b5]'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className={`p-2 rounded-full mr-3 ${mode === PostMode.SINGLE ? 'bg-[#0077b5] text-white' : 'bg-slate-100 text-slate-500'}`}>
                <FileText size={20} />
              </div>
              <div className="text-left">
                <div className={`font-bold ${mode === PostMode.SINGLE ? 'text-[#0077b5]' : 'text-slate-700'}`}>Post Individual</div>
                <div className="text-xs text-slate-500 mt-1">Un post viral y directo</div>
              </div>
            </button>

            <button
              onClick={() => onModeChange(PostMode.SERIES)}
              className={`relative flex items-center p-4 border-2 rounded-xl transition-all ${
                mode === PostMode.SERIES
                  ? 'border-[#0077b5] bg-blue-50 ring-1 ring-[#0077b5]'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className={`p-2 rounded-full mr-3 ${mode === PostMode.SERIES ? 'bg-[#0077b5] text-white' : 'bg-slate-100 text-slate-500'}`}>
                <Layers size={20} />
              </div>
              <div className="text-left">
                <div className={`font-bold ${mode === PostMode.SERIES ? 'text-[#0077b5]' : 'text-slate-700'}`}>Serie de 3 Posts</div>
                <div className="text-xs text-slate-500 mt-1">Intro, Desarrollo y Conclusión</div>
              </div>
            </button>
          </div>
        </div>

        {/* Topic Input */}
        <div>
          <label htmlFor="topic" className="block text-sm font-semibold text-slate-700 mb-2">
            ¿Sobre qué quieres escribir hoy?
          </label>
          <textarea
            id="topic"
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0077b5] focus:border-[#0077b5] outline-none transition-all resize-none text-slate-800 placeholder-slate-400"
            placeholder="Ej: Implementación de Zero Trust en empresas pequeñas, El futuro de la IA en marketing, etc."
            value={topic}
            onChange={(e) => onTopicChange(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={onSubmit}
          disabled={isLoading || !topic.trim()}
          className={`w-full py-3.5 px-6 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all shadow-md ${
            isLoading || !topic.trim()
              ? 'bg-slate-300 cursor-not-allowed'
              : 'bg-[#0077b5] hover:bg-[#006097] hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Pensando...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generar Contenido
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputSection;