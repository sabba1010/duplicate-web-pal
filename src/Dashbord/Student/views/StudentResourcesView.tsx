import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, FileText, ExternalLink, Loader2, Search, X, Calendar, MapPin, Tag } from "lucide-react";
import { API_BASE } from "../../../lib/api";

const CATEGORY_COLORS: Record<string, string> = {
  SCHOLARSHIPS: "#f14f98",
  INTERNSHIPS: "#f14f98",
  INTERVIEWS: "#7c5cbf",
  MENTORSHIP: "#2b9e6a",
  STEM: "#2196f3",
  CONFIDENCE: "#f6b83c",
  LEADERSHIP: "#e67e22",
  RESEARCH: "#1abc9c",
  GENERAL: "#8b7e85",
};

interface Resource {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  pdfFile: string;
  pdfOriginalName: string;
  externalLink?: string;
  deadline?: string;
  resourceType?: string;
  locationType?: string;
  locationAddress?: string;
  uploadedBy?: { name: string };
  createdAt: string;
}

export function StudentResourcesView() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filtered, setFiltered] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("goc_token");
        const res = await fetch(`${API_BASE}/api/resources`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setResources(data.resources || []);
          setFiltered(data.resources || []);
        } else {
          setError(data.message || "Failed to load resources");
        }
      } catch {
        setError("Could not connect to server");
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  // Derive unique categories from fetched resources
  const categories = [
    "ALL",
    ...Array.from(new Set(resources.map((r) => r.category))).sort(),
  ];

  // Filter whenever search or category changes
  useEffect(() => {
    let result = resources;
    if (activeCategory !== "ALL") {
      result = result.filter((r) => r.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          (r.resourceType && r.resourceType.toLowerCase().includes(q)) ||
          (r.locationType && r.locationType.toLowerCase().includes(q)) ||
          (r.locationAddress && r.locationAddress.toLowerCase().includes(q))
      );
    }
    setFiltered(result);
  }, [searchQuery, activeCategory, resources]);

  return (
    <div className="space-y-6 pb-8">
      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selectedResource && (
          <motion.div
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedResource(null)}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col"
            >
              {selectedResource.image && (
                <div className="h-[200px] overflow-hidden shrink-0 relative">
                  <img
                    src={`${API_BASE}${selectedResource.image}`}
                    alt={selectedResource.title}
                    className="w-full h-full object-cover"
                  />
                  {selectedResource.resourceType && (
                    <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-black px-3 py-1 rounded-xl">
                      {selectedResource.resourceType}
                    </span>
                  )}
                </div>
              )}
              <div className="p-6 space-y-4 overflow-y-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-[10px] font-black tracking-[0.1em] uppercase"
                      style={{ color: CATEGORY_COLORS[selectedResource.category] ?? "#8b7e85" }}
                    >
                      {selectedResource.category}
                    </span>
                    {!selectedResource.image && selectedResource.resourceType && (
                      <span className="bg-[#fdf2f8] text-[#f14f98] text-[10px] font-black px-2.5 py-0.5 rounded-full">
                        {selectedResource.resourceType}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedResource(null)}
                    className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <h2 className="text-[18px] font-black text-[#2a2026] leading-[1.3]">
                  {selectedResource.title}
                </h2>

                {/* Location & Deadline metadata row */}
                <div className="flex flex-col gap-2 pt-1 pb-1">
                  {selectedResource.locationType && (
                    <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#8b7e85]">
                      <MapPin className="h-3.5 w-3.5 text-[#f14f98]" />
                      <span>
                        {selectedResource.locationType}
                        {selectedResource.locationAddress ? `: ${selectedResource.locationAddress}` : ""}
                      </span>
                    </div>
                  )}
                  {selectedResource.deadline && (
                    <div className="flex items-center gap-1.5 text-[12px] font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100 w-fit">
                      <Calendar className="h-3.5 w-3.5 text-amber-600" />
                      <span>
                        Deadline: {new Date(selectedResource.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-[13px] text-[#8b7e85] font-semibold leading-[1.6]">
                  {selectedResource.description}
                </p>

                {/* Action Buttons (External Link & PDF) */}
                <div className="space-y-2 pt-2">
                  {selectedResource.externalLink && (
                    <a
                      href={selectedResource.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-full justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#f14f98] to-[#c2185b] text-white text-[13px] font-black shadow-md hover:shadow-lg transition-all"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit External Link / Apply
                    </a>
                  )}

                  {selectedResource.pdfFile && (
                    <a
                      href={`${API_BASE}${selectedResource.pdfFile}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 w-full justify-center px-5 py-3 rounded-xl ${
                        selectedResource.externalLink
                          ? "bg-[#fdf2f8] text-[#f14f98] font-bold hover:bg-[#fce7f3]"
                          : "bg-gradient-to-r from-[#f14f98] to-[#c2185b] text-white font-black shadow-md hover:shadow-lg"
                      } text-[13px] transition-all`}
                    >
                      <FileText className="h-4 w-4" />
                      Open PDF Document
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Page Header ── */}
      <div className="border-b border-[#f1e4e9] pb-5">
        <h1 className="text-[24px] font-black text-[#2a2026] tracking-tight">Resources</h1>
        <p className="text-[13px] text-[#8b7e85] font-semibold mt-[2px]">
          Scholarships, internships, fellowship opportunities, guides, and career resources.
        </p>
      </div>

      {/* ── Search + Filter ── */}
      {!loading && !error && resources.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#f1e4e9] text-[12px] font-semibold text-[#2a2026] outline-none focus:border-[#f14f98] focus:ring-2 focus:ring-[#f14f98]/10 transition-all"
            />
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#f14f98] text-white shadow-sm"
                    : "bg-[#fdf2f8] text-[#c57090] hover:bg-[#fce7f3]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── States ── */}
      {loading && (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="h-8 w-8 animate-spin text-[#f14f98]" />
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center justify-center h-48 text-center">
          <BookOpen className="h-12 w-12 text-gray-200 mb-3" />
          <p className="text-[14px] font-bold text-gray-400">{error}</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center h-48 text-center">
          <BookOpen className="h-12 w-12 text-[#f1e4e9] mb-3" />
          <p className="text-[14px] font-bold text-[#8b7e85]">
            {resources.length === 0 ? "No resources available yet" : "No resources match your search"}
          </p>
          {resources.length > 0 && (
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("ALL"); }}
              className="mt-3 text-[12px] font-black text-[#f14f98] hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* ── Resource Grid ── */}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
          <AnimatePresence>
            {filtered.map((resource, idx) => (
              <motion.div
                key={resource._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedResource(resource)}
                className="bg-white border border-[#f1e4e9] rounded-[18px] overflow-hidden hover:shadow-[0_4px_20px_rgba(207,52,120,0.06)] hover:-translate-y-[2px] transition-all cursor-pointer flex flex-col group"
              >
                {/* Thumbnail */}
                <div className="h-[160px] overflow-hidden bg-gradient-to-br from-[#fdf2f8] to-[#f3e8ff] shrink-0 relative">
                  {resource.image ? (
                    <img
                      src={`${API_BASE}${resource.image}`}
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="h-10 w-10 text-[#f9c8df]" />
                    </div>
                  )}
                  {resource.resourceType && (
                    <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg">
                      {resource.resourceType}
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="p-[16px] flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-[8px]">
                    <span
                      className="text-[10px] font-black tracking-[0.1em] uppercase"
                      style={{ color: CATEGORY_COLORS[resource.category] ?? "#f14f98" }}
                    >
                      {resource.category}
                    </span>
                    {resource.locationType && (
                      <span className="text-[10px] font-bold text-[#8b7e85] bg-[#fdf2f8] px-2 py-0.5 rounded-md flex items-center gap-1">
                        <MapPin className="h-2.5 w-2.5 text-[#f14f98]" />
                        {resource.locationType}
                      </span>
                    )}
                  </div>

                  <h3 className="text-[14px] font-black text-[#2a2026] leading-[1.4] mb-1 group-hover:text-[#f14f98] transition-colors line-clamp-2">
                    {resource.title}
                  </h3>
                  <p className="text-[11.5px] font-semibold text-[#8b7e85] mb-auto line-clamp-2">
                    {resource.description}
                  </p>

                  {/* Deadline notice if exists */}
                  {resource.deadline && (
                    <div className="mt-3 flex items-center gap-1 text-[10.5px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-md border border-amber-100/60">
                      <Calendar className="h-3 w-3 text-amber-600 shrink-0" />
                      <span>
                        Deadline: {new Date(resource.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-[12px] pt-[10px] border-t border-[#f9f0f4]">
                    <span className="text-[10px] text-[#c0a8b5] font-semibold">
                      {new Date(resource.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {resource.externalLink && (
                        <div className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-full">
                          <ExternalLink className="h-2.5 w-2.5 text-emerald-600" />
                          <span className="text-[9px] font-black text-emerald-600">Link</span>
                        </div>
                      )}
                      {resource.pdfFile && (
                        <div className="flex items-center gap-1 bg-[#fdf2f8] px-2 py-1 rounded-full">
                          <FileText className="h-2.5 w-2.5 text-[#f14f98]" />
                          <span className="text-[9px] font-black text-[#f14f98]">PDF</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

