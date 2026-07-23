import { createFileRoute } from "@tanstack/react-router";
import { MentorDashboard } from "../Dashbord/Mentor/MentorDashboard";

export const Route = createFileRoute("/mentor")({
  head: () => ({
    meta: [
      { title: "Mentor Hub — Girls On Campus" },
      {
        name: "description",
        content: "Mentor hub for scheduling 1-on-1 sessions and guiding mentees.",
      },
    ],
  }),
  component: MentorPage,
});

export function MentorPage() {
  return <MentorDashboard />;
}
