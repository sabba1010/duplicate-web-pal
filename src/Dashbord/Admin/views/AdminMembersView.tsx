import { useState } from "react";
import { ADMIN_MEMBERS } from "@/lib/mock-admin-data";
import { Search, Filter, MoreHorizontal, UserCheck, UserX, Shield } from "lucide-react";

export function AdminMembersView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [members, setMembers] = useState(ADMIN_MEMBERS);

  const toggleSuspend = (id: string) => {
    setMembers(prev => prev.map(m =>
      m.id === id ? { ...m, status: m.status === "Active" ? "Suspended" : "Active" } : m
    ));
  };

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e5e7eb] pb-5">
        <div>
          <h1 className="text-[24px] font-black text-[#111827] tracking-tight">Member Directory</h1>
          <p className="text-[13px] text-[#6b7280] font-semibold mt-[2px]">Manage students, mentors, and administrators.</p>
        </div>
        <div className="flex items-center gap-[10px]">
          <div className="flex items-center gap-[10px] bg-white border border-[#e5e7eb] rounded-[24px] py-[10px] px-[16px] w-full md:w-[300px]">
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-none outline-none text-[12.5px] bg-transparent text-[#111827] placeholder-[#6b7280]"
            />
            <Search className="h-[13px] w-[13px] text-[#4f46e5] shrink-0" />
          </div>
          <button className="w-[42px] h-[42px] flex items-center justify-center border border-[#e5e7eb] rounded-full bg-white text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#4f46e5] transition-colors">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e5e7eb] rounded-[20px] overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="border-b border-[#e5e7eb] text-[#6b7280] font-extrabold text-[10px] uppercase tracking-wider bg-[#f3f4f6]">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f9f0f5]">
            {filtered.map((member) => (
              <tr key={member.id} className="hover:bg-[#f3f4f6] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#eef2ff] border border-[#e5e7eb] flex items-center justify-center text-[#4f46e5] font-extrabold text-xs shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-extrabold text-[#111827] text-[13px]">{member.name}</div>
                      <div className="text-[11px] text-[#6b7280] font-bold mt-0.5">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-[10px] py-[4px] rounded-full border ${
                    member.role === 'Admin'  ? 'bg-purple-50 text-purple-700 border-purple-200' :
                    member.role === 'Mentor' ? 'bg-[#f3f4f6] text-[#4f46e5] border-[#eef2ff]' :
                    'bg-[#f3f4f6] text-[#6b7280] border-[#e5e7eb]'
                  }`}>
                    {member.role === 'Admin' && <Shield className="h-2.5 w-2.5 inline-block mr-1 -mt-0.5" />}
                    {member.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {member.status === "Active" ? (
                    <div className="flex items-center gap-1.5 text-[#39b86b] text-[12px] font-extrabold">
                      <UserCheck className="h-3.5 w-3.5" /> Active
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-rose-500 text-[12px] font-extrabold">
                      <UserX className="h-3.5 w-3.5" /> {member.status}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-[#6b7280] text-[12px] font-bold">{member.joinDate}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {member.role !== 'Admin' && (
                      <button
                        onClick={() => toggleSuspend(member.id)}
                        className={`px-[12px] py-[5px] text-[11px] font-extrabold rounded-full border transition-colors ${
                          member.status === 'Active'
                            ? 'bg-white border-rose-200 text-rose-500 hover:bg-rose-50'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        {member.status === "Active" ? "Suspend" : "Activate"}
                      </button>
                    )}
                    <button className="p-1.5 text-[#6b7280] hover:text-[#4f46e5] rounded-full bg-white border border-[#e5e7eb] transition-colors">
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
