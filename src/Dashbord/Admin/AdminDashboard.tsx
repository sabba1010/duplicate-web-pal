import { useState, useEffect } from "react";
import { LogOut, Bell } from "lucide-react";
import { AdminSidebar, AdminTabType } from "./AdminSidebar";
import { AnimatePresence, motion } from "framer-motion";

// Views
import { AdminOverviewView } from "./views/AdminOverviewView";
import { AdminOpportunitiesView } from "./views/AdminOpportunitiesView";
import { AdminMembersView } from "./views/AdminMembersView";
import { AdminAnalyticsView } from "./views/AdminAnalyticsView";
import { AdminExtensionView } from "./views/AdminExtensionView";

export function AdminDashboard() {
  const [user, setUser] = useState<{ name: string; username: string; role: string } | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTabType>("Overview");

  useEffect(() => {
    const stored = localStorage.getItem("goc_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        setUser({ name: "Admin", username: "admin", role: "admin" });
      }
    } else {
      setUser({ name: "Admin", username: "admin", role: "admin" });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("goc_user");
    window.location.href = "/login";
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Overview": return <AdminOverviewView />;
      case "Members": return <AdminMembersView />;
      case "Opportunities": return <AdminOpportunitiesView />;
      case "Submissions": return <div className="p-10 text-center text-slate-500 font-medium bg-white rounded-3xl border border-slate-200">Submission Queue UI Pending</div>;
      case "Extension": return <AdminExtensionView />;
      case "Analytics": return <AdminAnalyticsView />;
      case "Settings": return <div className="p-10 text-center text-slate-500 font-medium bg-white rounded-3xl border border-slate-200">System Settings UI Pending</div>;
      default: return <AdminOverviewView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f5f9] text-slate-900 font-sans antialiased flex flex-col justify-between selection:bg-indigo-100 selection:text-indigo-900">
      <div className="flex-1 p-4 sm:p-6 max-w-[1800px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Admin Left Sidebar */}
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Admin Main Section */}
          <main className="lg:col-span-10 flex flex-col gap-6 min-h-[calc(100vh-3rem)]">
            {/* Header */}
            <div className="bg-white rounded-3xl p-6 border border-indigo-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest border border-indigo-100">
                    System Control
                  </span>
                </div>
                <h1 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
                  Welcome back, System Admin
                </h1>
              </div>

              <div className="flex items-center gap-4 pl-4 md:border-l border-slate-100">
                <button className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors relative cursor-pointer border border-slate-200">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 p-0.5 shadow-sm">
                  <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-indigo-600 font-black text-sm">
                    {user?.name?.[0] || "A"}
                  </div>
                </div>
                <button onClick={handleLogout} className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Dynamic Content */}
            <div className="flex-1 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  {renderActiveTab()}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
