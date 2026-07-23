import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  GraduationCap,
  Calendar,
  MessageSquare,
  Users,
  Settings,
  Bell,
  LogOut,
  CheckCircle,
  Clock,
  Video,
} from "lucide-react";

export function MentorDashboard() {
  const [user, setUser] = useState<{ name: string; username: string; role: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("goc_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        setUser({ name: "Mentor", username: "mentor", role: "mentor" });
      }
    } else {
      setUser({ name: "Mentor", username: "mentor", role: "mentor" });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("goc_user");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-[#f7fafc] text-[#1a202c] font-sans antialiased flex flex-col justify-between">
      <div className="flex-1 p-4 sm:p-6 max-w-[1600px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Mentor Left Sidebar */}
          <aside className="lg:col-span-2 lg:sticky lg:top-5 bg-white rounded-3xl p-5 border border-teal-100 shadow-xs flex flex-col justify-between min-h-[800px]">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-8 px-2 group">
                <div className="flex flex-col leading-none">
                  <div className="flex items-center gap-1">
                    <span className="font-serif italic text-3xl font-bold text-teal-600">goc</span>
                    <span className="text-teal-700 text-xs font-bold bg-teal-50 px-2 py-0.5 rounded-full">MENTOR</span>
                  </div>
                  <span className="text-[10px] text-teal-500 font-semibold tracking-wider uppercase">
                    Mentor Hub
                  </span>
                </div>
              </Link>

              <nav className="space-y-1.5">
                <a href="/mentor" className="flex items-center gap-3 px-4 py-3 bg-teal-600 text-white font-semibold text-xs rounded-2xl shadow-md">
                  <GraduationCap className="h-4 w-4" />
                  <span>Overview</span>
                </a>
                <a href="#" className="flex items-center justify-between px-4 py-3 text-xs text-gray-600 font-medium rounded-2xl hover:bg-teal-50">
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>Mentees</span>
                  </div>
                  <span className="bg-teal-100 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full">18</span>
                </a>
                <a href="#" className="flex items-center justify-between px-4 py-3 text-xs text-gray-600 font-medium rounded-2xl hover:bg-teal-50">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Sessions</span>
                  </div>
                  <span className="bg-teal-100 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full">4</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-xs text-gray-600 font-medium rounded-2xl hover:bg-teal-50">
                  <MessageSquare className="h-4 w-4 text-gray-400" />
                  <span>Messages</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-xs text-gray-600 font-medium rounded-2xl hover:bg-teal-50">
                  <Settings className="h-4 w-4 text-gray-400" />
                  <span>Availability</span>
                </a>
              </nav>
            </div>

            <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-100 text-center">
              <span className="text-[11px] font-bold text-teal-900">Verified Mentor</span>
              <p className="text-[10px] text-gray-500 mt-0.5">Empowering girls in tech & business.</p>
            </div>
          </aside>

          {/* Mentor Main Section */}
          <main className="lg:col-span-10 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-teal-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Mentor Portal 🎓
                  </span>
                </div>
                <h1 className="text-2xl font-black text-[#1a202c] mt-2">
                  Welcome back, Mentor!
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  You have 3 upcoming 1-on-1 mentorship sessions scheduled today.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors">
                  <Video className="h-4 w-4" />
                  <span>Join Next Call</span>
                </button>
                <button onClick={handleLogout} className="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:text-red-600 transition-colors">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-3xl p-5 border border-teal-100 shadow-xs">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Mentees</div>
                <div className="text-2xl font-black text-teal-600 mt-2">18</div>
                <div className="text-[10px] text-teal-600 font-semibold mt-1">4 pending requests</div>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-teal-100 shadow-xs">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hours Mentored</div>
                <div className="text-2xl font-black text-teal-600 mt-2">42 hrs</div>
                <div className="text-[10px] text-gray-500 mt-1">This semester</div>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-teal-100 shadow-xs">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rating</div>
                <div className="text-2xl font-black text-amber-500 mt-2">4.9 ★</div>
                <div className="text-[10px] text-gray-500 mt-1">26 reviews</div>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-teal-100 shadow-xs">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recommendations</div>
                <div className="text-2xl font-black text-teal-600 mt-2">12</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-1">Written for students</div>
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-white rounded-3xl p-6 border border-teal-100 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-[#1a202c]">Today's Mentorship Sessions</h2>
              <div className="divide-y divide-gray-100 text-xs">
                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex flex-col items-center justify-center text-teal-700 font-bold shrink-0">
                      <span className="text-[9px]">2:00</span>
                      <span className="text-[9px]">PM</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">Karla M. — Resume Review & Career Guidance</div>
                      <div className="text-[10px] text-gray-400">Software Engineering Track</div>
                    </div>
                  </div>
                  <button className="bg-teal-600 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
                    <Video className="h-3 w-3" />
                    <span>Start Call</span>
                  </button>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex flex-col items-center justify-center text-gray-600 font-bold shrink-0">
                      <span className="text-[9px]">4:30</span>
                      <span className="text-[9px]">PM</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">Sofia M. — Scholarship Essay Review</div>
                      <div className="text-[10px] text-gray-400">Business & Finance Track</div>
                    </div>
                  </div>
                  <button className="border border-gray-200 text-gray-600 font-bold px-3 py-1.5 rounded-lg">Details</button>
                </div>
              </div>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
