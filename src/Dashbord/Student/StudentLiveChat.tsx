import {
  Minus,
  Send,
  Smile,
  Users,
  MessageSquare,
  GraduationCap,
  Plus,
  Reply,
  Flag,
  Ban,
  Bell,
  BellOff,
  Pin,
  Share2,
  X,
  Clock,
  AlertCircle,
  ChevronDown,
  Loader2,
  Trash2,
  MoreVertical,
  Copy,
  Shield,
  Check,
  Search,
  ExternalLink,
  Sparkles,
  UserX,
  Lock,
} from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useLiveChat, LiveChatMessageItem, ChatOpportunityRef } from "@/hooks/useLiveChat";
import { API_BASE } from "@/lib/api";

interface StudentLiveChatProps {
  user?: { name: string; username: string } | null;
  isAdminView?: boolean;
}

const MENTORS_QUICK = [
  {
    name: "Dr. Priya Nandan",
    role: "Senior Product Manager, Google",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80",
  },
  {
    name: "Jasmine Lee",
    role: "Trial Attorney, DOJ Civil Division",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&q=80",
  },
];

const CIRCLES = [
  { icon: "🔬", name: "STEM Squad", desc: "For future engineers & scientists", members: 34 },
  { icon: "🌱", name: "First-Gen Founders", desc: "First-generation college-bound students", members: 21 },
];

const EMOJI_OPTIONS = ["👍", "❤️", "😂", "😮", "🔥", "🎉", "👏", "💡"];

export function StudentLiveChat({ user, isAdminView = false }: StudentLiveChatProps) {
  // Real Live Chat Hook connected to MongoDB & Socket.IO
  const {
    messages,
    room,
    pinnedMessage,
    unreadCount,
    loading,
    hasMore,
    loadingOlder,
    slowModeCountdown,
    isConnected,
    fetchOlderMessages,
    sendMessage,
    toggleReaction,
    deleteMessage,
    reportMessage,
    blockUser,
    markAsRead,
  } = useLiveChat();

  // Tab & UI state
  const [activeTab, setActiveTab] = useState<"chat" | "community" | "mentors">("chat");
  const [isMinimized, setIsMinimized] = useState(false);
  const [showHeaderMenu, setShowHeaderMenu] = useState<boolean>(false);
  const [notificationsMuted, setNotificationsMuted] = useState<boolean>(false);

  // Message Input & Reply state
  const [newMsgText, setNewMsgText] = useState("");
  const [replyTarget, setReplyTarget] = useState<LiveChatMessageItem | null>(null);

  // Opportunity Attachment state
  const [showOpportunityModal, setShowOpportunityModal] = useState<boolean>(false);
  const [publishedOpps, setPublishedOpps] = useState<ChatOpportunityRef[]>([]);
  const [selectedOpp, setSelectedOpp] = useState<ChatOpportunityRef | null>(null);
  const [loadingOpps, setLoadingOpps] = useState<boolean>(false);

  // Menus & Popovers
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);
  const [activeEmojiPickerId, setActiveEmojiPickerId] = useState<string | null>(null);

  // Report Modal state
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [reportTargetMsg, setReportTargetMsg] = useState<LiveChatMessageItem | null>(null);
  const [reportReason, setReportReason] = useState<string>("Spam");
  const [reportDetails, setReportDetails] = useState<string>("");
  const [isSubmittingReport, setIsSubmittingReport] = useState<boolean>(false);

  // Block Modal state
  const [showBlockModal, setShowBlockModal] = useState<boolean>(false);
  const [blockTargetUser, setBlockTargetUser] = useState<{ id: string; name: string; username: string } | null>(null);

  // Admin Control Modal state
  const [showAdminManageModal, setShowAdminManageModal] = useState<boolean>(false);

  // Mentions autocomplete
  const [mentionQuery, setMentionQuery] = useState<string | null>(null);
  const [mentionUsers, setMentionUsers] = useState<{ _id: string; name: string; username: string }[]>([]);
  const [selectedMentions, setSelectedMentions] = useState<string[]>([]);

  // Current logged in user ID from JWT token
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("goc_token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.id) setCurrentUserId(payload.id);
      } catch {}
    }
  }, []);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (activeTab === "chat" && !loadingOlder && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length, activeTab, loadingOlder, scrollToBottom]);

  // Mark as read when active tab is chat
  useEffect(() => {
    if (activeTab === "chat") {
      markAsRead();
    }
  }, [activeTab, markAsRead, messages.length]);

  // Scroll listener for older message pagination
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop === 0 && hasMore && !loadingOlder) {
      fetchOlderMessages();
    }
  };

  // Typing & Mention Detection
  const handleInputChange = async (val: string) => {
    setNewMsgText(val);

    const lastWord = val.split(/\s+/).pop();
    if (lastWord && lastWord.startsWith("@") && lastWord.length > 1) {
      const q = lastWord.substring(1);
      setMentionQuery(q);
      try {
        const token = localStorage.getItem("goc_token");
        const res = await fetch(`${API_BASE}/api/chat/users/search?q=${encodeURIComponent(q)}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setMentionUsers(data);
        }
      } catch {}
    } else {
      setMentionQuery(null);
      setMentionUsers([]);
    }
  };

  const selectMentionUser = (u: { _id: string; name: string; username: string }) => {
    const words = newMsgText.split(/\s+/);
    words.pop();
    const updated = [...words, `@${u.username} `].join(" ");
    setNewMsgText(updated);
    if (!selectedMentions.includes(u._id)) {
      setSelectedMentions([...selectedMentions, u._id]);
    }
    setMentionQuery(null);
    setMentionUsers([]);
  };

  // Open Opportunity Selector
  const openOpportunityModal = async () => {
    setShowOpportunityModal(true);
    setLoadingOpps(true);
    try {
      const res = await fetch(`${API_BASE}/api/opportunities`);
      if (res.ok) {
        const data = await res.json();
        setPublishedOpps(data.opportunities || []);
      }
    } catch (err) {
      toast.error("Failed to load opportunities");
    } fontally: {
      setLoadingOpps(false);
    }
  };

  // Send Message (Real Backend + Socket.IO)
  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!newMsgText.trim() && !selectedOpp) || room?.isPaused || slowModeCountdown > 0) return;

    const res = await sendMessage({
      content: newMsgText.trim(),
      replyToId: replyTarget?._id,
      linkedOpportunityId: selectedOpp?._id,
      mentions: selectedMentions,
    });

    if (res.success) {
      setNewMsgText("");
      setReplyTarget(null);
      setSelectedOpp(null);
      setSelectedMentions([]);
    } else if (res.error) {
      toast.error(res.error);
    }
  };

  // Report Message Submit (Real Backend)
  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportTargetMsg) return;

    setIsSubmittingReport(true);
    const res = await reportMessage(reportTargetMsg._id, reportReason, reportDetails);
    setIsSubmittingReport(false);

    if (res.success) {
      toast.success("Report submitted to GOC moderators.");
      setShowReportModal(false);
      setReportTargetMsg(null);
      setReportDetails("");
    } else {
      toast.error(res.error || "Failed to submit report");
    }
  };

  // Block User Confirm (Real Backend)
  const handleBlockConfirm = async () => {
    if (!blockTargetUser) return;
    const res = await blockUser(blockTargetUser.id);
    if (res?.isBlocked) {
      toast.success(`Blocked ${blockTargetUser.name}`);
    } else {
      toast.success(`Unblocked ${blockTargetUser.name}`);
    }
    setShowBlockModal(false);
    setBlockTargetUser(null);
  };

  // Toggle Notification Mute (Real Backend)
  const handleMuteNotifications = async (duration: number | "end_of_day" | 0, manual = false) => {
    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/chat/mute-notifications`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ durationHours: duration, manualMute: manual }),
      });
      if (res.ok) {
        setNotificationsMuted(duration !== 0 || manual);
        toast.success(duration !== 0 || manual ? "Notifications muted" : "Notifications unmuted");
        setShowHeaderMenu(false);
      }
    } catch {
      toast.error("Error updating notification settings");
    }
  };

  // Copy Message
  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Message copied to clipboard");
    setActiveActionMenuId(null);
  };

  // Delete own message (Real Backend)
  const handleDeleteOwnMsg = async (msgId: string) => {
    await deleteMessage(msgId, "User deleted message");
    toast.success("Message deleted");
    setActiveActionMenuId(null);
  };

  return (
    <aside className="xl:sticky xl:top-4 xl:h-[calc(100vh-2rem)] bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden z-20 font-sans text-gray-900">
      
      {/* ── 1. CHAT HEADER ── */}
      <div className="px-3.5 py-2.5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0 relative">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isConnected
                ? "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]"
                : "bg-amber-400 animate-pulse"
            } shrink-0`}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-[13px] text-gray-900 tracking-tight">
                {room?.name || "Live Chat"}
              </h3>
              {unreadCount > 0 && activeTab !== "chat" && (
                <span className="bg-[#4f46e5] text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {unreadCount}
                </span>
              )}
              {!isConnected && (
                <span className="text-[9.5px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded-md">
                  Connecting...
                </span>
              )}
            </div>
            <p className="text-[10px] text-gray-400 truncate">
              {activeTab === "chat"
                ? isConnected ? "Global Community · Live Connected" : "Connecting to GOC chat server..."
                : activeTab === "community"
                ? "Circles & Events"
                : "Mentors Directory"}
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Mute Notifications Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowHeaderMenu(!showHeaderMenu)}
              className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
              title="Chat Menu"
            >
              {notificationsMuted ? <BellOff className="h-3.5 w-3.5 text-red-500" /> : <MoreVertical className="h-3.5 w-3.5" />}
            </button>

            {showHeaderMenu && (
              <div className="absolute right-0 mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-lg p-1.5 z-50 text-[11px] font-semibold text-gray-700 space-y-1">
                <div className="px-2.5 py-1 text-[10px] uppercase font-extrabold text-gray-400 border-b border-gray-100">
                  Notification Settings
                </div>
                <button
                  onClick={() => handleMuteNotifications(1)}
                  className="w-full text-left px-2.5 py-1.5 hover:bg-gray-50 rounded-lg flex items-center justify-between cursor-pointer"
                >
                  <span>Mute for 1 hour</span>
                </button>
                <button
                  onClick={() => handleMuteNotifications(8)}
                  className="w-full text-left px-2.5 py-1.5 hover:bg-gray-50 rounded-lg flex items-center justify-between cursor-pointer"
                >
                  <span>Mute for 8 hours</span>
                </button>
                <button
                  onClick={() => handleMuteNotifications("end_of_day")}
                  className="w-full text-left px-2.5 py-1.5 hover:bg-gray-50 rounded-lg flex items-center justify-between cursor-pointer"
                >
                  <span>Until end of day</span>
                </button>
                <button
                  onClick={() => handleMuteNotifications(0, true)}
                  className="w-full text-left px-2.5 py-1.5 hover:bg-gray-50 rounded-lg flex items-center justify-between cursor-pointer"
                >
                  <span>Mute until turned back on</span>
                </button>
                {notificationsMuted && (
                  <button
                    onClick={() => handleMuteNotifications(0)}
                    className="w-full text-left px-2.5 py-1.5 bg-indigo-50 text-[#4f46e5] font-bold rounded-lg mt-1 cursor-pointer"
                  >
                    Unmute Notifications
                  </button>
                )}

                {/* Admin Launcher */}
                {isAdminView && (
                  <>
                    <div className="px-2.5 py-1 text-[10px] uppercase font-extrabold text-gray-400 border-t border-gray-100 pt-1 mt-1">
                      Moderation Controls
                    </div>
                    <button
                      onClick={() => {
                        setShowAdminManageModal(true);
                        setShowHeaderMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 bg-gray-900 text-white font-bold rounded-lg flex items-center justify-between cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <Shield className="h-3.5 w-3.5" /> Manage Chat
                      </span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ── 2. PINNED ANNOUNCEMENT AREA ── */}
      {pinnedMessage && activeTab === "chat" && (
        <div className="bg-amber-50/60 border-b border-amber-200/60 px-3.5 py-2 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 text-[11px] min-w-0">
            <Pin className="h-3.5 w-3.5 text-amber-600 shrink-0" />
            <div className="truncate">
              <span className="font-extrabold text-amber-900">PINNED: </span>
              <span className="text-amber-800 font-medium">{pinnedMessage.content}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── 3. CHAT PAUSED BANNER ── */}
      {room?.isPaused && activeTab === "chat" && (
        <div className="bg-red-50 border-b border-red-200 px-3.5 py-2 flex items-center gap-2 shrink-0 text-red-800 text-[11px] font-bold">
          <Lock className="h-3.5 w-3.5 shrink-0 text-red-600" />
          <span>{room.pauseReason || "Chat room is currently paused by moderation."} You can still read history.</span>
        </div>
      )}

      {/* ── 4. MAIN MESSAGE STREAM ── */}
      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto min-h-0 relative p-3.5 space-y-4"
      >
        <AnimatePresence mode="wait">
          {activeTab === "chat" && (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              {/* Loading Pagination Spinner */}
              {loadingOlder && (
                <div className="flex justify-center py-2">
                  <Loader2 className="h-4 w-4 text-[#4f46e5] animate-spin" />
                </div>
              )}

              {/* Skeleton Loading State */}
              {loading && messages.length === 0 ? (
                <div className="space-y-3 py-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-2.5 items-start animate-pulse">
                      <div className="w-7 h-7 rounded-full bg-gray-200 shrink-0" />
                      <div className="space-y-1.5 flex-1">
                        <div className="h-3 bg-gray-200 rounded-md w-24" />
                        <div className="h-8 bg-gray-100 rounded-2xl w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : messages.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400 space-y-2">
                  <MessageSquare className="h-8 w-8 text-gray-300 stroke-[1.5]" />
                  <h4 className="font-extrabold text-xs text-gray-700">No messages yet</h4>
                  <p className="text-[11px] max-w-[200px] leading-relaxed">
                    Start the conversation and connect with the GOC community.
                  </p>
                </div>
              ) : (
                /* Real Messages Stream from Database */
                messages.map((msg) => {
                  const sender = typeof msg.senderId === "object" ? msg.senderId : null;
                  const senderName = msg.displayNameSnapshot || sender?.name || "Campus Member";
                  const senderAvatar =
                    sender?.avatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${senderName}`;
                  const isOwn = sender?._id === currentUserId || msg.displayNameSnapshot === user?.name;

                  return (
                    <div
                      key={msg._id}
                      className={`group relative flex gap-2.5 items-start ${
                        isOwn ? "flex-row-reverse" : ""
                      }`}
                    >
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <img
                          src={senderAvatar}
                          alt={senderName}
                          className="w-7 h-7 rounded-full object-cover border border-gray-200"
                        />
                      </div>

                      {/* Message Content Bubble */}
                      <div
                        className={`flex flex-col gap-0.5 max-w-[82%] ${
                          isOwn ? "items-end" : "items-start"
                        }`}
                      >
                        {/* Sender Info & Role */}
                        <div className="flex items-center gap-1.5 px-0.5">
                          <span className="text-[11px] font-extrabold text-gray-900">
                            {isOwn ? "You" : senderName}
                          </span>
                          {sender?.role === "mentor" && (
                            <span className="bg-indigo-50 text-[#4f46e5] text-[8.5px] font-extrabold px-1.5 py-0.2 rounded-md">
                              MENTOR
                            </span>
                          )}
                          {sender?.role === "admin" && (
                            <span className="bg-gray-900 text-white text-[8.5px] font-extrabold px-1.5 py-0.2 rounded-md">
                              ADMIN
                            </span>
                          )}
                          <span className="text-[9.5px] text-gray-400 font-medium">
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        {/* Reply Quote Preview if exists */}
                        {msg.replyToId && (
                          <div
                            className={`text-[10.5px] px-2.5 py-1 rounded-lg border-l-2 border-[#4f46e5] bg-gray-50 text-gray-600 truncate max-w-full ${
                              isOwn ? "self-end" : "self-start"
                            }`}
                          >
                            <span className="font-bold text-[#4f46e5]">
                              Replying to {msg.replyToId.displayNameSnapshot || "user"}:
                            </span>{" "}
                            {msg.replyToId.isDeleted ? (
                              <span className="italic text-gray-400">[Deleted message]</span>
                            ) : (
                              msg.replyToId.content
                            )}
                          </div>
                        )}

                        {/* Main Message Body */}
                        <div
                          className={`relative text-[12px] px-3 py-2 rounded-2xl leading-relaxed shadow-2xs ${
                            msg.isDeleted
                              ? "bg-gray-100 text-gray-400 italic rounded-2xl border border-gray-200"
                              : isOwn
                              ? "bg-gray-900 text-white rounded-tr-xs"
                              : "bg-gray-50 text-gray-800 border border-gray-200 rounded-tl-xs"
                          }`}
                        >
                          {msg.isDeleted ? (
                            <span>This message was deleted ({msg.deleteReason || "removed"}).</span>
                          ) : (
                            <>
                              {msg.content}

                              {/* Opportunity Card Attachment */}
                              {msg.linkedOpportunityId && (
                                <div className="mt-2 p-2.5 rounded-xl bg-white text-gray-900 border border-gray-200 shadow-2xs space-y-1.5">
                                  <div className="flex gap-2.5 items-start">
                                    {msg.linkedOpportunityId.image ? (
                                      <img
                                        src={msg.linkedOpportunityId.image}
                                        alt={msg.linkedOpportunityId.title}
                                        className="w-10 h-10 rounded-lg object-cover border border-gray-100 shrink-0"
                                      />
                                    ) : (
                                      <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#4f46e5] font-extrabold text-xs shrink-0">
                                        GOC
                                      </div>
                                    )}
                                    <div className="min-w-0 flex-1">
                                      <span className="bg-indigo-50 text-[#4f46e5] text-[9px] font-extrabold px-1.5 py-0.3 rounded-md uppercase">
                                        {msg.linkedOpportunityId.category}
                                      </span>
                                      <h4 className="font-bold text-[11.5px] text-gray-900 truncate mt-0.5">
                                        {msg.linkedOpportunityId.title}
                                      </h4>
                                      <p className="text-[10px] text-gray-500 truncate">
                                        {msg.linkedOpportunityId.organization}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="pt-1 border-t border-gray-100 flex items-center justify-between text-[10px]">
                                    <span className="text-gray-400 font-medium">
                                      Deadline: {msg.linkedOpportunityId.deadline || "TBA"}
                                    </span>
                                    <button className="font-extrabold text-[#4f46e5] hover:underline flex items-center gap-0.5 cursor-pointer">
                                      View Opportunity <ExternalLink className="h-2.5 w-2.5" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        {/* Reaction Chips */}
                        {msg.reactions && msg.reactions.length > 0 && !msg.isDeleted && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {Object.entries(
                              msg.reactions.reduce((acc, r) => {
                                acc[r.emoji] = (acc[r.emoji] || 0) + 1;
                                return acc;
                              }, {} as Record<string, number>)
                            ).map(([emoji, count]) => (
                              <button
                                key={emoji}
                                onClick={() => toggleReaction(msg._id, emoji)}
                                className="bg-white border border-gray-200 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                              >
                                <span>{emoji}</span>
                                <span>{count}</span>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* 3-Dot Hover Action Menu */}
                        {!msg.isDeleted && (
                          <div
                            className={`opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 mt-0.5 text-[10px] ${
                              isOwn ? "flex-row-reverse" : ""
                            }`}
                          >
                            <div className="relative">
                              <button
                                onClick={() =>
                                  setActiveActionMenuId(
                                    activeActionMenuId === msg._id ? null : msg._id
                                  )
                                }
                                className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                                title="Message Actions"
                              >
                                <MoreVertical className="h-3 w-3" />
                              </button>

                              {/* Actions Popover */}
                              {activeActionMenuId === msg._id && (
                                <div
                                  className={`absolute bottom-full mb-1 ${
                                    isOwn ? "right-0" : "left-0"
                                  } w-40 bg-white border border-gray-200 rounded-xl shadow-lg p-1.5 z-40 text-[11px] font-semibold text-gray-700 space-y-0.5`}
                                >
                                  <button
                                    onClick={() => {
                                      setReplyTarget(msg);
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full text-left px-2.5 py-1.5 hover:bg-gray-50 rounded-lg flex items-center gap-2 cursor-pointer"
                                  >
                                    <Reply className="h-3.5 w-3.5 text-gray-500" /> Reply
                                  </button>
                                  <button
                                    onClick={() => {
                                      setActiveEmojiPickerId(msg._id);
                                      setActiveActionMenuId(null);
                                    }}
                                    className="w-full text-left px-2.5 py-1.5 hover:bg-gray-50 rounded-lg flex items-center gap-2 cursor-pointer"
                                  >
                                    <Smile className="h-3.5 w-3.5 text-gray-500" /> React
                                  </button>
                                  <button
                                    onClick={() => handleCopyMessage(msg.content)}
                                    className="w-full text-left px-2.5 py-1.5 hover:bg-gray-50 rounded-lg flex items-center gap-2 cursor-pointer"
                                  >
                                    <Copy className="h-3.5 w-3.5 text-gray-500" /> Copy Text
                                  </button>

                                  {!isOwn && (
                                    <button
                                      onClick={() => {
                                        setReportTargetMsg(msg);
                                        setShowReportModal(true);
                                        setActiveActionMenuId(null);
                                      }}
                                      className="w-full text-left px-2.5 py-1.5 hover:bg-gray-50 rounded-lg flex items-center gap-2 text-amber-600 cursor-pointer"
                                    >
                                      <Flag className="h-3.5 w-3.5" /> Report Message
                                    </button>
                                  )}

                                  {!isOwn && sender?._id && (
                                    <button
                                      onClick={() => {
                                        setBlockTargetUser({
                                          id: sender._id,
                                          name: senderName,
                                          username: sender?.username || "user",
                                        });
                                        setShowBlockModal(true);
                                        setActiveActionMenuId(null);
                                      }}
                                      className="w-full text-left px-2.5 py-1.5 hover:bg-gray-50 rounded-lg flex items-center gap-2 text-red-600 cursor-pointer"
                                    >
                                      <Ban className="h-3.5 w-3.5" /> Block Member
                                    </button>
                                  )}

                                  {isOwn && (
                                    <button
                                      onClick={() => handleDeleteOwnMsg(msg._id)}
                                      className="w-full text-left px-2.5 py-1.5 hover:bg-red-50 rounded-lg flex items-center gap-2 text-red-600 cursor-pointer"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" /> Delete Message
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Emoji Picker Popover */}
                        {activeEmojiPickerId === msg._id && (
                          <div className="bg-white border border-gray-200 shadow-lg rounded-full px-2 py-1 flex items-center gap-1.5 mt-1 z-30">
                            {EMOJI_OPTIONS.map((emoji) => (
                              <button
                                key={emoji}
                                onClick={() => {
                                  toggleReaction(msg._id, emoji);
                                  setActiveEmojiPickerId(null);
                                }}
                                className="hover:scale-125 transition-transform text-sm p-0.5 cursor-pointer"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </motion.div>
          )}

          {/* Community tab */}
          {activeTab === "community" && (
            <motion.div
              key="community"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              <span className="text-[13px] font-black text-gray-900">Your Circles</span>
              <div className="space-y-2">
                {CIRCLES.map((c, i) => (
                  <div key={i} className="p-3 border border-gray-200 rounded-xl bg-white flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{c.icon}</span>
                      <div>
                        <div className="font-bold text-gray-900">{c.name}</div>
                        <div className="text-[10px] text-gray-400">{c.desc}</div>
                      </div>
                    </div>
                    <button className="text-[11px] font-bold text-[#4f46e5] bg-indigo-50 px-2.5 py-1 rounded-full">
                      Open
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Mentors tab */}
          {activeTab === "mentors" && (
            <motion.div
              key="mentors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-3"
            >
              <span className="text-[13px] font-black text-gray-900">Quick Message a Mentor</span>
              {MENTORS_QUICK.map((m, i) => (
                <div key={i} className="p-3 border border-gray-200 rounded-xl bg-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img src={m.img} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="font-bold text-gray-900">{m.name}</div>
                      <div className="text-[10px] text-gray-400">{m.role}</div>
                    </div>
                  </div>
                  <button className="text-[11px] font-bold text-[#4f46e5] bg-indigo-50 px-2.5 py-1 rounded-full">
                    Message
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 5. INPUT & FOOTER AREA ── */}
      {activeTab === "chat" && (
        <div className="px-3.5 py-2.5 border-t border-gray-100 shrink-0 bg-white space-y-2 relative">
          
          {/* Mentions Autocomplete Dropdown */}
          {mentionQuery !== null && mentionUsers.length > 0 && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-50 text-[12px]">
              <div className="text-[10px] font-bold text-gray-400 px-2 mb-1 uppercase">Mention Member</div>
              {mentionUsers.map((u) => (
                <button
                  key={u._id}
                  onClick={() => selectMentionUser(u)}
                  className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded-lg flex items-center justify-between cursor-pointer"
                >
                  <span className="font-bold text-gray-900">{u.name}</span>
                  <span className="text-gray-400 text-[10px]">@{u.username}</span>
                </button>
              ))}
            </div>
          )}

          {/* Reply Context Bar */}
          {replyTarget && (
            <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between text-[11px]">
              <div className="truncate">
                <span className="font-bold text-[#4f46e5]">
                  Replying to {replyTarget.displayNameSnapshot}:
                </span>{" "}
                <span className="text-gray-500">{replyTarget.content}</span>
              </div>
              <button
                onClick={() => setReplyTarget(null)}
                className="text-gray-400 hover:text-gray-700 p-0.5 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Selected Opportunity Attachment Bar */}
          {selectedOpp && (
            <div className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2 truncate">
                <Share2 className="h-3.5 w-3.5 text-[#4f46e5] shrink-0" />
                <span className="font-bold text-gray-900 truncate">
                  Attached: {selectedOpp.title}
                </span>
              </div>
              <button
                onClick={() => setSelectedOpp(null)}
                className="text-gray-400 hover:text-gray-700 p-0.5 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Slow Mode Timer Warning */}
          {slowModeCountdown > 0 && (
            <div className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-[10.5px] font-bold flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-amber-600 animate-spin" />
              <span>Slow mode active. Please wait {slowModeCountdown}s before sending next message.</span>
            </div>
          )}

          {/* Message Form */}
          <form onSubmit={handleSendChat} className="relative flex items-center">
            <input
              type="text"
              value={newMsgText}
              disabled={room?.isPaused || slowModeCountdown > 0}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={
                room?.isPaused
                  ? "Chat room is currently paused..."
                  : slowModeCountdown > 0
                  ? `Wait ${slowModeCountdown}s...`
                  : "Type @ to mention or message..."
              }
              className="w-full bg-gray-50 border border-gray-200 text-[12px] text-gray-900 rounded-full py-2.5 pl-4 pr-20 outline-none focus:bg-white focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/10 transition-all placeholder:text-gray-400 disabled:opacity-50"
            />
            <div className="absolute right-1.5 flex items-center gap-1">
              <button
                type="button"
                onClick={openOpportunityModal}
                disabled={room?.isPaused}
                className="text-gray-400 hover:text-[#4f46e5] p-1 cursor-pointer transition-colors disabled:opacity-50"
                title="Share GOC Opportunity"
              >
                <Share2 className="h-4 w-4" />
              </button>

              <button
                type="submit"
                disabled={
                  (!newMsgText.trim() && !selectedOpp) ||
                  room?.isPaused ||
                  slowModeCountdown > 0
                }
                className="w-7 h-7 bg-gray-900 hover:bg-[#4f46e5] disabled:bg-gray-200 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── 6. BOTTOM NAVIGATION TABS ── */}
      <div className="grid grid-cols-3 text-center border-t border-gray-100 shrink-0 bg-white text-gray-500">
        {[
          { id: "chat", label: "Live Chat", icon: MessageSquare },
          { id: "community", label: "Community", icon: Users },
          { id: "mentors", label: "Mentors", icon: GraduationCap },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as typeof activeTab)}
            className={`py-2.5 text-[10px] font-bold flex flex-col items-center gap-0.5 transition-all cursor-pointer border-t-2 relative ${
              activeTab === id
                ? "text-[#4f46e5] border-[#4f46e5]"
                : "border-transparent hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
            {id === "chat" && unreadCount > 0 && (
              <span className="absolute top-1.5 right-6 w-2 h-2 bg-[#4f46e5] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* ── 7. SHARE OPPORTUNITY MODAL ── */}
      {showOpportunityModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl max-w-md w-full p-4 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
              <h3 className="font-extrabold text-[14px] text-gray-900">Share GOC Opportunity</h3>
              <button onClick={() => setShowOpportunityModal(false)} className="text-gray-400 hover:text-gray-700">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {loadingOpps ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 text-[#4f46e5] animate-spin" />
                </div>
              ) : publishedOpps.length === 0 ? (
                <div className="text-center py-6 text-xs text-gray-500">No published opportunities available.</div>
              ) : (
                publishedOpps.map((opp) => (
                  <div
                    key={opp._id}
                    onClick={() => {
                      setSelectedOpp(opp);
                      setShowOpportunityModal(false);
                    }}
                    className="p-2.5 border border-gray-200 hover:border-[#4f46e5] rounded-xl flex items-center gap-3 cursor-pointer transition-colors bg-white"
                  >
                    {opp.image ? (
                      <img src={opp.image} alt={opp.title} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-[#4f46e5] font-bold text-xs shrink-0">
                        GOC
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] font-bold text-gray-900 truncate">{opp.title}</div>
                      <div className="text-[10px] text-gray-500 truncate">{opp.organization || opp.category}</div>
                    </div>
                    <button className="text-[10px] font-extrabold text-[#4f46e5] bg-indigo-50 px-2.5 py-1 rounded-full cursor-pointer">
                      Select
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── 8. REPORT MESSAGE MODAL ── */}
      {showReportModal && reportTargetMsg && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl max-w-sm w-full p-5 text-gray-900 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-[14px] flex items-center gap-2 text-gray-900">
                <Flag className="h-4 w-4 text-amber-500" /> Report Message
              </h3>
              <button onClick={() => setShowReportModal(false)} className="text-gray-400 hover:text-gray-700">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Reason</label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold outline-none text-gray-800"
                >
                  <option value="Spam">Spam</option>
                  <option value="Harassment">Harassment</option>
                  <option value="Inappropriate Content">Inappropriate Content</option>
                  <option value="Scam">Scam</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Additional details (Optional)</label>
                <textarea
                  rows={3}
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder="Explain why this message violates GOC guidelines..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-medium outline-none text-gray-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingReport}
                  className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-indigo-600 text-white font-bold transition-colors cursor-pointer"
                >
                  {isSubmittingReport ? "Submitting..." : "Submit Report"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── 9. BLOCK MEMBER CONFIRMATION MODAL ── */}
      {showBlockModal && blockTargetUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl max-w-xs w-full p-5 text-gray-900 space-y-3">
            <h3 className="font-extrabold text-[14px]">Block {blockTargetUser.name}?</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              You will no longer see this member's messages based on the platform's block settings.
            </p>

            <div className="flex justify-end gap-2 pt-2 text-xs">
              <button
                onClick={() => setShowBlockModal(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleBlockConfirm}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer"
              >
                Block Member
              </button>
            </div>
          </div>
        </div>
      )}

    </aside>
  );
}
