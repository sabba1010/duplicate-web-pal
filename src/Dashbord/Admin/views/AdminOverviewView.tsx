import { useState } from "react";
import { ADMIN_METRICS, ADMIN_PENDING_REVIEWS, ADMIN_ANALYTICS_DATA, ADMIN_MEMBERS } from "@/lib/mock-admin-data";
import { Users, FileText, Activity, AlertTriangle, Bell, LogOut, Search, ExternalLink } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { motion } from "framer-motion";

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

export function AdminOverviewView() {
  const [activeTab, setActiveTab] = useState("All");

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
          <button className="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 p-2.5 rounded-full">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Metrics Row */}
      <motion.div variants={containerVars} className="grid grid-cols-1 md:grid-cols-4 gap-5">
        
        {/* Total Students */}
        <motion.div variants={itemVars} whileHover={{ y: -4 }} className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-default">
          <div className="flex justify-between items-start mb-4">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#eef2ff] to-[#e0e7ff] text-[#4f46e5] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <span className="bg-[#ecfdf5] text-[#059669] text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
              +{ADMIN_METRICS.growth.students}%
            </span>
          </div>
          <div>
            <div className="text-[32px] font-black text-[#111827] leading-none mb-1.5 tracking-tight">
              {ADMIN_METRICS.totalStudents.toLocaleString()}
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
              +{ADMIN_METRICS.growth.mentors}%
            </span>
          </div>
          <div>
            <div className="text-[32px] font-black text-[#111827] leading-none mb-1.5 tracking-tight">
              {ADMIN_METRICS.activeMentors.toLocaleString()}
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
              +12
            </span>
          </div>
          <div>
            <div className="text-[32px] font-black text-[#111827] leading-none mb-1.5 tracking-tight">
              {ADMIN_METRICS.activeOpportunities}
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
              {ADMIN_METRICS.systemHealth}%
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
              <h2 className="text-xl font-black text-[#111827] tracking-tight">Pending Actions</h2>
              <p className="text-[13px] text-gray-500 mt-1 font-medium">Requires admin approval or verification.</p>
            </div>
            <span className="bg-[#fffbeb] text-[#d97706] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              3 items
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {ADMIN_PENDING_REVIEWS.map((review, i) => (
              <motion.div 
                key={review.id} 
                whileHover={{ x: 4 }}
                className={`flex justify-between items-center group ${i !== ADMIN_PENDING_REVIEWS.length -1 ? "pb-4 border-b border-gray-50" : ""}`}
              >
                <div className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-full bg-[#fffbeb] text-[#d97706] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#111827] mb-1">{review.title}</h3>
                    <p className="text-[12px] text-gray-500 mb-2 font-medium">{review.subtitle}</p>
                    <div className="flex items-center gap-2">
                      <span className="bg-gray-100 text-gray-600 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        {review.type}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">{review.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button className="px-4 py-2 rounded-full border border-gray-200 text-[#4f46e5] text-[13px] font-bold hover:bg-[#eef2ff] hover:border-[#4f46e5] transition-all duration-300">
                    Review
                  </button>
                  <button className="px-4 py-2 rounded-full bg-[#4f46e5] text-white text-[13px] font-bold hover:bg-[#4338ca] hover:shadow-md hover:shadow-indigo-500/20 transition-all duration-300">
                    Approve
                  </button>
                </div>
              </motion.div>
            ))}
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
              <BarChart data={ADMIN_ANALYTICS_DATA} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
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
              placeholder="Search members..." 
              className="w-full md:w-[280px] pl-5 pr-10 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-[#4f46e5] focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 placeholder:text-gray-400 bg-gray-50/50 hover:bg-white"
            />
            <Search className="w-4 h-4 text-gray-400 group-focus-within:text-[#4f46e5] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2.5 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {["All", "Students", "Mentors", "Organizations"].map(tab => (
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
          {ADMIN_MEMBERS.map((member) => (
            <motion.div 
              key={member.id} 
              whileHover={{ scale: 1.01 }}
              className="flex items-center justify-between p-4 rounded-[18px] border border-gray-100 bg-white hover:bg-[#fafafa] hover:border-gray-200 hover:shadow-sm transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 text-gray-400 flex items-center justify-center shrink-0 border border-gray-100 shadow-inner">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[15px] text-[#111827] mb-0.5">{member.name}</div>
                  <div className="text-[12px] text-gray-500 font-medium">{member.role} &middot; {member.schoolOrOrg}</div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <button className="px-4 py-2 rounded-full border border-gray-200 text-[#4b5563] text-[13px] font-bold hover:bg-gray-100 hover:text-[#111827] transition-colors">
                  Suspend
                </button>
                <div className="flex items-center gap-2 w-[70px] justify-end">
                  <div className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                  <span className="text-[11px] font-black text-[#10b981] tracking-wider">
                    {member.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </motion.div>
  );
}
