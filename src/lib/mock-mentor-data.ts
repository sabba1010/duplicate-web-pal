export type MeetingRequest = {
  id: string;
  name: string;
  topic: string;
  date: string;
  status: "Pending" | "Accepted";
};

export const MENTOR_MEETING_REQUESTS: MeetingRequest[] = [
  {
    id: "req_1",
    name: "Karla M.",
    topic: "Career pathing in PM",
    date: "Jun 27, 4:00 PM",
    status: "Accepted",
  },
  {
    id: "req_2",
    name: "Maria S.",
    topic: "Resume review",
    date: "Jun 29, 2:00 PM",
    status: "Pending",
  },
  {
    id: "req_3",
    name: "Tanvi P.",
    topic: "Mock interview",
    date: "Jul 1, 10:00 AM",
    status: "Pending",
  },
  {
    id: "req_4",
    name: "Grace L.",
    topic: "College essay feedback",
    date: "Jul 3, 1:00 PM",
    status: "Pending",
  },
];

export type LiveChatMessage = {
  id: string;
  sender: { name: string; avatar: string };
  content: string;
  timestamp: string;
  isRead?: boolean;
};

export const MENTOR_LIVE_CHAT: LiveChatMessage[] = [
  {
    id: "msg_1",
    sender: { name: "Sofia M.", avatar: "https://i.pravatar.cc/150?u=sofia" },
    content: "Does anyone know if the Google STEP Internship is open to sophomores?",
    timestamp: "10:24 AM",
    isRead: true,
  },
  {
    id: "msg_2",
    sender: { name: "Isabella R.", avatar: "https://i.pravatar.cc/150?u=isabella" },
    content: "Yes! I applied last year as a sophomore. You should go for it!",
    timestamp: "10:25 AM",
  },
  {
    id: "msg_3",
    sender: { name: "Ava K.", avatar: "https://i.pravatar.cc/150?u=ava" },
    content: "Thank you! Also, the deadline is Jun 30 so don't wait until the last minute 😊",
    timestamp: "10:27 AM",
  }
];
