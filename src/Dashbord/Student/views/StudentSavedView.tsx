import { useState, useEffect } from "react";
import { Search, Filter, ExternalLink, Calendar, Trash2, Check, Share2, X, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "../../../lib/api";

export function StudentSavedView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [savedOpportunities, setSavedOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSavedOpportunities(data.user.savedOpportunities || []);
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

  const handleUnsave = async (id: string) => {
    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/users/save-opportunity/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        window.dispatchEvent(new Event("goc_user_updated"));
        fetchUser();
      }
    } catch (error) {
      console.error("Failed to remove saved opportunity", error);
    }
  };

  const handleShareClick = (id: string) => {
    setShareLink(`${window.location.origin}/opportunity/${id}`);
    setShowShareModal(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Saved": return "bg-slate-100 text-slate-700";
      case "Planning": return "bg-amber-100 text-amber-700";
      case "In Progress": return "bg-blue-100 text-blue-700";
      case "Submitted": return "bg-emerald-100 text-emerald-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-pink-100 shadow-sm h-full flex flex-col overflow-hidden">
      <div className="p-6 border-b border-slate-100 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Saved Opportunities</h2>
            <p className="text-sm text-slate-500 mt-1">Manage and track your saved scholarships and internships.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search saved..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-sm text-gray-700 rounded-full py-2 pl-9 pr-4 outline-none focus:border-[#e04f96] focus:ring-2 focus:ring-pink-500/20"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>
            <button className="p-2.5 rounded-xl border border-pink-200 text-[#e04f96] hover:bg-pink-50 transition-colors">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-100 sticky top-0 z-10 text-slate-500 font-semibold text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Opportunity</th>
              <th className="px-6 py-4">Deadline</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Reminder</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={5} className="py-10 text-center text-slate-500 font-bold">Loading...</td></tr>
            ) : savedOpportunities.length === 0 ? (
              <tr><td colSpan={5} className="py-10 text-center text-slate-500 font-bold">No saved opportunities yet.</td></tr>
            ) : savedOpportunities.map((item) => (
              <tr key={item._id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3 max-w-[300px]">
                    <img src={item.image || "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=300"} alt="" className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0" />
                    <div className="truncate">
                      <div className="font-bold text-slate-900 truncate">{item.title}</div>
                      <div className="text-xs text-slate-500 truncate">{item.organization || item.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                  <span className="font-medium">{item.deadline}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${getStatusColor("Saved")}`}>
                    Saved
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                  <span className="text-slate-400 text-xs italic">Not set</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleShareClick(item._id)}
                      className="p-1.5 text-slate-400 hover:text-[#e04f96] rounded bg-white border border-slate-200 shadow-sm transition-colors"
                      title="Share link"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleUnsave(item._id)} className="p-1.5 text-slate-400 hover:text-rose-600 rounded bg-white border border-slate-200 shadow-sm transition-colors" title="Remove">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareModal(false)}
              className="fixed inset-0 z-40 bg-[#111827]/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white rounded-[24px] shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#e5e7eb]">
                <h3 className="text-[18px] font-black text-[#111827]">Share Opportunity</h3>
                <button 
                  onClick={() => setShowShareModal(false)}
                  className="p-2 text-[#6b7280] hover:bg-[#f3f4f6] rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <p className="text-[14px] text-[#4b5563] font-medium mb-4">
                  Copy the link below to share this opportunity with your friends or network.
                </p>
                <div className="flex items-center gap-3">
                  <input 
                    type="text" 
                    readOnly 
                    value={shareLink} 
                    className="flex-1 bg-[#f9fafb] border border-[#e5e7eb] text-[#111827] text-[13px] rounded-xl px-4 py-3 outline-none focus:border-[#cf3478]"
                  />
                  <button 
                    onClick={handleCopyLink}
                    className={`flex items-center justify-center h-[46px] w-[46px] rounded-xl text-white transition-all ${
                      copied ? "bg-[#39b86b]" : "bg-[#cf3478] hover:bg-[#b82d69]"
                    }`}
                  >
                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
