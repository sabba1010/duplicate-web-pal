import { Bell, LogOut, Search, Chrome, Settings } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface StudentHeaderProps {
  user: { name: string; username: string } | null;
  onLogout: () => void;
}

export function StudentHeader({ user, onLogout }: StudentHeaderProps) {
  const [extensionOn, setExtensionOn] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 border border-slate-200 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        
        {/* Left Side: Status / Context */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-50 rounded-xl">
            <Chrome className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <h1 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Chrome Extension</h1>
            <p className="text-[11px] text-slate-500 font-medium">Syncing opportunities automatically</p>
          </div>
        </div>

        {/* Right Side: Controls */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          
          {/* Extension Toggle */}
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-600">
              {extensionOn ? "Active" : "Paused"}
            </span>
            <button
              onClick={() => setExtensionOn(!extensionOn)}
              className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 cursor-pointer ${
                extensionOn ? "bg-teal-500" : "bg-slate-300"
              }`}
            >
              <motion.div
                layout
                className="w-4 h-4 bg-white rounded-full shadow-sm"
                animate={{ x: extensionOn ? 16 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>

          {/* Notifications */}
          <button className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors relative cursor-pointer border border-slate-200">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Profile Menu */}
          <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-blue-500 p-0.5 shadow-sm">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-teal-600 font-bold text-sm">
                {user?.name?.[0] || "K"}
              </div>
            </div>
            <button onClick={onLogout} title="Logout" className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer p-1">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Greeting & Search Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Hi, {user?.name || "Karla"}! 👋
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Let's find your next big opportunity today.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-96 group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scholarships, internships..."
            className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-900 rounded-2xl py-3 pl-11 pr-4 outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all placeholder:text-slate-400"
          />
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
        </div>
      </div>
    </header>
  );
}
