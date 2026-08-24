import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, CheckCircle2, Clock, XCircle, ChevronRight, Eye, Calendar, Sparkles } from "lucide-react";
import { API_BASE } from "../../../lib/api";

type AppStatus = "Pending" | "Approved" | "Rejected" | "SUBMITTED";

function StatusBadge({ status }: { status: string }) {
  if (status === "Approved") {
    return (
      <span className="text-[10px] font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-1.5 whitespace-nowrap">
        <CheckCircle2 className="h-3 w-3" /> Approved
      </span>
    );
  }
  if (status === "Rejected") {
    return (
      <span className="text-[10px] font-black px-3 py-1 rounded-full bg-rose-100 text-rose-700 border border-rose-200 flex items-center gap-1.5 whitespace-nowrap">
        <XCircle className="h-3 w-3" /> Declined
      </span>
    );
  }
  return (
    <span className="text-[10px] font-black px-3 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200 flex items-center gap-1.5 whitespace-nowrap">
      <Clock className="h-3 w-3" /> In Review / Pending
    </span>
  );
}

function StatusIcon({ status }: { status: string }) {
  if (status === "Approved") {
    return (
      <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-600 shadow-xs">
        <CheckCircle2 className="h-5 w-5" />
      </div>
    );
  }
  if (status === "Rejected") {
    return (
      <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0 text-rose-600 shadow-xs">
        <XCircle className="h-5 w-5" />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-amber-600 shadow-xs">
      <Clock className="h-5 w-5" />
    </div>
  );
}

export function StudentApplicationsView() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<any>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        const user = data.user;

        let formattedApps: any[] = [];
        const processedOppIds = new Set<string>();

        if (user.applications && user.applications.length > 0) {
          user.applications.forEach((app: any) => {
            if (app.opportunity) {
              const oppId = (app.opportunity._id || app.opportunity).toString();
              processedOppIds.add(oppId);
              formattedApps.push({
                id: app._id || oppId,
                opportunity: app.opportunity,
                status: app.status || "Pending",
                note: app.note || "",
                appliedAt: app.appliedAt || user.updatedAt
              });
            }
          });
        }

        if (user.appliedOpportunities && user.appliedOpportunities.length > 0) {
          user.appliedOpportunities.forEach((opp: any) => {
            if (opp && opp._id && !processedOppIds.has(opp._id.toString())) {
              formattedApps.push({
                id: opp._id,
                opportunity: opp,
                status: "Pending",
                note: "",
                appliedAt: user.updatedAt
              });
            }
          });
        }

        setApplications(formattedApps);
      }
    } catch (err) {
      console.error("Failed to load applications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();

    // Listen for live updates when student submits application elsewhere
    const handleUpdate = () => fetchApplications();
    window.addEventListener("goc_user_updated", handleUpdate);
    return () => window.removeEventListener("goc_user_updated", handleUpdate);
  }, []);

  return (
    <div className="space-y-6 pb-8">
      {/* ── Page Header ── */}
      <div>
        <h1 className="text-[24px] font-black text-[#2a2026] tracking-tight">Application Tracker</h1>
        <p className="text-[13px] text-[#8b7e85] font-semibold mt-[2px]">
          Track the live review status of all your submitted scholarship and internship applications.
        </p>
      </div>

      {/* ── Applications Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white rounded-3xl border border-[#f1e4e9] shadow-sm overflow-hidden"
      >
        {/* Section label */}
        <div className="px-6 py-4 border-b border-[#f1e4e9] flex items-center justify-between">
          <h3 className="text-[14px] font-black text-[#2a2026]">
            Submitted Applications ({applications.length})
          </h3>
          <span className="text-[11px] font-extrabold text-[#f14f98] bg-[#fff7fa] px-3 py-1 rounded-full border border-[#f1e4e9]">
            Live Sync
          </span>
        </div>

        {/* Application rows */}
        <div className="divide-y divide-[#f9f0f5]">
          {loading ? (
            <div className="px-6 py-12 text-center text-sm font-semibold text-[#8b7e85]">
              Loading your applications...
            </div>
          ) : applications.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm font-semibold text-[#8b7e85]">
              No applications submitted yet. Browse opportunities to apply!
            </div>
          ) : (
            applications.map((app, i) => {
              const opp = app.opportunity;
              const status = app.status || "Pending";

              return (
                <motion.div
                  key={app.id || i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                  onClick={() => setSelectedApp(app)}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-4.5 hover:bg-[#fff7fa] transition-colors cursor-pointer group"
                >
                  {/* Status Icon */}
                  <StatusIcon status={status} />

                  {/* Title + Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#f14f98]">
                        {opp.category || "Opportunity"}
                      </span>
                      {opp.organization && (
                        <span className="text-[10px] font-bold text-slate-500">
                          · {opp.organization}
                        </span>
                      )}
                    </div>
                    <p className="text-[14px] font-black text-[#2a2026] group-hover:text-[#f14f98] transition-colors leading-snug truncate mt-0.5">
                      {opp.title}
                    </p>
                    <p className="text-[11px] text-[#8b7e85] font-semibold mt-0.5">
                      Submitted on {new Date(app.appliedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>

                  {/* Review Progress Bar */}
                  <div className="flex items-center gap-3 w-full sm:w-48 shrink-0">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ 
                          width: status === "Approved" ? "100%" : status === "Rejected" ? "100%" : "50%" 
                        }}
                        transition={{ delay: 0.2 + i * 0.05, duration: 0.6, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          status === "Approved" ? "bg-emerald-500" :
                          status === "Rejected" ? "bg-rose-500" : "bg-amber-500"
                        }`}
                      />
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-500 whitespace-nowrap">
                      {status === "Approved" ? "100% Approved" : status === "Rejected" ? "Declined" : "50% In Review"}
                    </span>
                  </div>

                  {/* Status badge */}
                  <div className="shrink-0 flex items-center justify-between sm:justify-end gap-2 w-full sm:w-36">
                    <StatusBadge status={status} />
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#f14f98] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>

      {/* ── APPLICATION DETAILS MODAL FOR STUDENT ── */}
      <AnimatePresence>
        {selectedApp && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedApp(null)}
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 space-y-5 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase text-[#f14f98] bg-[#fff7fa] px-2.5 py-0.5 rounded-full border border-[#f1e4e9]">
                    {selectedApp.opportunity?.category} Status
                  </span>
                  <h3 className="text-base font-black text-[#2a2026] mt-1">{selectedApp.opportunity?.title}</h3>
                </div>
                <button onClick={() => setSelectedApp(null)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                  ✕
                </button>
              </div>

              {/* Status Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-500">Current Review Status</span>
                  <StatusBadge status={selectedApp.status} />
                </div>

                <div className="text-xs font-semibold text-slate-700 pt-1">
                  {selectedApp.status === "Approved" && (
                    <p className="text-emerald-700 font-bold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                      🎉 Congratulations! Your application has been reviewed and approved by the Girls On Campus admin team.
                    </p>
                  )}
                  {selectedApp.status === "Rejected" && (
                    <p className="text-rose-700 font-bold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                      Thank you for applying. Unfortunately, your application was not selected for this cohort.
                    </p>
                  )}
                  {(selectedApp.status === "Pending" || !selectedApp.status) && (
                    <p className="text-amber-800 font-bold bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                      ⏳ Your application is currently under active review by our admin team. Check back soon for updates!
                    </p>
                  )}
                </div>
              </div>

              {/* Submitted Details */}
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[#8b7e85] font-bold block">Applied Date</span>
                    <span className="font-extrabold text-[#2a2026]">
                      {new Date(selectedApp.appliedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#8b7e85] font-bold block">Opportunity Deadline</span>
                    <span className="font-extrabold text-[#2a2026]">
                      {selectedApp.opportunity?.deadline || "N/A"}
                    </span>
                  </div>
                </div>

                {selectedApp.note && (
                  <div>
                    <span className="text-[#8b7e85] font-bold block mb-1">Your Submitted Statement / Notes</span>
                    <div className="p-3 bg-[#fff7fa] border border-[#f1e4e9] rounded-xl text-[#2a2026] font-semibold">
                      {selectedApp.note}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-100">
                <button 
                  onClick={() => setSelectedApp(null)}
                  className="px-5 py-2 rounded-2xl text-xs font-black text-white bg-[#2a2026] hover:bg-black transition-colors"
                >
                  Close Tracker
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
