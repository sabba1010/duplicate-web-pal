const ARTICLES = [
  {
    id: 1,
    category: "SCHOLARSHIPS",
    title: "Writing a scholarship essay that stands out",
    read: "6 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    category: "INTERVIEWS",
    title: "10 questions to prep for before any interview",
    read: "4 min read",
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    category: "MENTORSHIP",
    title: "How to ask for a strong letter of recommendation",
    read: "5 min read",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    category: "INTERNSHIPS",
    title: "Negotiating your first internship offer",
    read: "7 min read",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    category: "STEM",
    title: "Breaking into tech with no prior experience",
    read: "8 min read",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    category: "CONFIDENCE",
    title: "Overcoming imposter syndrome in new rooms",
    read: "5 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  SCHOLARSHIPS: "text-[#f14f98]",
  INTERVIEWS: "text-[#7c5cbf]",
  MENTORSHIP: "text-[#2b9e6a]",
  INTERNSHIPS: "text-[#f14f98]",
  STEM: "text-[#2196f3]",
  CONFIDENCE: "text-[#f6b83c]",
};

export function StudentResourcesView() {
  return (
    <div className="space-y-6 pb-8">
      {/* ── Page Header ── */}
      <div className="border-b border-[#f1e4e9] pb-5">
        <h1 className="text-[24px] font-black text-[#2a2026] tracking-tight">Resources</h1>
        <p className="text-[13px] text-[#8b7e85] font-semibold mt-[2px]">
          Guides to help you apply, interview and negotiate with confidence.
        </p>
      </div>

      {/* ── Article Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
        {ARTICLES.map((article) => (
          <div
            key={article.id}
            className="bg-white border border-[#f1e4e9] rounded-[18px] overflow-hidden hover:shadow-[0_4px_20px_rgba(207,52,120,0.06)] hover:-translate-y-[2px] transition-all cursor-pointer flex flex-col group"
          >
            {/* Thumbnail */}
            <div className="h-[160px] overflow-hidden bg-gray-100 shrink-0">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Body */}
            <div className="p-[16px] flex flex-col flex-1">
              <div
                className={`text-[10px] font-black tracking-[0.1em] uppercase mb-[8px] ${
                  CATEGORY_COLORS[article.category] ?? "text-[#f14f98]"
                }`}
              >
                {article.category}
              </div>
              <h3 className="text-[14px] font-black text-[#2a2026] leading-[1.4] mb-auto group-hover:text-[#f14f98] transition-colors">
                {article.title}
              </h3>
              <p className="text-[11.5px] font-bold text-[#8b7e85] mt-[12px]">
                {article.read}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
