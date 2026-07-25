import { CALENDAR_EVENTS } from "@/lib/mock-data";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Chrome } from "lucide-react";

export function StudentCalendarView() {
  return (
    <div className="bg-white rounded-3xl border border-pink-100 shadow-sm h-full flex flex-col overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Calendar & Deadlines</h2>
          <p className="text-sm text-slate-500 mt-1">Track your important dates and upcoming events.</p>
        </div>
        <div className="flex items-center gap-2 bg-pink-50 border border-pink-100 px-3 py-1.5 rounded-xl">
          <Chrome className="h-4 w-4 text-[#e04f96]" />
          <span className="text-xs font-semibold text-[#e04f96]">Google Calendar Synced</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Main Calendar Area (Placeholder for actual grid) */}
        <div className="flex-1 p-6 border-r border-pink-100 bg-pink-50/20 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">July 2026</h3>
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="px-3 py-1.5 rounded-lg font-semibold text-sm border border-slate-200 text-slate-700 hover:bg-slate-100">
                Today
              </button>
              <button className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-3 text-center text-xs font-bold text-slate-500 uppercase">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 auto-rows-[100px] divide-x divide-y divide-slate-100">
              {/* Fake calendar grid cells */}
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className={`p-2 relative ${i === 24 ? 'bg-pink-50/40' : ''}`}>
                  <span className={`text-sm font-semibold ${i === 24 ? 'text-[#e04f96]' : 'text-slate-400'}`}>
                    {(i % 31) + 1}
                  </span>
                  {/* Mock Event Dot */}
                  {[12, 15, 24, 28].includes(i) && (
                    <div className="absolute bottom-2 left-2 right-2 h-1.5 rounded-full bg-[#e04f96]/60"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming List */}
        <div className="w-full lg:w-80 p-6 bg-white overflow-y-auto">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-[#e04f96]" /> Upcoming
          </h3>
          <div className="space-y-4">
            {CALENDAR_EVENTS.map(event => (
              <div key={event.id} className="p-4 rounded-2xl border border-pink-100 bg-pink-50/20 hover:border-[#e04f96]/30 transition-colors group">
                <div className="flex items-start justify-between mb-2">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    event.type === 'Deadline' ? 'bg-rose-100 text-rose-700' :
                    event.type === 'Meeting' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-200 text-slate-700'
                  }`}>
                    {event.type}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{event.date.split('-').slice(1).join('/')}</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm leading-tight mb-2">{event.title}</h4>
                {event.time && (
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    {event.time}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
