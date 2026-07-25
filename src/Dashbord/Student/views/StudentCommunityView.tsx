import { useState } from "react";
import { Search, User, Video, Star, Clock, MessageSquare, CalendarCheck, ArrowRight } from "lucide-react";

export function StudentCommunityView() {
  return (
    <div className="space-y-6 pb-8 max-w-[850px]">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#f1e4e9] pb-5">
        <div>
          <h1 className="text-[24px] font-black text-[#2a2026] tracking-tight">Mentors</h1>
          <p className="text-[13px] text-[#8b7e85] font-semibold mt-[2px]">
            Get 1:1 guidance from women who've been where you're headed.
          </p>
        </div>
        <button className="bg-[#f14f98] text-white text-[13px] font-extrabold px-[20px] py-[10px] rounded-full hover:bg-[#cf3478] transition-colors flex items-center gap-[8px] shadow-sm whitespace-nowrap">
          <User className="w-[14px] h-[14px] stroke-[2.5]" />
          Find a new mentor
        </button>
      </div>

      {/* ── Your Mentor Card ── */}
      <div className="border border-[#f1e4e9] rounded-[20px] p-[20px] bg-white flex flex-col md:flex-row md:items-center justify-between gap-[20px] hover:shadow-[0_4px_16px_rgba(207,52,120,0.04)] transition-all">
        <div className="flex gap-[16px] items-start md:items-center">
          <div className="w-[64px] h-[64px] rounded-full border-[3px] border-[#fde8f1] overflow-hidden shrink-0">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80" alt="Mentor" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-[10px] font-black text-[#f14f98] tracking-[0.08em] uppercase mb-[2px]">
              YOUR MENTOR
            </div>
            <div className="text-[17px] font-black text-[#2a2026] mb-[2px]">Dr. Priya Nandan</div>
            <div className="text-[12.5px] text-[#8b7e85] font-bold mb-[10px]">
              Senior Product Manager, Google - Computer Science
            </div>
            <div className="inline-flex items-center gap-[6px] bg-[#fff7fa] border border-[#fde8f1] rounded-full px-[12px] py-[4px]">
              <Clock className="w-[12px] h-[12px] text-[#f14f98] stroke-[2.5]" />
              <span className="text-[11.5px] font-extrabold text-[#2a2026]">Next session: Fri, Jun 27 - 4:00 PM</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[8px] shrink-0 w-full md:w-[150px]">
          <button className="bg-[#f14f98] text-white text-[13px] font-extrabold px-[16px] py-[9px] rounded-full flex items-center justify-center gap-[6px] hover:bg-[#cf3478] transition-colors shadow-sm">
            <MessageSquare className="w-[14px] h-[14px] stroke-[2.5]" /> Message
          </button>
          <button className="bg-white border border-[#fde8f1] text-[#f14f98] text-[13px] font-extrabold px-[16px] py-[9px] rounded-full hover:bg-[#fff7fa] transition-colors">
            Reschedule
          </button>
        </div>
      </div>

      {/* ── Metrics ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px]">
        {[
          { icon: User, value: "3", label: "Mentors connected" },
          { icon: Video, value: "9", label: "Sessions completed" },
          { icon: CalendarCheck, value: "2", label: "Upcoming sessions" },
          { icon: Star, value: "4.9", label: "Your average rating given" },
        ].map((stat, i) => (
          <div key={i} className="border border-[#f1e4e9] rounded-[16px] bg-white p-[16px] flex items-center gap-[14px] hover:shadow-[0_2px_12px_rgba(207,52,120,0.03)] transition-all">
            <div className="w-[42px] h-[42px] rounded-[12px] bg-[#fff7fa] border border-[#fde8f1] flex items-center justify-center text-[#f14f98] shrink-0">
              <stat.icon className="w-[18px] h-[18px] stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[20px] font-black text-[#2a2026] leading-none mb-[4px]">{stat.value}</div>
              <div className="text-[11px] font-bold text-[#8b7e85] leading-[1.2]">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Upcoming Sessions ── */}
      <div className="space-y-[12px]">
        <div className="flex items-center justify-between mb-[4px]">
          <h2 className="text-[16px] font-black text-[#2a2026]">Upcoming sessions</h2>
          <button className="text-[#f14f98] text-[11.5px] font-extrabold hover:underline flex items-center gap-[4px]">
            View calendar <ArrowRight className="w-[12px] h-[12px] stroke-[2.5]" />
          </button>
        </div>

        {[
          { date: "JUN 27", title: "1:1 with Dr. Priya Nandan", desc: "Fri - 4:00 - 4:30 PM - Career pathing in PM" },
          { date: "JUL 02", title: "Mock interview with Jasmine Lee", desc: "Thu - 5:00 - 5:45 PM - Behavioral interview prep" }
        ].map((session, i) => (
          <div key={i} className="border border-[#f1e4e9] rounded-[16px] bg-white p-[16px] flex items-center gap-[16px] hover:border-[#fde8f1] transition-colors">
            <div className="border border-[#f1e4e9] rounded-[12px] w-[54px] h-[58px] flex flex-col items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <span className="text-[10px] font-black text-[#f14f98] uppercase tracking-wider">{session.date.split(' ')[0]}</span>
              <span className="text-[18px] font-black text-[#2a2026] leading-none mt-[2px]">{session.date.split(' ')[1]}</span>
            </div>
            <div className="flex-1">
              <div className="text-[14.5px] font-black text-[#2a2026] mb-[2px]">{session.title}</div>
              <div className="text-[12px] font-bold text-[#8b7e85]">{session.desc}</div>
            </div>
            <button className="border border-[#fde8f1] text-[#f14f98] text-[12.5px] font-extrabold px-[20px] py-[8px] rounded-full hover:bg-[#fff7fa] transition-colors shrink-0">
              Join
            </button>
          </div>
        ))}
      </div>

      {/* ── Browse Mentors ── */}
      <div className="bg-white border border-[#f1e4e9] rounded-[24px] p-[24px] space-y-[16px] mt-[8px]">
        <h2 className="text-[17px] font-black text-[#2a2026]">Browse mentors</h2>
        
        {/* Filter Chips */}
        <div className="flex flex-wrap gap-[8px]">
          {["All", "STEM", "Business", "Leadership", "Law", "Arts"].map((cat, i) => (
            <button 
              key={cat} 
              className={`px-[18px] py-[7px] rounded-full text-[12.5px] font-extrabold border transition-colors ${
                i === 0 
                  ? "bg-[#f14f98] text-white border-[#f14f98]" 
                  : "bg-white text-[#8b7e85] border-[#f1e4e9] hover:border-[#fde8f1] hover:text-[#2a2026]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] pt-[8px]">
          {[
            {
              name: "Dr. Priya Nandan",
              role: "Senior Product Manager, Google",
              rating: "4.9",
              bio: "Loves helping students break into tech PM roles and navigate first internships.",
              tags: ["STEM", "Business"],
              img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80"
            },
            {
              name: "Jasmine Lee",
              role: "Trial Attorney, DOJ Civil Division",
              rating: "5.0",
              bio: "Runs mock interviews and helps mentees prep competitive law school applications.",
              tags: ["Law", "Leadership"],
              img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&q=80"
            },
            {
              name: "Sofia Alvarez",
              role: "Mechanical Engineer, SpaceX",
              rating: "4.8",
              bio: "First-gen engineer passionate about getting more girls into robotics and aerospace.",
              tags: ["STEM"],
              img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80"
            },
            {
              name: "Maya Thompson",
              role: "VP Marketing, Warby Parker",
              rating: "4.9",
              bio: "Helps mentees build portfolios and land their first marketing internship.",
              tags: ["Business", "Leadership"],
              img: "https://images.unsplash.com/photo-1573497019230-17f536323f2d?w=150&q=80"
            },
            {
              name: "Elena Cho",
              role: "Muralist & Gallery Curator",
              rating: "4.7",
              bio: "Guides young artists through building a portfolio and applying to art programs.",
              tags: ["Arts"],
              img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80"
            },
            {
              name: "Dr. Amara Osei",
              role: "Physician & Public Health Fellow",
              rating: "5.0",
              bio: "Mentors pre-med students on shadowing, research and med school applications.",
              tags: ["STEM", "Leadership"],
              img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80"
            }
          ].map((mentor, i) => (
            <div key={i} className="border border-[#f1e4e9] rounded-[20px] bg-white p-[20px] flex flex-col hover:shadow-[0_4px_16px_rgba(207,52,120,0.04)] hover:-translate-y-[2px] transition-all cursor-pointer">
              <div className="flex gap-[14px] items-start mb-[14px]">
                <img src={mentor.img} className="w-[52px] h-[52px] rounded-full object-cover shrink-0 border border-[#f1e4e9]" />
                <div>
                  <div className="text-[14px] font-black text-[#2a2026] mb-[2px]">{mentor.name}</div>
                  <div className="text-[12px] font-bold text-[#8b7e85] leading-[1.3] mb-[4px]">{mentor.role}</div>
                  <div className="text-[11px] font-black text-[#f6b83c] flex items-center gap-[4px]">
                    <Star className="w-[12px] h-[12px] fill-[#f6b83c]" /> {mentor.rating}
                  </div>
                </div>
              </div>
              <div className="text-[12px] font-semibold text-[#8b7e85] leading-[1.6] mb-[16px] flex-1">
                {mentor.bio}
              </div>
              <div className="flex flex-wrap gap-[6px] mb-[16px]">
                {mentor.tags.map(tag => (
                  <span key={tag} className="bg-[#fff7fa] text-[#f14f98] text-[9.5px] font-extrabold px-[10px] py-[4px] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Card Footer Buttons */}
              <div className="flex gap-[10px] mt-auto">
                <button className="flex-1 py-[10px] rounded-full text-[12px] font-extrabold bg-white text-[#2a2026] border border-[#f1e4e9] hover:bg-[#fff7fa] transition-colors">
                  Message
                </button>
                <button className="flex-1 py-[10px] rounded-full text-[12px] font-extrabold bg-[#f14f98] text-white hover:bg-[#cf3478] transition-colors">
                  Book session
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
