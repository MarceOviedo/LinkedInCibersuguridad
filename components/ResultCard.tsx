import React, { useState } from 'react';
import { Copy, Check, Share2, Sparkles } from 'lucide-react';

interface ResultCardProps {
  title: string;
  content: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Enhanced parser for markdown bold and basic lists
  const renderFormattedContent = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      // Handle Bold
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-bold text-slate-900 bg-blue-50/50 px-0.5 rounded">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Return normal text
      return part;
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-slate-200 overflow-hidden flex flex-col h-full transition-all duration-300 group transform hover:-translate-y-1">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold text-slate-700 flex items-center gap-2">
          <div className="bg-[#0077b5] text-white p-1 rounded-md shadow-sm">
            <Sparkles size={12} fill="currentColor" />
          </div>
          {title}
        </h3>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
            copied
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-white text-slate-500 border border-slate-200 hover:border-[#0077b5] hover:text-[#0077b5]'
          }`}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'COPIADO' : 'COPIAR'}
        </button>
      </div>
      
      {/* Content */}
      <div className="p-6 flex-grow bg-white relative">
        <div className="prose prose-sm prose-slate max-w-none whitespace-pre-wrap text-slate-600 leading-relaxed">
          {renderFormattedContent(content)}
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-6 py-3 bg-slate-50/80 border-t border-slate-100 text-xs text-slate-400 flex justify-between items-center backdrop-blur-sm">
        <span className="font-medium">{content.length} chars</span>
        <div className="flex items-center gap-1.5 text-[#0077b5] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          <Share2 size={12} />
          <span>LinkedIn Ready</span>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;