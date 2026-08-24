import { createFileRoute, redirect } from "@tanstack/react-router";
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
  beforeLoad: () => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem("goc_user");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        if (user?.role === "admin") throw redirect({ to: "/admin" });
        if (user?.role !== "mentor") throw redirect({ to: "/dashboard" });
      } catch (e: any) {
        if (e?.isRedirect) throw e;
      }
    } else {
      throw redirect({ to: "/login" });
    }
  },
  component: MentorPage,
});

export function MentorPage() {
  return <MentorDashboard />;
}
