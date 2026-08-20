import { createFileRoute, redirect } from "@tanstack/react-router";
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
  beforeLoad: () => {
    const stored = localStorage.getItem("goc_user");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        if (user?.role === "mentor") throw redirect({ to: "/mentor" });
        if (user?.role !== "admin") throw redirect({ to: "/dashboard" });
      } catch (e: any) {
        if (e?.isRedirect) throw e;
      }
    } else {
      throw redirect({ to: "/login" });
    }
  },
  component: AdminPage,
});

export function AdminPage() {
  return <AdminDashboard />;
}
