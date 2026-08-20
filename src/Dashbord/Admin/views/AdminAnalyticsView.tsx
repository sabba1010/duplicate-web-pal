import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Download, Loader2 } from "lucide-react";
import { API_BASE } from "../../../lib/api";

interface ChartPoint {
  name: string;
  students: number;
  applications: number;
  opportunities: number;
}

export function AdminAnalyticsView() {
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("goc_token");

        const [usersRes, oppsRes, subsRes] = await Promise.all([
          fetch(`${API_BASE}/api/users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE}/api/opportunities`),
          fetch(`${API_BASE}/api/users/submissions`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        // Build last 7 days data
        const days: ChartPoint[] = [];
        const now = new Date();
        for (let i = 6; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(now.getDate() - i);
          const label = d.toLocaleDateString("default", { weekday: "short" }).toUpperCase();
          days.push({ name: label, students: 0, applications: 0, opportunities: 0 });
        }

        if (usersRes.ok) {
          const data = await usersRes.json();
          const users: any[] = data.users || [];
          users.forEach((u) => {
            const created = new Date(u.createdAt);
            const diffDays = Math.floor(
              (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
            );
            if (diffDays >= 0 && diffDays < 7) {
              days[6 - diffDays].students += 1;
            }
          });
        }

        if (subsRes.ok) {
          const data = await subsRes.json();
          const subs: any[] = data.submissions || [];
          subs.forEach((s) => {
            const created = new Date(s.appliedAt);
            const diffDays = Math.floor(
              (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
            );
            if (diffDays >= 0 && diffDays < 7) {
              days[6 - diffDays].applications += 1;
            }
          });
        }

        if (oppsRes.ok) {
          const data = await oppsRes.json();
          const opps: any[] = data.opportunities || [];
          opps.forEach((o) => {
            const created = new Date(o.createdAt);
            const diffDays = Math.floor(
              (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
            );
            if (diffDays >= 0 && diffDays < 7) {
              days[6 - diffDays].opportunities += 1;
            }
          });
        }

        setChartData(days);
      } catch (err) {
        console.error("Failed to load analytics data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-[#4f46e5]" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Analytics &amp; Growth</h2>
          <p className="text-sm text-slate-500 mt-1">Platform performance — last 7 days.</p>
        </div>
        <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors flex items-center gap-2">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Top Chart: New Students */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">New Student Registrations (Last 7 Days)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#0f172a' }}
                />
                <Area type="monotone" dataKey="students" name="New Students" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Applications Submitted (Last 7 Days)</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="applications" name="Applications" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Opportunities Added (Last 7 Days)</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="opportunities" name="Opportunities" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
