import { motion } from "framer-motion";
import { Bookmark, Send, Share2 } from "lucide-react";
import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const RECEIVED = [
  {
    id: "r1",
    sender: "Isabella R.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80",
    program: "MIT Summer Research Program",
    time: "2h ago",
    saved: false,
  },
  {
    id: "r2",
    sender: "Sofia M.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
    program: "Yale Young Global Scholars",
    time: "5h ago",
    saved: false,
  },
  {
    id: "r3",
    sender: "Ava K.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&auto=format&fit=crop&q=80",
    program: "Nike Marketing Internship",
    time: "1d ago",
    saved: false,
  },
];

const SENT = [
  {
    id: "s1",
    to: "Ava K.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&auto=format&fit=crop&q=80",
    program: "Public Policy Fellowship",
    comment: 'Sofia replied: "Applying tonight!"',
    time: "1d ago",
  },
  {
    id: "s2",
    to: "Sofia M.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
    program: "Google STEP Internship",
    comment: "Soon",
    time: "1d ago",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function StudentSharedView() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const toggleSave = (id: string) =>
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-pink-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-pink-50 rounded-xl">
            <Share2 className="h-5 w-5 text-[#e04f96]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#2d1b28]">Shared with you</h2>
            <p className="text-[12px] text-gray-400">
              Opportunities your friends thought you'd love.
            </p>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* ── Received ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-3xl border border-pink-100 shadow-sm p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[13px] text-[#2d1b28]">Received</h3>
            <span className="text-[10px] font-bold bg-pink-100 text-[#e04f96] px-2 py-0.5 rounded-full">
              {RECEIVED.length} new
            </span>
          </div>

          <div className="space-y-3">
            {RECEIVED.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="flex items-center justify-between p-3 rounded-2xl border border-pink-50 hover:border-pink-200 hover:bg-pink-50/20 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.sender}
                    className="w-9 h-9 rounded-full object-cover border-2 border-pink-100 shrink-0"
                  />
                  <div>
                    <div className="text-[12px] font-bold text-[#2d1b28]">
                      {item.sender}{" "}
                      <span className="font-normal text-gray-400">shared</span>
                    </div>
                    <div className="text-[11px] text-[#e04f96] font-semibold hover:underline cursor-pointer">
                      {item.program}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[9px] text-gray-400">{item.time}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(item.id);
                    }}
                    className="text-gray-300 hover:text-[#e04f96] transition-colors cursor-pointer"
                  >
                    <Bookmark
                      className="h-3.5 w-3.5"
                      fill={savedIds.includes(item.id) ? "#e04f96" : "none"}
                      stroke={savedIds.includes(item.id) ? "#e04f96" : "currentColor"}
                    />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Share button */}
          <div className="mt-4 pt-4 border-t border-pink-50">
            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl border border-dashed border-pink-200 text-[12px] font-semibold text-[#e04f96] hover:bg-pink-50 transition-colors cursor-pointer">
              <Share2 className="h-3.5 w-3.5" />
              Share an opportunity with a friend
            </button>
          </div>
        </motion.div>

        {/* ── Sent by you ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border border-pink-100 shadow-sm p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[13px] text-[#2d1b28]">Sent by you</h3>
            <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              {SENT.length} sent
            </span>
          </div>

          <div className="space-y-3">
            {SENT.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="flex items-center justify-between p-3 rounded-2xl border border-gray-100 hover:border-pink-100 hover:bg-pink-50/10 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {/* Send icon */}
                  <div className="w-9 h-9 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center shrink-0">
                    <img
                      src={item.avatar}
                      alt={item.to}
                      className="w-9 h-9 rounded-full object-cover border-2 border-pink-100"
                    />
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-[#2d1b28]">
                      To {item.to} ·{" "}
                      <span className="text-[#e04f96] font-semibold hover:underline">
                        {item.program}
                      </span>
                    </div>
                    {item.comment && (
                      <div className="text-[10px] text-gray-400 italic mt-0.5 line-clamp-1">
                        {item.comment}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[9px] text-gray-400">{item.time}</span>
                  <div className="w-6 h-6 rounded-full bg-[#e04f96]/10 flex items-center justify-center">
                    <Send className="h-3 w-3 text-[#e04f96]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty state hint */}
          <div className="mt-4 pt-4 border-t border-gray-50">
            <p className="text-[11px] text-gray-400 text-center">
              Share opportunities with friends to help them grow too. 💕
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
