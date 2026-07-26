import { useState, useEffect } from "react";
import { AdminSidebar, AdminTabType } from "./AdminSidebar";
import { AnimatePresence, motion } from "framer-motion";

// Views
import { AdminOverviewView } from "./views/AdminOverviewView";
import { AdminOpportunitiesView } from "./views/AdminOpportunitiesView";
import { AdminMembersView } from "./views/AdminMembersView";
import { AdminAnalyticsView } from "./views/AdminAnalyticsView";
import { AdminExtensionView } from "./views/AdminExtensionView";
import { AdminSubmissionsView } from "./views/AdminSubmissionsView";
import { AdminSystemSettingsView } from "./views/AdminSystemSettingsView";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTabType>("Overview");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Overview":     return <AdminOverviewView />;
      case "Members":      return <AdminMembersView />;
      case "Opportunities":return <AdminOpportunitiesView />;
      case "Submissions":  return <AdminSubmissionsView />;
      case "Extension":    return <AdminExtensionView />;
      case "Analytics":    return <AdminAnalyticsView />;
      case "Settings":     return <AdminSystemSettingsView />;
      default:             return <AdminOverviewView />;
    }
  };

  return (
    <div className="min-h-screen font-sans antialiased bg-[#f8f9fa]">
      <div className="max-w-[1600px] w-full mx-auto py-6 px-4 sm:px-6">
        <div className="grid grid-cols-1 xl:grid-cols-[220px_1fr] gap-8 items-start min-h-[calc(100vh-3rem)]">

          {/* LEFT SIDEBAR */}
          <div className="h-full">
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* MAIN CONTENT */}
          <main className="flex flex-col min-w-0">
            {/* Dynamic Content */}
            <div className="flex-1">
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

        </div>
      </div>
    </div>
  );
}
