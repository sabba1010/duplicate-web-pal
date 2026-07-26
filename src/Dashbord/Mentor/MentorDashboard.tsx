import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { 
  Bell, 
  MoreVertical, 
  User,
  Mail,
  Clock,
  Check,
  Star,
  Minus,
  Smile,
  Send,
  MessageSquare,
  Users,
  GraduationCap
} from "lucide-react";
import { MENTOR_MEETING_REQUESTS, MENTOR_LIVE_CHAT } from "@/lib/mock-mentor-data";

export function MentorDashboard() {
  const [extensionOn, setExtensionOn] = useState(true);

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#111827] flex justify-center">
      <div className="max-w-[1400px] w-full mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-screen">
        
        {/* Left Column: Mentor Portal */}
        <main className="flex-1 flex flex-col min-w-0 h-full">
          
          {/* Top Header */}
          <header className="flex items-center justify-between pb-4 border-b border-gray-100 mb-8 shrink-0">
            <div>
              <h1 className="text-[20px] font-bold text-[#f14f98] tracking-tight">GOC Extension</h1>
              <p className="text-[11px] font-medium text-gray-500">Opportunities. Community. Growth.</p>
            </div>
            <div className="flex items-center gap-6">
              {/* Toggle */}
              <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                <span className="text-[13px] font-bold text-gray-700">Extension {extensionOn ? "ON" : "OFF"}</span>
                <button 
                  onClick={() => setExtensionOn(!extensionOn)}
                  className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${extensionOn ? "bg-[#f14f98]" : "bg-gray-300"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${extensionOn ? "left-[22px]" : "left-0.5"}`} />
                </button>
              </div>

              {/* Icons */}
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="w-8 h-8 rounded-full flex items-center justify-center bg-[#fde8f1] text-[#f14f98] border border-[#f14f98]/20 transition-colors">
                  <User className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto pr-2 pb-8">
            {/* Page Title & Back Button */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="text-[28px] font-extrabold text-[#111827] tracking-tight">Mentor Portal</h2>
                <p className="text-[13px] font-medium text-gray-500 mt-1">
                  Simulated login as Dr. Priya Nandan — see requests from your mentees.
                </p>
              </div>
              <Link to="/dashboard" className="px-5 py-2 rounded-full border-2 border-[#fde8f1] text-[#f14f98] text-[13px] font-bold hover:bg-[#fde8f1] transition-colors whitespace-nowrap flex items-center gap-2">
                <span>[→ Back to student view</span>
              </Link>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-[24px] border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 shadow-sm">
              <div className="flex items-center gap-4">
                <img 
                  src="https://i.pravatar.cc/150?u=priya" 
                  alt="Dr. Priya Nandan" 
                  className="w-16 h-16 rounded-full object-cover border-4 border-gray-50"
                />
                <div>
                  <div className="text-[10px] font-black text-[#f14f98] tracking-widest uppercase mb-1">
                    LOGGED IN AS
                  </div>
                  <h3 className="text-[18px] font-extrabold text-[#111827] leading-none mb-1.5">
                    Dr. Priya Nandan
                  </h3>
                  <p className="text-[13px] font-medium text-gray-500">
                    Senior Product Manager, Google - Computer Science
                  </p>
                </div>
              </div>
              <button className="text-[#f14f98] text-[13px] font-bold hover:underline whitespace-nowrap flex items-center gap-1">
                View public profile <span className="text-[16px] leading-none">›</span>
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {/* Meetings */}
              <div className="bg-[#fdf2f7] rounded-[20px] p-4 border border-[#f14f98] shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#fce4ee] flex items-center justify-center text-[#f14f98] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[20px] font-black text-[#111827] leading-none mb-1">4</div>
                  <div className="text-[11px] font-medium text-gray-600 leading-tight">Meeting requests<br/>received so far</div>
                </div>
              </div>
              {/* Awaiting */}
              <div className="bg-white rounded-[20px] p-4 border border-gray-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#f14f98] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[20px] font-black text-[#111827] leading-none mb-1">3</div>
                  <div className="text-[11px] font-medium text-gray-500 leading-tight">Awaiting your<br/>response</div>
                </div>
              </div>
              {/* Sessions */}
              <div className="bg-white rounded-[20px] p-4 border border-gray-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#fdf2f7] flex items-center justify-center text-[#f14f98] shrink-0">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[20px] font-black text-[#111827] leading-none mb-1">1</div>
                  <div className="text-[11px] font-medium text-gray-500 leading-tight">Sessions<br/>accepted</div>
                </div>
              </div>
              {/* Rating */}
              <div className="bg-white rounded-[20px] p-4 border border-gray-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#fdf2f7] flex items-center justify-center text-[#f14f98] shrink-0">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[20px] font-black text-[#111827] leading-none mb-1">4.9</div>
                  <div className="text-[11px] font-medium text-gray-500 leading-tight">Your mentor<br/>rating</div>
                </div>
              </div>
            </div>

            {/* Meeting Requests */}
            <h3 className="text-[16px] font-bold text-[#111827] mb-4">Meeting requests</h3>
            <div className="bg-white rounded-[24px] border border-gray-100 p-2 shadow-sm space-y-2">
              {MENTOR_MEETING_REQUESTS.map(req => (
                <div key={req.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-[20px] border border-gray-100 hover:border-gray-200 transition-colors gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#fde8f1] text-[#f14f98] flex items-center justify-center shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-extrabold text-[14px] text-[#111827] mb-0.5">{req.name}</div>
                      <div className="text-[12px] font-medium text-gray-500">{req.topic} · {req.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    {req.status === "Accepted" ? (
                      <span className="bg-[#ecfdf5] text-[#059669] text-[11px] font-black px-4 py-1.5 rounded-full tracking-wider">
                        ACCEPTED
                      </span>
                    ) : (
                      <div className="flex items-center gap-3">
                        <button className="px-5 py-2 rounded-full text-[13px] font-bold text-[#f14f98] hover:bg-[#fde8f1] transition-colors">
                          Decline
                        </button>
                        <button className="px-5 py-2 rounded-full text-[13px] font-bold bg-[#f14f98] text-white hover:bg-[#e03b83] shadow-md shadow-pink-500/20 transition-all">
                          Accept
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>

        {/* Right Column: Live Chat Sidebar */}
        <aside className="w-full lg:w-[360px] bg-white rounded-[24px] border border-gray-200 shadow-sm flex flex-col shrink-0 h-[600px] lg:h-full relative overflow-hidden">
          
          {/* Chat Header */}
          <div className="p-5 flex items-center justify-between border-b border-gray-100 shrink-0">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                <h3 className="text-[16px] font-extrabold text-[#111827] leading-none">Live Chat</h3>
              </div>
              <div className="text-[11px] font-medium text-gray-500 pl-4">128 online</div>
            </div>
            <button className="w-8 h-8 rounded-full bg-[#fde8f1] text-[#f14f98] flex items-center justify-center hover:bg-[#fbcfe8] transition-colors">
              <Minus className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {MENTOR_LIVE_CHAT.map((msg, idx) => (
              <div key={msg.id} className="flex gap-3">
                <img src={msg.sender.avatar} alt={msg.sender.name} className="w-8 h-8 rounded-full object-cover shrink-0 mt-1" />
                <div>
                  <div className="text-[12px] font-bold text-[#111827] mb-1">{msg.sender.name}</div>
                  <div className="bg-[#fde8f1] text-[#111827] text-[13px] p-3.5 rounded-[20px] rounded-tl-sm leading-relaxed mb-1.5 shadow-sm">
                    {msg.content}
                  </div>
                  <div className="text-[10px] font-medium text-gray-400 flex items-center gap-1">
                    {msg.timestamp}
                    {msg.isRead && (
                      <span className="text-gray-400">✓✓</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-100 shrink-0">
            <div className="flex items-center gap-3 relative">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 bg-white border border-gray-200 rounded-full py-2.5 pl-4 pr-10 text-[13px] focus:outline-none focus:border-[#f14f98] focus:ring-1 focus:ring-[#f14f98] transition-shadow placeholder:text-gray-400"
              />
              <button className="absolute right-[52px] text-gray-400 hover:text-gray-600 transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-[#f14f98] text-white flex items-center justify-center hover:bg-[#e03b83] transition-colors shadow-md shadow-pink-500/20 shrink-0">
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>

          {/* Bottom Tabs */}
          <div className="flex items-center justify-between border-t border-gray-100 shrink-0 bg-white">
            <button className="flex-1 flex flex-col items-center justify-center py-3 border-b-2 border-[#f14f98] text-[#f14f98] gap-1 transition-colors">
              <MessageSquare className="w-5 h-5" />
              <span className="text-[11px] font-bold">Live Chat</span>
            </button>
            <button className="flex-1 flex flex-col items-center justify-center py-3 border-b-2 border-transparent text-gray-400 hover:text-gray-600 gap-1 transition-colors">
              <Users className="w-5 h-5" />
              <span className="text-[11px] font-bold">Community</span>
            </button>
            <button className="flex-1 flex flex-col items-center justify-center py-3 border-b-2 border-transparent text-gray-400 hover:text-gray-600 gap-1 transition-colors">
              <GraduationCap className="w-5 h-5" />
              <span className="text-[11px] font-bold">Mentors</span>
            </button>
          </div>

        </aside>

      </div>
    </div>
  );
}
