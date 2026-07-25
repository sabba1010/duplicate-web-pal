import { motion } from "framer-motion";
import { RECOMMENDED_OPPORTUNITIES } from "@/lib/mock-data";
import { Search, Filter, BookmarkPlus, MapPin, DollarSign, Clock } from "lucide-react";
import { useState } from "react";

export function StudentOpportunitiesView() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Scholarships", "Internships", "Fellowships", "Programs", "Volunteering"];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col overflow-hidden">
      <div className="p-6 border-b border-slate-100 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Discover Opportunities</h2>
            <p className="text-sm text-slate-500 mt-1">Explore tailored scholarships and internships.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search by keyword..."
                className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-700 rounded-xl py-2 pl-9 pr-4 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>
            <button className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-slate-800 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RECOMMENDED_OPPORTUNITIES.map((opp, i) => (
            <motion.div 
              key={opp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all group"
            >
              <div className="h-40 relative overflow-hidden">
                <img src={opp.image} alt={opp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-teal-700 shadow-sm">
                  {opp.type}
                </div>
                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-600 hover:text-rose-500 hover:bg-white shadow-sm transition-colors">
                  <BookmarkPlus className="h-4 w-4" />
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900 text-base leading-tight mb-1 group-hover:text-teal-600 transition-colors line-clamp-2">
                  {opp.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 mb-4 line-clamp-1">{opp.organization}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>Due: <span className="font-semibold text-slate-800">{opp.deadline}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>{opp.location}</span>
                  </div>
                  {opp.amount && (
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="font-semibold text-emerald-700">{opp.amount}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {opp.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
