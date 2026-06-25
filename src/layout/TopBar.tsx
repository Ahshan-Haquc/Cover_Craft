import { FileText } from "lucide-react"

export const TopBar = ()=>{
    return(
<header className="bg-[#111844] backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 transition-all">
  <div className="mx-auto px-4 sm:px-6 h-14 flex items-center justify-center gap-3">
    <div className="flex flex-col items-center border-x-2 px-6 border-blue-700 rounded-full">
      <h1 className="text-sm sm:text-base font-semibold text-blue-700 tracking-tight cursor-pointer">
        CoverCraft
      </h1>
      <span className="text-[10px] sm:text-xs font-medium text-slate-500 sm:text-slate-400">
        cover letter generator
      </span>
    </div>
  </div>
</header>
    )
}