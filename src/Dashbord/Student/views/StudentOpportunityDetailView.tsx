import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Bookmark, Share2, Calendar, X, Copy, Check, FileText, Send, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { API_BASE } from "../../../lib/api";

interface OppCard {
  id: string;
  title: string;
  category: string;
  deadline: string;
  tags: string[];
  image: string;
  organization?: string;
}

export function StudentOpportunityDetailView({ 
  opp, 
  onBack,
  relatedOpps,
  isSaved = false,
  isApplied = false,
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
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Optimistic UI state
  const [localSaved, setLocalSaved] = useState(isSaved);
  const [localApplied, setLocalApplied] = useState(isApplied);

  // Student info for application
  const [studentInfo, setStudentInfo] = useState({ name: "", email: "", school: "" });
  const [note, setNote] = useState("");
  const [isSubmittingApp, setIsSubmittingApp] = useState(false);
  const [appSubmittedSuccess, setAppSubmittedSuccess] = useState(false);

  useEffect(() => {
    setLocalSaved(isSaved);
    setLocalApplied(isApplied);

    const stored = localStorage.getItem("goc_user");
    if (stored) {
      try {
        const u = JSON.parse(stored);
        setStudentInfo({
          name: u.name || "Student",
          email: u.email || "",
          school: u.school || "Not specified"
        });
      } catch (e) {}
    }
  }, [isSaved, isApplied]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Instant zero-delay Save Toggle
  const handleSave = async () => {
    const nextSavedState = !localSaved;
    setLocalSaved(nextSavedState); // Instant UI toggle!
    window.dispatchEvent(new Event("goc_user_updated"));
    if (onInteraction) onInteraction();

    try {
      const token = localStorage.getItem("goc_token");
      await fetch(`${API_BASE}/api/users/save-opportunity/${opp.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Failed to save", error);
      setLocalSaved(!nextSavedState); // Revert if failed
    }
  };

  // Submit Application via Popup Modal
  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingApp(true);

    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/users/apply-opportunity/${opp.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setLocalApplied(true); // Instant update!
        setAppSubmittedSuccess(true);
        window.dispatchEvent(new Event("goc_user_updated"));
        if (onInteraction) onInteraction();

        setTimeout(() => {
          setAppSubmittedSuccess(false);
          setShowApplyModal(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Failed to apply", error);
      alert("Application failed. Please try again.");
    } finally {
      setIsSubmittingApp(false);
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
          className="flex items-center gap-2 text-[13px] font-bold text-[#6b7280] hover:text-[#111827] mb-5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Back to listings
        </button>

        {/* Hero Image */}
        <div 
          className="w-full h-[240px] md:h-[300px] rounded-[24px] bg-cover bg-center mb-6 relative overflow-hidden shadow-sm"
          style={{ backgroundImage: `url('${opp.image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
        </div>

        {/* Content Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black text-[#cf3478] tracking-widest uppercase bg-[#fde8f1] px-2.5 py-1 rounded-full">
              {opp.category}
            </span>
            {opp.organization && (
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                {opp.organization}
              </span>
            )}
          </div>

          <h1 className="text-[28px] md:text-[32px] font-black text-[#111827] tracking-tight mb-3">
            {opp.title}
          </h1>

          <div className="flex items-center gap-2 text-[13px] font-bold text-[#6b7280] mb-4">
            <Calendar className="h-4 w-4 text-[#cf3478]" /> Deadline: <span className="text-[#111827]">{opp.deadline}</span>
          </div>
          
          {/* Tags */}
          <div className="flex gap-2 flex-wrap mb-6">
            {opp.tags.map((t) => (
              <span
                key={t}
                className="bg-slate-100 text-slate-700 text-[11px] font-bold px-[12px] py-[4px] rounded-full"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-[14px] leading-[1.75] font-medium text-[#4b5563] mb-8 max-w-3xl">
            This {opp.category.toLowerCase()} offers great opportunities for students aiming for growth in {opp.tags.join(", ")}. Qualified GOC members are encouraged to submit their details before the deadline ({opp.deadline}).
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 border-b border-[#e5e7eb] pb-10">
            <button 
              onClick={() => setShowApplyModal(true)}
              className={`px-7 py-3 rounded-full text-[13px] font-black transition-all shadow-sm flex items-center gap-2 cursor-pointer ${
                localApplied 
                  ? "bg-emerald-600 text-white hover:bg-emerald-700" 
                  : "bg-[#cf3478] text-white hover:bg-[#b82d69] active:scale-95"
              }`}
            >
              {localApplied ? (
                <>
                  <Check className="h-4 w-4" /> Application Submitted
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Apply Now
                </>
              )}
            </button>
            
            <button 
              onClick={handleSave}
              className={`px-6 py-3 rounded-full text-[13px] font-extrabold border transition-all flex items-center gap-2 cursor-pointer active:scale-95 ${
                localSaved 
                  ? "border-[#cf3478] text-[#cf3478] bg-[#fde8f1] shadow-sm" 
                  : "border-[#e5e7eb] text-[#4b5563] hover:border-[#cf3478] hover:text-[#cf3478] bg-white"
              }`}
            >
              <Bookmark className="h-4 w-4" fill={localSaved ? "currentColor" : "none"} /> 
              {localSaved ? "Saved" : "Save"}
            </button>
            
            <button 
              onClick={() => setShowShareModal(true)}
              className="px-6 py-3 rounded-full text-[13px] font-extrabold border border-[#e5e7eb] text-[#4b5563] hover:border-[#111827] hover:text-[#111827] bg-white transition-all flex items-center gap-2 cursor-pointer"
            >
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>
        </div>

        {/* Related Opportunities */}
        {relatedOpps && relatedOpps.length > 0 && (
          <div className="mt-8">
            <h3 className="text-[18px] font-extrabold text-[#111827] mb-5">You might also like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedOpps.slice(0, 4).map((related) => (
                <div 
                  key={related.id} 
                  className="bg-white border border-[#f1e4e9] rounded-[16px] overflow-hidden hover:shadow-md hover:border-[#cf3478] transition-all flex flex-col cursor-pointer group"
                >
                  <div 
                    className="h-[100px] relative bg-cover bg-center shrink-0 group-hover:scale-105 transition-transform" 
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

      {/* ── APPLY POPUP MODAL ── */}
      <AnimatePresence>
        {showApplyModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowApplyModal(false)}
              className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black text-[#cf3478] uppercase tracking-wider bg-[#fde8f1] px-2.5 py-0.5 rounded-full">
                    {opp.category} Application
                  </span>
                  <h3 className="text-lg font-black text-[#111827] mt-1">{opp.title}</h3>
                </div>
                <button 
                  onClick={() => setShowApplyModal(false)}
                  className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {appSubmittedSuccess ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Check className="h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900">Application Submitted!</h4>
                  <p className="text-xs font-semibold text-slate-500">Your application and deadline have been automatically added to your Applications & Calendar.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="space-y-4">
                  {/* Student Profile Preview */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                    <div className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Applicant Profile</div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 font-bold block">Name</span>
                        <span className="font-extrabold text-slate-900">{studentInfo.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block">Email</span>
                        <span className="font-extrabold text-slate-900 truncate block">{studentInfo.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Note / Statement of Purpose */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 flex items-center justify-between">
                      <span>Statement / Note for Application</span>
                      <span className="text-slate-400 font-medium">Optional</span>
                    </label>
                    <textarea 
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Briefly state why you're interested or attach relevant details..."
                      className="w-full bg-[#fff7fa] border border-[#f1e4e9] text-xs font-medium rounded-2xl p-3 outline-none focus:border-[#cf3478] min-h-[90px]"
                    />
                  </div>

                  {/* Deadline Notice */}
                  <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200/60 rounded-2xl text-amber-800 text-xs font-bold">
                    <Calendar className="h-4 w-4 shrink-0 text-amber-600" />
                    <span>Deadline: {opp.deadline} (Will auto-sync to your Calendar)</span>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                    <button 
                      type="button" 
                      onClick={() => setShowApplyModal(false)}
                      className="px-4 py-2.5 rounded-2xl text-xs font-extrabold text-slate-600 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmittingApp}
                      className="px-6 py-2.5 rounded-2xl text-xs font-black text-white bg-[#cf3478] hover:bg-[#b82d69] shadow-sm flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSubmittingApp ? "Submitting..." : "Confirm & Submit Application"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
