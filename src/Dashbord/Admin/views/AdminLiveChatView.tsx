import { useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  Shield,
  Flag,
  AlertTriangle,
  Pause,
  Play,
  Clock,
  Pin,
  Search,
  Filter,
  UserX,
  VolumeX,
  Ban,
  RotateCcw,
  Trash2,
  CheckCircle,
  FileText,
  Loader2,
  Calendar,
  ChevronRight,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { API_BASE } from "@/lib/api";

export function AdminLiveChatView() {
  const [activeSubTab, setActiveSubTab] = useState<
    "stream" | "search" | "reports" | "flags" | "members" | "audit"
  >("stream");

  // Room config state
  const [roomConfig, setRoomConfig] = useState<{
    isPaused: boolean;
    pauseReason?: string;
    slowModeEnabled: boolean;
    slowModeSeconds: number;
    pinnedMessageId?: string;
  } | null>(null);

  // Messages & Search state
  const [adminMessages, setAdminMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterSender, setFilterSender] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  // Reports state
  const [reports, setReports] = useState<any[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);

  // Flags state
  const [flags, setFlags] = useState<any[]>([]);
  const [loadingFlags, setLoadingFlags] = useState(false);

  // Audit Logs state
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loadingAudit, setLoadingAudit] = useState(false);

  // Action Modals State
  const [actionUserModal, setActionUserModal] = useState<{
    user: any;
    actionType: "warn" | "mute" | "restrict" | "remove_access" | "restore";
  } | null>(null);
  const [actionReason, setActionReason] = useState("");
  const [actionDuration, setActionDuration] = useState("60"); // mins/hours
  const [isSubmittingAction, setIsSubmittingAction] = useState(false);

  // Pause Modal
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [pauseReasonInput, setPauseReasonInput] = useState("");

  // Helper Headers
  const getAdminHeaders = useCallback(() => {
    const token = localStorage.getItem("goc_token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }, []);

  // Fetch admin messages / stream
  const fetchAdminMessages = useCallback(async () => {
    try {
      setLoadingMessages(true);
      let url = `${API_BASE}/api/admin/chat/messages?limit=50`;
      if (searchKeyword) url += `&keyword=${encodeURIComponent(searchKeyword)}`;
      if (filterSender) url += `&senderId=${encodeURIComponent(filterSender)}`;
      if (filterStartDate) url += `&startDate=${encodeURIComponent(filterStartDate)}`;
      if (filterEndDate) url += `&endDate=${encodeURIComponent(filterEndDate)}`;

      const res = await fetch(url, { headers: getAdminHeaders() });
      if (res.ok) {
        const data = await res.json();
        setAdminMessages(data.messages || []);
      }
    } catch (err) {
      console.error("Error fetching admin messages:", err);
    } finally {
      setLoadingMessages(false);
    }
  }, [searchKeyword, filterSender, filterStartDate, filterEndDate, getAdminHeaders]);

  // Fetch reports
  const fetchReports = useCallback(async () => {
    try {
      setLoadingReports(true);
      const res = await fetch(`${API_BASE}/api/admin/chat/reports?status=Pending`, {
        headers: getAdminHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setReports(data || []);
      }
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoadingReports(false);
    }
  }, [getAdminHeaders]);

  // Fetch flags
  const fetchFlags = useCallback(async () => {
    try {
      setLoadingFlags(true);
      const res = await fetch(`${API_BASE}/api/admin/chat/flags`, {
        headers: getAdminHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setFlags(data || []);
      }
    } catch (err) {
      console.error("Error fetching flags:", err);
    } finally {
      setLoadingFlags(false);
    }
  }, [getAdminHeaders]);

  // Fetch Audit Logs
  const fetchAuditLogs = useCallback(async () => {
    try {
      setLoadingAudit(true);
      const res = await fetch(`${API_BASE}/api/admin/chat/audit-logs`, {
        headers: getAdminHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setAuditLogs(data || []);
      }
    } catch (err) {
      console.error("Error fetching audit logs:", err);
    } finally {
      setLoadingAudit(false);
    }
  }, [getAdminHeaders]);

  // Fetch global room config
  const fetchRoomConfig = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/chat/rooms/global/messages?limit=1`, {
        headers: getAdminHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.room) setRoomConfig(data.room);
      }
    } catch (err) {
      console.error("Error fetching room config:", err);
    }
  }, [getAdminHeaders]);

  useEffect(() => {
    fetchRoomConfig();
    if (activeSubTab === "stream" || activeSubTab === "search") fetchAdminMessages();
    if (activeSubTab === "reports") fetchReports();
    if (activeSubTab === "flags") fetchFlags();
    if (activeSubTab === "audit") fetchAuditLogs();
  }, [activeSubTab, fetchAdminMessages, fetchReports, fetchFlags, fetchAuditLogs, fetchRoomConfig]);

  // Handle Pause/Resume Room
  const handleTogglePause = async () => {
    try {
      const endpoint = roomConfig?.isPaused
        ? `${API_BASE}/api/admin/chat/room/resume`
        : `${API_BASE}/api/admin/chat/room/pause`;

      const body = roomConfig?.isPaused ? {} : { reason: pauseReasonInput || "Paused by Admin" };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: getAdminHeaders(),
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        setRoomConfig(data.room);
        toast.success(roomConfig?.isPaused ? "Chat room resumed" : "Chat room paused");
        setShowPauseModal(false);
        setPauseReasonInput("");
      }
    } catch {
      toast.error("Failed to update room state");
    }
  };

  // Handle Slow Mode
  const handleSetSlowMode = async (seconds: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/chat/room/slow-mode`, {
        method: "PATCH",
        headers: getAdminHeaders(),
        body: JSON.stringify({
          slowModeEnabled: seconds > 0,
          slowModeSeconds: seconds,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setRoomConfig(data.room);
        toast.success(seconds > 0 ? `Slow mode set to ${seconds}s` : "Slow mode disabled");
      }
    } catch {
      toast.error("Failed to update slow mode");
    }
  };

  // Pin Message
  const handlePinMessage = async (msgId: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/chat/messages/${msgId}/pin`, {
        method: "POST",
        headers: getAdminHeaders(),
      });
      if (res.ok) {
        toast.success("Message pinned as announcement");
        fetchRoomConfig();
      }
    } catch {
      toast.error("Failed to pin message");
    }
  };

  // Remove Message
  const handleRemoveMessage = async (msgId: string) => {
    const reason = prompt("Enter reason for removing message:");
    if (!reason) return;

    try {
      const res = await fetch(`${API_BASE}/api/admin/chat/messages/${msgId}/remove`, {
        method: "POST",
        headers: getAdminHeaders(),
        body: JSON.stringify({ reason }),
      });
      if (res.ok) {
        toast.success("Message removed");
        fetchAdminMessages();
      }
    } catch {
      toast.error("Failed to remove message");
    }
  };

  // Restore Message
  const handleRestoreMessage = async (msgId: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/chat/messages/${msgId}/restore`, {
        method: "POST",
        headers: getAdminHeaders(),
        body: JSON.stringify({ reason: "Admin restored message" }),
      });
      if (res.ok) {
        toast.success("Message restored");
        fetchAdminMessages();
      }
    } catch {
      toast.error("Failed to restore message");
    }
  };

  // Member Action Submission
  const handleUserActionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionUserModal || !actionReason) {
      toast.error("Reason is required for member moderation action");
      return;
    }

    setIsSubmittingAction(true);
    const userId = actionUserModal.user._id;
    let endpoint = "";
    let body: any = { reason: actionReason };

    switch (actionUserModal.actionType) {
      case "warn":
        endpoint = `${API_BASE}/api/admin/chat/members/${userId}/warn`;
        break;
      case "mute":
        endpoint = `${API_BASE}/api/admin/chat/members/${userId}/mute`;
        body.durationMinutes = parseInt(actionDuration) || 60;
        break;
      case "restrict":
        endpoint = `${API_BASE}/api/admin/chat/members/${userId}/restrict`;
        body.durationHours = parseFloat(actionDuration) || 24;
        break;
      case "remove_access":
        endpoint = `${API_BASE}/api/admin/chat/members/${userId}/remove-access`;
        break;
      case "restore":
        endpoint = `${API_BASE}/api/admin/chat/members/${userId}/restore`;
        break;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: getAdminHeaders(),
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(data.message || "Action completed");
        setActionUserModal(null);
        setActionReason("");
        fetchAdminMessages();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to execute action");
      }
    } catch {
      toast.error("Error executing moderation action");
    } finally {
      setIsSubmittingAction(false);
    }
  };

  // Update report status
  const handleResolveReport = async (reportId: string, status: "Action Taken" | "Dismissed") => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/chat/reports/${reportId}/status`, {
        method: "PATCH",
        headers: getAdminHeaders(),
        body: JSON.stringify({ status, actionTaken: `Marked as ${status}` }),
      });
      if (res.ok) {
        toast.success(`Report marked as ${status}`);
        fetchReports();
      }
    } catch {
      toast.error("Error resolving report");
    }
  };

  return (
    <div className="space-[#2a2026] space-y-6 font-sans">
      {/* Header & Overview Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-[#4f46e5]" />
            <h1 className="text-xl font-black text-gray-900">Live Chat Moderation Control</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1 font-medium">
            Monitor real-time conversations, review reports, set slow mode, and manage member access.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Pause / Resume Button */}
          <button
            onClick={() => {
              if (roomConfig?.isPaused) handleTogglePause();
              else setShowPauseModal(true);
            }}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer ${
              roomConfig?.isPaused
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-amber-500 hover:bg-amber-600 text-white"
            }`}
          >
            {roomConfig?.isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            <span>{roomConfig?.isPaused ? "Resume Chat" : "Pause Chat Room"}</span>
          </button>

          {/* Slow Mode Selector */}
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 p-1 rounded-xl text-xs font-bold text-gray-700">
            <Clock className="h-3.5 w-3.5 text-gray-500 ml-1" />
            <span>Slow Mode:</span>
            {[0, 10, 30, 60].map((sec) => (
              <button
                key={sec}
                onClick={() => handleSetSlowMode(sec)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  (sec === 0 && !roomConfig?.slowModeEnabled) ||
                  (roomConfig?.slowModeEnabled && roomConfig?.slowModeSeconds === sec)
                    ? "bg-[#4f46e5] text-white"
                    : "hover:bg-gray-200 text-gray-600"
                }`}
              >
                {sec === 0 ? "Off" : `${sec}s`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
        {[
          { id: "stream", label: "Live Stream", icon: MessageSquare },
          { id: "search", label: "Search & Filter", icon: Search },
          { id: "reports", label: "Report Queue", icon: Flag, badge: reports.length },
          { id: "flags", label: "Automated Flags", icon: AlertTriangle, badge: flags.length },
          { id: "audit", label: "Audit Logs", icon: FileText },
        ].map(({ id, label, icon: Icon, badge }) => (
          <button
            key={id}
            onClick={() => setActiveSubTab(id as typeof activeSubTab)}
            className={`px-4 py-2 text-xs font-extrabold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === id
                ? "bg-[#4f46e5] text-white shadow-xs"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{label}</span>
            {badge !== undefined && badge > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                {badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}

      {/* ── 1. LIVE STREAM & SEARCH ── */}
      {(activeSubTab === "stream" || activeSubTab === "search") && (
        <div className="space-y-4">
          {/* Filters Bar */}
          {activeSubTab === "search" && (
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Search keyword..."
                className="bg-gray-50 border border-gray-200 p-2.5 rounded-lg font-medium outline-none focus:border-[#4f46e5]"
              />
              <input
                type="date"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
                className="bg-gray-50 border border-gray-200 p-2.5 rounded-lg font-medium outline-none"
              />
              <input
                type="date"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
                className="bg-gray-50 border border-gray-200 p-2.5 rounded-lg font-medium outline-none"
              />
              <button
                onClick={fetchAdminMessages}
                className="bg-[#4f46e5] text-white font-bold rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 hover:bg-indigo-700 cursor-pointer"
              >
                <Search className="h-4 w-4" /> Filter Messages
              </button>
            </div>
          )}

          {/* Messages Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            {loadingMessages ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 text-[#4f46e5] animate-spin" />
              </div>
            ) : adminMessages.length === 0 ? (
              <div className="text-center py-12 text-xs text-gray-500">No chat messages found.</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {adminMessages.map((msg) => {
                  const sender = msg.senderId;
                  const isDeleted = msg.isDeleted;

                  return (
                    <div
                      key={msg._id}
                      className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors ${
                        isDeleted ? "bg-red-50/50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <img
                          src={
                            sender?.avatar ||
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.displayNameSnapshot}`
                          }
                          alt={msg.displayNameSnapshot}
                          className="w-9 h-9 rounded-full object-cover border border-gray-200 shrink-0"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-xs text-gray-900">
                              {msg.displayNameSnapshot || sender?.name}
                            </span>
                            <span className="text-[10px] text-gray-500">
                              @{sender?.username || "student"}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              {new Date(msg.createdAt).toLocaleString()}
                            </span>
                            {sender?.chatMutedUntil && new Date(sender.chatMutedUntil) > new Date() && (
                              <span className="bg-amber-100 text-amber-700 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                                MUTED
                              </span>
                            )}
                            {sender?.chatAccessRevoked && (
                              <span className="bg-red-100 text-red-700 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                                ACCESS REVOKED
                              </span>
                            )}
                          </div>

                          <div
                            className={`text-xs mt-1 ${
                              isDeleted ? "line-through text-red-500 italic" : "text-gray-800"
                            }`}
                          >
                            {msg.content}
                          </div>

                          {msg.linkedOpportunityId && (
                            <div className="mt-1 text-[10px] bg-indigo-50 text-[#4f46e5] px-2 py-1 rounded-md inline-block font-bold">
                              Linked Opportunity: {msg.linkedOpportunityId.title}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Admin Quick Action buttons */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handlePinMessage(msg._id)}
                          className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold cursor-pointer"
                          title="Pin Announcement"
                        >
                          <Pin className="h-3.5 w-3.5" />
                        </button>

                        {isDeleted ? (
                          <button
                            onClick={() => handleRestoreMessage(msg._id)}
                            className="px-2.5 py-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <RotateCcw className="h-3.5 w-3.5" /> Restore
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRemoveMessage(msg._id)}
                            className="px-2.5 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Remove
                          </button>
                        )}

                        {/* Member Action Trigger */}
                        {sender && (
                          <button
                            onClick={() => setActionUserModal({ user: sender, actionType: "mute" })}
                            className="px-2.5 py-1.5 bg-indigo-50 text-[#4f46e5] hover:bg-indigo-100 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Shield className="h-3.5 w-3.5" /> Moderate Member
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── 2. REPORTS QUEUE ── */}
      {activeSubTab === "reports" && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-4">
          <h2 className="font-extrabold text-sm text-gray-900 mb-4 flex items-center gap-2">
            <Flag className="h-4 w-4 text-red-500" /> User Reported Messages Queue
          </h2>

          {loadingReports ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 text-[#4f46e5] animate-spin" />
            </div>
          ) : reports.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-500">No pending reports to review.</div>
          ) : (
            <div className="space-y-3">
              {reports.map((r) => (
                <div
                  key={r._id}
                  className="p-4 border border-gray-200 rounded-xl bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full text-[10px]">
                        {r.reason}
                      </span>
                      <span className="text-gray-500 font-bold">
                        Reported by {r.reportedBy?.name || "Member"} (@{r.reportedBy?.username})
                      </span>
                      <span className="text-gray-400 text-[10px]">
                        {new Date(r.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="p-2.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-800 font-medium">
                      <span className="font-bold text-[#4f46e5]">
                        Message from @{r.messageId?.senderId?.username}:
                      </span>{" "}
                      {r.messageId?.content || "[Message unavailable]"}
                    </div>

                    {r.details && (
                      <div className="text-[11px] text-gray-600 italic">
                        Reporter note: "{r.details}"
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {r.messageId && !r.messageId.isDeleted && (
                      <button
                        onClick={() => handleRemoveMessage(r.messageId._id)}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Remove Message
                      </button>
                    )}
                    {r.messageId?.senderId && (
                      <button
                        onClick={() =>
                          setActionUserModal({ user: r.messageId.senderId, actionType: "mute" })
                        }
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Mute User
                      </button>
                    )}
                    <button
                      onClick={() => handleResolveReport(r._id, "Action Taken")}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Resolve
                    </button>
                    <button
                      onClick={() => handleResolveReport(r._id, "Dismissed")}
                      className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── 3. AUTOMATED FLAGS ── */}
      {activeSubTab === "flags" && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-4">
          <h2 className="font-extrabold text-sm text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" /> Automated Moderation Flags
          </h2>

          {loadingFlags ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 text-[#4f46e5] animate-spin" />
            </div>
          ) : flags.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-500">No automated flags detected.</div>
          ) : (
            <div className="space-y-3">
              {flags.map((f) => (
                <div key={f._id} className="p-4 border border-amber-200 bg-amber-50/40 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gray-900">
                      User: {f.senderId?.name} (@{f.senderId?.username})
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {new Date(f.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="p-2 bg-white border border-amber-200 rounded-lg text-xs text-gray-800">
                    {f.content}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap text-[10px]">
                    {f.moderationFlags?.map((fl: any, i: number) => (
                      <span key={i} className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                        {fl.flagType}: {fl.reason}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── 4. AUDIT LOGS ── */}
      {activeSubTab === "audit" && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-4">
          <h2 className="font-extrabold text-sm text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#4f46e5]" /> Admin Moderation Audit Trail
          </h2>

          {loadingAudit ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 text-[#4f46e5] animate-spin" />
            </div>
          ) : auditLogs.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-500">No audit logs recorded yet.</div>
          ) : (
            <div className="divide-y divide-gray-100 text-xs">
              {auditLogs.map((log) => (
                <div key={log._id} className="py-2.5 flex items-center justify-between gap-4">
                  <div>
                    <span className="font-bold text-gray-900">{log.actor?.name || "Admin"}</span>{" "}
                    <span className="bg-indigo-50 text-[#4f46e5] font-extrabold px-1.5 py-0.5 rounded-md text-[10px]">
                      {log.action}
                    </span>{" "}
                    <span className="text-gray-600">Target: {log.targetType} ({log.targetId})</span>
                    {log.reason && <p className="text-gray-500 text-[11px] mt-0.5">Reason: {log.reason}</p>}
                  </div>
                  <span className="text-gray-400 text-[10px] shrink-0">
                    {new Date(log.createdAt).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── MEMBER ACTION MODAL ── */}
      {actionUserModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl max-w-md w-full p-6">
            <h3 className="font-black text-base text-gray-900 mb-1">
              Moderate Member: {actionUserModal.user.name}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Select action for @{actionUserModal.user.username}
            </p>

            <form onSubmit={handleUserActionSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Action Type</label>
                <select
                  value={actionUserModal.actionType}
                  onChange={(e) =>
                    setActionUserModal({
                      ...actionUserModal,
                      actionType: e.target.value as any,
                    })
                  }
                  className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl font-bold text-gray-800 outline-none"
                >
                  <option value="warn">Warn Member</option>
                  <option value="mute">Mute Member (Temporarily)</option>
                  <option value="restrict">Restrict Posting (Temporarily)</option>
                  <option value="remove_access">Revoke Chat Access (Permanent)</option>
                  <option value="restore">Restore Access / Clear Mutes</option>
                </select>
              </div>

              {(actionUserModal.actionType === "mute" || actionUserModal.actionType === "restrict") && (
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Duration ({actionUserModal.actionType === "mute" ? "Minutes" : "Hours"})
                  </label>
                  <input
                    type="number"
                    value={actionDuration}
                    onChange={(e) => setActionDuration(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl font-bold text-gray-800 outline-none"
                  />
                </div>
              )}

              <div>
                <label className="font-bold text-gray-700 block mb-1">Reason (Required for audit)</label>
                <textarea
                  rows={3}
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  placeholder="State the rationale for this action..."
                  className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl font-medium text-gray-800 outline-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActionUserModal(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingAction}
                  className="px-4 py-2 rounded-xl bg-[#4f46e5] hover:bg-indigo-700 text-white font-bold shadow-xs cursor-pointer"
                >
                  {isSubmittingAction ? "Executing..." : "Execute Action"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── PAUSE ROOM MODAL ── */}
      {showPauseModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl max-w-md w-full p-6">
            <h3 className="font-black text-base text-gray-900 mb-1">Pause Live Chat Room</h3>
            <p className="text-xs text-gray-500 mb-4">
              Users will be unable to send new messages while chat is paused.
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Announcement / Pause Reason</label>
                <input
                  type="text"
                  value={pauseReasonInput}
                  onChange={(e) => setPauseReasonInput(e.target.value)}
                  placeholder="e.g. Chat paused temporarily for scheduled maintenance."
                  className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl font-medium text-gray-800 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowPauseModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTogglePause}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold cursor-pointer"
                >
                  Confirm Pause Room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
