import { Bell, LogOut, Search, Chrome, MoreVertical } from "lucide-react";
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
    <header className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm space-y-5">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        {/* Extension label */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-pink-50 rounded-xl">
            <Chrome className="h-4 w-4 text-[#e04f96]" />
          </div>
          <div>
            <h1 className="font-bold text-[11px] text-gray-800 uppercase tracking-wider">
              GOC Extension
            </h1>
            <p className="text-[10px] text-gray-400 font-medium">
              Opportunities. Community. Growth.
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {/* Extension Toggle */}
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
            <span className="text-[11px] font-semibold text-gray-600">
              Extension {extensionOn ? "ON" : "OFF"}
            </span>
            <button
              onClick={() => setExtensionOn(!extensionOn)}
              className={`w-10 h-5 rounded-full transition-colors relative flex items-center p-0.5 cursor-pointer ${
                extensionOn ? "bg-[#e04f96]" : "bg-gray-300"
              }`}
            >
              <motion.div
                layout
                className="w-4 h-4 bg-white rounded-full shadow-sm"
                animate={{ x: extensionOn ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>

          {/* Notifications */}
          <button className="p-2 rounded-full bg-gray-50 text-gray-500 hover:bg-pink-50 hover:text-[#e04f96] transition-colors relative cursor-pointer border border-gray-200">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#e04f96] rounded-full ring-2 ring-white" />
          </button>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-bold text-sm shadow-sm cursor-pointer">
            {user?.name?.[0] || "K"}
          </div>

          {/* More */}
          <button className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Greeting & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            Hi, {user?.name || "Karla"}!{" "}
            <span className="text-[#e04f96]">💕</span>
          </h2>
          <p className="text-sm text-gray-400 mt-0.5 font-medium">
            Let's find your next opportunity.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80 group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scholarships, internships, programs..."
            className="w-full bg-gray-50 border border-gray-200 text-sm text-gray-700 rounded-full py-2.5 pl-10 pr-10 outline-none focus:bg-white focus:border-[#e04f96] focus:ring-4 focus:ring-pink-500/10 transition-all placeholder:text-gray-400"
          />
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400 group-focus-within:text-[#e04f96] transition-colors" />
          <button className="absolute right-3.5 top-3 text-gray-400 hover:text-[#e04f96] transition-colors cursor-pointer">
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
