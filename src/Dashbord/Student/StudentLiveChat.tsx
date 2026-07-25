import { Minus, Send, Smile, Users, MessageSquare, GraduationCap, FlaskConical, Bird, GraduationCap as ScholarCap, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { CHAT_MESSAGES, ChatMessage } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";

interface StudentLiveChatProps {
  user: { name: string; username: string } | null;
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
  {
    name: "Sofia Alvarez",
    role: "Mechanical Engineer, SpaceX",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=80",
  },
  {
    name: "Maya Thompson",
    role: "VP Marketing, Warby Parker",
    img: "https://images.unsplash.com/photo-1573497019230-17f536323f2d?w=80&q=80",
  },
];

const CIRCLES = [
  { icon: "🔬", name: "STEM Squad", desc: "For future engineers & scientists", members: 34 },
  { icon: "🌱", name: "First-Gen Founders", desc: "First-generation college-bound students", members: 21 },
  { icon: "🎓", name: "Scholarship Hunters", desc: "Swap tips & deadlines together", members: 58 },
];

const EVENTS = [
  { date: "JUN 29 · 5PM", title: "Scholarship Essay Workshop", sub: "Hosted by Isabella R. · 12 going" },
  { date: "JUL 3 · 6PM", title: "Mock Interview Night", sub: "Hosted by GOC Team · 27 going" },
];

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

  const tabLabels = {
    chat: { title: "Live Chat", sub: "128 online" },
    community: { title: "Community", sub: "Circles & events" },
    mentors: { title: "Mentors", sub: "Quick message" },
  };

  return (
    <aside className="xl:sticky xl:top-4 xl:h-[calc(100vh-2rem)] bg-white rounded-[18px] border border-pink-100 shadow-sm flex flex-col overflow-hidden z-20">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#f1e4e9] flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] shrink-0" />
          <div>
            <h3 className="font-extrabold text-[13px] text-[#2a2026]">{tabLabels[activeTab].title}</h3>
            <p className="text-[10px] text-[#8b7e85]">{tabLabels[activeTab].sub}</p>
          </div>
        </div>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="w-7 h-7 rounded-full bg-[#fff7fa] border border-[#fde8f1] flex items-center justify-center text-[#8b7e85] hover:text-[#f14f98] transition-colors cursor-pointer"
        >
          <Minus className="h-3 w-3" />
        </button>
      </div>

      {/* Tab content area */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <AnimatePresence mode="wait">
          {/* ── LIVE CHAT ── */}
          {activeTab === "chat" && (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-4 space-y-4"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2.5 items-start ${msg.isOwn ? "flex-row-reverse" : ""}`}>
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
                    <div className="w-8 h-8 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center text-[#f14f98] text-xs font-bold shrink-0">
                      S
                    </div>
                  )}
                  <div className={`flex flex-col gap-0.5 max-w-[80%] ${msg.isOwn ? "items-end" : "items-start"}`}>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-[#2a2026]">{msg.isOwn ? "You" : msg.sender.name}</span>
                      <span className="text-[9px] text-[#8b7e85]">{msg.timestamp}</span>
                    </div>
                    <div
                      className={`text-[12px] px-3 py-2 rounded-2xl leading-relaxed shadow-xs ${
                        msg.isOwn
                          ? "bg-[#f14f98] text-white rounded-tr-sm"
                          : "bg-[#fff7fa] border border-[#fde8f1] text-[#2a2026] rounded-tl-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </motion.div>
          )}

          {/* ── COMMUNITY ── */}
          {activeTab === "community" && (
            <motion.div
              key="community"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-4 space-y-5"
            >
              {/* Your Circles */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-black text-[#2a2026]">Your circles</span>
                  <button className="flex items-center gap-1 text-[11px] font-extrabold text-[#f14f98] border border-[#fde8f1] rounded-full px-[10px] py-[4px] hover:bg-[#fff7fa] transition-colors">
                    <Plus className="w-3 h-3" /> New circle
                  </button>
                </div>
                <div className="space-y-2">
                  {CIRCLES.map((c, i) => (
                    <div key={i} className="flex items-center gap-3 border border-[#f1e4e9] rounded-[14px] p-[12px] bg-white hover:border-[#fde8f1] transition-colors cursor-pointer">
                      <div className="w-[36px] h-[36px] rounded-[10px] bg-[#fff7fa] border border-[#fde8f1] flex items-center justify-center text-[16px] shrink-0">
                        {c.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12.5px] font-extrabold text-[#2a2026]">{c.name}</div>
                        <div className="text-[10.5px] font-bold text-[#8b7e85]">{c.desc}</div>
                        <div className="text-[10px] font-extrabold text-[#f14f98] mt-[2px]">{c.members} members</div>
                      </div>
                      <button className="text-[11px] font-extrabold text-[#f14f98] border border-[#fde8f1] rounded-full px-[10px] py-[4px] hover:bg-[#fff7fa] transition-colors shrink-0">
                        Open
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Events */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-black text-[#2a2026]">Community events</span>
                  <button className="flex items-center gap-1 text-[11px] font-extrabold text-[#f14f98] border border-[#fde8f1] rounded-full px-[10px] py-[4px] hover:bg-[#fff7fa] transition-colors">
                    <Plus className="w-3 h-3" /> Host event
                  </button>
                </div>
                <div className="space-y-2">
                  {EVENTS.map((ev, i) => (
                    <div key={i} className="flex items-start gap-3 border border-[#f1e4e9] rounded-[14px] p-[12px] bg-white hover:border-[#fde8f1] transition-colors cursor-pointer">
                      <div className="bg-[#fde8f1] text-[#f14f98] text-[9.5px] font-black rounded-[8px] px-[8px] py-[5px] whitespace-nowrap shrink-0">
                        {ev.date}
                      </div>
                      <div>
                        <div className="text-[12.5px] font-extrabold text-[#2a2026]">{ev.title}</div>
                        <div className="text-[10.5px] font-bold text-[#8b7e85] mt-[1px]">{ev.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── MENTORS ── */}
          {activeTab === "mentors" && (
            <motion.div
              key="mentors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-4"
            >
              <p className="text-[12px] font-extrabold text-[#2a2026] mb-3">Quick message a mentor</p>
              <div className="space-y-2">
                {MENTORS_QUICK.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 border border-[#f1e4e9] rounded-[14px] p-[12px] bg-white hover:border-[#fde8f1] transition-colors">
                    <img src={m.img} className="w-[40px] h-[40px] rounded-full object-cover border border-[#f1e4e9] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[12.5px] font-extrabold text-[#2a2026] truncate">{m.name}</div>
                      <div className="text-[10.5px] font-bold text-[#f14f98] truncate">{m.role}</div>
                    </div>
                    <button className="text-[11px] font-extrabold text-[#f14f98] border border-[#fde8f1] rounded-full px-[10px] py-[5px] hover:bg-[#fff7fa] transition-colors shrink-0">
                      Message
                    </button>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-[11px] rounded-full bg-[#f14f98] hover:bg-[#cf3478] text-white text-[12.5px] font-extrabold transition-colors">
                View full Mentors page →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input (only for chat tab) */}
      {activeTab === "chat" && (
        <div className="px-4 pt-3 border-t border-[#f1e4e9] shrink-0 bg-white">
          <form onSubmit={handleSendChat} className="relative flex items-center mb-3">
            <input
              type="text"
              value={newMsgText}
              onChange={(e) => setNewMsgText(e.target.value)}
              placeholder="Type a message..."
              className="w-full bg-[#fff7fa] border border-[#f1e4e9] text-[12px] text-[#2a2026] rounded-full py-2.5 pl-4 pr-16 outline-none focus:bg-white focus:border-[#f14f98] focus:ring-2 focus:ring-[#f14f98]/10 transition-all placeholder:text-[#8b7e85]"
            />
            <div className="absolute right-1.5 flex items-center gap-1">
              <button type="button" className="text-[#8b7e85] hover:text-[#f14f98] p-1 cursor-pointer transition-colors">
                <Smile className="h-4 w-4" />
              </button>
              <button
                type="submit"
                disabled={!newMsgText.trim()}
                className="w-8 h-8 bg-[#f14f98] hover:bg-[#cf3478] disabled:bg-gray-200 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bottom Tabs */}
      <div className="grid grid-cols-3 text-center border-t border-[#f1e4e9] shrink-0 bg-white">
        {[
          { id: "chat", label: "Live Chat", icon: MessageSquare },
          { id: "community", label: "Community", icon: Users },
          { id: "mentors", label: "Mentors", icon: GraduationCap },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as typeof activeTab)}
            className={`py-3 text-[10px] font-bold flex flex-col items-center gap-0.5 transition-all cursor-pointer border-t-2 ${
              activeTab === id
                ? "text-[#f14f98] border-[#f14f98]"
                : "text-[#8b7e85] border-transparent hover:bg-[#fff7fa] hover:text-[#2a2026]"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
