import { useState, useEffect } from "react";
import { StudentSidebar, TabType } from "./StudentSidebar";
import { StudentLiveChat } from "./StudentLiveChat";
import { AnimatePresence, motion } from "framer-motion";

// Views
import { StudentHomeView } from "./views/StudentHomeView";
import { StudentOpportunitiesView } from "./views/StudentOpportunitiesView";
import { StudentSavedView } from "./views/StudentSavedView";
import { StudentApplicationsView } from "./views/StudentApplicationsView";
import { StudentCalendarView } from "./views/StudentCalendarView";
import { StudentCommunityView } from "./views/StudentCommunityView";
import { StudentResourcesView } from "./views/StudentResourcesView";
import { StudentSettingsView } from "./views/StudentSettingsView";
import { StudentHeader } from "./StudentHeader";

export function StudentDashboard() {
  const [user, setUser] = useState<{ name: string; username: string } | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("Dashboard");

  useEffect(() => {
    const stored = localStorage.getItem("goc_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        setUser({ name: "Karla", username: "student" });
      }
    } else {
      setUser({ name: "Karla", username: "student" });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("goc_user");
    window.location.href = "/login";
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Dashboard": return <StudentHomeView onNavigate={setActiveTab} />;
      case "Opportunities": return <StudentOpportunitiesView />;
      case "Saved": return <StudentSavedView />;
      case "Applications": return <StudentApplicationsView />;
      case "Calendar": return <StudentCalendarView />;
      case "Community": return <StudentCommunityView />;
      case "Resources": return <StudentResourcesView />;
      case "Settings": return <StudentSettingsView />;
      default: return <StudentHomeView onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafc] text-slate-900 font-sans antialiased flex flex-col justify-between selection:bg-teal-100 selection:text-teal-900">
      {/* Main Grid Wrapper */}
      <div className="flex-1 p-3 sm:p-5 max-w-[1800px] w-full mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* 1. LEFT SIDEBAR */}
          <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* 2. MAIN CENTER CONTENT */}
          <main className="xl:col-span-7 flex flex-col gap-6 min-h-[calc(100vh-2.5rem)]">
            <StudentHeader user={user} onLogout={handleLogout} />
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

          {/* 3. RIGHT SIDEBAR (LIVE CHAT) */}
          <StudentLiveChat user={user} />
        </div>
      </div>
    </div>
  );
}
