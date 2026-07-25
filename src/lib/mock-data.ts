export type Opportunity = {
  id: string;
  title: string;
  organization: string;
  type: "Scholarship" | "Internship" | "Fellowship" | "Program" | "Volunteer";
  deadline: string;
  amount?: string;
  location: string;
  tags: string[];
  image: string;
  description: string;
  isSaved?: boolean;
};

export const RECOMMENDED_OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp_1",
    title: "Women in Tech Excellence Scholarship",
    organization: "Global Tech Foundation",
    type: "Scholarship",
    deadline: "2026-08-15",
    amount: "$5,000",
    location: "Remote",
    tags: ["STEM", "Women in Tech", "Undergraduate"],
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=500",
    description: "A scholarship for outstanding female students pursuing degrees in computer science and related fields.",
    isSaved: false,
  },
  {
    id: "opp_2",
    title: "Google STEP Internship 2026",
    organization: "Google",
    type: "Internship",
    deadline: "2026-09-30",
    amount: "Paid",
    location: "Mountain View, CA / Hybrid",
    tags: ["Software Engineering", "Freshman/Sophomore"],
    image: "https://images.unsplash.com/photo-1521898284481-a5ec348cb555?auto=format&fit=crop&q=80&w=500",
    description: "The Student Training in Engineering Program (STEP) is a 12-week internship for first and second-year undergraduate students.",
    isSaved: true,
  },
  {
    id: "opp_3",
    title: "Global Leaders Fellowship",
    organization: "International Policy Institute",
    type: "Fellowship",
    deadline: "2026-10-01",
    amount: "$15,000 + Travel",
    location: "Global",
    tags: ["Leadership", "Policy", "Graduate"],
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=500",
    description: "An intensive 6-month fellowship developing the next generation of global policy leaders.",
    isSaved: false,
  },
  {
    id: "opp_4",
    title: "Summer Research Program in AI",
    organization: "MIT CSAIL",
    type: "Program",
    deadline: "2026-11-15",
    amount: "$8,000 Stipend",
    location: "Boston, MA",
    tags: ["AI/ML", "Research"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=500",
    description: "Join leading researchers in artificial intelligence for an immersive 10-week summer research experience.",
    isSaved: false,
  },
];

export type SavedItem = {
  id: string;
  opportunity: Opportunity;
  status: "Saved" | "Planning" | "In Progress" | "Submitted" | "Interview" | "Accepted" | "Rejected" | "Archived";
  dateSaved: string;
  reminder?: string;
  notes?: string;
};

export const SAVED_ITEMS: SavedItem[] = [
  {
    id: "save_1",
    opportunity: RECOMMENDED_OPPORTUNITIES[1],
    status: "In Progress",
    dateSaved: "2026-07-20",
    reminder: "2026-09-15",
    notes: "Need to polish my resume before submitting.",
  },
  {
    id: "save_2",
    opportunity: {
      id: "opp_5",
      title: "Design for Good Volunteer",
      organization: "Creative Non-profit",
      type: "Volunteer",
      deadline: "2026-08-01",
      location: "Remote",
      tags: ["UX Design", "Social Good"],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=500",
      description: "Volunteer your design skills to help non-profits build better digital experiences."
    },
    status: "Planning",
    dateSaved: "2026-07-22",
  },
  {
    id: "save_3",
    opportunity: {
      id: "opp_6",
      title: "Future Leaders Scholarship",
      organization: "Leadership Foundation",
      type: "Scholarship",
      deadline: "2026-07-28",
      amount: "$2,000",
      location: "National",
      tags: ["Leadership", "All Majors"],
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=500",
      description: "Supporting students who demonstrate exceptional leadership potential."
    },
    status: "Saved",
    dateSaved: "2026-07-23",
    reminder: "2026-07-25",
  },
  {
    id: "save_4",
    opportunity: {
      id: "opp_7",
      title: "Data Science Summer Analyst",
      organization: "FinTech Innovations",
      type: "Internship",
      deadline: "2026-08-30",
      amount: "Paid",
      location: "New York, NY",
      tags: ["Data Science", "Finance"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500",
      description: "Work on challenging data problems in the financial sector."
    },
    status: "Submitted",
    dateSaved: "2026-06-15",
  }
];

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  type: "Deadline" | "Event" | "Meeting" | "Reminder";
  time?: string;
};

export const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: "cal_1", title: "Future Leaders Scholarship Deadline", date: "2026-07-28", type: "Deadline" },
  { id: "cal_2", title: "Resume Workshop", date: "2026-07-26", type: "Event", time: "2:00 PM EST" },
  { id: "cal_3", title: "Mentor Check-in", date: "2026-07-29", type: "Meeting", time: "4:30 PM EST" },
  { id: "cal_4", title: "Submit Google STEP App", date: "2026-09-15", type: "Reminder" },
];

export type CommunityPost = {
  id: string;
  author: { name: string; avatar: string; role: string };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  tags: string[];
};

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "post_1",
    author: { name: "Sarah Jenkins", avatar: "https://i.pravatar.cc/150?u=sarah", role: "Undergrad, CS" },
    content: "Just submitted my application for the Google STEP internship! 🎉 The process was intense but I learned a lot about my own skills. Anyone else applying this year?",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 5,
    tags: ["Internships", "Tech", "Milestone"]
  },
  {
    id: "post_2",
    author: { name: "Elena Rodriguez", avatar: "https://i.pravatar.cc/150?u=elena", role: "Mentor" },
    content: "Reminder for everyone: Tailor your resume for every single application. Using one generic resume will severely hurt your chances. I've uploaded a new template in the Resources section!",
    timestamp: "5 hours ago",
    likes: 89,
    comments: 12,
    tags: ["Advice", "Resume"]
  },
  {
    id: "post_3",
    author: { name: "Maya Patel", avatar: "https://i.pravatar.cc/150?u=maya", role: "Grad Student" },
    content: "Is anyone else struggling with the essay prompt for the Global Leaders Fellowship? I'm having trouble narrowing down my 'defining moment'. Would love some feedback!",
    timestamp: "1 day ago",
    likes: 15,
    comments: 8,
    tags: ["Fellowships", "Essays", "Help Needed"]
  }
];

export type ChatMessage = {
  id: string;
  sender: { name: string; avatar: string; isOnline: boolean };
  content: string;
  timestamp: string;
  isOwn?: boolean;
};

export const CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "msg_1",
    sender: { name: "System", avatar: "", isOnline: true },
    content: "Welcome to the #general channel! Be kind and supportive.",
    timestamp: "Yesterday, 10:00 AM",
  },
  {
    id: "msg_2",
    sender: { name: "Jessica L.", avatar: "https://i.pravatar.cc/150?u=jess", isOnline: true },
    content: "Hey everyone! Does anyone have good resources for interview prep?",
    timestamp: "Yesterday, 2:15 PM",
  },
  {
    id: "msg_3",
    sender: { name: "Karla (You)", avatar: "https://i.pravatar.cc/150?u=karla", isOnline: true },
    content: "I highly recommend the 'Cracking the PM Interview' book if you're looking into product roles!",
    timestamp: "Yesterday, 2:30 PM",
    isOwn: true,
  },
  {
    id: "msg_4",
    sender: { name: "Priya S.", avatar: "https://i.pravatar.cc/150?u=priya", isOnline: false },
    content: "There's also a great mock interview template in the resources tab here.",
    timestamp: "10:45 AM",
  }
];

export const STUDENT_METRICS = {
  totalSaved: 14,
  applied: 5,
  closingSoon: 3,
  newThisWeek: 8,
  actionNeeded: 2,
};
