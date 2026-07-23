import { Bell, LogOut, Search } from "lucide-react";
import { useState } from "react";

interface StudentHeaderProps {
  user: { name: string; username: string } | null;
  onLogout: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function StudentHeader({ user, onLogout, searchQuery, setSearchQuery }: StudentHeaderProps) {
  const [extensionOn, setExtensionOn] = useState(true);

  return (
    <div className="bg-white rounded-3xl p-5 border border-pink-100/60 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        {/* Left Extension status */}
        <div>
          <h1 className="font-bold text-xs text-[#e04f96] uppercase tracking-wide">GOC Extension</h1>
          <p className="text-[11px] text-gray-400 font-medium">Opportunities. Community. Growth.</p>
        </div>

        {/* Right controls: Extension Switch, Bell, Avatar */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Extension ON toggle switch */}
          <div className="flex items-center gap-2 bg-pink-50/60 px-3 py-1.5 rounded-full border border-pink-100">
            <span className="text-[11px] font-semibold text-gray-600">Extension ON</span>
            <button
              onClick={() => setExtensionOn(!extensionOn)}
              className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 cursor-pointer ${
                extensionOn ? "bg-[#e04f96]" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                  extensionOn ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Notifications */}
          <button className="p-2 rounded-full bg-pink-50/60 text-[#e04f96] hover:bg-pink-100 transition-colors relative cursor-pointer">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#e04f96] rounded-full ring-2 ring-white"></span>
          </button>

          {/* Profile avatar */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-100 border border-pink-300 flex items-center justify-center text-[#e04f96] font-bold text-xs shadow-xs">
              {user?.name?.[0] || "K"}
            </div>
            <button onClick={onLogout} title="Logout" className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Greeting & Search Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#2d1b28]">
            Hi, {user?.name || "Karla"}! 💕
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Let's find your next opportunity.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scholarships, internships, programs..."
            className="w-full bg-pink-50/40 border border-pink-100 text-xs text-gray-700 rounded-2xl py-2.5 pl-4 pr-10 outline-none focus:border-[#e04f96] focus:ring-2 focus:ring-pink-100 transition-all placeholder:text-gray-400"
          />
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-[#e04f96]" />
        </div>
      </div>
    </div>
  );
}
