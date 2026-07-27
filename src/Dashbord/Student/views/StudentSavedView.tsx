import { useState, useEffect } from "react";
import { Search, Filter, ExternalLink, Calendar, Trash2 } from "lucide-react";

export function StudentSavedView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [savedOpportunities, setSavedOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch("http://localhost:5000/api/users/me", {
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
      const res = await fetch(`http://localhost:5000/api/users/save-opportunity/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchUser();
      }
    } catch (error) {
      console.error("Failed to remove saved opportunity", error);
    }
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
                    <button className="p-1.5 text-slate-400 hover:text-[#e04f96] rounded bg-white border border-slate-200 shadow-sm transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleUnsave(item._id)} className="p-1.5 text-slate-400 hover:text-rose-600 rounded bg-white border border-slate-200 shadow-sm transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
