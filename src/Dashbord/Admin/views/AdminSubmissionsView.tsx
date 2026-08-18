import { useState, useEffect } from "react";
import { Eye, X, CheckCircle2, Clock, Search, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "../../../lib/api";

export function AdminSubmissionsView() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal state
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

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

  const filteredSubmissions = submissions.filter(
    (sub) =>
      sub.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.opportunity?.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-8">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e5e7eb] pb-5">
        <div>
          <h1 className="text-[24px] font-black text-[#111827] tracking-tight">Submissions</h1>
          <p className="text-[13px] text-[#6b7280] font-semibold mt-[2px]">Manage user submissions and requests.</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search by student or opp..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#e5e7eb] text-[13px] text-[#111827] font-semibold rounded-xl py-2 pl-9 pr-4 outline-none focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/10 transition-all shadow-sm"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#9ca3af]" />
        </div>
      </div>

      {/* ── Submissions Table ── */}
      <div className="bg-white rounded-[14px] border border-[#e5e7eb] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#f9fafb] border-b border-[#e5e7eb] text-[#6b7280] font-bold">
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
                  <td colSpan={5} className="py-10 text-center text-[#6b7280] font-bold">Loading...</td>
                </tr>
              ) : filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-[#6b7280] font-bold">No submissions found.</td>
                </tr>
              ) : (
                filteredSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#f9fafb] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#4f46e5] flex items-center justify-center text-white text-[12px] font-bold uppercase shrink-0">
                          {sub.user?.name ? sub.user.name[0] : "S"}
                        </div>
                        <div>
                          <div className="font-bold text-[#111827]">{sub.user?.name}</div>
                          <div className="text-[11px] text-[#6b7280] font-semibold">{sub.user?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#111827]">{sub.opportunity?.title}</div>
                      <div className="text-[11px] text-[#6b7280] font-semibold">{sub.opportunity?.category}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-amber-50 text-amber-600 border border-amber-200">
                        <Clock className="h-3 w-3" /> {sub.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#6b7280] font-semibold">
                      {new Date(sub.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedSubmission(sub)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-[12px] font-bold text-[#4f46e5] bg-[#eef2ff] hover:bg-[#e0e7ff] rounded-lg transition-colors"
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

      {/* ── Student Details Modal ── */}
      <AnimatePresence>
        {selectedSubmission && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSubmission(null)}
              className="fixed inset-0 z-40 bg-[#111827]/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-[24px] shadow-2xl"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 flex items-center justify-between p-6 border-b border-[#e5e7eb]">
                <div>
                  <h3 className="text-[20px] font-black text-[#111827]">Application Details</h3>
                  <p className="text-[13px] text-[#6b7280] font-semibold mt-1">
                    Reviewing submission for <span className="text-[#4f46e5]">{selectedSubmission.opportunity?.title}</span>
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedSubmission(null)}
                  className="p-2 text-[#6b7280] hover:bg-[#f3f4f6] rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Modal Body */}
              <div className="p-8 space-y-8">
                
                {/* 1. Basic Info */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#9ca3af] mb-4">Student Profile</h4>
                  <div className="flex items-center gap-4 bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-5">
                    <div className="w-14 h-14 rounded-full bg-[#4f46e5] flex items-center justify-center text-white text-[24px] font-black uppercase shrink-0">
                      {selectedSubmission.user?.name ? selectedSubmission.user.name[0] : "S"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[18px] font-black text-[#111827] truncate">{selectedSubmission.user?.name}</div>
                      <div className="text-[13px] font-semibold text-[#6b7280] truncate">{selectedSubmission.user?.email}</div>
                    </div>
                    {selectedSubmission.user?.school && (
                      <div className="text-right shrink-0">
                        <div className="text-[11px] font-bold uppercase text-[#9ca3af] mb-1">School / College</div>
                        <div className="text-[13px] font-bold text-[#111827]">{selectedSubmission.user.school}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Certificates */}
                {selectedSubmission.user?.certificates?.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#9ca3af] mb-4">Certificates</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedSubmission.user.certificates.map((cert: any, idx: number) => (
                        <a 
                          key={idx}
                          href={cert.url || "#"} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center justify-between p-4 rounded-xl border border-[#e5e7eb] hover:border-[#4f46e5] hover:bg-[#eef2ff] transition-all group"
                        >
                          <span className="text-[13px] font-bold text-[#111827] truncate pr-2">{cert.title || "Untitled Certificate"}</span>
                          <ExternalLink className="h-4 w-4 text-[#9ca3af] group-hover:text-[#4f46e5] shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Custom Fields (Extra Details) */}
                {selectedSubmission.user?.customFields?.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#9ca3af] mb-4">Extra Details</h4>
                    <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden divide-y divide-[#e5e7eb]">
                      {selectedSubmission.user.customFields.map((field: any, idx: number) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-2">
                          <span className="text-[13px] font-bold text-[#6b7280] w-1/3">{field.label}</span>
                          <span className="text-[13px] font-bold text-[#111827] flex-1 text-right sm:text-left break-all">
                            {field.value?.startsWith("http") ? (
                              <a href={field.value} target="_blank" rel="noreferrer" className="text-[#4f46e5] hover:underline inline-flex items-center gap-1">
                                {field.value} <ExternalLink className="h-3 w-3" />
                              </a>
                            ) : (
                              field.value
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
              
              {/* Modal Footer */}
              <div className="p-6 border-t border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-end gap-3 rounded-b-[24px]">
                <button 
                  onClick={() => setSelectedSubmission(null)}
                  className="px-5 py-2.5 text-[13px] font-bold text-[#6b7280] hover:text-[#111827] hover:bg-[#e5e7eb] rounded-xl transition-colors"
                >
                  Close
                </button>
                <button className="px-5 py-2.5 text-[13px] font-bold text-white bg-[#4f46e5] hover:bg-[#4338ca] shadow-sm rounded-xl transition-colors">
                  Contact Student
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
