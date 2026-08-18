import { useState, useEffect } from "react";
import {
  Shield,
  Users,
  FileText,
  Inbox,
  Puzzle,
  BarChart3,
  LifeBuoy,
  Settings,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { API_BASE } from "../../lib/api";

export type AdminTabType = "Overview" | "Live Chat" | "Members" | "Opportunities" | "Submissions" | "Extension" | "Analytics" | "Resources" | "Support" | "Settings";

interface AdminSidebarProps {
  activeTab: AdminTabType;
  setActiveTab: (tab: AdminTabType) => void;
}

export function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const [memberCount, setMemberCount] = useState<string>("...");
  const [opportunityCount, setOpportunityCount] = useState<string>("...");
  const [submissionCount, setSubmissionCount] = useState<string>("...");
  const [pendingReportCount, setPendingReportCount] = useState<string>("0");

  useEffect(() => {
    const fetchMemberCount = async () => {
      try {
        const token = localStorage.getItem("goc_token");
        const res = await fetch(`${API_BASE}/api/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setMemberCount(data.count.toString());
        }
      } catch (err) {
        setMemberCount("0");
      }
    };
    
    const fetchOpportunityCount = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/opportunities`);
        const data = await res.json();
        if (res.ok) {
          setOpportunityCount(data.count.toString());
        }
      } catch (err) {
        setOpportunityCount("0");
      }
    };

    const fetchSubmissionCount = async () => {
      try {
        const token = localStorage.getItem("goc_token");
        const res = await fetch(`${API_BASE}/api/users/submissions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setSubmissionCount((data.submissions?.length || 0).toString());
        }
      } catch (err) {
        setSubmissionCount("0");
      }
    };

    const fetchReportCount = async () => {
      try {
        const token = localStorage.getItem("goc_token");
        const res = await fetch(`${API_BASE}/api/admin/chat/reports?status=Pending`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setPendingReportCount(data.length.toString());
        }
      } catch (err) {
        setPendingReportCount("0");
      }
    };

    fetchMemberCount();
    fetchOpportunityCount();
    fetchSubmissionCount();
    fetchReportCount();
  }, []);

  const tabs = [
    { id: "Overview",     label: "Overview",       icon: Shield },
    { id: "Live Chat",    label: "Live Chat",      icon: MessageSquare, badge: pendingReportCount !== "0" ? pendingReportCount : undefined },
    { id: "Members",      label: "Members",        icon: Users,      badge: memberCount },
    { id: "Opportunities",label: "Opportunities",  icon: FileText,   badge: opportunityCount },
    { id: "Submissions",  label: "Submissions",    icon: Inbox,      badge: submissionCount },
    { id: "Resources",    label: "Resources",      icon: BookOpen },
    { id: "Extension",    label: "Extension Data", icon: Puzzle },
    { id: "Analytics",    label: "Analytics",      icon: BarChart3 },
    { id: "Support",      label: "Support",        icon: LifeBuoy,   badge: "2" },
    { id: "Settings",     label: "System Settings",icon: Settings },
  ] as const;

  return (
    <aside className="xl:sticky xl:top-6 flex flex-col justify-between overflow-y-auto z-20 h-full font-sans">
      <div>
        {/* Logo */}
        <Link to="/" className="flex flex-col items-start mb-8 px-4 cursor-pointer group">
          <div className="flex items-center gap-2">
            <span className="font-serif font-black italic text-[24px] text-[#111827] tracking-tight">goc</span>
            <span className="bg-[#eef2ff] text-[#4f46e5] text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-widest">
              ADMIN
            </span>
          </div>
          <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-0.5">
            CONTROL PANEL
          </span>
        </Link>

        {/* Nav */}
        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTabType)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.96 }}
                className={`w-full flex items-center justify-between px-4 py-3 text-[13px] font-bold rounded-r-full rounded-l-md transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#4f46e5] to-[#6366f1] text-white shadow-[0_4px_12px_rgba(79,70,229,0.3)]"
                    : "text-gray-500 hover:bg-gray-100/80 hover:text-[#111827]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? "text-white" : "text-gray-400"}`} />
                  <span>{tab.label}</span>
                </div>
                {"badge" in tab && tab.badge && (
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#eef2ff] text-[#4f46e5]"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
