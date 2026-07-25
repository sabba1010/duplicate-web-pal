import { useState } from "react";
import { SAVED_ITEMS } from "@/lib/mock-data";
import { Search, Filter, MoreHorizontal, ExternalLink, Calendar, Trash2 } from "lucide-react";

export function StudentSavedView() {
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col overflow-hidden">
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
                className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-700 rounded-xl py-2 pl-9 pr-4 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>
            <button className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
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
            {SAVED_ITEMS.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3 max-w-[300px]">
                    <img src={item.opportunity.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0" />
                    <div className="truncate">
                      <div className="font-bold text-slate-900 truncate">{item.opportunity.title}</div>
                      <div className="text-xs text-slate-500 truncate">{item.opportunity.organization}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <span className="font-medium">{item.opportunity.deadline}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {item.reminder ? (
                    <div className="flex items-center gap-1.5 text-amber-600 text-xs font-semibold">
                      <Calendar className="h-3.5 w-3.5" />
                      {item.reminder}
                    </div>
                  ) : (
                    <span className="text-slate-400 text-xs italic">Not set</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-teal-600 rounded bg-white border border-slate-200 shadow-sm transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-rose-600 rounded bg-white border border-slate-200 shadow-sm transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-900 rounded bg-white border border-slate-200 shadow-sm transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
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
