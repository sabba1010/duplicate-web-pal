import { useState } from "react";
import { SAVED_ITEMS, SavedItem } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, Plus } from "lucide-react";

const COLUMNS = ["Saved", "Planning", "In Progress", "Submitted"] as const;

export function StudentApplicationsView() {
  const [items, setItems] = useState<SavedItem[]>(SAVED_ITEMS);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    if (!draggedId) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === draggedId ? { ...item, status: status as any } : item
      )
    );
    setDraggedId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white rounded-3xl border border-pink-100 shadow-sm h-full flex flex-col overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Application Tracker</h2>
          <p className="text-sm text-slate-500 mt-1">Drag and drop to update application progress.</p>
        </div>
        <button className="bg-[#e04f96] hover:bg-[#c43d83] text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-colors flex items-center gap-2 cursor-pointer">
          <Plus className="h-4 w-4" /> Add Custom
        </button>
      </div>

      <div className="flex-1 overflow-x-auto p-6 bg-pink-50/20">
        <div className="flex gap-6 min-w-max h-full">
          {COLUMNS.map((col) => (
            <div
              key={col}
              onDrop={(e) => handleDrop(e, col)}
              onDragOver={handleDragOver}
              className="w-80 flex flex-col bg-pink-50/30 rounded-2xl p-4 border border-pink-100 h-full"
            >
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="font-bold text-slate-700 text-sm">{col}</h3>
                <span className="bg-white text-slate-500 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm border border-slate-100">
                  {items.filter(i => i.status === col).length}
                </span>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300">
                <AnimatePresence>
                  {items.filter(i => i.status === col).map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      draggable
                      onDragStart={() => handleDragStart(item.id)}
                      className="bg-white p-4 rounded-xl border border-pink-100 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md hover:border-[#e04f96]/30 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#e04f96] bg-pink-50 px-2 py-0.5 rounded-full">
                          {item.opportunity.type}
                        </span>
                        <button className="text-slate-400 hover:text-slate-800 transition-colors opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1">{item.opportunity.title}</h4>
                      <p className="text-xs font-medium text-slate-500 truncate mb-3">{item.opportunity.organization}</p>
                      
                      <div className="bg-slate-50 rounded-lg p-2 flex items-center justify-between border border-slate-100">
                        <span className="text-[10px] font-semibold text-slate-500 uppercase">Deadline</span>
                        <span className="text-xs font-bold text-slate-700">{item.opportunity.deadline}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
