import { useState } from "react";
import { RECOMMENDED_OPPORTUNITIES } from "@/lib/mock-data";
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2 } from "lucide-react";

export function AdminOpportunitiesView() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col overflow-hidden">
      <div className="p-6 border-b border-slate-100 space-y-6 bg-slate-50/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Opportunity Database</h2>
            <p className="text-sm text-slate-500 mt-1">Manage public listings, drafts, and archives.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search database..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 text-sm text-slate-700 rounded-xl py-2 pl-9 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>
            <button className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="h-4 w-4" />
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors flex items-center gap-2">
              <Plus className="h-4 w-4" /> New Listing
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-100 sticky top-0 z-10 text-slate-500 font-bold text-[10px] uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Title / Organization</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Deadline</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {RECOMMENDED_OPPORTUNITIES.map((opp) => (
              <tr key={opp.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={opp.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">{opp.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{opp.organization}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                    {opp.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600 font-medium">
                  {opp.deadline}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-100 text-emerald-700 border border-emerald-200">
                    Published
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg bg-white border border-slate-200 shadow-sm transition-colors" title="Edit">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg bg-white border border-slate-200 shadow-sm transition-colors" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg bg-white border border-slate-200 shadow-sm transition-colors">
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
