import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Users,
  FileText,
  Settings,
  BarChart3,
  Chrome,
  Inbox
} from "lucide-react";

export type AdminTabType = "Overview" | "Members" | "Opportunities" | "Submissions" | "Analytics" | "Extension" | "Settings";

interface AdminSidebarProps {
  activeTab: AdminTabType;
  setActiveTab: (tab: AdminTabType) => void;
}

export function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const tabs = [
    { id: "Overview", label: "Overview", icon: ShieldCheck },
    { id: "Members", label: "Members", icon: Users, badge: "12.4k" },
    { id: "Opportunities", label: "Opportunities", icon: FileText, badge: "342" },
    { id: "Submissions", label: "Submissions", icon: Inbox, badge: "3" },
    { id: "Extension", label: "Extension Data", icon: Chrome },
    { id: "Analytics", label: "Analytics", icon: BarChart3 },
    { id: "Settings", label: "System Settings", icon: Settings },
  ] as const;

  return (
    <aside className="lg:col-span-2 lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)] bg-white rounded-3xl p-5 border border-indigo-100 shadow-sm flex flex-col justify-between min-h-[800px] overflow-y-auto">
      <div>
        <Link to="/" className="flex items-center gap-2 mb-10 px-2 group">
          <div className="flex flex-col leading-none">
            <div className="flex items-center gap-1">
              <span className="font-serif italic text-3xl font-bold text-indigo-900 tracking-tight">goc</span>
              <span className="text-indigo-600 text-[10px] font-black bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">ADMIN</span>
            </div>
            <span className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase mt-1">
              Control Panel
            </span>
          </div>
        </Link>

        <nav className="space-y-1.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTabType)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20 translate-x-1"
                    : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-600"
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

      <div className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 text-center shadow-inner">
        <ShieldCheck className="h-6 w-6 text-indigo-500 mx-auto mb-2" />
        <span className="text-xs font-bold text-indigo-900">Admin Active</span>
        <p className="text-[10px] text-slate-500 mt-1">Full system management permissions enabled.</p>
      </div>
    </aside>
  );
}
