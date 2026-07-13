import { Bell, ChevronRight } from "lucide-react";

export default function Header({ title, subtitle }) {
  return (
    <header className="h-16 sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-3 min-w-0">
        <span className="w-1 h-6 bg-orange-500 rounded-full shrink-0 "></span>
        <div className="min-w-0  ">
          <h2 className="text-lg font-semibold text-gray-900 truncate">{title}</h2>
          {subtitle && (
            <p className="text-xs text-gray-400 flex items-center gap-1 -mt-0.5 truncate">
              <span>CHiPS</span>
              <ChevronRight className="w-3 h-3" />
              <span>{subtitle}</span>
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-500"></span>
        </button>

        <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700">
            A
          </div>
          <div className="leading-tight hidden sm:block">
            <p className="text-sm font-medium text-gray-800">Admin</p>
            <p className="text-[11px] text-gray-400">CHiPS</p>
          </div>
        </div>
      </div>
    </header>
  );
}