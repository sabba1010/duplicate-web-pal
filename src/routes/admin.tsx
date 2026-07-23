import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboard } from "../Dashbord/Admin/AdminDashboard";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — Girls On Campus" },
      {
        name: "description",
        content: "Admin management portal for user accounts, mentors, and scholarship approvals.",
      },
    ],
  }),
  component: AdminPage,
});

export function AdminPage() {
  return <AdminDashboard />;
}
