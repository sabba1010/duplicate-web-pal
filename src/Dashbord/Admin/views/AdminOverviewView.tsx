import { useState, useEffect } from "react";
import { Users, FileText, Activity, AlertTriangle, Bell, LogOut, Search, ExternalLink, Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "../../../lib/api";

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVars = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 350, damping: 25 } }
};

interface UserMember {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  school: string;
  status: "Active" | "Suspended";
  createdAt: string;
}

interface Submission {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    school: string;
    avatar: string;
  };
  opportunity: {
    id: string;
    title: string;
    category: string;
  };
  status: string;
  appliedAt: string;
}

export function AdminOverviewView() {
  const [users, setUsers] = useState<UserMember[]>([]);
  const [opportunitiesCount, setOpportunitiesCount] = useState(0);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Growth percentages (mocked/calculated based on registry dates or fixed)
  const growth = {
    students: 12.4,
    mentors: 5.2,
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("goc_token");

      const [usersRes, oppsRes, subsRes] = await Promise.all([
        fetch(`${API_BASE}/api/users`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/api/opportunities`),
        fetch(`${API_BASE}/api/users/submissions`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (usersRes.ok) {
        const data = await usersRes.json();
        setUsers(data.users || []);
      }
      if (oppsRes.ok) {
        const data = await oppsRes.json();
        setOpportunitiesCount(data.count || 0);
      }
      if (subsRes.ok) {
        const data = await subsRes.json();
        setSubmissions(data.submissions || []);
      }
    } catch (err) {
      console.error("Failed to load admin overview data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: "Active" | "Suspended") => {
    setUpdatingId(id);
    const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/users/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setUsers(prev => prev.map(u => u._id === id ? { ...u, status: newStatus } : u));
      }
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("goc_user");
    localStorage.removeItem("goc_token");
    window.location.href = "/login";
  };

  // Calculations
  const totalStudents = users.filter(u => u.role === "student").length;
  const activeMentors = users.filter(u => u.role === "mentor").length;

  // Filter members list based on tab and search
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.school && user.school.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeTab === "All") return matchesSearch;
    if (activeTab === "Students") return user.role === "student" && matchesSearch;
    if (activeTab === "Mentors") return user.role === "mentor" && matchesSearch;
    return matchesSearch; // Organizations can be added later if role expands
  });

  // Analytics Chart Data: Calculate submissions per day of the week
  const getSubmissionsChartData = () => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const counts = [0, 0, 0, 0, 0, 0, 0];

    submissions.forEach(sub => {
      if (sub.appliedAt) {
        const date = new Date(sub.appliedAt);
        counts[date.getDay()] += 1;
      }
    });

    // Reorder to match: MON, TUE, WED, THU, FRI, SAT, SUN
    return [
      { name: "MON", value: counts[1] },
      { name: "TUE", value: counts[2] },
      { name: "WED", value: counts[3] },
      { name: "THU", value: counts[4] },
      { name: "FRI", value: counts[5] },
      { name: "SAT", value: counts[6] },
      { name: "SUN", value: counts[0] },
    ];
  };

  return (
    <motion.div 
      className="space-y-6 pb-8 font-sans"
      variants={containerVars}
      initial="hidden"
      animate="show"
    >
      {/* Header Card */}
      <motion.div variants={itemVars} className="bg-white/80 backdrop-blur-xl rounded-[24px] p-6 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow duration-300">
        <div>
          <span className="inline-block bg-gradient-to-r from-[#eef2ff] to-[#e0e7ff] text-[#4f46e5] text-[10px] font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider shadow-sm">
            System Control
          </span>
          <h1 className="text-[26px] font-black text-[#111827] tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-600">
            Welcome back, System Admin
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-[#4f46e5] hover:bg-[#eef2ff] transition-all duration-300 p-2.5 rounded-full">
            <Bell className="w-5 h-5" />
          </button>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 rounded-full border-2 border-[#4f46e5] flex items-center justify-center text-[#4f46e5] font-bold text-sm bg-white shadow-[0_0_15px_rgba(79,70,229,0.2)] cursor-pointer"
          >
            S
          </motion.div>
          <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 p-2.5 rounded-full cursor-pointer">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-[#4f46e5]" />
        </div>
      ) : (
        <>
          {/* Metrics Row */}
          <motion.div variants={containerVars} className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Total Students */}
            <motion.div variants={itemVars} whileHover={{ y: -4 }} className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-default">
              <div className="flex justify-between items-start mb-4">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#eef2ff] to-[#e0e7ff] text-[#4f46e5] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Users className="w-5 h-5" />
                </div>
                <span className="bg-[#ecfdf5] text-[#059669] text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                  +{growth.students}%
                </span>
              </div>
              <div>
                <div className="text-[32px] font-black text-[#111827] leading-none mb-1.5 tracking-tight">
                  {totalStudents.toLocaleString()}
                </div>
                <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Total Students
                </div>
              </div>
            </motion.div>

            {/* Active Mentors */}
            <motion.div variants={itemVars} whileHover={{ y: -4 }} className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-default">
              <div className="flex justify-between items-start mb-4">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#f5f3ff] to-[#ede9fe] text-[#8b5cf6] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Users className="w-5 h-5" />
                </div>
                <span className="bg-[#ecfdf5] text-[#059669] text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                  +{growth.mentors}%
                </span>
              </div>
              <div>
                <div className="text-[32px] font-black text-[#111827] leading-none mb-1.5 tracking-tight">
                  {activeMentors.toLocaleString()}
                </div>
                <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Active Mentors
                </div>
              </div>
            </motion.div>

            {/* Active Opps */}
            <motion.div variants={itemVars} whileHover={{ y: -4 }} className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-default">
              <div className="flex justify-between items-start mb-4">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] text-[#3b82f6] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="bg-[#ecfdf5] text-[#059669] text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                  Live
                </span>
              </div>
              <div>
                <div className="text-[32px] font-black text-[#111827] leading-none mb-1.5 tracking-tight">
                  {opportunitiesCount}
                </div>
                <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Active Opps
                </div>
              </div>
            </motion.div>

            {/* System Health */}
            <motion.div variants={itemVars} whileHover={{ y: -4 }} className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-default">
              <div className="flex justify-between items-start mb-4">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#ecfdf5] to-[#d1fae5] text-[#10b981] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="bg-[#ecfdf5] text-[#059669] text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                  Stable
                </span>
              </div>
              <div>
                <div className="text-[32px] font-black text-[#111827] leading-none mb-1.5 tracking-tight">
                  99.9%
                </div>
                <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  System Health
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Middle Row */}
          <motion.div variants={containerVars} className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
            {/* Pending Actions */}
            <motion.div variants={itemVars} className="bg-white rounded-[24px] p-7 shadow-sm border border-gray-100 flex flex-col h-[400px] hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start mb-6 shrink-0">
                <div>
                  <h2 className="text-xl font-black text-[#111827] tracking-tight">Student Submissions</h2>
                  <p className="text-[13px] text-gray-500 mt-1 font-medium">Opportunities applied by students.</p>
                </div>
                <span className="bg-[#fffbeb] text-[#d97706] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  {submissions.length} item{submissions.length !== 1 ? "s" : ""}
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                {submissions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                    <FileText className="w-10 h-10 text-gray-200 mb-2" />
                    <p className="text-[13px] font-bold">No submissions yet</p>
                  </div>
                ) : (
                  submissions.map((sub, i) => (
                    <motion.div 
                      key={sub.id} 
                      whileHover={{ x: 4 }}
                      className={`flex justify-between items-center group ${i !== submissions.length - 1 ? "pb-4 border-b border-gray-50" : ""}`}
                    >
                      <div className="flex gap-4 items-start">
                        <div className="w-9 h-9 rounded-full bg-[#fffbeb] text-[#d97706] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-[14px] font-bold text-[#111827] mb-1 truncate">
                            {sub.user.name} applied for {sub.opportunity.title}
                          </h3>
                          <p className="text-[12px] text-gray-500 mb-2 font-medium truncate">
                            School: {sub.user.school || "Not specified"}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="bg-gray-100 text-gray-600 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                              {sub.opportunity.category}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium">
                              {new Date(sub.appliedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Platform Activity */}
            <motion.div variants={itemVars} className="bg-white rounded-[24px] p-7 shadow-sm border border-gray-100 flex flex-col h-[400px] hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start mb-6 shrink-0">
                <div>
                  <h2 className="text-xl font-black text-[#111827] tracking-tight">Platform Activity</h2>
                  <p className="text-[13px] text-gray-500 mt-1 font-medium">Application submissions this week.</p>
                </div>
                <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-[#4f46e5] transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 w-full min-h-0 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getSubmissionsChartData()} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 'bold' }} 
                      dy={10} 
                    />
                    <Tooltip 
                      cursor={{ fill: '#f3f4f6', opacity: 0.5, radius: 8 }} 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }} 
                    />
                    <Bar dataKey="value" fill="url(#colorValue)" radius={[8, 8, 8, 8]} barSize={40}>
                      <LabelList dataKey="value" position="top" fill="#4b5563" fontSize={11} fontWeight="black" dy={-8} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </motion.div>

          {/* Members Section */}
          <motion.div variants={itemVars} className="bg-white rounded-[24px] p-7 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <h2 className="text-xl font-black text-[#111827] tracking-tight">All members</h2>
              <div className="relative group">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search members by name/school..." 
                  className="w-full md:w-[280px] pl-5 pr-10 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-[#4f46e5] focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 placeholder:text-gray-400 bg-gray-50/50 hover:bg-white"
                />
                <Search className="w-4 h-4 text-gray-400 group-focus-within:text-[#4f46e5] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2.5 mb-6 overflow-x-auto pb-2 scrollbar-hide">
              {["All", "Students", "Mentors"].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all duration-300 shrink-0 ${
                    activeTab === tab 
                      ? "bg-[#4f46e5] text-white shadow-md shadow-indigo-500/30" 
                      : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Members List */}
            <div className="space-y-3">
              {filteredUsers.length === 0 ? (
                <p className="text-center text-gray-400 py-6 text-[13px] font-bold">No members found</p>
              ) : (
                filteredUsers.map((member) => (
                  <motion.div 
                    key={member._id} 
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center justify-between p-4 rounded-[18px] border border-gray-100 bg-white hover:bg-[#fafafa] hover:border-gray-200 hover:shadow-sm transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 text-gray-400 flex items-center justify-center shrink-0 border border-gray-100 shadow-inner">
                        <Users className="w-5 h-5 text-[#4f46e5]" />
                      </div>
                      <div>
                        <div className="font-bold text-[15px] text-[#111827] mb-0.5">{member.name}</div>
                        <div className="text-[12px] text-gray-500 font-medium">
                          <span className="capitalize">{member.role}</span> &middot; {member.school || "No school specified"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <button 
                        onClick={() => handleToggleStatus(member._id, member.status)}
                        disabled={updatingId === member._id}
                        className={`px-4 py-2 rounded-full border border-gray-200 text-[13px] font-bold transition-all duration-300 cursor-pointer ${
                          member.status === "Suspended"
                            ? "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100"
                            : "hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                        }`}
                      >
                        {updatingId === member._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : member.status === "Suspended" ? (
                          "Activate"
                        ) : (
                          "Suspend"
                        )}
                      </button>
                      <div className="flex items-center gap-2 w-[85px] justify-end">
                        <div className={`w-2 h-2 rounded-full ${member.status === "Active" ? "bg-[#10b981]" : "bg-red-500"}`}></div>
                        <span className={`text-[11px] font-black tracking-wider ${member.status === "Active" ? "text-[#10b981]" : "text-red-500"}`}>
                          {member.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
