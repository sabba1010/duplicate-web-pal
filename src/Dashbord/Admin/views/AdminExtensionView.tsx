import { Chrome, Search } from "lucide-react";
import { useState } from "react";

export function AdminExtensionView() {
  const [searchQuery, setSearchQuery] = useState("");

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

      {/* Empty State — Extension saves not yet integrated */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
          <Chrome className="h-8 w-8 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-[17px] font-bold text-slate-800 mb-1">No extension saves yet</h3>
          <p className="text-sm text-slate-500 max-w-sm">
            When students use the GOC browser extension to save opportunities from external sites, they'll appear here for review and verification.
          </p>
        </div>
        <span className="inline-block mt-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold uppercase tracking-wide">
          Coming Soon
        </span>
      </div>
    </div>
  );
}
