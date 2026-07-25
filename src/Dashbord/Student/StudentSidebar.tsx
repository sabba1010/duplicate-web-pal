import { LayoutGrid, Search, Heart, Share2, Calendar as CalendarIcon, FileText, Users, BookOpen, Settings, MessageSquare } from "lucide-react";
import { Link } from "@tanstack/react-router";

export type TabType = "Dashboard" | "Opportunities" | "Saved" | "Applications" | "Calendar" | "Community" | "Resources" | "Settings";

interface StudentSidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export function StudentSidebar({ activeTab, setActiveTab }: StudentSidebarProps) {
  const tabs = [
    { id: "Dashboard", label: "Dashboard", icon: LayoutGrid },
    { id: "Opportunities", label: "Opportunities", icon: Search },
    { id: "Saved", label: "Saved", icon: Heart, badge: "14" },
    { id: "Applications", label: "Applications", icon: FileText, badge: "5" },
    { id: "Calendar", label: "Calendar", icon: CalendarIcon },
    { id: "Community", label: "Community", icon: MessageSquare },
    { id: "Resources", label: "Resources", icon: BookOpen },
    { id: "Settings", label: "Settings", icon: Settings },
  ] as const;

  return (
    <aside className="lg:col-span-2 lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)] bg-white/80 backdrop-blur-xl rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between overflow-y-auto z-20">
      <div>
        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-2 mb-10 px-2 group cursor-pointer transition-opacity">
          <div className="flex flex-col leading-none">
            <div className="flex items-center gap-1">
              <span className="font-serif italic text-3xl font-bold text-slate-900 tracking-tight">goc</span>
              <span className="text-teal-600 text-xl font-bold">.</span>
            </div>
            <span className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase mt-1">
              Student Portal
            </span>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-teal-600 text-white shadow-md shadow-teal-500/20 translate-x-1"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Promo Card */}
      <div className="mt-8 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-5 text-center border border-teal-100/50 shadow-inner">
        <h3 className="font-semibold text-sm text-slate-800">Complete Profile</h3>
        <p className="text-xs text-slate-500 mt-1 mb-4 leading-tight">
          Unlock personalized recommendations.
        </p>
        <div className="w-full bg-slate-200 rounded-full h-1.5 mb-4 overflow-hidden">
          <div className="bg-teal-500 h-1.5 rounded-full w-[65%]"></div>
        </div>
        <button 
          onClick={() => setActiveTab("Settings")}
          className="w-full bg-white hover:bg-teal-50 text-teal-700 text-xs font-semibold py-2.5 rounded-xl shadow-sm border border-teal-100 transition-colors cursor-pointer"
        >
          Update Now
        </button>
      </div>
    </aside>
  );
}
