import { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Bell, 
  Trash2, 
  X,
  ListFilter,
  Layers,
  CalendarDays,
  Bookmark,
  Send,
  UserCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "../../../lib/api";

type ViewMode = "month" | "week" | "list";
type FilterType = "all" | "saved" | "applied" | "personal";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: "saved" | "applied" | "personal";
  notes?: string;
  isCompleted?: boolean;
  isCustom?: boolean;
  opportunityId?: string;
  organization?: string;
}

export function StudentCalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [filterType, setFilterType] = useState<FilterType>("all");

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDateStr, setNewDateStr] = useState(new Date().toISOString().split("T")[0]);
  const [newType, setNewType] = useState<"personal_reminder" | "saved_deadline" | "application_deadline">("personal_reminder");
  const [newNotes, setNewNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCalendarData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/users/reminders`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const allEvents: CalendarEvent[] = [];

      if (res.ok) {
        const data = await res.json();
        
        // 1. Personal Reminders (Added manually by student)
        if (data.reminders) {
          data.reminders.forEach((r: any) => {
            allEvents.push({
              id: r._id,
              title: r.title,
              date: new Date(r.date),
              type: "personal",
              notes: r.notes,
              isCompleted: r.isCompleted,
              isCustom: true
            });
          });
        }

        // 2. Saved Opportunities (AUTOMATIC when student saves an opportunity)
        if (data.savedOpportunities) {
          data.savedOpportunities.forEach((opp: any) => {
            if (opp.deadline) {
              const d = new Date(opp.deadline);
              if (!isNaN(d.getTime())) {
                allEvents.push({
                  id: `saved_${opp._id}`,
                  title: `${opp.title} (Saved Deadline)`,
                  date: d,
                  type: "saved",
                  opportunityId: opp._id,
                  organization: opp.organization
                });
              }
            }
          });
        }

        // 3. Applied Opportunities (AUTOMATIC when student applies to an opportunity)
        if (data.appliedOpportunities) {
          data.appliedOpportunities.forEach((opp: any) => {
            if (opp.deadline) {
              const d = new Date(opp.deadline);
              if (!isNaN(d.getTime())) {
                allEvents.push({
                  id: `applied_${opp._id}`,
                  title: `${opp.title} (Application Deadline)`,
                  date: d,
                  type: "applied",
                  opportunityId: opp._id,
                  organization: opp.organization
                });
              }
            }
          });
        }
      }

      setEvents(allEvents);
    } catch (err) {
      console.error("Failed to load calendar data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendarData();

    // Re-fetch automatically when student saves or applies anywhere in the app
    const handleUpdate = () => fetchCalendarData();
    window.addEventListener("goc_user_updated", handleUpdate);
    return () => window.removeEventListener("goc_user_updated", handleUpdate);
  }, []);

  const handleAddReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDateStr) return;
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/users/reminders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newTitle,
          date: newDateStr,
          type: newType,
          notes: newNotes
        })
      });

      if (res.ok) {
        setShowAddModal(false);
        setNewTitle("");
        setNewNotes("");
        fetchCalendarData();
      } else {
        alert("Failed to add reminder");
      }
    } catch (err) {
      alert("Error adding reminder");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleReminder = async (id: string) => {
    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/users/reminders/${id}/toggle`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setEvents(prev => prev.map(e => e.id === id ? { ...e, isCompleted: !e.isCompleted } : e));
      }
    } catch (err) {
      console.error("Error toggling reminder", err);
    }
  };

  const deleteReminder = async (id: string) => {
    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/users/reminders/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setEvents(prev => prev.filter(e => e.id !== id));
      }
    } catch (err) {
      console.error("Error deleting reminder", err);
    }
  };

  // Date navigation helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Calendar grid calculations
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Filtering events
  const filteredEvents = events.filter(e => {
    if (filterType === "saved") return e.type === "saved";
    if (filterType === "applied") return e.type === "applied";
    if (filterType === "personal") return e.type === "personal";
    return true;
  });

  // Events for selected date
  const selectedDateEvents = filteredEvents.filter(e => 
    e.date.getDate() === selectedDate.getDate() &&
    e.date.getMonth() === selectedDate.getMonth() &&
    e.date.getFullYear() === selectedDate.getFullYear()
  );

  // Upcoming deadlines (next 14 days)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingDeadlines = filteredEvents
    .filter(e => e.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  const isSameDay = (d1: Date, d2: Date) => 
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  return (
    <div className="space-y-6 pb-8">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-black text-[#2a2026] tracking-tight flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-[#f14f98]" /> Calendar & Deadlines
          </h1>
          <p className="text-[13px] text-[#8b7e85] font-semibold mt-[2px]">
            Automatic deadlines for your saved & applied opportunities + personal reminders.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* View Switcher */}
          <div className="flex items-center bg-white border border-[#f1e4e9] rounded-2xl p-1 shadow-sm">
            <button
              onClick={() => setViewMode("month")}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                viewMode === "month" ? "bg-[#f14f98] text-white shadow-sm" : "text-[#8b7e85] hover:text-[#2a2026]"
              }`}
            >
              <CalendarDays className="h-3.5 w-3.5" /> Month
            </button>
            <button
              onClick={() => setViewMode("week")}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                viewMode === "week" ? "bg-[#f14f98] text-white shadow-sm" : "text-[#8b7e85] hover:text-[#2a2026]"
              }`}
            >
              <Layers className="h-3.5 w-3.5" /> Week
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                viewMode === "list" ? "bg-[#f14f98] text-white shadow-sm" : "text-[#8b7e85] hover:text-[#2a2026]"
              }`}
            >
              <ListFilter className="h-3.5 w-3.5" /> Upcoming
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#f14f98] hover:bg-[#cf3478] text-white px-4 py-2 rounded-2xl text-xs font-black shadow-sm transition-all flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Personal Reminder
          </button>
        </div>
      </div>

      {/* ── Category Filters ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { label: `All Calendar Events (${events.length})`, value: "all" },
          { label: "Saved Deadlines (Auto)", value: "saved", color: "bg-amber-500" },
          { label: "Applied Deadlines (Auto)", value: "applied", color: "bg-emerald-500" },
          { label: "Personal Reminders", value: "personal", color: "bg-purple-500" }
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setFilterType(item.value as FilterType)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold border transition-all whitespace-nowrap flex items-center gap-2 ${
              filterType === item.value
                ? "bg-[#2a2026] text-white border-[#2a2026] shadow-sm"
                : "bg-white text-[#8b7e85] border-[#f1e4e9] hover:border-[#f14f98]"
            }`}
          >
            {item.color && <span className={`w-2 h-2 rounded-full ${item.color}`} />}
            {item.label}
          </button>
        ))}
      </div>

      {/* ── Main View Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        
        {/* ── Calendar Grid (3/5) ── */}
        <div className="lg:col-span-3 space-y-5">
          {viewMode === "month" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-[#f1e4e9] shadow-sm p-6 space-y-5"
            >
              {/* Month Header Nav */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-[#2a2026]">
                  {monthNames[month]} {year}
                </h2>
                <div className="flex items-center gap-2">
                  <button onClick={prevMonth} className="p-2 rounded-xl border border-[#f1e4e9] hover:bg-[#fff7fa] text-[#2a2026] transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1.5 rounded-xl border border-[#f1e4e9] text-xs font-extrabold hover:bg-[#fff7fa] text-[#f14f98]">
                    Today
                  </button>
                  <button onClick={nextMonth} className="p-2 rounded-xl border border-[#f1e4e9] hover:bg-[#fff7fa] text-[#2a2026] transition-colors">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 text-center border-b border-[#f1e4e9] pb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                  <div key={d} className="text-[11px] font-black text-[#8b7e85] uppercase tracking-wider">{d}</div>
                ))}
              </div>

              {/* Grid Cells */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty Offset Cells */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-16 rounded-2xl bg-slate-50/40" />
                ))}

                {/* Days of Month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const dateObj = new Date(year, month, dayNum);
                  const isSelected = isSameDay(dateObj, selectedDate);
                  const isToday = isSameDay(dateObj, new Date());

                  // Get events on this day
                  const dayEvents = filteredEvents.filter(e => isSameDay(e.date, dateObj));

                  return (
                    <div
                      key={dayNum}
                      onClick={() => setSelectedDate(dateObj)}
                      className={`h-16 p-1.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected 
                          ? "border-[#f14f98] bg-[#fff7fa] ring-2 ring-[#f14f98]/20" 
                          : "border-slate-100 bg-white hover:border-[#f1e4e9]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-extrabold w-6 h-6 rounded-full flex items-center justify-center ${
                          isToday ? "bg-[#f14f98] text-white shadow-sm" : "text-[#2a2026]"
                        }`}>
                          {dayNum}
                        </span>
                      </div>

                      {/* Event Dots */}
                      <div className="flex flex-wrap gap-1 overflow-hidden">
                        {dayEvents.map(e => (
                          <span
                            key={e.id}
                            title={e.title}
                            className={`w-2 h-2 rounded-full ${
                              e.type === "applied" ? "bg-emerald-500" :
                              e.type === "saved" ? "bg-amber-500" : "bg-purple-500"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {viewMode === "week" && (
            <div className="bg-white rounded-3xl border border-[#f1e4e9] p-6 space-y-4">
              <h2 className="text-base font-black text-[#2a2026]">Week Overview</h2>
              <div className="space-y-3">
                {Array.from({ length: 7 }).map((_, idx) => {
                  const curr = new Date(selectedDate);
                  curr.setDate(selectedDate.getDate() - selectedDate.getDay() + idx);
                  const dayEvts = filteredEvents.filter(e => isSameDay(e.date, curr));

                  return (
                    <div key={idx} className={`p-4 rounded-2xl border flex items-start gap-4 ${isSameDay(curr, new Date()) ? "border-[#f14f98] bg-[#fff7fa]" : "border-slate-100 bg-white"}`}>
                      <div className="text-center w-14 shrink-0">
                        <div className="text-[10px] font-black uppercase text-[#8b7e85]">{curr.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        <div className="text-lg font-black text-[#2a2026]">{curr.getDate()}</div>
                      </div>
                      <div className="flex-1 space-y-2">
                        {dayEvts.length === 0 ? (
                          <div className="text-xs text-[#8b7e85] font-semibold italic">No saved/applied deadlines or reminders</div>
                        ) : (
                          dayEvts.map(evt => (
                            <div key={evt.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                              <span className="text-xs font-bold text-[#2a2026]">{evt.title}</span>
                              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                                evt.type === "applied" ? "bg-emerald-100 text-emerald-700" :
                                evt.type === "saved" ? "bg-amber-100 text-amber-700" : "bg-purple-100 text-purple-700"
                              }`}>
                                {evt.type}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {viewMode === "list" && (
            <div className="bg-white rounded-3xl border border-[#f1e4e9] p-6 space-y-4">
              <h2 className="text-base font-black text-[#2a2026]">All Saved & Applied Deadlines</h2>
              <div className="divide-y divide-slate-100">
                {filteredEvents.length === 0 ? (
                  <div className="py-8 text-center text-xs text-[#8b7e85] font-semibold">No saved/applied deadlines or personal reminders found.</div>
                ) : (
                  filteredEvents.sort((a, b) => a.date.getTime() - b.date.getTime()).map(evt => (
                    <div key={evt.id} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-[#2a2026]">{evt.title}</div>
                        <div className="text-[11px] text-[#8b7e85] font-semibold mt-0.5">
                          {evt.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                        evt.type === "applied" ? "bg-emerald-100 text-emerald-700" :
                        evt.type === "saved" ? "bg-amber-100 text-amber-700" : "bg-purple-100 text-purple-700"
                      }`}>
                        {evt.type}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Side Details (2/5) ── */}
        <div className="lg:col-span-2 space-y-5">
          {/* Selected Date Events */}
          <div className="bg-white rounded-3xl border border-[#f1e4e9] shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#f1e4e9] pb-3">
              <div>
                <h3 className="text-sm font-black text-[#2a2026]">
                  {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </h3>
                <p className="text-[11px] text-[#8b7e85] font-semibold">Events on selected date</p>
              </div>
              <button 
                onClick={() => {
                  setNewDateStr(selectedDate.toISOString().split("T")[0]);
                  setShowAddModal(true);
                }} 
                className="p-1.5 rounded-xl bg-[#fff7fa] border border-[#f1e4e9] text-[#f14f98] hover:bg-[#f14f98] hover:text-white transition-colors"
                title="Add Reminder on this date"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {selectedDateEvents.length === 0 ? (
              <div className="py-6 text-center text-xs font-semibold text-[#8b7e85]">
                No deadlines on this date. Click "+" to add a personal reminder!
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDateEvents.map(evt => (
                  <div key={evt.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        evt.type === "applied" ? "bg-emerald-100 text-emerald-700" :
                        evt.type === "saved" ? "bg-amber-100 text-amber-700" : "bg-purple-100 text-purple-700"
                      }`}>
                        {evt.type === "saved" ? "Saved Deadline" : evt.type === "applied" ? "Applied Deadline" : "Personal Reminder"}
                      </span>

                      {evt.isCustom && (
                        <div className="flex items-center gap-1.5">
                          <button 
                            onClick={() => toggleReminder(evt.id)}
                            className={`p-1 rounded-lg border text-xs ${evt.isCompleted ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-white text-slate-400 border-slate-200"}`}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </button>
                          <button 
                            onClick={() => deleteReminder(evt.id)}
                            className="p-1 rounded-lg bg-white border border-slate-200 text-rose-500 hover:bg-rose-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className={`text-xs font-bold ${evt.isCompleted ? "line-through text-slate-400" : "text-[#2a2026]"}`}>
                      {evt.title}
                    </div>

                    {evt.notes && (
                      <p className="text-[11px] text-[#8b7e85] font-medium">{evt.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Urgent Upcoming Deadlines Box */}
          <div className="bg-gradient-to-br from-[#2a2026] to-[#42313b] text-white rounded-3xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black flex items-center gap-2">
                <Bell className="h-4 w-4 text-[#f14f98]" /> Upcoming Deadlines
              </h3>
              <span className="text-[10px] font-extrabold bg-[#f14f98] px-2 py-0.5 rounded-full">Alerts</span>
            </div>

            {upcomingDeadlines.length === 0 ? (
              <p className="text-xs text-slate-300 font-medium">No saved or applied deadlines coming up.</p>
            ) : (
              <div className="space-y-2.5">
                {upcomingDeadlines.map(evt => {
                  const diffDays = Math.ceil((evt.date.getTime() - today.getTime()) / (1000 * 3600 * 24));
                  return (
                    <div key={evt.id} className="p-3 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold truncate">{evt.title}</div>
                        <div className="text-[10px] text-slate-300 mt-0.5">
                          {evt.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                      <span className={`text-[10px] font-black px-2 py-1 rounded-xl shrink-0 ${
                        diffDays <= 2 ? "bg-rose-500 text-white" : "bg-white/20 text-white"
                      }`}>
                        {diffDays === 0 ? "Today" : `${diffDays}d left`}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ── ADD PERSONAL REMINDER MODAL ── */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-[#2a2026]">Add Personal Reminder</h3>
                <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddReminder} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-wider text-[#8b7e85]">Title *</label>
                  <input 
                    required
                    type="text" 
                    value={newTitle} 
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="e.g. Tomorrow SOP লিখবো / Scholarship docs ready"
                    className="w-full bg-[#fff7fa] border border-[#f1e4e9] text-xs font-bold rounded-2xl px-4 py-2.5 outline-none focus:border-[#f14f98]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-wider text-[#8b7e85]">Date *</label>
                  <input 
                    required
                    type="date" 
                    value={newDateStr} 
                    onChange={e => setNewDateStr(e.target.value)}
                    className="w-full bg-[#fff7fa] border border-[#f1e4e9] text-xs font-bold rounded-2xl px-4 py-2.5 outline-none focus:border-[#f14f98]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-wider text-[#8b7e85]">Category</label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value as any)}
                    className="w-full bg-[#fff7fa] border border-[#f1e4e9] text-xs font-bold rounded-2xl px-4 py-2.5 outline-none focus:border-[#f14f98]"
                  >
                    <option value="personal_reminder">Personal Reminder</option>
                    <option value="saved_deadline">Saved Opportunity Deadline</option>
                    <option value="application_deadline">Application Deadline</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-wider text-[#8b7e85]">Notes (Optional)</label>
                  <textarea 
                    value={newNotes}
                    onChange={e => setNewNotes(e.target.value)}
                    placeholder="Extra details..."
                    className="w-full bg-[#fff7fa] border border-[#f1e4e9] text-xs font-medium rounded-2xl px-4 py-2.5 outline-none focus:border-[#f14f98] min-h-[80px]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-2xl text-xs font-black text-white bg-[#f14f98] hover:bg-[#cf3478] shadow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : "Save Reminder"}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
