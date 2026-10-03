import { useState, useEffect } from "react";
import { User, Star, MessageSquare, Loader2 } from "lucide-react";
import { API_BASE } from "@/lib/api";
import { toast } from "sonner";

interface MentorItem {
  _id: string;
  name: string;
  username: string;
  avatar?: string;
  role?: string;
  school?: string;
  bio?: string;
  tags?: string[];
  rating?: string;
}

export function StudentCommunityView() {
  const [mentors, setMentors] = useState<MentorItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTag, setSelectedTag] = useState<string>("All");

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("goc_token");
        const res = await fetch(`${API_BASE}/api/chat/mentors`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setMentors(data || []);
        }
      } catch (err) {
        console.error("Error fetching mentors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const filteredMentors = mentors.filter((m) => {
    if (selectedTag === "All") return true;
    if (!m.tags || m.tags.length === 0) return true;
    return m.tags.includes(selectedTag);
  });

  return (
    <div className="space-y-6 pb-8 max-w-[850px] font-sans">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#f1e4e9] pb-5">
        <div>
          <h1 className="text-[24px] font-black text-[#2a2026] tracking-tight">Mentors & Network</h1>
          <p className="text-[13px] text-[#8b7e85] font-semibold mt-[2px]">
            Connect with verified mentors and community members for 1:1 guidance.
          </p>
        </div>
      </div>

      {/* ── Browse Mentors & Members ── */}
      <div className="bg-white border border-[#f1e4e9] rounded-[24px] p-[24px] space-y-[16px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[17px] font-black text-[#2a2026]">Community Mentors & Members</h2>
          <span className="text-[11px] font-bold text-[#8b7e85] bg-[#fff7fa] border border-[#fde8f1] px-3 py-1 rounded-full">
            {mentors.length} Members Available
          </span>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-[8px]">
          {["All", "STEM", "Business", "Leadership", "Law", "Arts"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedTag(cat)}
              className={`px-[18px] py-[7px] rounded-full text-[12.5px] font-extrabold border transition-colors cursor-pointer ${
                selectedTag === cat
                  ? "bg-[#f14f98] text-white border-[#f14f98]"
                  : "bg-white text-[#8b7e85] border-[#f1e4e9] hover:border-[#fde8f1] hover:text-[#2a2026]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Real Mentors Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 text-[#f14f98] animate-spin" />
          </div>
        ) : filteredMentors.length === 0 ? (
          <div className="text-center py-12 bg-[#fff7fa]/50 rounded-[20px] border border-dashed border-[#fde8f1] p-6 space-y-2">
            <User className="w-8 h-8 text-[#f14f98] mx-auto stroke-[1.5]" />
            <h3 className="text-sm font-black text-[#2a2026]">No mentors found</h3>
            <p className="text-xs text-[#8b7e85] max-w-sm mx-auto font-medium">
              Registered community members and mentors will appear here as they join GOC.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] pt-[8px]">
            {filteredMentors.map((mentor) => {
              const avatarUrl =
                mentor.avatar ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(mentor.name)}`;

              return (
                <div
                  key={mentor._id}
                  className="border border-[#f1e4e9] rounded-[20px] bg-white p-[20px] flex flex-col hover:shadow-[0_4px_16px_rgba(207,52,120,0.04)] hover:-translate-y-[2px] transition-all"
                >
                  <div className="flex gap-[14px] items-start mb-[14px]">
                    <img
                      src={avatarUrl}
                      alt={mentor.name}
                      className="w-[52px] h-[52px] rounded-full object-cover shrink-0 border border-[#f1e4e9]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[14px] font-black text-[#2a2026] mb-[2px] truncate">
                        {mentor.name}
                      </div>
                      <div className="text-[12px] font-bold text-[#8b7e85] leading-[1.3] mb-[4px] truncate">
                        {mentor.role ? mentor.role.toUpperCase() : `@${mentor.username}`}
                      </div>
                      {mentor.rating && (
                        <div className="text-[11px] font-black text-[#f6b83c] flex items-center gap-[4px]">
                          <Star className="w-[12px] h-[12px] fill-[#f6b83c]" /> {mentor.rating}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-[12px] font-semibold text-[#8b7e85] leading-[1.6] mb-[16px] flex-1 line-clamp-3">
                    {mentor.bio || `Community member on GOC. Connect for guidance and networking.`}
                  </div>

                  {mentor.tags && mentor.tags.length > 0 && (
                    <div className="flex flex-wrap gap-[6px] mb-[16px]">
                      {mentor.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#fff7fa] text-[#f14f98] text-[9.5px] font-extrabold px-[10px] py-[4px] rounded-full border border-[#fde8f1]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Card Footer Action */}
                  <div className="flex gap-[10px] mt-auto">
                    <button
                      onClick={() => toast.success(`Start chat with ${mentor.name} in Live Chat`)}
                      className="w-full py-[10px] rounded-full text-[12px] font-extrabold bg-[#f14f98] text-white hover:bg-[#cf3478] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-[14px] h-[14px]" /> Connect
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
