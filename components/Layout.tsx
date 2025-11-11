import React from 'react';
import { Briefcase, Linkedin } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#0077b5] p-1.5 rounded-md">
              <Linkedin className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              LinkedIn AI <span className="text-[#0077b5]">Creator</span>
            </h1>
          </div>
          <div className="text-sm font-medium text-slate-500 flex items-center gap-1">
             <Briefcase className="w-4 h-4" />
             <span>Expert Persona</span>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-slate-100 border-t border-slate-200 py-6 mt-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>Powered by Gemini 2.5 Flash • Optimized for Professional Growth</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;