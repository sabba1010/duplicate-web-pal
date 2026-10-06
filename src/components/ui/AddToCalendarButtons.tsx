import { Calendar, CalendarPlus, AlertCircle } from "lucide-react";
import {
  OpportunityCalendarItem,
  getOpportunityCalendarData,
  downloadIcsFile,
} from "../../lib/calendarUtils";

interface AddToCalendarButtonsProps {
  opportunity: OpportunityCalendarItem;
  className?: string;
  variant?: "row" | "card" | "full";
}

export function AddToCalendarButtons({
  opportunity,
  className = "",
  variant = "row",
}: AddToCalendarButtonsProps) {
  const calData = getOpportunityCalendarData(opportunity);

  if (!calData.hasValidDeadline) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 text-xs font-semibold ${className}`}>
        <AlertCircle className="h-3.5 w-3.5 text-slate-400 shrink-0" />
        <span>No fixed deadline for calendar sync</span>
      </div>
    );
  }

  const handleGoogleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(calData.googleUrl, "_blank", "noopener,noreferrer");
  };

  const handleAppleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadIcsFile(opportunity);
  };

  if (variant === "full") {
    return (
      <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full ${className}`}>
        <button
          type="button"
          onClick={handleGoogleClick}
          className="flex-1 bg-white hover:bg-slate-50 border border-[#e5e7eb] hover:border-[#4285F4] text-[#111827] px-5 py-3 rounded-full text-xs font-extrabold shadow-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
          title="Open event in Google Calendar"
        >
          {/* Custom Google Calendar Icon */}
          <svg className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"
            />
          </svg>
          <span>Add to Google Calendar</span>
        </button>

        <button
          type="button"
          onClick={handleAppleClick}
          className="flex-1 bg-white hover:bg-slate-50 border border-[#e5e7eb] hover:border-black text-[#111827] px-5 py-3 rounded-full text-xs font-extrabold shadow-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
          title="Download .ics file for Apple Calendar"
        >
          {/* Custom Apple Icon */}
          <svg className="h-4 w-4 shrink-0 fill-current text-slate-800 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.54c.67-.82 1.12-1.96.99-3.1-.97.04-2.15.65-2.85 1.47-.62.72-1.16 1.88-1.01 3 .01 0 .04.01.07.01 1.08 0 2.16-.56 2.8-1.38z" />
          </svg>
          <span>Add to Apple Calendar</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleGoogleClick}
        className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#111827] text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer hover:border-[#4285F4]"
        title="Open event in Google Calendar"
      >
        <CalendarPlus className="h-3.5 w-3.5 text-[#4285F4]" />
        <span>Google</span>
      </button>

      <button
        type="button"
        onClick={handleAppleClick}
        className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#111827] text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer hover:border-black"
        title="Download .ics event for Apple Calendar"
      >
        <Calendar className="h-3.5 w-3.5 text-slate-800" />
        <span>Apple .ics</span>
      </button>
    </div>
  );
}
