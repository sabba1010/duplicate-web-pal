import { motion } from "framer-motion";
import { STUDENT_METRICS, RECOMMENDED_OPPORTUNITIES, CALENDAR_EVENTS } from "@/lib/mock-data";
import { Heart, FileText, Clock, Sparkles, AlertCircle, ArrowRight, BookmarkPlus } from "lucide-react";
import { TabType } from "../StudentSidebar";

interface StudentHomeViewProps {
  onNavigate: (tab: TabType) => void;
}

export function StudentHomeView({ onNavigate }: StudentHomeViewProps) {
  const stats = [
    { label: "Total Saved", value: STUDENT_METRICS.totalSaved, icon: Heart, color: "text-rose-500", bg: "bg-rose-50" },
    { label: "Applied", value: STUDENT_METRICS.applied, icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Closing Soon", value: STUDENT_METRICS.closingSoon, icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "New This Week", value: STUDENT_METRICS.newThisWeek, icon: Sparkles, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Action Needed", value: STUDENT_METRICS.actionNeeded, icon: AlertCircle, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md hover:border-slate-300 transition-all group"
            >
              <div className={`p-2.5 ${stat.bg} rounded-xl mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <h4 className="text-2xl font-black text-slate-800">{stat.value}</h4>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recommended */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Recommended for You</h3>
                <p className="text-sm text-slate-500">Based on your Computer Science major.</p>
              </div>
              <button 
                onClick={() => onNavigate("Opportunities")}
                className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                View all <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RECOMMENDED_OPPORTUNITIES.slice(0, 2).map((opp) => (
                <div key={opp.id} className="group border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all bg-white">
                  <div className="h-32 overflow-hidden relative">
                    <img src={opp.image} alt={opp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-600 hover:text-rose-500 hover:bg-white transition-colors">
                      <BookmarkPlus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                        {opp.type}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">Due {opp.deadline}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 line-clamp-1">{opp.title}</h4>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-1">{opp.organization}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Deadlines & Activity */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">Upcoming Deadlines</h3>
              <button 
                onClick={() => onNavigate("Calendar")}
                className="text-slate-400 hover:text-teal-600 transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              {CALENDAR_EVENTS.filter(e => e.type === "Deadline" || e.type === "Reminder").map((event) => (
                <div key={event.id} className="flex gap-3">
                  <div className="w-12 h-12 shrink-0 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">Jul</span>
                    <span className="text-lg font-black text-slate-700 leading-none mt-1">{event.date.split('-')[2]}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{event.title}</h4>
                    <p className="text-xs font-medium text-amber-600 mt-0.5">{event.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
