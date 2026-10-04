import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  FileText,
  ExternalLink,
  Loader2,
  Search,
  X,
  Calendar,
  MapPin,
  Lock,
  CheckCircle2,
  Sparkles,
  CreditCard,
  Settings,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
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

interface SubscriptionInfo {
  hasAccess: boolean;
  subscriptionPlan: "monthly" | "yearly" | "none";
  subscriptionStatus: string;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  stripeCustomerId: string;
  role: string;
}

interface PricingInfo {
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
}

export function StudentResourcesView() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filtered, setFiltered] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [requiresSubscription, setRequiresSubscription] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  // Subscription state
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [pricing, setPricing] = useState<PricingInfo>({ monthlyPrice: 8, yearlyPrice: 12, currency: "usd" });
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("monthly");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      setError("");
      setRequiresSubscription(false);
      const token = localStorage.getItem("goc_token");

      // 1. Fetch Pricing
      try {
        const pricingRes = await fetch(`${API_BASE}/api/subscription/pricing`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const pricingData = await pricingRes.json();
        if (pricingRes.ok && pricingData.pricing) {
          setPricing(pricingData.pricing);
        }
      } catch (e) {
        console.warn("Could not fetch pricing settings:", e);
      }

      // 2. Fetch Subscription Status
      try {
        const subRes = await fetch(`${API_BASE}/api/subscription/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const subData = await subRes.json();
        if (subRes.ok && subData.subscription) {
          setSubscription(subData.subscription);
        }
      } catch (e) {
        console.warn("Could not fetch subscription status:", e);
      }

      // 3. Fetch Resources
      const resRes = await fetch(`${API_BASE}/api/resources`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const resData = await resRes.json();

      if (resRes.status === 403 || resData.requiresSubscription) {
        setRequiresSubscription(true);
      } else if (resRes.ok) {
        setResources(resData.resources || []);
        setFiltered(resData.resources || []);
      } else {
        setError(resData.message || "Failed to load resources");
      }
    } catch {
      setError("Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  // Derive unique categories
  const categories = [
    "ALL",
    ...Array.from(new Set(resources.map((r) => r.category))).sort(),
  ];

  // Filter logic
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

  // Handle Stripe Checkout
  const handleCheckout = async (plan: "monthly" | "yearly") => {
    try {
      setCheckoutLoading(true);
      setActionMessage(null);
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/subscription/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setActionMessage(data.message || "Failed to launch Stripe Checkout.");
      }
    } catch {
      setActionMessage("Unable to reach subscription server.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Handle Customer Portal
  const handleOpenPortal = async () => {
    try {
      setPortalLoading(true);
      setActionMessage(null);
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/subscription/create-portal-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setActionMessage(data.message || "Failed to open Stripe Customer Portal.");
      }
    } catch {
      setActionMessage("Error connecting to Customer Portal.");
    } finally {
      setPortalLoading(false);
    }
  };

  // Handle Cancel Renewal
  const handleCancelRenewal = async () => {
    if (!confirm("Are you sure you want to cancel auto-renewal? You will retain access until the end of your paid billing period.")) {
      return;
    }
    try {
      setCancelLoading(true);
      setActionMessage(null);
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/subscription/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setActionMessage("Auto-renewal canceled. Your access remains active until period end.");
        if (subscription) {
          setSubscription({
            ...subscription,
            cancelAtPeriodEnd: true,
          });
        }
      } else {
        setActionMessage(data.message || "Failed to cancel subscription renewal.");
      }
    } catch {
      setActionMessage("Error communicating with server.");
    } finally {
      setCancelLoading(false);
    }
  };

  // Render Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-9 w-9 animate-spin text-[#f14f98]" />
          <p className="text-[13px] font-bold text-[#8b7e85]">Loading Resources Dashboard...</p>
        </div>
      </div>
    );
  }

  // ── Render Subscription Lock / Paywall Screen ──
  if (requiresSubscription || (subscription && !subscription.hasAccess && subscription.role === "student")) {
    return (
      <div className="space-y-8 pb-12 max-w-5xl mx-auto">
        {/* Header Hero */}
        <div className="text-center space-y-3 pt-4">
          <div className="inline-flex items-center gap-2 bg-[#fdf2f8] border border-[#f9c8df] text-[#f14f98] px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Girls On Campus Membership</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#2a2026] tracking-tight">
            Unlock the Resources Dashboard
          </h1>
          <p className="text-[14px] text-[#8b7e85] font-semibold max-w-xl mx-auto leading-relaxed">
            Get full, unlimited access to curated scholarships, internships, fellowship opportunities, and downloadable PDF guides.
          </p>
        </div>

        {actionMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-xs font-bold flex items-center gap-2 max-w-md mx-auto">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Monthly Plan */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedPlan("monthly")}
            className={`relative bg-white rounded-3xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between shadow-sm ${
              selectedPlan === "monthly"
                ? "border-[#f14f98] ring-4 ring-[#f14f98]/10"
                : "border-[#f1e4e9] hover:border-[#f9c8df]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-black uppercase tracking-wider text-[#8b7e85]">Monthly Pass</span>
                {selectedPlan === "monthly" && (
                  <CheckCircle2 className="h-5 w-5 text-[#f14f98]" />
                )}
              </div>
              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#2a2026]">${pricing.monthlyPrice}</span>
                  <span className="text-[13px] font-bold text-[#8b7e85]">/ month</span>
                </div>
                <p className="text-[11px] font-semibold text-emerald-600 mt-1">Flexibility to cancel anytime</p>
              </div>
              <hr className="border-[#f9f0f4] my-4" />
              <ul className="space-y-2.5 text-[12.5px] font-semibold text-[#554750]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#f14f98] shrink-0" />
                  <span>Unlimited Access to all Scholarships & Internships</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#f14f98] shrink-0" />
                  <span>Downloadable PDF Guides & Templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#f14f98] shrink-0" />
                  <span>Deadline Tracker & Direct Application Links</span>
                </li>
              </ul>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCheckout("monthly");
              }}
              disabled={checkoutLoading}
              className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#f14f98] to-[#c2185b] text-white text-[13px] font-black shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {checkoutLoading && selectedPlan === "monthly" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CreditCard className="h-4 w-4" />
              )}
              Subscribe Monthly (${pricing.monthlyPrice}/mo)
            </button>
          </motion.div>

          {/* Yearly Plan (Best Value) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedPlan("yearly")}
            className={`relative bg-gradient-to-b from-[#fff7fa] to-white rounded-3xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between shadow-sm ${
              selectedPlan === "yearly"
                ? "border-[#f14f98] ring-4 ring-[#f14f98]/10"
                : "border-[#f9c8df] hover:border-[#f14f98]"
            }`}
          >
            <span className="absolute -top-3 right-6 bg-gradient-to-r from-[#f14f98] to-[#7c5cbf] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
              Best Savings
            </span>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-black uppercase tracking-wider text-[#f14f98]">Yearly Pass</span>
                {selectedPlan === "yearly" && (
                  <CheckCircle2 className="h-5 w-5 text-[#f14f98]" />
                )}
              </div>
              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#2a2026]">${pricing.yearlyPrice}</span>
                  <span className="text-[13px] font-bold text-[#8b7e85]">/ year</span>
                </div>
                <p className="text-[11px] font-bold text-[#f14f98] mt-1">Full year of uninterrupted access</p>
              </div>
              <hr className="border-[#f9f0f4] my-4" />
              <ul className="space-y-2.5 text-[12.5px] font-semibold text-[#554750]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#f14f98] shrink-0" />
                  <span>Same Full Access as Monthly Plan</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#f14f98] shrink-0" />
                  <span>Includes all New & Future Resource Updates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#f14f98] shrink-0" />
                  <span>Maximum Savings for Active Campus Leaders</span>
                </li>
              </ul>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCheckout("yearly");
              }}
              disabled={checkoutLoading}
              className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#f14f98] to-[#c2185b] text-white text-[13px] font-black shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {checkoutLoading && selectedPlan === "yearly" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CreditCard className="h-4 w-4" />
              )}
              Subscribe Yearly (${pricing.yearlyPrice}/yr)
            </button>
          </motion.div>
        </div>

        {/* Free Features Notice */}
        <div className="bg-white border border-[#f1e4e9] rounded-2xl p-5 text-center max-w-2xl mx-auto shadow-xs">
          <p className="text-[12.5px] font-bold text-[#8b7e85]">
            💬 <strong>Always Free:</strong> Chat rooms, Community Circles, and submitting or uploading Opportunities remain 100% free for all Girls on Campus members!
          </p>
        </div>
      </div>
    );
  }

  // ── Render Normal Unlocked Resources View ──
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

      {/* ── Manage Subscription Modal ── */}
      <AnimatePresence>
        {showManageModal && subscription && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowManageModal(false)}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-[#f3f4f6] pb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-[#f14f98]" />
                  <h3 className="font-black text-[#2a2026] text-[16px]">Subscription Management</h3>
                </div>
                <button
                  onClick={() => setShowManageModal(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {actionMessage && (
                <div className="bg-pink-50 text-[#f14f98] border border-pink-100 p-3 rounded-xl text-xs font-bold">
                  {actionMessage}
                </div>
              )}

              <div className="bg-[#fdf2f8] p-4 rounded-2xl space-y-2 text-[12.5px]">
                <div className="flex justify-between font-bold text-[#2a2026]">
                  <span>Current Plan:</span>
                  <span className="capitalize text-[#f14f98] font-black">{subscription.subscriptionPlan} Access</span>
                </div>
                <div className="flex justify-between font-medium text-[#8b7e85]">
                  <span>Status:</span>
                  <span className="capitalize font-bold text-emerald-600">{subscription.subscriptionStatus}</span>
                </div>
                {subscription.currentPeriodEnd && (
                  <div className="flex justify-between font-medium text-[#8b7e85]">
                    <span>Billing Period End:</span>
                    <span className="font-bold">
                      {new Date(subscription.currentPeriodEnd).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
                {subscription.cancelAtPeriodEnd && (
                  <p className="text-[11px] font-bold text-amber-700 bg-amber-50 p-2 rounded-lg mt-2">
                    ⚠️ Auto-renewal is canceled. Access remains active until period end.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                {/* Stripe Portal Button */}
                {subscription.stripeCustomerId && (
                  <button
                    onClick={handleOpenPortal}
                    disabled={portalLoading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f14f98] to-[#c2185b] text-white text-[13px] font-black shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {portalLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Settings className="h-4 w-4" />
                    )}
                    Open Stripe Customer Portal
                  </button>
                )}

                {/* Cancel Auto-Renewal Button */}
                {!subscription.cancelAtPeriodEnd && subscription.subscriptionStatus === "active" && (
                  <button
                    onClick={handleCancelRenewal}
                    disabled={cancelLoading}
                    className="w-full py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-[12px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {cancelLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    Cancel Subscription Auto-Renewal
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Page Header ── */}
      <div className="border-b border-[#f1e4e9] pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-black text-[#2a2026] tracking-tight">Resources</h1>
          <p className="text-[13px] text-[#8b7e85] font-semibold mt-[2px]">
            Scholarships, internships, fellowship opportunities, guides, and career resources.
          </p>
        </div>

        {/* Subscription Active Badge / Manage trigger */}
        {subscription && (
          <div className="flex items-center gap-3 bg-[#fdf2f8] border border-[#f9c8df] px-4 py-2 rounded-2xl">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#f14f98]" />
              <div className="text-[11px]">
                <p className="font-black text-[#2a2026] capitalize">
                  {subscription.role === "admin" || subscription.role === "mentor"
                    ? `${subscription.role} Pass`
                    : `${subscription.subscriptionPlan} Access`}
                </p>
                {subscription.currentPeriodEnd && (
                  <p className="text-[10px] text-[#8b7e85] font-bold">
                    {subscription.cancelAtPeriodEnd ? "Ends " : "Renews "}
                    {new Date(subscription.currentPeriodEnd).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                )}
              </div>
            </div>
            {subscription.stripeCustomerId && (
              <button
                onClick={() => setShowManageModal(true)}
                className="text-[11px] font-black text-[#f14f98] hover:underline cursor-pointer bg-white px-2.5 py-1 rounded-xl shadow-2xs"
              >
                Manage
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Search + Filter ── */}
      {!loading && !error && resources.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3">
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
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("ALL");
              }}
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

                  {resource.deadline && (
                    <div className="mt-3 flex items-center gap-1 text-[10.5px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-md border border-amber-100/60">
                      <Calendar className="h-3 w-3 text-amber-600 shrink-0" />
                      <span>
                        Deadline: {new Date(resource.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  )}

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
