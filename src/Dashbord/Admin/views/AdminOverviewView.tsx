import { ADMIN_METRICS, ADMIN_PENDING_REVIEWS } from "@/lib/mock-admin-data";
import { Users, FileText, CheckCircle, AlertCircle, Activity, ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

export function AdminOverviewView() {
  const metrics = [
    { label: "Total Students", value: ADMIN_METRICS.totalStudents.toLocaleString(), icon: Users, color: "text-blue-600", bg: "bg-blue-50", trend: `+${ADMIN_METRICS.growth.students}%` },
    { label: "Active Mentors", value: ADMIN_METRICS.activeMentors.toLocaleString(), icon: Users, color: "text-purple-600", bg: "bg-purple-50", trend: `+${ADMIN_METRICS.growth.mentors}%` },
    { label: "Active Opps", value: ADMIN_METRICS.activeOpportunities.toLocaleString(), icon: FileText, color: "text-indigo-600", bg: "bg-indigo-50", trend: "+12" },
    { label: "System Health", value: `${ADMIN_METRICS.systemHealth}%`, icon: Activity, color: "text-emerald-600", bg: "bg-emerald-50", trend: "Stable" },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${m.bg} group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-5 w-5 ${m.color}`} />
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  {m.trend}
                </span>
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-900">{m.value}</h4>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">{m.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Pending Reviews */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 className="font-bold text-slate-900">Pending Actions</h3>
              <p className="text-xs text-slate-500 mt-1">Requires admin approval or verification.</p>
            </div>
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-200">
              {ADMIN_PENDING_REVIEWS.length} items
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            <div className="divide-y divide-slate-100">
              {ADMIN_PENDING_REVIEWS.map(review => (
                <div key={review.id} className="p-4 flex items-center justify-between hover:bg-slate-50 rounded-2xl transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {review.status === "Pending" ? (
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{review.title}</h4>
                      <p className="text-xs font-medium text-slate-500 mt-0.5 mb-2">{review.subtitle}</p>
                      <div className="flex gap-2">
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider">{review.type}</span>
                        <span className="text-[10px] font-medium text-slate-400">{review.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                      Review
                    </button>
                    <button className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors">
                      Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Activity (Mock Chart Placeholder) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 className="font-bold text-slate-900">Platform Activity</h3>
              <p className="text-xs text-slate-500 mt-1">Application submissions this week.</p>
            </div>
            <button className="p-2 hover:bg-slate-200 rounded-xl transition-colors">
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </button>
          </div>
          
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
            {/* Visual placeholder for a chart */}
            <div className="w-full h-full max-h-64 flex items-end justify-between gap-2 opacity-80 px-4">
              {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                <div key={i} className="w-full bg-indigo-100 rounded-t-xl relative group" style={{ height: `${h}%` }}>
                  <div className="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-t-xl transition-all duration-500 opacity-0 group-hover:opacity-100" style={{ height: '100%' }}></div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
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
