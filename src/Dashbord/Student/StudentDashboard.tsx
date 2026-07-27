import { useState, useEffect } from "react";
import { StudentSidebar, TabType } from "./StudentSidebar";
import { StudentLiveChat } from "./StudentLiveChat";
import { AnimatePresence, motion } from "framer-motion";

// Views
import { StudentHomeView } from "./views/StudentHomeView";
import { StudentOpportunitiesView } from "./views/StudentOpportunitiesView";
import { StudentSavedView } from "./views/StudentSavedView";
import { StudentSharedView } from "./views/StudentSharedView";
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
      } catch {
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
      case "Dashboard":     return <StudentHomeView onNavigate={setActiveTab} />;
      case "Opportunities": return <StudentOpportunitiesView />;
      case "Saved":         return <StudentSavedView />;
      case "Shared":        return <StudentSharedView />;
      case "Applications":  return <StudentApplicationsView />;
      case "Calendar":      return <StudentCalendarView />;
      case "Mentors":       return <StudentCommunityView />;
      case "Resources":     return <StudentResourcesView />;
      case "Settings":      return <StudentSettingsView />;
      default:              return <StudentHomeView onNavigate={setActiveTab} />;
    }
  };

  return (
    <div
      className="min-h-screen font-sans antialiased bg-white"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="flex-1 p-4 max-w-[1536px] w-full mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-[180px_1fr_400px] gap-3 items-start min-h-[calc(100vh-2rem)]">
          {/* LEFT SIDEBAR */}
          <div>
            <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* MAIN CENTER CONTENT */}
          <main className="bg-white rounded-[18px] border border-pink-100 shadow-sm flex flex-col min-w-0 h-[calc(100vh-2rem)]">
            <StudentHeader user={user} onLogout={handleLogout} />
            <div className="flex-1 overflow-y-auto px-[22px] pb-[24px] bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="h-full"
                >
                  {renderActiveTab()}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>

          {/* RIGHT SIDEBAR: LIVE CHAT */}
          <div>
            <StudentLiveChat user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
