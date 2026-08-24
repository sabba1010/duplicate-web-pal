import { useState, useEffect } from "react";
import { 
  Eye, 
  X, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Search, 
  ExternalLink, 
  User, 
  GraduationCap, 
  Building2, 
  Calendar, 
  FileText,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "../../../lib/api";

type SubmissionStatus = "Pending" | "Approved" | "Rejected";

export function AdminSubmissionsView() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  
  // Modal state
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusUpdateSuccess, setStatusUpdateSuccess] = useState(false);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/users/submissions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
      }
    } catch (err) {
      console.error("Failed to fetch submissions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleUpdateStatus = async (newStatus: SubmissionStatus) => {
    if (!selectedSubmission) return;
    setUpdatingStatus(true);

    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/users/submissions/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: selectedSubmission.userId,
          opportunityId: selectedSubmission.opportunityId,
          status: newStatus
        })
      });

      if (res.ok) {
        setSelectedSubmission((prev: any) => ({ ...prev, status: newStatus }));
        setSubmissions((prev) =>
          prev.map((s) =>
            s.userId === selectedSubmission.userId && s.opportunityId === selectedSubmission.opportunityId
              ? { ...s, status: newStatus }
              : s
          )
        );
        setStatusUpdateSuccess(true);
        setTimeout(() => setStatusUpdateSuccess(false), 2000);
      } else {
        alert("Failed to update submission status");
      }
    } catch (err) {
      alert("Error updating status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      (sub.user?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sub.opportunity?.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sub.user?.email || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ? true : (sub.status || "Pending") === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-8">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e5e7eb] pb-5">
        <div>
          <h1 className="text-[24px] font-black text-[#111827] tracking-tight">Application Submissions</h1>
          <p className="text-[13px] text-[#6b7280] font-semibold mt-[2px]">
            Review student applications, verify credentials, and manage approval status.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search student or opportunity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#e5e7eb] text-[13px] text-[#111827] font-semibold rounded-xl py-2 pl-9 pr-4 outline-none focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/10 transition-all shadow-sm"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#9ca3af]" />
          </div>
        </div>
      </div>

      {/* ── Status Filter Chips ── */}
      <div className="flex items-center gap-2">
        {["All", "Pending", "Approved", "Rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all border ${
              statusFilter === status
                ? "bg-[#4f46e5] text-white border-[#4f46e5] shadow-sm"
                : "bg-white text-[#6b7280] border-[#e5e7eb] hover:border-[#4f46e5]"
            }`}
          >
            {status === "All" && `All Submissions (${submissions.length})`}
            {status === "Pending" && `Pending (${submissions.filter(s => (s.status || "Pending") === "Pending").length})`}
            {status === "Approved" && `Approved (${submissions.filter(s => s.status === "Approved").length})`}
            {status === "Rejected" && `Rejected (${submissions.filter(s => s.status === "Rejected").length})`}
          </button>
        ))}
      </div>

      {/* ── Submissions Table ── */}
      <div className="bg-white rounded-[16px] border border-[#e5e7eb] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] whitespace-nowrap">
            <thead className="bg-[#f9fafb] border-b border-[#e5e7eb] text-[#6b7280] font-extrabold text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Opportunity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Applied Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-[#6b7280] font-bold">Loading submissions...</td>
                </tr>
              ) : filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-[#6b7280] font-bold">No submissions found matching filter.</td>
                </tr>
              ) : (
                filteredSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#f9fafb] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#eef2ff] border border-[#e0e7ff] text-[#4f46e5] flex items-center justify-center font-extrabold text-xs shrink-0 uppercase">
                          {sub.user?.name ? sub.user.name[0] : "S"}
                        </div>
                        <div>
                          <div className="font-bold text-[#111827]">{sub.user?.name}</div>
                          <div className="text-[11px] text-[#6b7280] font-medium">{sub.user?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#111827]">{sub.opportunity?.title}</div>
                      <div className="text-[11px] text-[#6b7280] font-medium">
                        {sub.opportunity?.category} {sub.opportunity?.organization ? `· ${sub.opportunity.organization}` : ""}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {sub.status === "Approved" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="h-3 w-3" /> Approved
                        </span>
                      ) : sub.status === "Rejected" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-rose-50 text-rose-700 border border-rose-200">
                          <XCircle className="h-3 w-3" /> Rejected
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="h-3 w-3" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-[#6b7280] font-medium">
                      {new Date(sub.appliedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedSubmission(sub)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-extrabold text-[#4f46e5] bg-[#eef2ff] hover:bg-[#e0e7ff] rounded-xl transition-colors cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" /> View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── DETAILED REVIEW MODAL ── */}
      <AnimatePresence>
        {selectedSubmission && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSubmission(null)}
              className="fixed inset-0 z-40 bg-[#111827]/50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 flex items-center justify-between p-6 border-b border-[#e5e7eb]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-[#4f46e5] bg-[#eef2ff] px-2.5 py-0.5 rounded-full">
                      Application Audit
                    </span>
                    {statusUpdateSuccess && (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Status Updated!
                      </span>
                    )}
                  </div>
                  <h3 className="text-[20px] font-black text-[#111827] mt-1">Review Submission</h3>
                </div>
                <button 
                  onClick={() => setSelectedSubmission(null)}
                  className="p-2 text-[#6b7280] hover:bg-[#f3f4f6] rounded-full transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Modal Body: 4 Sections */}
              <div className="p-6 space-y-6">

                {/* SECTION 1: SUBMITTER INFORMATION */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-[#4f46e5] flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" /> Submitter Information
                  </h4>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#4f46e5] text-white flex items-center justify-center font-black text-lg uppercase shrink-0">
                      {selectedSubmission.user?.name ? selectedSubmission.user.name[0] : "S"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-black text-[#111827]">{selectedSubmission.user?.name}</div>
                      <div className="text-xs font-bold text-[#6b7280]">{selectedSubmission.user?.email}</div>
                      {selectedSubmission.user?.school && (
                        <div className="text-xs font-semibold text-slate-500 mt-0.5 flex items-center gap-1">
                          <GraduationCap className="h-3.5 w-3.5 text-slate-400" /> {selectedSubmission.user.school}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Certificates / Extra details if present */}
                  {selectedSubmission.user?.certificates?.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/60">
                      <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Certificates</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedSubmission.user.certificates.map((c: any, idx: number) => (
                          <a key={idx} href={c.url || "#"} target="_blank" rel="noreferrer" className="text-xs font-bold text-[#4f46e5] bg-white border border-slate-200 px-2.5 py-1 rounded-lg hover:underline flex items-center gap-1">
                            {c.title} <ExternalLink className="h-3 w-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* SECTION 2: OPPORTUNITY INFORMATION */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-[#4f46e5] flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" /> Opportunity Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 font-bold block">Opportunity Title</span>
                      <span className="font-extrabold text-[#111827] text-sm">{selectedSubmission.opportunity?.title}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold block">Category / Type</span>
                      <span className="font-extrabold text-[#4f46e5]">{selectedSubmission.opportunity?.category}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold block">Organization</span>
                      <span className="font-bold text-[#111827]">{selectedSubmission.opportunity?.organization || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold block">Deadline</span>
                      <span className="font-bold text-[#111827] flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" /> {selectedSubmission.opportunity?.deadline}
                      </span>
                    </div>
                  </div>
                </div>

                {/* SECTION 3: SUBMISSION INFORMATION */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-[#4f46e5] flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" /> Submission Details
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 font-bold block">Submitted Date</span>
                      <span className="font-bold text-[#111827]">
                        {new Date(selectedSubmission.appliedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold block">Current Status</span>
                      {selectedSubmission.status === "Approved" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" /> Approved
                        </span>
                      ) : selectedSubmission.status === "Rejected" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-rose-100 text-rose-700">
                          <XCircle className="h-3 w-3" /> Rejected
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-100 text-amber-700">
                          <Clock className="h-3 w-3" /> Pending
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Student Application Notes / Statement */}
                  <div className="pt-2">
                    <span className="text-slate-400 font-bold text-xs block mb-1">Student Notes / Statement</span>
                    <div className="p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-medium min-h-[50px]">
                      {selectedSubmission.note ? selectedSubmission.note : <span className="text-slate-400 italic">No notes provided by student.</span>}
                    </div>
                  </div>
                </div>

                {/* SECTION 4: ADMIN ACTION CONTROLS */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-300">Admin Action & Status Update</span>
                    <span className="text-[10px] font-bold text-slate-400">Click button to review & set status</span>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      onClick={() => handleUpdateStatus("Approved")}
                      disabled={updatingStatus}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        selectedSubmission.status === "Approved"
                          ? "bg-emerald-500 text-white shadow-md ring-2 ring-emerald-300"
                          : "bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600 hover:text-white border border-emerald-500/40"
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" /> Approve
                    </button>

                    <button
                      onClick={() => handleUpdateStatus("Rejected")}
                      disabled={updatingStatus}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        selectedSubmission.status === "Rejected"
                          ? "bg-rose-500 text-white shadow-md ring-2 ring-rose-300"
                          : "bg-rose-600/30 text-rose-300 hover:bg-rose-600 hover:text-white border border-rose-500/40"
                      }`}
                    >
                      <XCircle className="h-4 w-4" /> Reject
                    </button>

                    <button
                      onClick={() => handleUpdateStatus("Pending")}
                      disabled={updatingStatus}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        selectedSubmission.status === "Pending"
                          ? "bg-amber-500 text-white shadow-md ring-2 ring-amber-300"
                          : "bg-amber-600/30 text-amber-300 hover:bg-amber-600 hover:text-white border border-amber-500/40"
                      }`}
                    >
                      <Clock className="h-4 w-4" /> Mark as Pending
                    </button>
                  </div>
                </div>

              </div>
              
              {/* Modal Footer */}
              <div className="p-5 border-t border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-end rounded-b-[24px]">
                <button 
                  onClick={() => setSelectedSubmission(null)}
                  className="px-6 py-2.5 text-xs font-black text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Close Audit View
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
