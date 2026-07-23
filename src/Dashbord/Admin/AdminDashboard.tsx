import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Users,
  FileText,
  Settings,
  Bell,
  LogOut,
  BarChart3,
  CheckCircle,
  AlertCircle,
  PlusCircle,
  Search,
} from "lucide-react";

export function AdminDashboard() {
  const [user, setUser] = useState<{ name: string; username: string; role: string } | null>(null);

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

  return (
    <div className="min-h-screen bg-[#f4f5f9] text-[#1e1b4b] font-sans antialiased flex flex-col justify-between">
      <div className="flex-1 p-4 sm:p-6 max-w-[1600px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Admin Left Sidebar */}
          <aside className="lg:col-span-2 lg:sticky lg:top-5 bg-white rounded-3xl p-5 border border-indigo-100 shadow-xs flex flex-col justify-between min-h-[800px]">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-8 px-2 group">
                <div className="flex flex-col leading-none">
                  <div className="flex items-center gap-1">
                    <span className="font-serif italic text-3xl font-bold text-indigo-600">goc</span>
                    <span className="text-indigo-600 text-sm font-bold bg-indigo-50 px-2 py-0.5 rounded-full">ADMIN</span>
                  </div>
                  <span className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase">
                    Control Panel
                  </span>
                </div>
              </Link>

              <nav className="space-y-1.5">
                <a href="/admin" className="flex items-center gap-3 px-4 py-3 bg-indigo-600 text-white font-semibold text-xs rounded-2xl shadow-md">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Admin Overview</span>
                </a>
                <a href="#" className="flex items-center justify-between px-4 py-3 text-xs text-gray-600 font-medium rounded-2xl hover:bg-indigo-50">
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>Manage Users</span>
                  </div>
                  <span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full">1,240</span>
                </a>
                <a href="#" className="flex items-center justify-between px-4 py-3 text-xs text-gray-600 font-medium rounded-2xl hover:bg-indigo-50">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span>Opportunities</span>
                  </div>
                  <span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full">86</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-xs text-gray-600 font-medium rounded-2xl hover:bg-indigo-50">
                  <BarChart3 className="h-4 w-4 text-gray-400" />
                  <span>Analytics</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-xs text-gray-600 font-medium rounded-2xl hover:bg-indigo-50">
                  <Settings className="h-4 w-4 text-gray-400" />
                  <span>System Settings</span>
                </a>
              </nav>
            </div>

            <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100 text-center">
              <span className="text-[11px] font-bold text-indigo-900">Admin Role Active</span>
              <p className="text-[10px] text-gray-500 mt-0.5">Full system management permissions enabled.</p>
            </div>
          </aside>

          {/* Admin Main Section */}
          <main className="lg:col-span-10 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-indigo-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Admin Portal ⚡
                  </span>
                </div>
                <h1 className="text-2xl font-black text-[#1e1b4b] mt-2">
                  Welcome, System Administrator!
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  Manage student accounts, verify mentor applications, and approve scholarship listings.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors">
                  <PlusCircle className="h-4 w-4" />
                  <span>New Opportunity</span>
                </button>
                <button onClick={handleLogout} className="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:text-red-600 transition-colors">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-3xl p-5 border border-indigo-100 shadow-xs">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Students</div>
                <div className="text-2xl font-black text-indigo-600 mt-2">1,240</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-1">↑ +12% this month</div>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-indigo-100 shadow-xs">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Mentors</div>
                <div className="text-2xl font-black text-indigo-600 mt-2">148</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-1">↑ +5 new requests</div>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-indigo-100 shadow-xs">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Scholarships</div>
                <div className="text-2xl font-black text-indigo-600 mt-2">86</div>
                <div className="text-[10px] text-gray-500 mt-1">3 pending approval</div>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-indigo-100 shadow-xs">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">System Health</div>
                <div className="text-2xl font-black text-emerald-600 mt-2">99.9%</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-1">All services normal</div>
              </div>
            </div>

            {/* Pending Approvals Table */}
            <div className="bg-white rounded-3xl p-6 border border-indigo-100 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-[#1e1b4b]">Pending Approvals & Verification</h2>
              <div className="divide-y divide-gray-100 text-xs">
                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <div>
                      <div className="font-bold text-gray-800">New Mentor Application - Dr. Sarah Lin</div>
                      <div className="text-[10px] text-gray-400">Submitted 2 hours ago · Computer Science Mentor</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="bg-indigo-600 text-white font-bold px-3 py-1.5 rounded-lg">Approve</button>
                    <button className="border border-gray-200 text-gray-600 font-bold px-3 py-1.5 rounded-lg">Review</button>
                  </div>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    <div>
                      <div className="font-bold text-gray-800">Scholarship Submission - Tech Women 2026</div>
                      <div className="text-[10px] text-gray-400">Submitted 4 hours ago · $5,000 Grant</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="bg-indigo-600 text-white font-bold px-3 py-1.5 rounded-lg">Approve</button>
                    <button className="border border-gray-200 text-gray-600 font-bold px-3 py-1.5 rounded-lg">Review</button>
                  </div>
                </div>
              </div>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
