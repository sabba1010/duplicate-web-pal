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
  activeMentors: 236,
  activeOpportunities: 20,
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
    title: "New Mentor Application - Nadia Farouk",
    subtitle: "Data Scientist, Spotify",
    time: "Jun 22, 2026",
    status: "Pending",
  },
  {
    id: "rev_2",
    type: "Mentor",
    title: "New Mentor Application - Rachel Kim",
    subtitle: "Civil Rights Attorney",
    time: "Jun 23, 2026",
    status: "Pending",
  },
  {
    id: "rev_3",
    type: "Organization",
    title: "Organization Verification - Horizon Non-profit",
    subtitle: "Submitted tax documents for verification",
    time: "1 day ago",
    status: "Pending",
  }
];

export type AnalyticsDataPoint = {
  name: string;
  value: number;
};

export const ADMIN_ANALYTICS_DATA: AnalyticsDataPoint[] = [
  { name: "MON", value: 38 },
  { name: "TUE", value: 82 },
  { name: "WED", value: 41 },
  { name: "THU", value: 87 },
  { name: "FRI", value: 74 },
  { name: "SAT", value: 29 },
  { name: "SUN", value: 31 },
];

export type AdminMember = {
  id: string;
  name: string;
  email: string;
  role: "Student" | "Mentor" | "Admin";
  schoolOrOrg: string;
  status: "Active" | "Restricted" | "Suspended";
  joinDate: string;
  lastActive: string;
};

export const ADMIN_MEMBERS: AdminMember[] = [
  { id: "usr_1", name: "Karla M.", email: "karla@example.com", role: "Student", schoolOrOrg: "Lincoln High School", status: "Active", joinDate: "2025-01-15", lastActive: "2026-07-24" },
  { id: "usr_2", name: "Isabella R.", email: "isabella@example.com", role: "Student", schoolOrOrg: "Roosevelt High", status: "Active", joinDate: "2024-11-02", lastActive: "2026-07-23" },
  { id: "usr_3", name: "System Admin", email: "admin@girlsoncampus.org", role: "Admin", schoolOrOrg: "Girls On Campus", status: "Active", joinDate: "2024-01-01", lastActive: "2026-07-24" },
  { id: "usr_4", name: "Nadia Farouk", email: "nadia@example.com", role: "Mentor", schoolOrOrg: "Spotify", status: "Active", joinDate: "2026-06-22", lastActive: "2026-07-20" },
  { id: "usr_5", name: "Rachel Kim", email: "rachel@example.com", role: "Mentor", schoolOrOrg: "Private Practice", status: "Active", joinDate: "2026-06-23", lastActive: "2026-07-22" },
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
