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
    // Redirect to correct dashboard based on user role
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
        // If it's a redirect, re-throw it
        if (e?.isRedirect) throw e;
        // Otherwise it was a JSON parse error — ignore
      }
    }
  },
  component: DashboardPage,
});

export function DashboardPage() {
  return <StudentDashboard />;
}
