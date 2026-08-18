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

export function useLiveChat() {
  const [messages, setMessages] = useState<LiveChatMessageItem[]>([]);
  const [room, setRoom] = useState<ChatRoomData | null>(null);
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

  // Fetch initial messages & room data
  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/chat/rooms/global/messages?limit=30`, {
        headers: getHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
        setHasMore(data.hasMore || false);
        setNextCursor(data.nextCursor || null);
        if (data.room) setRoom(data.room);
      }
    } catch (err) {
      console.error("Error fetching chat messages:", err);
    } finally {
      setLoading(false);
    }
  }, [getHeaders]);

  // Fetch older messages (pagination)
  const fetchOlderMessages = useCallback(async () => {
    if (!hasMore || !nextCursor || loadingOlder) return;

    try {
      setLoadingOlder(true);
      const res = await fetch(
        `${API_BASE}/api/chat/rooms/global/messages?cursor=${nextCursor}&limit=30`,
        { headers: getHeaders() }
      );

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
  }, [hasMore, nextCursor, loadingOlder, getHeaders]);

  // Fetch unread count
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

  // Connect Socket and listen to real-time events
  useEffect(() => {
    fetchMessages();
    fetchUnreadCount();

    const socket = getSocket();

    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onNewMessage = (msg: LiveChatMessageItem) => {
      setMessages((prev) => {
        // Prevent duplicates
        if (prev.some((m) => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
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
    }

    return () => {
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
  }, [fetchMessages, fetchUnreadCount, triggerCountdown]);

  // Send message
  const sendMessage = useCallback(
    async (payload: {
      content?: string;
      replyToId?: string;
      linkedOpportunityId?: string;
      mentions?: string[];
    }): Promise<{ success: boolean; error?: string; remainingSeconds?: number }> => {
      return new Promise((resolve) => {
        const socket = getSocket();

        if (socket && socket.connected) {
          socket.emit("chat:send", payload, (response: any) => {
            if (response?.error) {
              if (response.remainingSeconds) triggerCountdown(response.remainingSeconds);
              resolve({ success: false, error: response.error, remainingSeconds: response.remainingSeconds });
            } else {
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
            body: JSON.stringify(payload),
          })
            .then(async (res) => {
              const data = await res.json();
              if (res.ok) {
                if (room?.slowModeEnabled && room?.slowModeSeconds > 0) {
                  triggerCountdown(room.slowModeSeconds);
                }
                resolve({ success: true });
              } else {
                if (data.remainingSeconds) triggerCountdown(data.remainingSeconds);
                resolve({ success: false, error: data.message, remainingSeconds: data.remainingSeconds });
              }
            })
            .catch(() => {
              resolve({ success: false, error: "Network error sending message" });
            });
        }
      });
    },
    [getHeaders, room, triggerCountdown]
  );

  // Toggle Reaction
  const toggleReaction = useCallback((messageId: string, emoji: string) => {
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
  }, [messages, getHeaders]);

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
            // Remove messages from blocked user locally
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
      const socket = getSocket();
      if (socket && socket.connected) {
        socket.emit("chat:read", { lastReadMessageId: lastMsg?._id });
      } else {
        await fetch(`${API_BASE}/api/chat/read-state`, {
          method: "PATCH",
          headers: getHeaders(),
          body: JSON.stringify({ lastReadMessageId: lastMsg?._id }),
        });
      }
      setUnreadCount(0);
    } catch (err) {
      console.error("Error marking chat as read:", err);
    }
  }, [messages, getHeaders]);

  return {
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
  };
}
