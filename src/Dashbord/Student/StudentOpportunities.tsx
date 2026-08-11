import { Bookmark, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export interface OpportunityItem {
  id: string;
  title: string;
  category: string;
  deadline: string;
  featured: boolean;
  tags: string[];
  image: string;
}

interface StudentOpportunitiesProps {
  opportunities: OpportunityItem[];
  savedIds: string[];
  toggleBookmark: (id: string) => void;
  onViewAll?: () => void;
}

export function StudentOpportunities({
  opportunities,
  savedIds,
  toggleBookmark,
  onViewAll,
}: StudentOpportunitiesProps) {
  return (
    <div className="bg-white rounded-[18px] p-[16px_18px] border border-pink-100 shadow-xs space-y-4 mb-[14px]">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm text-[#2d1b28]">More opportunities for you</h3>
        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-[#e04f96] hover:underline cursor-pointer"
        >
          View all →
        </button>
      </div>

      {/* 4 Cards Grid with scroll arrow */}
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {opportunities.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
              className="bg-white border border-pink-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-pink-200 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-28 w-full overflow-hidden bg-gray-100 shrink-0">
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

              {/* Info */}
              <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="font-bold text-[12px] text-[#2d1b28] line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[10px] font-medium text-gray-500 mt-0.5">{item.category}</p>
                  <p className="text-[10px] text-gray-400">Deadline: {item.deadline}</p>
                </div>

                {/* Tags & Bookmark */}
                <div className="flex items-center justify-between pt-1.5 border-t border-gray-50">
                  <div className="flex items-center gap-1 flex-wrap">
                    {item.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="bg-pink-50 text-[#e04f96] text-[9px] font-bold px-1.5 py-0.5 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(item.id);
                    }}
                    className={`p-1 rounded-md transition-colors cursor-pointer ${
                      savedIds.includes(item.id)
                        ? "text-[#e04f96]"
                        : "text-gray-300 hover:text-[#e04f96]"
                    }`}
                  >
                    <Bookmark
                      className="h-3.5 w-3.5"
                      fill={savedIds.includes(item.id) ? "#e04f96" : "none"}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Arrow */}
        <button className="hidden xl:flex absolute -right-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full border border-gray-200 shadow-md items-center justify-center text-gray-500 hover:text-[#e04f96] hover:border-pink-200 transition-all cursor-pointer">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
