import { useState, useEffect, useCallback, useRef } from "react";
import { getSocket } from "@/lib/socket";
import { API_BASE } from "@/lib/api";

export interface ChatUserRef {
  _id: string;
  name: string;
  username: string;
  avatar?: string;
  role?: string;
}

export interface ChatOpportunityRef {
  _id: string;
  title: string;
  organization?: string;
  category: string;
  deadline?: string;
  image?: string;
  description?: string;
  location?: string;
  link?: string;
  status?: string;
}

export interface ChatReaction {
  userId: string;
  emoji: string;
  createdAt: string;
}

export interface LiveChatMessageItem {
  _id: string;
  roomId: string;
  senderId: ChatUserRef;
  displayNameSnapshot: string;
  content: string;
  replyToId?: {
    _id: string;
    content: string;
    displayNameSnapshot: string;
    senderId?: { name: string; username?: string };
    isDeleted?: boolean;
  } | null;
  linkedOpportunityId?: ChatOpportunityRef | null;
  attachmentUrl?: string;
  attachmentType?: string;
  attachmentName?: string;
  mentions?: ChatUserRef[];
  reactions: ChatReaction[];
  isEdited?: boolean;
  isDeleted?: boolean;
  deleteReason?: string;
  moderationStatus?: "clean" | "flagged" | "removed";
  createdAt: string;
  updatedAt: string;
}

export interface ChatRoomData {
  _id: string;
  name: string;
  type: string;
  slowModeEnabled: boolean;
  slowModeSeconds: number;
  isPaused: boolean;
  pauseReason?: string;
  pinnedMessageId?: string | null;
}

export interface ConversationItem {
  roomId: string;
  name: string;
  type: "global" | "direct" | "circle";
  description?: string;
  icon?: string;
  recipient?: ChatUserRef | null;
  participantsCount?: number;
  isMember?: boolean;
  latestMessage?: LiveChatMessageItem | null;
  unreadCount: number;
  updatedAt: string;
}

export interface CircleItem {
  _id: string;
  roomId: string;
  name: string;
  description: string;
  icon: string;
  type: "circle";
  membersCount: number;
  isMember: boolean;
}

export function useLiveChat() {
  const [messages, setMessages] = useState<LiveChatMessageItem[]>([]);
  const [room, setRoom] = useState<ChatRoomData | null>(null);
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [circles, setCircles] = useState<CircleItem[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string>("global");
  const [pinnedMessage, setPinnedMessage] = useState<LiveChatMessageItem | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loadingOlder, setLoadingOlder] = useState<boolean>(false);
  const [slowModeCountdown, setSlowModeCountdown] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getHeaders = useCallback(() => {
    const token = localStorage.getItem("goc_token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }, []);

  // Fetch conversations list
  const fetchConversations = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/chat/conversations`, { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        setConversations(data || []);
      }
    } catch (err) {
      console.error("Error fetching conversations:", err);
    }
  }, [getHeaders]);

  // Fetch circles list
  const fetchCircles = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/chat/circles`, { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        setCircles(data || []);
      }
    } catch (err) {
      console.error("Error fetching circles:", err);
    }
  }, [getHeaders]);

  // Fetch messages for active room
  const fetchMessages = useCallback(async (targetRoomId?: string) => {
    try {
      setLoading(true);
      const roomToFetch = targetRoomId || activeRoomId;
      const url =
        roomToFetch === "global" || !roomToFetch
          ? `${API_BASE}/api/chat/rooms/global/messages?limit=30`
          : `${API_BASE}/api/chat/rooms/${roomToFetch}/messages?limit=30`;

      const res = await fetch(url, { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
        setHasMore(data.hasMore || false);
        setNextCursor(data.nextCursor || null);
        if (data.room) {
          setRoom(data.room);
          if (data.room._id) setActiveRoomId(data.room._id);
        }
      }
    } catch (err) {
      console.error("Error fetching chat messages:", err);
    } finally {
      setLoading(false);
    }
  }, [getHeaders, activeRoomId]);

  // Fetch older messages (pagination)
  const fetchOlderMessages = useCallback(async () => {
    if (!hasMore || !nextCursor || loadingOlder) return;

    try {
      setLoadingOlder(true);
      const url =
        activeRoomId === "global"
          ? `${API_BASE}/api/chat/rooms/global/messages?cursor=${nextCursor}&limit=30`
          : `${API_BASE}/api/chat/rooms/${activeRoomId}/messages?cursor=${nextCursor}&limit=30`;

      const res = await fetch(url, { headers: getHeaders() });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...(data.messages || []), ...prev]);
        setHasMore(data.hasMore || false);
        setNextCursor(data.nextCursor || null);
      }
    } catch (err) {
      console.error("Error fetching older messages:", err);
    } finally {
      setLoadingOlder(false);
    }
  }, [hasMore, nextCursor, loadingOlder, getHeaders, activeRoomId]);

  // Switch Room
  const switchRoom = useCallback(
    (targetRoomId: string) => {
      setActiveRoomId(targetRoomId);
      fetchMessages(targetRoomId);
      const socket = getSocket();
      if (socket && socket.connected) {
        socket.emit("chat:join", { roomId: targetRoomId });
      }
    },
    [fetchMessages]
  );

  // Start direct conversation with user
  const startDirectConversation = useCallback(
    async (recipientId: string) => {
      try {
        const res = await fetch(`${API_BASE}/api/chat/conversations/direct`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ recipientId }),
        });
        if (res.ok) {
          const data = await res.json();
          await fetchConversations();
          if (data.roomId) {
            switchRoom(data.roomId);
          }
          return { success: true, conversation: data };
        } else {
          const errData = await res.json();
          return { success: false, error: errData.message };
        }
      } catch (err) {
        return { success: false, error: "Network error starting conversation" };
      }
    },
    [getHeaders, fetchConversations, switchRoom]
  );

  // Join/leave circle
  const joinCircle = useCallback(
    async (circleId: string) => {
      try {
        const res = await fetch(`${API_BASE}/api/chat/circles/${circleId}/join`, {
          method: "POST",
          headers: getHeaders(),
        });
        if (res.ok) {
          await fetchCircles();
          await fetchConversations();
          return true;
        }
        return false;
      } catch (err) {
        console.error("Error joining circle:", err);
        return false;
      }
    },
    [getHeaders, fetchCircles, fetchConversations]
  );

  // Fetch total unread count
  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/chat/unread-count`, {
        headers: getHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (err) {
      console.error("Error fetching unread count:", err);
    }
  }, [getHeaders]);

  // Handle countdown timer for slow mode / mutes
  const triggerCountdown = useCallback((seconds: number) => {
    setSlowModeCountdown(seconds);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setSlowModeCountdown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const activeRoomIdRef = useRef<string>(activeRoomId);
  useEffect(() => {
    activeRoomIdRef.current = activeRoomId;
  }, [activeRoomId]);

  // Connect Socket and listen to real-time events with auto-sync
  useEffect(() => {
    fetchMessages(activeRoomIdRef.current);
    fetchConversations();
    fetchCircles();
    fetchUnreadCount();

    const socket = getSocket();

    const onConnect = () => {
      setIsConnected(true);
      const currentRoom = activeRoomIdRef.current || "global";
      socket.emit("chat:join", { roomId: currentRoom });
      fetchMessages(currentRoom);
      fetchConversations();
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onNewMessage = (msg: LiveChatMessageItem) => {
      setMessages((prev) => {
        const currentRoomId = activeRoomIdRef.current || "global";
        const msgRoomId = typeof msg.roomId === "object" ? (msg.roomId as any)._id : msg.roomId;

        const tempIndex = prev.findIndex(
          (m) =>
            m._id.startsWith("temp_") &&
            m.content === msg.content &&
            (typeof m.senderId === "string" ? m.senderId : m.senderId?._id) ===
              (typeof msg.senderId === "string" ? msg.senderId : msg.senderId?._id)
        );

        if (tempIndex > -1) {
          const updated = [...prev];
          updated[tempIndex] = msg;
          return updated;
        }

        if (prev.some((m) => m._id === msg._id)) return prev;

        if (msgRoomId === currentRoomId || (!msgRoomId && currentRoomId === "global")) {
          return [...prev, msg];
        }

        return prev;
      });

      fetchConversations();
    };

    const onDeletedMessage = ({ messageId }: { messageId: string }) => {
      setMessages((prev) =>
        prev.map((m) => (m._id === messageId ? { ...m, isDeleted: true } : m))
      );
    };

    const onReactionUpdate = ({
      messageId,
      reactions,
    }: {
      messageId: string;
      reactions: ChatReaction[];
    }) => {
      setMessages((prev) =>
        prev.map((m) => (m._id === messageId ? { ...m, reactions } : m))
      );
    };

    const onRoomUpdate = (updatedRoom: ChatRoomData) => {
      setRoom(updatedRoom);
    };

    const onPinnedUpdate = ({
      pinnedMessage: msg,
    }: {
      pinnedMessage: LiveChatMessageItem | null;
    }) => {
      setPinnedMessage(msg);
    };

    const onError = (data: { message?: string; remainingSeconds?: number }) => {
      if (data.remainingSeconds) {
        triggerCountdown(data.remainingSeconds);
      }
    };

    // Auto-sync on window focus
    const handleFocus = () => {
      fetchMessages(activeRoomIdRef.current);
      fetchConversations();
      fetchUnreadCount();
    };

    window.addEventListener("focus", handleFocus);

    // Failsafe auto-poll every 3 seconds to guarantee live updates without page reloads
    const pollInterval = setInterval(() => {
      fetchConversations();
      fetchUnreadCount();
      if (activeRoomIdRef.current) {
        fetchMessages(activeRoomIdRef.current);
      }
    }, 3000);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chat:new", onNewMessage);
    socket.on("chat:deleted", onDeletedMessage);
    socket.on("chat:reaction:update", onReactionUpdate);
    socket.on("chat:room:update", onRoomUpdate);
    socket.on("chat:pinned:update", onPinnedUpdate);
    socket.on("chat:error", onError);

    if (socket.connected) {
      setIsConnected(true);
      socket.emit("chat:join", { roomId: activeRoomIdRef.current });
    }

    return () => {
      window.removeEventListener("focus", handleFocus);
      clearInterval(pollInterval);

      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chat:new", onNewMessage);
      socket.off("chat:deleted", onDeletedMessage);
      socket.off("chat:reaction:update", onReactionUpdate);
      socket.off("chat:room:update", onRoomUpdate);
      socket.off("chat:pinned:update", onPinnedUpdate);
      socket.off("chat:error", onError);

      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [fetchMessages, fetchConversations, fetchCircles, fetchUnreadCount, triggerCountdown]);

  // Send message with instant optimistic UI update
  const sendMessage = useCallback(
    async (payload: {
      content?: string;
      replyToId?: string;
      linkedOpportunityId?: string;
      attachmentUrl?: string;
      attachmentType?: string;
      attachmentName?: string;
      mentions?: string[];
      roomId?: string;
    }): Promise<{ success: boolean; error?: string; remainingSeconds?: number }> => {
      return new Promise((resolve) => {
        const socket = getSocket();
        const targetRoomId = payload.roomId || room?._id || activeRoomId;
        const sendPayload = { ...payload, roomId: targetRoomId };

        // Construct optimistic instant message object
        const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
        const token = localStorage.getItem("goc_token");
        let currentUserId = "";
        let currentUserName = "You";
        if (token) {
          try {
            const decoded = JSON.parse(atob(token.split(".")[1]));
            if (decoded.id) currentUserId = decoded.id;
            if (decoded.name) currentUserName = decoded.name;
          } catch {}
        }

        const optimisticMsg: LiveChatMessageItem = {
          _id: tempId,
          roomId: targetRoomId,
          senderId: {
            _id: currentUserId,
            name: currentUserName,
            username: "you",
          },
          displayNameSnapshot: currentUserName,
          content: payload.content || "",
          attachmentUrl: payload.attachmentUrl || "",
          attachmentType: payload.attachmentType || "",
          attachmentName: payload.attachmentName || "",
          reactions: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Instantly push to UI before network response
        setMessages((prev) => [...prev, optimisticMsg]);

        if (socket && socket.connected) {
          socket.emit("chat:send", sendPayload, (response: any) => {
            if (response?.error) {
              setMessages((prev) => prev.filter((m) => m._id !== tempId));
              if (response.remainingSeconds) triggerCountdown(response.remainingSeconds);
              resolve({ success: false, error: response.error, remainingSeconds: response.remainingSeconds });
            } else {
              if (response.message) {
                setMessages((prev) =>
                  prev.map((m) => (m._id === tempId ? response.message : m))
                );
              }
              if (room?.slowModeEnabled && room?.slowModeSeconds > 0) {
                triggerCountdown(room.slowModeSeconds);
              }
              resolve({ success: true });
            }
          });
        } else {
          // REST fallback
          fetch(`${API_BASE}/api/chat/messages`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(sendPayload),
          })
            .then(async (res) => {
              const data = await res.json();
              if (res.ok) {
                setMessages((prev) =>
                  prev.map((m) => (m._id === tempId ? data : m))
                );
                if (room?.slowModeEnabled && room?.slowModeSeconds > 0) {
                  triggerCountdown(room.slowModeSeconds);
                }
                resolve({ success: true });
              } else {
                setMessages((prev) => prev.filter((m) => m._id !== tempId));
                if (data.remainingSeconds) triggerCountdown(data.remainingSeconds);
                resolve({ success: false, error: data.message, remainingSeconds: data.remainingSeconds });
              }
            })
            .catch(() => {
              setMessages((prev) => prev.filter((m) => m._id !== tempId));
              resolve({ success: false, error: "Network error sending message" });
            });
        }
      });
    },
    [getHeaders, room, activeRoomId, triggerCountdown]
  );

  // Toggle Reaction
  const toggleReaction = useCallback(
    (messageId: string, emoji: string) => {
      const socket = getSocket();
      const targetMsg = messages.find((m) => m._id === messageId);
      if (!targetMsg) return;

      const token = localStorage.getItem("goc_token");
      let currentUserId = "";
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          currentUserId = payload.id;
        } catch {}
      }

      const hasReacted = targetMsg.reactions.some(
        (r) => r.userId === currentUserId && r.emoji === emoji
      );

      if (socket && socket.connected) {
        const eventName = hasReacted ? "chat:reaction:remove" : "chat:reaction:add";
        socket.emit(eventName, { messageId, emoji });
      } else {
        fetch(`${API_BASE}/api/chat/messages/${messageId}/reactions`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ emoji }),
        });
      }
    },
    [messages, getHeaders]
  );

  // Delete own message
  const deleteMessage = useCallback(
    async (messageId: string, reason?: string) => {
      try {
        const res = await fetch(`${API_BASE}/api/chat/messages/${messageId}`, {
          method: "DELETE",
          headers: getHeaders(),
          body: JSON.stringify({ reason }),
        });
        if (res.ok) {
          setMessages((prev) =>
            prev.map((m) => (m._id === messageId ? { ...m, isDeleted: true } : m))
          );
        }
      } catch (err) {
        console.error("Error deleting message:", err);
      }
    },
    [getHeaders]
  );

  // Report Message
  const reportMessage = useCallback(
    async (messageId: string, reason: string, details?: string) => {
      return new Promise<{ success: boolean; error?: string }>((resolve) => {
        const socket = getSocket();
        if (socket && socket.connected) {
          socket.emit("chat:report", { messageId, reason, details }, (res: any) => {
            if (res?.error) resolve({ success: false, error: res.error });
            else resolve({ success: true });
          });
        } else {
          fetch(`${API_BASE}/api/chat/messages/${messageId}/report`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ reason, details }),
          })
            .then(async (res) => {
              const data = await res.json();
              if (res.ok) resolve({ success: true });
              else resolve({ success: false, error: data.message });
            })
            .catch(() => resolve({ success: false, error: "Network error submitting report" }));
        }
      });
    },
    [getHeaders]
  );

  // Block user
  const blockUser = useCallback(
    async (targetUserId: string) => {
      try {
        const res = await fetch(`${API_BASE}/api/chat/members/${targetUserId}/block`, {
          method: "POST",
          headers: getHeaders(),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.isBlocked) {
            setMessages((prev) =>
              prev.filter(
                (m) =>
                  (typeof m.senderId === "string" ? m.senderId : m.senderId?._id) !== targetUserId
              )
            );
          }
          return data;
        }
      } catch (err) {
        console.error("Error blocking user:", err);
      }
    },
    [getHeaders]
  );

  // Mark as Read
  const markAsRead = useCallback(async () => {
    try {
      const lastMsg = messages[messages.length - 1];
      const targetRoomId = room?._id || activeRoomId;
      const socket = getSocket();
      if (socket && socket.connected) {
        socket.emit("chat:read", { lastReadMessageId: lastMsg?._id, roomId: targetRoomId });
      } else {
        await fetch(`${API_BASE}/api/chat/read-state`, {
          method: "PATCH",
          headers: getHeaders(),
          body: JSON.stringify({ lastReadMessageId: lastMsg?._id, roomId: targetRoomId }),
        });
      }
      setUnreadCount(0);
      fetchConversations();
    } catch (err) {
      console.error("Error marking chat as read:", err);
    }
  }, [messages, getHeaders, room, activeRoomId, fetchConversations]);

  return {
    messages,
    room,
    conversations,
    circles,
    activeRoomId,
    pinnedMessage,
    unreadCount,
    loading,
    hasMore,
    loadingOlder,
    slowModeCountdown,
    isConnected,
    fetchOlderMessages,
    fetchConversations,
    fetchCircles,
    switchRoom,
    startDirectConversation,
    joinCircle,
    sendMessage,
    toggleReaction,
    deleteMessage,
    reportMessage,
    blockUser,
    markAsRead,
  };
}
