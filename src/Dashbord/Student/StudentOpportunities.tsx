import { Bookmark, ChevronRight } from "lucide-react";

export interface OpportunityItem {
  id: number;
  title: string;
  category: string;
  deadline: string;
  featured: boolean;
  tags: string[];
  image: string;
}

interface StudentOpportunitiesProps {
  opportunities: OpportunityItem[];
  savedIds: number[];
  toggleBookmark: (id: number) => void;
}

export function StudentOpportunities({
  opportunities,
  savedIds,
  toggleBookmark,
}: StudentOpportunitiesProps) {
  return (
    <div className="bg-white rounded-3xl p-5 border border-pink-100/60 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm text-[#2d1b28]">More opportunities for you</h3>
        <a href="#" className="text-xs font-semibold text-[#e04f96] hover:underline flex items-center gap-1">
          View all →
        </a>
      </div>

      {/* 4 Cards Grid */}
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {opportunities.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-pink-100 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image Thumbnail */}
              <div className="relative h-28 w-full overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.featured && (
                  <span className="absolute top-2 left-2 bg-[#e04f96] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                    FEATURED
                  </span>
                )}
              </div>

              {/* Card Info */}
              <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="font-bold text-xs text-[#2d1b28] line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[10px] font-medium text-gray-500 mt-1">
                    {item.category}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Deadline: {item.deadline}
                  </p>
                </div>

                {/* Bottom Tags & Bookmark */}
                <div className="flex items-center justify-between pt-1 border-t border-gray-50">
                  <div className="flex items-center gap-1 flex-wrap">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="bg-pink-50 text-[#e04f96] text-[9px] font-bold px-1.5 py-0.5 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => toggleBookmark(item.id)}
                    className={`p-1 rounded-md transition-colors cursor-pointer ${
                      savedIds.includes(item.id)
                        ? "text-[#e04f96] fill-[#e04f96]"
                        : "text-gray-300 hover:text-[#e04f96]"
                    }`}
                  >
                    <Bookmark className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Scroll Arrow */}
        <button className="hidden xl:flex absolute -right-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full border border-gray-200 shadow-md items-center justify-center text-gray-500 hover:text-[#e04f96] transition-colors cursor-pointer">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
