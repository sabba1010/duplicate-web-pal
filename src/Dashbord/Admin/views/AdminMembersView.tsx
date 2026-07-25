import { useState } from "react";
import { ADMIN_MEMBERS } from "@/lib/mock-admin-data";
import { Search, Filter, MoreHorizontal, UserCheck, UserX, Shield } from "lucide-react";

export function AdminMembersView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [members, setMembers] = useState(ADMIN_MEMBERS);

  const toggleSuspend = (id: string) => {
    setMembers(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, status: m.status === "Active" ? "Suspended" : "Active" };
      }
      return m;
    }));
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col overflow-hidden">
      <div className="p-6 border-b border-slate-100 space-y-6 bg-slate-50/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Member Directory</h2>
            <p className="text-sm text-slate-500 mt-1">Manage students, mentors, and administrators.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 text-sm text-slate-700 rounded-xl py-2 pl-9 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>
            <button className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-100 sticky top-0 z-10 text-slate-500 font-bold text-[10px] uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{member.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                    member.role === 'Admin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                    member.role === 'Mentor' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {member.role === 'Admin' && <Shield className="h-3 w-3 inline-block mr-1 -mt-0.5" />}
                    {member.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {member.status === "Active" ? (
                    <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
                      <UserCheck className="h-4 w-4" /> Active
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-rose-600 text-xs font-semibold">
                      <UserX className="h-4 w-4" /> {member.status}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-slate-500 text-xs font-medium">
                  {member.joinDate}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {member.role !== 'Admin' && (
                      <button 
                        onClick={() => toggleSuspend(member.id)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border shadow-sm transition-colors ${
                          member.status === 'Active' 
                            ? 'bg-white border-rose-200 text-rose-600 hover:bg-rose-50' 
                            : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        {member.status === "Active" ? "Suspend" : "Activate"}
                      </button>
                    )}
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
