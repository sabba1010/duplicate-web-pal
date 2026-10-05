import { useState, useEffect } from "react";
import { Search, Filter, MoreHorizontal, UserCheck, UserX, Shield, Sparkles, CreditCard, Users, CheckCircle2 } from "lucide-react";
import { API_BASE } from "../../../lib/api";

export function AdminMembersView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlanFilter, setSelectedPlanFilter] = useState<"all" | "yearly" | "monthly" | "free">("all");
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setMembers(data.users || []);
      } else {
        setError(data.message || "Failed to load members");
      }
    } catch (err) {
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const toggleSuspend = async (id: string, currentStatus: string) => {
    try {
      const token = localStorage.getItem("goc_token");
      const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
      
      const res = await fetch(`${API_BASE}/api/users/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      const data = await res.json();
      if (res.ok) {
        setMembers(prev => prev.map(m => m._id === id ? { ...m, status: newStatus } : m));
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (err) {
      alert("Error updating status");
    }
  };

  // Helper to determine active plan for a user
  const getUserPlanInfo = (member: any) => {
    if (member.role === "admin") return { plan: "admin", label: "Admin", isPaid: false };
    if (member.role === "mentor") return { plan: "mentor", label: "Mentor", isPaid: false };

    const isSubscribed =
      member.subscriptionStatus === "active" ||
      member.subscriptionStatus === "trialing" ||
      (member.currentPeriodEnd && new Date(member.currentPeriodEnd) > new Date());

    if (!isSubscribed) {
      return { plan: "free", label: "Free Member", isPaid: false };
    }

    if (member.subscriptionPlan === "yearly") {
      return { plan: "yearly", label: "Yearly Pass ($12)", isPaid: true };
    }
    return { plan: "monthly", label: "Monthly Pass ($8)", isPaid: true };
  };

  // Metrics
  const yearlyCount = members.filter(m => getUserPlanInfo(m).plan === "yearly").length;
  const monthlyCount = members.filter(m => getUserPlanInfo(m).plan === "monthly").length;
  const freeCount = members.filter(m => getUserPlanInfo(m).plan === "free").length;

  const filtered = members.filter(m => {
    const matchesSearch =
      (m.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.username || "").toLowerCase().includes(searchQuery.toLowerCase());

    const planInfo = getUserPlanInfo(m);
    let matchesPlan = true;
    if (selectedPlanFilter === "yearly") matchesPlan = planInfo.plan === "yearly";
    else if (selectedPlanFilter === "monthly") matchesPlan = planInfo.plan === "monthly";
    else if (selectedPlanFilter === "free") matchesPlan = planInfo.plan === "free";

    return matchesSearch && matchesPlan;
  });

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e5e7eb] pb-5">
        <div>
          <h1 className="text-[24px] font-black text-[#111827] tracking-tight">Member Directory & Packages</h1>
          <p className="text-[13px] text-[#6b7280] font-semibold mt-[2px]">
            View which package each member has purchased, their subscription status, and manage account access.
          </p>
        </div>
        <div className="flex items-center gap-[10px]">
          <div className="flex items-center gap-[10px] bg-white border border-[#e5e7eb] rounded-[24px] py-[10px] px-[16px] w-full md:w-[300px]">
            <input
              type="text"
              placeholder="Search members by name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-none outline-none text-[12.5px] bg-transparent text-[#111827] placeholder-[#6b7280]"
            />
            <Search className="h-[13px] w-[13px] text-[#4f46e5] shrink-0" />
          </div>
        </div>
      </div>

      {/* Package Filter Pills & Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setSelectedPlanFilter("all")}
          className={`p-3.5 rounded-[18px] border text-left transition-all ${
            selectedPlanFilter === "all"
              ? "bg-[#4f46e5] text-white border-[#4f46e5] shadow-md shadow-indigo-500/20"
              : "bg-white border-gray-200 text-[#111827] hover:border-gray-300"
          }`}
        >
          <div className="text-[10px] font-extrabold uppercase tracking-wider opacity-80">All Members</div>
          <div className="text-[22px] font-black leading-tight mt-0.5">{members.length}</div>
        </button>

        <button
          onClick={() => setSelectedPlanFilter("yearly")}
          className={`p-3.5 rounded-[18px] border text-left transition-all ${
            selectedPlanFilter === "yearly"
              ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20"
              : "bg-indigo-50/50 border-indigo-100 text-indigo-950 hover:border-indigo-200"
          }`}
        >
          <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider opacity-90">
            <Sparkles className="w-3 h-3" /> Yearly Pass ($12)
          </div>
          <div className="text-[22px] font-black leading-tight mt-0.5">{yearlyCount} <span className="text-[11px] font-medium opacity-80">subscribers</span></div>
        </button>

        <button
          onClick={() => setSelectedPlanFilter("monthly")}
          className={`p-3.5 rounded-[18px] border text-left transition-all ${
            selectedPlanFilter === "monthly"
              ? "bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-500/20"
              : "bg-pink-50/50 border-pink-100 text-pink-950 hover:border-pink-200"
          }`}
        >
          <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider opacity-90">
            <CreditCard className="w-3 h-3" /> Monthly Pass ($8)
          </div>
          <div className="text-[22px] font-black leading-tight mt-0.5">{monthlyCount} <span className="text-[11px] font-medium opacity-80">subscribers</span></div>
        </button>

        <button
          onClick={() => setSelectedPlanFilter("free")}
          className={`p-3.5 rounded-[18px] border text-left transition-all ${
            selectedPlanFilter === "free"
              ? "bg-gray-800 text-white border-gray-800 shadow-md"
              : "bg-gray-50/70 border-gray-200 text-gray-700 hover:border-gray-300"
          }`}
        >
          <div className="text-[10px] font-black uppercase tracking-wider opacity-80">Free Members</div>
          <div className="text-[22px] font-black leading-tight mt-0.5">{freeCount} <span className="text-[11px] font-medium opacity-80">unsubscribed</span></div>
        </button>
      </div>

      {error && <div className="text-rose-500 font-bold p-4 bg-rose-50 rounded-lg">{error}</div>}
      
      {/* Table */}
      <div className="bg-white border border-[#e5e7eb] rounded-[20px] overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-[#6b7280] font-semibold">Loading members...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="border-b border-[#e5e7eb] text-[#6b7280] font-extrabold text-[10px] uppercase tracking-wider bg-[#f9fafb]">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Subscribed Package</th>
                  <th className="px-6 py-4">Account Status</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6]">
                {filtered.map((member) => {
                  const planInfo = getUserPlanInfo(member);

                  return (
                    <tr key={member._id} className="hover:bg-[#f9fafb] transition-colors group">
                      {/* User Column */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#eef2ff] border border-[#e5e7eb] flex items-center justify-center text-[#4f46e5] font-extrabold text-xs shrink-0 uppercase">
                            {(member.name || "U").charAt(0)}
                          </div>
                          <div>
                            <div className="font-extrabold text-[#111827] text-[13px]">{member.name}</div>
                            <div className="text-[11px] text-[#6b7280] font-bold mt-0.5">{member.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Role Column */}
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-[10px] py-[3.5px] rounded-full border ${
                          member.role === 'admin'  ? 'bg-purple-50 text-purple-700 border-purple-200' :
                          member.role === 'mentor' ? 'bg-[#f3f4f6] text-[#4f46e5] border-[#eef2ff]' :
                          'bg-[#f3f4f6] text-[#6b7280] border-[#e5e7eb]'
                        }`}>
                          {member.role === 'admin' && <Shield className="h-2.5 w-2.5 inline-block mr-1 -mt-0.5" />}
                          {member.role}
                        </span>
                      </td>

                      {/* Subscribed Package Column */}
                      <td className="px-6 py-4">
                        {member.role === "admin" ? (
                          <span className="text-[11px] font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200 inline-flex items-center gap-1">
                            <Shield className="w-3 h-3" /> Admin Full Access
                          </span>
                        ) : member.role === "mentor" ? (
                          <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200 inline-flex items-center gap-1">
                            🎓 Mentor Access
                          </span>
                        ) : planInfo.plan === "yearly" ? (
                          <div>
                            <span className="text-[11px] font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 shadow-2xs inline-flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                              Yearly Pass ($12/yr)
                            </span>
                            {member.currentPeriodEnd && (
                              <div className="text-[10px] text-gray-400 font-semibold mt-1">
                                Valid until {new Date(member.currentPeriodEnd).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        ) : planInfo.plan === "monthly" ? (
                          <div>
                            <span className="text-[11px] font-black text-pink-700 bg-pink-50 px-3 py-1 rounded-full border border-pink-200 shadow-2xs inline-flex items-center gap-1.5">
                              <CreditCard className="w-3.5 h-3.5 text-pink-600" />
                              Monthly Pass ($8/mo)
                            </span>
                            {member.currentPeriodEnd && (
                              <div className="text-[10px] text-gray-400 font-semibold mt-1">
                                Valid until {new Date(member.currentPeriodEnd).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200 inline-block">
                              Free (No Package)
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Status Column */}
                      <td className="px-6 py-4">
                        {member.status === "Active" ? (
                          <div className="flex items-center gap-1.5 text-[#39b86b] text-[12px] font-extrabold">
                            <UserCheck className="h-3.5 w-3.5" /> Active
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-rose-500 text-[12px] font-extrabold">
                            <UserX className="h-3.5 w-3.5" /> {member.status || "Suspended"}
                          </div>
                        )}
                      </td>

                      {/* Joined Date */}
                      <td className="px-6 py-4 text-[#6b7280] text-[12px] font-bold">
                        {new Date(member.createdAt).toLocaleDateString()}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {member.role !== 'admin' && (
                            <button
                              onClick={() => toggleSuspend(member._id, member.status)}
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
                  );
                })}
                {filtered.length === 0 && !loading && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-[#6b7280] font-semibold">
                      No members match the selected filter or search query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
