import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Bookmark, Share2, Calendar, X, Copy, Check } from "lucide-react";
import { useState } from "react";

interface OppCard {
  id: string;
  title: string;
  category: string;
  deadline: string;
  tags: string[];
  image: string;
}

export function StudentOpportunityDetailView({ 
  opp, 
  onBack,
  relatedOpps,
  isSaved,
  isApplied,
  onInteraction
}: { 
  opp: OppCard; 
  onBack: () => void;
  relatedOpps: OppCard[];
  isSaved?: boolean;
  isApplied?: boolean;
  onInteraction?: () => void;
}) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = async () => {
    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`http://localhost:5000/api/users/apply-opportunity/${opp.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        window.dispatchEvent(new Event("goc_user_updated"));
        if (onInteraction) onInteraction();
      }
    } catch (error) {
      console.error("Failed to apply", error);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`http://localhost:5000/api/users/save-opportunity/${opp.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        window.dispatchEvent(new Event("goc_user_updated"));
        if (onInteraction) onInteraction();
      }
    } catch (error) {
      console.error("Failed to save", error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="pb-10 relative"
      >
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[13px] font-bold text-[#6b7280] hover:text-[#111827] mb-5 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {/* Hero Image */}
        <div 
          className="w-full h-[240px] md:h-[300px] rounded-[24px] bg-cover bg-center mb-6 relative overflow-hidden"
          style={{ backgroundImage: `url('${opp.image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>

        {/* Content Header */}
        <div className="mb-6">
          <div className="text-[10px] font-extrabold text-[#cf3478] tracking-widest uppercase mb-2">
            {opp.category}
          </div>
          <h1 className="text-[28px] md:text-[32px] font-black text-[#111827] tracking-tight mb-3">
            {opp.title}
          </h1>
          <div className="flex items-center gap-2 text-[13px] font-semibold text-[#6b7280] mb-4">
            <Calendar className="h-4 w-4" /> Deadline: {opp.deadline}
          </div>
          
          {/* Tags */}
          <div className="flex gap-2 flex-wrap mb-6">
            {opp.tags.map((t) => (
              <span
                key={t}
                className="bg-[#fde8f1] text-[#cf3478] text-[11px] font-extrabold px-[12px] py-[4px] rounded-full"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-[14px] leading-[1.7] font-medium text-[#4b5563] mb-8 max-w-3xl">
            This {opp.category.toLowerCase()} supports students pursuing their goals with a focus on {opp.tags.join(" and ")}. Awards are based on merit, essays, and community involvement — GOC members are encouraged to apply early since spots fill quickly.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 border-b border-[#e5e7eb] pb-10">
            <button 
              onClick={handleApply}
              className={`px-6 py-2.5 rounded-full text-[13px] font-extrabold transition-all shadow-sm ${
                isApplied 
                  ? "bg-[#cf3478] text-white" 
                  : "bg-[#cf3478] text-white hover:bg-[#b82d69]"
              }`}
            >
              {isApplied ? "Application started ✓" : "Apply Now"}
            </button>
            
            <button 
              onClick={handleSave}
              className={`px-5 py-2.5 rounded-full text-[13px] font-extrabold border transition-all flex items-center gap-2 ${
                isSaved 
                  ? "border-[#cf3478] text-[#cf3478] bg-[#fde8f1]" 
                  : "border-[#e5e7eb] text-[#4b5563] hover:border-[#cf3478] hover:text-[#cf3478]"
              }`}
            >
              <Bookmark className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} /> 
              {isSaved ? "Saved" : "Save"}
            </button>
            
            <button 
              onClick={() => setShowShareModal(true)}
              className="px-5 py-2.5 rounded-full text-[13px] font-extrabold border border-[#e5e7eb] text-[#4b5563] hover:border-[#111827] hover:text-[#111827] transition-all flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>
        </div>

        {/* You might also like */}
        {relatedOpps && relatedOpps.length > 0 && (
          <div className="mt-8">
            <h3 className="text-[18px] font-extrabold text-[#111827] mb-5">You might also like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedOpps.slice(0, 4).map((related) => (
                <div 
                  key={related.id} 
                  className="bg-white border border-[#f1e4e9] rounded-[14px] overflow-hidden hover:shadow-md transition-all flex flex-col cursor-pointer"
                >
                  <div 
                    className="h-[100px] relative bg-cover bg-center shrink-0" 
                    style={{ backgroundImage: `url('${related.image}')` }}
                  ></div>
                  <div className="p-3 flex-1 flex flex-col">
                    <h4 className="font-extrabold text-[12px] leading-tight mb-1 text-[#2a2026]">
                      {related.title}
                    </h4>
                    <p className="text-[10px] font-bold text-[#8b7e85] mb-1">{related.category}</p>
                    <p className="text-[9.5px] font-semibold text-[#8b7e85] mb-2">Deadline: {related.deadline}</p>
                    <div className="flex gap-1 mt-auto">
                      {related.tags.slice(0, 2).map((t) => (
                        <span key={t} className="bg-[#fde8f1] text-[#cf3478] text-[8px] font-extrabold px-2 py-0.5 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareModal(false)}
              className="fixed inset-0 z-40 bg-[#111827]/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white rounded-[24px] shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#e5e7eb]">
                <h3 className="text-[18px] font-black text-[#111827]">Share Opportunity</h3>
                <button 
                  onClick={() => setShowShareModal(false)}
                  className="p-2 text-[#6b7280] hover:bg-[#f3f4f6] rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <p className="text-[14px] text-[#4b5563] font-medium mb-4">
                  Copy the link below to share this opportunity with your friends or network.
                </p>
                <div className="flex items-center gap-3">
                  <input 
                    type="text" 
                    readOnly 
                    value={window.location.href} 
                    className="flex-1 bg-[#f9fafb] border border-[#e5e7eb] text-[#111827] text-[13px] rounded-xl px-4 py-3 outline-none focus:border-[#cf3478]"
                  />
                  <button 
                    onClick={handleCopyLink}
                    className={`flex items-center justify-center h-[46px] w-[46px] rounded-xl text-white transition-all ${
                      copied ? "bg-[#39b86b]" : "bg-[#cf3478] hover:bg-[#b82d69]"
                    }`}
                  >
                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
