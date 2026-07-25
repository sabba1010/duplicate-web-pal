export type AdminMetrics = {
  totalStudents: number;
  activeMentors: number;
  activeOpportunities: number;
  systemHealth: number;
  growth: {
    students: number;
    mentors: number;
  };
};

export const ADMIN_METRICS: AdminMetrics = {
  totalStudents: 12450,
  activeMentors: 148,
  activeOpportunities: 342,
  systemHealth: 99.9,
  growth: {
    students: 12.4,
    mentors: 5.2,
  }
};

export type AdminPendingReview = {
  id: string;
  type: "Scholarship" | "Mentor" | "Organization";
  title: string;
  subtitle: string;
  time: string;
  status: "Pending" | "In Review";
};

export const ADMIN_PENDING_REVIEWS: AdminPendingReview[] = [
  {
    id: "rev_1",
    type: "Mentor",
    title: "New Mentor Application - Dr. Sarah Lin",
    subtitle: "Computer Science Mentor",
    time: "2 hours ago",
    status: "Pending",
  },
  {
    id: "rev_2",
    type: "Scholarship",
    title: "Tech Women 2026 - Sponsorship Listing",
    subtitle: "$5,000 Grant by Global Tech Foundation",
    time: "4 hours ago",
    status: "In Review",
  },
  {
    id: "rev_3",
    type: "Organization",
    title: "Organization Verification - Horizon Non-profit",
    subtitle: "Submitted tax documents",
    time: "1 day ago",
    status: "Pending",
  }
];

export type AnalyticsDataPoint = {
  name: string;
  students: number;
  applications: number;
  opportunities: number;
};

export const ADMIN_ANALYTICS_DATA: AnalyticsDataPoint[] = [
  { name: "Jan", students: 4000, applications: 2400, opportunities: 240 },
  { name: "Feb", students: 5000, applications: 1398, opportunities: 221 },
  { name: "Mar", students: 6000, applications: 9800, opportunities: 229 },
  { name: "Apr", students: 7780, applications: 3908, opportunities: 200 },
  { name: "May", students: 8890, applications: 4800, opportunities: 218 },
  { name: "Jun", students: 10390, applications: 3800, opportunities: 250 },
  { name: "Jul", students: 12450, applications: 4300, opportunities: 342 },
];

export type AdminMember = {
  id: string;
  name: string;
  email: string;
  role: "Student" | "Mentor" | "Admin";
  status: "Active" | "Restricted" | "Suspended";
  joinDate: string;
  lastActive: string;
};

export const ADMIN_MEMBERS: AdminMember[] = [
  { id: "usr_1", name: "Karla Mora", email: "karla@example.com", role: "Student", status: "Active", joinDate: "2025-01-15", lastActive: "2026-07-24" },
  { id: "usr_2", name: "Elena Rodriguez", email: "elena@example.com", role: "Mentor", status: "Active", joinDate: "2024-11-02", lastActive: "2026-07-23" },
  { id: "usr_3", name: "System Admin", email: "admin@girlsoncampus.org", role: "Admin", status: "Active", joinDate: "2024-01-01", lastActive: "2026-07-24" },
  { id: "usr_4", name: "Spam Account", email: "spam@bot.com", role: "Student", status: "Suspended", joinDate: "2026-07-20", lastActive: "2026-07-20" },
  { id: "usr_5", name: "Jessica L.", email: "jessica.l@university.edu", role: "Student", status: "Active", joinDate: "2025-08-11", lastActive: "2026-07-22" },
];

export type ExtensionSave = {
  id: string;
  url: string;
  title: string;
  organization: string;
  dateSaved: string;
  savedBy: number;
  status: "Verified" | "Needs Review" | "Duplicate";
};

export const EXTENSION_SAVES: ExtensionSave[] = [
  { id: "ext_1", url: "https://example.com/scholarship-2026", title: "Future Leaders Scholarship", organization: "Leadership Foundation", dateSaved: "2026-07-20", savedBy: 45, status: "Verified" },
  { id: "ext_2", url: "https://company.com/internship", title: "Software Engineering Intern", organization: "Tech Corp", dateSaved: "2026-07-23", savedBy: 12, status: "Needs Review" },
  { id: "ext_3", url: "https://university.edu/grant", title: "Summer Research Grant", organization: "State University", dateSaved: "2026-07-24", savedBy: 8, status: "Needs Review" },
];
