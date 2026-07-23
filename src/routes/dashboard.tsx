import { createFileRoute } from "@tanstack/react-router";
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
  component: DashboardPage,
});

export function DashboardPage() {
  return <StudentDashboard />;
}
