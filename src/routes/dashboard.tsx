import { createFileRoute, redirect } from "@tanstack/react-router";
import { StudentDashboard } from "../Dashbord/Student/StudentDashboard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — Girls On Campus" },
      {
        name: "description",
        content: "Access scholarships, internships, saved opportunities, deadlines and Girl Chat.",
      },
    ],
  }),
  beforeLoad: () => {
    // Only runs in browser — localStorage doesn't exist on the server
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem("goc_user");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        if (user?.role === "admin") {
          throw redirect({ to: "/admin" });
        }
        if (user?.role === "mentor") {
          throw redirect({ to: "/mentor" });
        }
      } catch (e: any) {
        if (e?.isRedirect) throw e;
      }
    }
  },
  component: DashboardPage,
});

export function DashboardPage() {
  return <StudentDashboard />;
}
