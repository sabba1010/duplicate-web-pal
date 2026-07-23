import { useState, useEffect } from "react";
import { StudentSidebar } from "./StudentSidebar";
import { StudentHeader } from "./StudentHeader";
import { StudentMetrics } from "./StudentMetrics";
import { StudentOpportunities, OpportunityItem } from "./StudentOpportunities";
import { StudentFeedAndCalendar } from "./StudentFeedAndCalendar";
import { StudentLiveChat } from "./StudentLiveChat";

export function StudentDashboard() {
  const [user, setUser] = useState<{ name: string; username: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedIds, setSavedIds] = useState<number[]>([1, 2]);

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

  const toggleBookmark = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("goc_user");
    window.location.href = "/login";
  };

  // Opportunities Data matching image
  const opportunities: OpportunityItem[] = [
    {
      id: 1,
      title: "$2,500 Women in Business Scholarship",
      category: "Scholarship",
      deadline: "Jul 1, 2026",
      featured: true,
      tags: ["Women", "Business"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      title: "Google STEP Internship 2026",
      category: "Paid Internship",
      deadline: "Jun 30, 2026",
      featured: false,
      tags: ["STEM", "Google"],
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      title: "Public Policy Fellowship",
      category: "Fellowship",
      deadline: "Jul 10, 2026",
      featured: false,
      tags: ["Policy", "Leadership"],
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 4,
      title: "Fully Funded Summer Program",
      category: "Paid Program",
      deadline: "Jul 15, 2026",
      featured: false,
      tags: ["Leadership", "Summer"],
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf5f8] text-[#2d1b28] font-sans antialiased flex flex-col justify-between">
      {/* Main Grid Wrapper */}
      <div className="flex-1 p-3 sm:p-5 max-w-[1600px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* 1. LEFT SIDEBAR */}
          <StudentSidebar />

          {/* 2. MAIN CENTER CONTENT */}
          <main className="lg:col-span-7 space-y-5">
            <StudentHeader
              user={user}
              onLogout={handleLogout}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <StudentMetrics />
            <StudentOpportunities
              opportunities={opportunities}
              savedIds={savedIds}
              toggleBookmark={toggleBookmark}
            />
            <StudentFeedAndCalendar />
          </main>

          {/* 3. RIGHT SIDEBAR (LIVE CHAT) */}
          <StudentLiveChat user={user} />
        </div>
      </div>
    </div>
  );
}
