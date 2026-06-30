import { FileText } from "lucide-react";

export const TopBar = () => {
  return (
    <header className="bg-[#080616]/80 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-center">
        <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-blue-950/20  hover:border-blue-500/40 transition-colors cursor-pointer group">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            <FileText className="w-4 h-4 text-white" />
          </div>
          
          <div className="flex flex-col items-start">
            <h1 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200 tracking-wide">
              CoverCraft
            </h1>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-500 group-hover:text-slate-400 transition-colors">
              AI Generator
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};