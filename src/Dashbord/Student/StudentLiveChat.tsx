import { Minus, Send, Smile, Users, MessageSquare, GraduationCap } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { CHAT_MESSAGES, ChatMessage } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";

interface StudentLiveChatProps {
  user: { name: string; username: string } | null;
}

export function StudentLiveChat({ user }: StudentLiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(CHAT_MESSAGES);
  const [newMsgText, setNewMsgText] = useState("");
  const [activeTab, setActiveTab] = useState<"chat" | "community" | "mentors">("chat");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsgText.trim()) return;

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: {
        name: user?.name || "Karla",
        avatar: "https://i.pravatar.cc/150?u=karla",
        isOnline: true,
      },
      content: newMsgText,
      timestamp: "Just now",
      isOwn: true,
    };

    setMessages([...messages, newMessage]);
    setNewMsgText("");
  };

  return (
    <aside className="xl:col-span-3 xl:sticky xl:top-5 xl:h-[calc(100vh-2.5rem)] bg-white rounded-3xl border border-pink-100 shadow-sm flex flex-col overflow-hidden z-20">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] shrink-0" />
          <div>
            <h3 className="font-extrabold text-[13px] text-gray-800">Live Chat</h3>
            <p className="text-[10px] text-gray-400">128 online</p>
          </div>
        </div>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <Minus className="h-3 w-3" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-pink-100 scrollbar-track-transparent min-h-0">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex gap-2.5 items-start ${msg.isOwn ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              {msg.sender.avatar ? (
                <div className="relative shrink-0">
                  <img
                    src={msg.sender.avatar}
                    alt={msg.sender.name}
                    className="w-8 h-8 rounded-full object-cover border border-pink-100 shadow-sm"
                  />
                  {msg.sender.isOnline && (
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border-2 border-white rounded-full" />
                  )}
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center text-[#e04f96] text-xs font-bold shrink-0">
                  S
                </div>
              )}

              {/* Bubble */}
              <div className={`flex flex-col gap-0.5 max-w-[80%] ${msg.isOwn ? "items-end" : "items-start"}`}>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-gray-700">
                    {msg.isOwn ? "You" : msg.sender.name}
                  </span>
                  <span className="text-[9px] text-gray-400">{msg.timestamp}</span>
                </div>
                <div
                  className={`text-[12px] px-3 py-2 rounded-2xl leading-relaxed shadow-xs ${
                    msg.isOwn
                      ? "bg-[#e04f96] text-white rounded-tr-sm"
                      : "bg-gray-50 border border-gray-100 text-gray-700 rounded-tl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-100 space-y-3 shrink-0 bg-white">
        <form onSubmit={handleSendChat} className="relative flex items-center">
          <input
            type="text"
            value={newMsgText}
            onChange={(e) => setNewMsgText(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-gray-50 border border-gray-200 text-[12px] text-gray-700 rounded-full py-2.5 pl-4 pr-16 outline-none focus:bg-white focus:border-[#e04f96] focus:ring-4 focus:ring-pink-500/10 transition-all placeholder:text-gray-400"
          />
          <div className="absolute right-1.5 flex items-center gap-1">
            <button type="button" className="text-gray-400 hover:text-[#e04f96] p-1 cursor-pointer transition-colors">
              <Smile className="h-4 w-4" />
            </button>
            <button
              type="submit"
              disabled={!newMsgText.trim()}
              className="w-8 h-8 bg-[#e04f96] hover:bg-[#c43d83] disabled:bg-gray-200 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors shadow-sm cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>

        {/* Bottom Tabs */}
        <div className="grid grid-cols-3 gap-1 text-center">
          {[
            { id: "chat", label: "Live Chat", icon: MessageSquare },
            { id: "community", label: "Community", icon: Users },
            { id: "mentors", label: "Mentors", icon: GraduationCap },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as typeof activeTab)}
              className={`py-2 text-[10px] font-bold rounded-xl flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                activeTab === id
                  ? "text-[#e04f96] bg-pink-50"
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
