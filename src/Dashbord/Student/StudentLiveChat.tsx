import { Minus, Send, Smile, Users, MessageSquare } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { CHAT_MESSAGES, ChatMessage } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";

interface StudentLiveChatProps {
  user: { name: string; username: string } | null;
}

export function StudentLiveChat({ user }: StudentLiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(CHAT_MESSAGES);
  const [newMsgText, setNewMsgText] = useState("");
  const [activeTab, setActiveTab] = useState<"chat" | "community">("chat");
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
    
    const now = new Date();
    const timeStr = "Just now";
    
    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: { 
        name: user?.name || "Karla", 
        avatar: "https://i.pravatar.cc/150?u=karla", 
        isOnline: true 
      },
      content: newMsgText,
      timestamp: timeStr,
      isOwn: true,
    };
    
    setMessages([...messages, newMessage]);
    setNewMsgText("");
  };

  return (
    <aside className="xl:col-span-3 xl:sticky xl:top-5 xl:h-[calc(100vh-2.5rem)] bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden z-20">
      {/* Top Header */}
      <div>
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            <h3 className="font-extrabold text-sm text-slate-800">Live Connect</h3>
            <span className="text-[10px] text-slate-400 font-medium bg-slate-100 px-2 py-0.5 rounded-full">122 online</span>
          </div>
          <button className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200">
            <Minus className="h-4 w-4" />
          </button>
        </div>

        {/* Messages Stream */}
        <div className="p-4 space-y-4 max-h-[calc(100vh-14rem)] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id} 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-3 items-start group ${msg.isOwn ? 'flex-row-reverse' : ''}`}
              >
                {msg.sender.avatar ? (
                  <div className="relative shrink-0">
                    <img
                      src={msg.sender.avatar}
                      alt={msg.sender.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-sm"
                    />
                    {msg.sender.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-700 text-xs font-bold shrink-0">
                    S
                  </div>
                )}
                
                <div className={`flex flex-col gap-1 max-w-[80%] ${msg.isOwn ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">{msg.isOwn ? 'You' : msg.sender.name}</span>
                    <span className="text-[9px] text-slate-400">{msg.timestamp}</span>
                  </div>
                  <div 
                    className={`text-[13px] p-3 rounded-2xl leading-relaxed shadow-sm ${
                      msg.isOwn 
                        ? 'bg-teal-600 text-white rounded-tr-sm' 
                        : 'bg-white border border-slate-100 text-slate-700 rounded-tl-sm'
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
      </div>

      {/* Bottom Controls */}
      <div className="p-4 border-t border-slate-100 bg-white/50 space-y-3">
        {/* Message Input Form */}
        <form onSubmit={handleSendChat} className="relative flex items-center group">
          <input
            type="text"
            value={newMsgText}
            onChange={(e) => setNewMsgText(e.target.value)}
            placeholder="Type your message..."
            className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-700 rounded-full py-2.5 pl-4 pr-16 outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all placeholder:text-slate-400"
          />
          <div className="absolute right-1.5 flex items-center gap-1">
            <button type="button" className="text-slate-400 hover:text-teal-500 p-1 cursor-pointer transition-colors">
              <Smile className="h-4 w-4" />
            </button>
            <button
              type="submit"
              disabled={!newMsgText.trim()}
              className="w-8 h-8 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors shadow-sm cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Bottom Nav Tabs */}
        <div className="grid grid-cols-2 gap-2 pt-2 text-center">
          <button
            onClick={() => setActiveTab("chat")}
            className={`py-2 text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "chat"
                ? "bg-teal-50 text-teal-700 shadow-sm border border-teal-100"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Chat</span>
          </button>

          <button
            onClick={() => setActiveTab("community")}
            className={`py-2 text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "community"
                ? "bg-teal-50 text-teal-700 shadow-sm border border-teal-100"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Peers</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
