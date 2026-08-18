import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle2, Clock, Eye } from "lucide-react";
import { API_BASE } from "../../../lib/api";

// ─── Data ────────────────────────────────────────────────────────────────────

type AppStatus = "IN PROGRESS" | "SUBMITTED" | "IN REVIEW" | "DRAFT";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: AppStatus }) {
  switch (status) {
    case "IN PROGRESS":
      return (
        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-[#e04f96] text-white whitespace-nowrap">
          IN PROGRESS
        </span>
      );
    case "SUBMITTED":
      return (
        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-emerald-400 text-emerald-600 bg-emerald-50 whitespace-nowrap">
          SUBMITTED
        </span>
      );
    case "IN REVIEW":
      return (
        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-purple-100 text-purple-600 whitespace-nowrap">
          IN REVIEW
        </span>
      );
    case "DRAFT":
      return (
        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 whitespace-nowrap">
          DRAFT
        </span>
      );
  }
}

function AppIcon({ status }: { status: AppStatus }) {
  if (status === "SUBMITTED") {
    return (
      <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" style={{ width: 18, height: 18 }} />
      </div>
    );
  }
  if (status === "IN REVIEW") {
    return (
      <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0">
        <Eye className="h-4.5 w-4.5 text-purple-400" style={{ width: 18, height: 18 }} />
      </div>
    );
  }
  if (status === "IN PROGRESS") {
    return (
      <div className="w-9 h-9 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center shrink-0">
        <FileText className="h-4.5 w-4.5 text-[#e04f96]" style={{ width: 18, height: 18 }} />
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
      <Clock className="h-4.5 w-4.5 text-gray-400" style={{ width: 18, height: 18 }} />
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function StudentApplicationsView() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setApplications(data.user.appliedOpportunities || []);
      }
    } catch (err) {
      console.error("Failed to load user data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="space-y-5">
      {/* ── Plain header (no card wrapper) ── */}
      <div>
        <h2 className="text-xl font-black text-[#2d1b28]">Applications</h2>
        <p className="text-[12px] text-gray-400 mt-0.5">
          Track every application from draft to{" "}
          <span className="text-[#e04f96] font-semibold">submitted.</span>
        </p>
      </div>

      {/* ── In Progress Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white rounded-3xl border border-pink-100 shadow-sm overflow-hidden"
      >
        {/* Section label */}
        <div className="px-6 py-4 border-b border-pink-50">
          <h3 className="text-[13px] font-bold text-[#2d1b28]">In progress</h3>
        </div>

        {/* Application rows */}
        <div className="divide-y divide-pink-50/60">
          {loading ? (
            <div className="px-6 py-10 text-center text-sm font-medium text-slate-500">Loading...</div>
          ) : applications.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm font-medium text-slate-500">No applications yet. Start exploring opportunities!</div>
          ) : applications.map((app, i) => (
            <motion.div
              key={app._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="flex items-center gap-4 px-6 py-4 hover:bg-pink-50/20 transition-colors cursor-pointer group"
            >
              {/* Icon */}
              <AppIcon status="SUBMITTED" />

              {/* Title + subtitle */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-[#e04f96] group-hover:underline leading-snug truncate">
                  {app.title}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                  Submitted via GOC
                </p>
              </div>

              {/* Progress bar + % */}
              <div className="flex items-center gap-3 w-48 shrink-0">
                <div className="flex-1 h-1.5 bg-pink-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.2 + i * 0.07, duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-emerald-400 rounded-full"
                  />
                </div>
                <span className="text-[10px] font-semibold text-gray-400 whitespace-nowrap">
                  100% complete
                </span>
              </div>

              {/* Status badge */}
              <div className="shrink-0 w-28 flex justify-end">
                <StatusBadge status="SUBMITTED" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
