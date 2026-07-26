import { EXTENSION_SAVES } from "@/lib/mock-admin-data";
import { Chrome, Search, ExternalLink, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { useState } from "react";

export function AdminExtensionView() {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Needs Review": return "bg-amber-50 text-amber-700 border-amber-200";
      case "Duplicate": return "bg-rose-50 text-rose-700 border-rose-200";
      default: return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Verified": return <CheckCircle className="h-3 w-3 mr-1 inline-block -mt-0.5" />;
      case "Needs Review": return <AlertCircle className="h-3 w-3 mr-1 inline-block -mt-0.5" />;
      case "Duplicate": return <RefreshCw className="h-3 w-3 mr-1 inline-block -mt-0.5" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col overflow-hidden">
      <div className="p-6 border-b border-slate-100 space-y-6 bg-slate-50/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Chrome className="h-5 w-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900">Extension Saves Library</h2>
            </div>
            <p className="text-sm text-slate-500">Monitor and verify opportunities scraped by students.</p>
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search extracted URLs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 text-sm text-slate-700 rounded-xl py-2 pl-9 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-100 sticky top-0 z-10 text-slate-500 font-bold text-[10px] uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Extracted Title</th>
              <th className="px-6 py-4">Source Domain</th>
              <th className="px-6 py-4">Total Saves</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {EXTENSION_SAVES.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900">{item.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{item.organization}</div>
                </td>
                <td className="px-6 py-4">
                  <a href={item.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 text-xs font-medium">
                    {new URL(item.url).hostname}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {item.savedBy} students
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors opacity-0 group-hover:opacity-100">
                    Review Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
