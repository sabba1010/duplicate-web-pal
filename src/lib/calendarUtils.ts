/**
 * Utility functions for Girls on Campus (GOC) Calendar Management
 * Single source of truth for internal GOC Calendar, Google Calendar URL generation, and Apple Calendar (.ics) export.
 */

export interface OpportunityCalendarItem {
  id: string;
  title: string;
  category?: string;
  deadline?: string;
  description?: string;
  organization?: string;
  pdfFile?: string;
  image?: string;
}

/**
 * Robustly parses various date formats for opportunity deadlines:
 * Handles: "YYYY-MM-DD", "November 20, 2026", "Nov 20, 2026", "2026/11/20", ISO strings, etc.
 * Returns null if deadline is invalid, missing, or "Rolling".
 */
export function parseOpportunityDeadline(deadlineStr?: string): Date | null {
  if (!deadlineStr || typeof deadlineStr !== "string") return null;

  const trimmed = deadlineStr.trim();
  if (
    !trimmed ||
    trimmed.toLowerCase().includes("rolling") ||
    trimmed.toLowerCase().includes("n/a") ||
    trimmed.toLowerCase().includes("no deadline")
  ) {
    return null;
  }

  // Direct Date parse attempt
  const parsedDate = new Date(trimmed);
  if (!isNaN(parsedDate.getTime())) {
    return parsedDate;
  }

  // Regex parse for month day, year (e.g. "November 20 2026" or "Nov 20, 2026")
  const match = trimmed.match(/([A-Za-z]+)\s+(\d{1,2})[\s,]+(\d{4})/);
  if (match) {
    const [, monthStr, dayStr, yearStr] = match;
    const retryDate = new Date(`${monthStr} ${dayStr}, ${yearStr}`);
    if (!isNaN(retryDate.getTime())) {
      return retryDate;
    }
  }

  return null;
}

/**
 * Formats a Date into ISO basic UTC format (YYYYMMDD or YYYYMMDDTHHmmssZ)
 */

function formatBasicISO(date: Date, allDay = true): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());

  if (allDay) {
    return `${year}${month}${day}`;
  }

  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

/**
 * Generates unified calendar export links and metadata from a single Opportunity data source.
 */
export function getOpportunityCalendarData(opp: OpportunityCalendarItem, origin?: string) {
  const deadlineDate = parseOpportunityDeadline(opp.deadline);
  const hasValidDeadline = Boolean(deadlineDate);

  const currentOrigin = origin || (typeof window !== "undefined" ? window.location.origin : "https://girlsoncampus.org");
  const oppUrl = `${currentOrigin}/dashboard?view=opportunities&oppId=${opp.id}`;

  if (!deadlineDate) {
    return {
      hasValidDeadline: false,
      deadlineDate: null,
      formattedDate: opp.deadline || "No deadline specified",
      googleUrl: "",
      icsContent: "",
      oppUrl,
    };
  }

  // All-day event setup
  const startDateStr = formatBasicISO(deadlineDate, true);
  // End date is day after for all-day events in iCal/Google format
  const nextDay = new Date(deadlineDate);
  nextDay.setDate(nextDay.getDate() + 1);
  const endDateStr = formatBasicISO(nextDay, true);

  const eventTitle = `${opp.title} - Application Deadline`;
  
  const eventDescription = [
    `Girls on Campus (GOC) Opportunity Deadline`,
    `Program: ${opp.title}`,
    `Category: ${opp.category || "General"}`,
    `Organization: ${opp.organization || "GOC Partner"}`,
    `Deadline: ${deadlineDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
    `GOC Opportunity Page: ${oppUrl}`,
    opp.description ? `\nDetails:\n${opp.description}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  // 1. Google Calendar URL
  const googleParams = new URLSearchParams({
    action: "TEMPLATE",
    text: eventTitle,
    dates: `${startDateStr}/${endDateStr}`,
    details: eventDescription,
    location: oppUrl,
  });
  const googleUrl = `https://calendar.google.com/calendar/render?${googleParams.toString()}`;

  // 2. Apple Calendar (.ics) Content
  const cleanTitle = eventTitle.replace(/[\r\n]+/g, " ");
  const cleanDescription = eventDescription.replace(/\r?\n/g, "\\n");
  const uid = `goc-opp-${opp.id}@girlsoncampus.org`;

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Girls on Campus//GOC Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `SUMMARY:${cleanTitle}`,
    `DESCRIPTION:${cleanDescription}`,
    `LOCATION:${oppUrl}`,
    `URL:${oppUrl}`,
    `DTSTART;VALUE=DATE:${startDateStr}`,
    `DTEND;VALUE=DATE:${endDateStr}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const formattedDate = deadlineDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return {
    hasValidDeadline: true,
    deadlineDate,
    formattedDate,
    googleUrl,
    icsContent,
    oppUrl,
  };
}

/**
 * Triggers a client-side .ics file download for Apple Calendar / iOS / macOS
 */
export function downloadIcsFile(opp: OpportunityCalendarItem) {
  const data = getOpportunityCalendarData(opp);
  if (!data.hasValidDeadline || !data.icsContent) {
    alert("This opportunity does not have a valid date to add to Apple Calendar.");
    return;
  }

  const blob = new Blob([data.icsContent], { type: "text/calendar;charset=utf-8" });
  const fileName = `${opp.title.replace(/[^a-zA-Z0-9]/g, "_")}_Deadline.ics`;

  // Standard download anchor
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
