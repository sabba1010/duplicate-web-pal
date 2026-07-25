import { PlayCircle, FileText, Download, Search } from "lucide-react";

export function StudentResourcesView() {
  const resources = [
    { id: 1, type: "Video", title: "Nailing the Technical Interview", author: "Tech Mentor Team", icon: PlayCircle, color: "text-blue-500", bg: "bg-blue-50" },
    { id: 2, type: "Template", title: "Harvard Format Resume", author: "Career Services", icon: FileText, color: "text-emerald-500", bg: "bg-emerald-50" },
    { id: 3, type: "Guide", title: "Writing a Killer Cover Letter", author: "Alumni Network", icon: FileText, color: "text-amber-500", bg: "bg-amber-50" },
    { id: 4, type: "Download", title: "Top 100 Behavioral Questions", author: "Mock Interviewers", icon: Download, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Curated Resources</h2>
          <p className="text-sm text-slate-500 mt-1">Guides, templates, and videos to help you succeed.</p>
        </div>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-700 rounded-xl py-2 pl-9 pr-4 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {resources.map((res) => {
            const Icon = res.icon;
            return (
              <div key={res.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-200 transition-all group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${res.bg}`}>
                    <Icon className={`h-6 w-6 ${res.color}`} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {res.type}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-teal-600 transition-colors line-clamp-2">{res.title}</h3>
                <p className="text-xs font-medium text-slate-500">By {res.author}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
