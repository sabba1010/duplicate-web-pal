import { Minus, Send, Smile, Users, BookOpen } from "lucide-react";
import { useState } from "react";

export interface ChatMessage {
  id: number;
  name: string;
  time: string;
  avatar: string;
  text: string;
}

interface StudentLiveChatProps {
  user: { name: string; username: string } | null;
}

export function StudentLiveChat({ user }: StudentLiveChatProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      name: "Sofia M.",
      time: "10:14 AM",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      text: "Does anyone know if the Google STEP Internship is open to sophomores?",
    },
    {
      id: 2,
      name: "Isabella R.",
      time: "10:15 AM",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      text: "Yes! I applied last year as a sophomore. You should go for it!",
    },
    {
      id: 3,
      name: "Ava K.",
      time: "10:17 AM",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80",
      text: "Thank you! Also, the deadline is Jun 30 so don't wait until the last minute 😊",
    },
  ]);
  const [newMsgText, setNewMsgText] = useState("");
  const [activeRightTab, setActiveRightTab] = useState<"chat" | "community" | "mentors">("chat");

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsgText.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: user?.name || "Karla",
        time: timeStr,
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
        text: newMsgText,
      },
    ]);
    setNewMsgText("");
  };

  return (
    <aside className="lg:col-span-3 lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)] bg-white rounded-3xl border border-pink-100/60 shadow-xs flex flex-col justify-between overflow-hidden z-20">
      {/* Top Header of Chat */}
      <div>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 className="font-extrabold text-sm text-[#2d1b28]">Live Chat</h3>
            <span className="text-[10px] text-gray-400 font-medium">122 online</span>
          </div>
          <button className="w-6 h-6 rounded-full bg-pink-50/60 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <Minus className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Chat Message Stream */}
        <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
          {chatMessages.map((msg) => (
            <div key={msg.id} className="flex gap-2.5 items-start group">
              <img
                src={msg.avatar}
                alt={msg.name}
                className="w-7 h-7 rounded-full object-cover border border-pink-200 mt-0.5 shrink-0"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2d1b28]">{msg.name}</span>
                  <span className="text-[9px] text-gray-400">{msg.time}</span>
                </div>
                <div className="bg-[#fceef5]/60 text-xs text-[#3b2334] p-3 rounded-2xl rounded-tl-xs leading-relaxed border border-pink-100/40">
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Controls: Input & Nav Tabs */}
      <div className="p-3 border-t border-gray-100 bg-white space-y-3">
        {/* Message Input Form */}
        <form onSubmit={handleSendChat} className="relative flex items-center">
          <input
            type="text"
            value={newMsgText}
            onChange={(e) => setNewMsgText(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-pink-50/40 border border-pink-100 text-xs text-gray-700 rounded-full py-2.5 pl-4 pr-16 outline-none focus:border-[#e04f96] focus:ring-2 focus:ring-pink-100 transition-all placeholder:text-gray-400"
          />
          <div className="absolute right-1.5 flex items-center gap-1">
            <button type="button" className="text-gray-400 hover:text-pink-400 p-1 cursor-pointer">
              <Smile className="h-4 w-4" />
            </button>
            <button
              type="submit"
              className="w-7 h-7 bg-[#e04f96] hover:bg-[#c73d7f] text-white rounded-full flex items-center justify-center transition-colors shadow-xs cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>

        {/* Bottom Nav Tabs (Live Chat | Community | Mentors) */}
        <div className="grid grid-cols-3 gap-1 pt-1 border-t border-gray-100 text-center">
          <button
            onClick={() => setActiveRightTab("chat")}
            className={`py-2 text-[10px] font-bold rounded-xl flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              activeRightTab === "chat"
                ? "text-[#e04f96] bg-pink-50"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Smile className="h-3.5 w-3.5" />
            <span>Live Chat</span>
          </button>

          <button
            onClick={() => setActiveRightTab("community")}
            className={`py-2 text-[10px] font-bold rounded-xl flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              activeRightTab === "community"
                ? "text-[#e04f96] bg-pink-50"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>Community</span>
          </button>

          <button
            onClick={() => setActiveRightTab("mentors")}
            className={`py-2 text-[10px] font-bold rounded-xl flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              activeRightTab === "mentors"
                ? "text-[#e04f96] bg-pink-50"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Mentors</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
