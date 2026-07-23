import { Search, Bookmark, Share2, Calendar as CalendarIcon } from "lucide-react";

export function StudentMetrics() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {/* Card 1 */}
      <div className="bg-white rounded-3xl p-4 border border-pink-100/60 shadow-xs flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl border border-pink-200 bg-pink-50/50 flex items-center justify-center text-[#e04f96] shrink-0">
          <Search className="h-4 w-4" />
        </div>
        <div>
          <div className="text-xl font-extrabold text-[#2d1b28]">36</div>
          <div className="text-[10px] text-gray-500 leading-tight">New opportunities this week</div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-3xl p-4 border border-pink-100/60 shadow-xs flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl border border-pink-200 bg-pink-50/50 flex items-center justify-center text-[#e04f96] shrink-0">
          <Bookmark className="h-4 w-4" />
        </div>
        <div>
          <div className="text-xl font-extrabold text-[#2d1b28]">24</div>
          <div className="text-[10px] text-gray-500 leading-tight">Saved opportunities</div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-3xl p-4 border border-pink-100/60 shadow-xs flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl border border-pink-200 bg-pink-50/50 flex items-center justify-center text-[#e04f96] shrink-0">
          <Share2 className="h-4 w-4" />
        </div>
        <div>
          <div className="text-xl font-extrabold text-[#2d1b28]">12</div>
          <div className="text-[10px] text-gray-500 leading-tight">Shared with others</div>
        </div>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-3xl p-4 border border-pink-100/60 shadow-xs flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl border border-pink-200 bg-pink-50/50 flex items-center justify-center text-[#e04f96] shrink-0">
          <CalendarIcon className="h-4 w-4" />
        </div>
        <div>
          <div className="text-xl font-extrabold text-[#2d1b28]">7</div>
          <div className="text-[10px] text-gray-500 leading-tight">Upcoming deadlines</div>
        </div>
      </div>
    </div>
  );
}
