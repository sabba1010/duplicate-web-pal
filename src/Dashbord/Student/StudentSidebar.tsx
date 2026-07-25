import {
  LayoutGrid,
  Search,
  Heart,
  Share2,
  Calendar as CalendarIcon,
  FileText,
  Users,
  BookOpen,
  Settings,
  UserCheck,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export type TabType =
  | "Dashboard"
  | "Opportunities"
  | "Saved"
  | "Shared"
  | "Calendar"
  | "Applications"
  | "Mentors"
  | "Resources"
  | "Settings";

interface StudentSidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export function StudentSidebar({ activeTab, setActiveTab }: StudentSidebarProps) {
  const tabs = [
    { id: "Dashboard", label: "Dashboard", icon: LayoutGrid },
    { id: "Opportunities", label: "Opportunities", icon: Search },
    { id: "Saved", label: "Saved", icon: Heart, badge: "24" },
    { id: "Shared", label: "Shared", icon: Share2, badge: "12" },
    { id: "Calendar", label: "Calendar", icon: CalendarIcon },
    { id: "Applications", label: "Applications", icon: FileText, badge: "6" },
    { id: "Mentors", label: "Mentors", icon: UserCheck },
    { id: "Resources", label: "Resources", icon: BookOpen },
    { id: "Settings", label: "Settings", icon: Settings },
  ] as const;

  return (
    <aside className="xl:sticky xl:top-4 xl:h-[calc(100vh-2rem)] bg-white rounded-[18px] p-[20px_14px] border border-pink-100 shadow-sm flex flex-col justify-between overflow-y-auto z-20">
      <div>
        {/* Logo */}
        <Link to="/" className="flex flex-col items-start mb-8 px-1 cursor-pointer group">
          <div className="flex items-center gap-1">
            <span className="font-bold text-2xl text-[#d63384] tracking-tight italic">goc</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d63384] mt-0.5" />
          </div>
          <span className="text-[9px] text-gray-400 font-semibold tracking-widest uppercase">
            girls on campus
          </span>
        </Link>

        {/* Nav */}
        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                whileTap={{ scale: 0.97 }}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-[13px] font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#e04f96] text-white shadow-md shadow-pink-300/30"
                    : "text-gray-500 hover:bg-pink-50 hover:text-[#e04f96]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-gray-400"}`} />
                  <span>{tab.label}</span>
                </div>
                {"badge" in tab && tab.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? "bg-white/25 text-white"
                        : "bg-pink-100 text-[#e04f96]"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* Invite Promo */}
      <div className="mt-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-4 text-center border border-pink-100">
        {/* Stick figure icons */}
        <div className="flex justify-center gap-3 mb-3">
          <svg viewBox="0 0 40 60" className="w-8 h-10 text-[#e04f96]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="20" cy="10" r="6" />
            <line x1="20" y1="16" x2="20" y2="38" />
            <line x1="20" y1="24" x2="10" y2="32" />
            <line x1="20" y1="24" x2="30" y2="32" />
            <line x1="20" y1="38" x2="12" y2="52" />
            <line x1="20" y1="38" x2="28" y2="52" />
          </svg>
          <svg viewBox="0 0 40 60" className="w-8 h-10 text-pink-300" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="20" cy="10" r="6" />
            <line x1="20" y1="16" x2="20" y2="38" />
            <line x1="20" y1="24" x2="10" y2="32" />
            <line x1="20" y1="24" x2="30" y2="32" />
            <line x1="20" y1="38" x2="12" y2="52" />
            <line x1="20" y1="38" x2="28" y2="52" />
          </svg>
        </div>
        <h3 className="font-bold text-sm text-[#2d1b28]">Invite a friend!</h3>
        <p className="text-[11px] text-gray-500 mt-1 mb-3 leading-tight">
          More girls, more opportunities.
        </p>
        <button className="w-full bg-[#e04f96] hover:bg-[#c43d83] text-white text-xs font-bold py-2 rounded-xl shadow-sm transition-colors cursor-pointer">
          Invite now
        </button>
      </div>

      {/* Mentor login */}
      <div className="mt-3 text-center">
        <button
          onClick={() => (window.location.href = "/login")}
          className="text-[11px] text-gray-400 hover:text-[#e04f96] font-medium transition-colors cursor-pointer flex items-center gap-1 mx-auto"
        >
          <UserCheck className="h-3 w-3" />
          Mentor login
        </button>
      </div>
    </aside>
  );
}
