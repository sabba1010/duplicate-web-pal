import { useState, useEffect } from "react";
import { DollarSign, Save, Loader2, CreditCard, ShieldCheck, Info } from "lucide-react";
import { API_BASE } from "../../../lib/api";

export function AdminSystemSettingsView() {
  const [monthlyPrice, setMonthlyPrice] = useState<number | string>(8);
  const [yearlyPrice, setYearlyPrice] = useState<number | string>(12);
  const [currency, setCurrency] = useState("usd");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/subscription/pricing`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.pricing) {
        setMonthlyPrice(data.pricing.monthlyPrice);
        setYearlyPrice(data.pricing.yearlyPrice);
        setCurrency(data.pricing.currency || "usd");
      }
    } catch {
      setMessage({ type: "error", text: "Failed to load subscription pricing settings." });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/subscription/admin/pricing`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          monthlyPrice: Number(monthlyPrice),
          yearlyPrice: Number(yearlyPrice),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "Subscription pricing updated successfully!" });
        if (data.pricing) {
          setMonthlyPrice(data.pricing.monthlyPrice);
          setYearlyPrice(data.pricing.yearlyPrice);
        }
      } else {
        setMessage({ type: "error", text: data.message || "Failed to update pricing." });
      }
    } catch {
      setMessage({ type: "error", text: "An error occurred while saving pricing settings." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-8 max-w-4xl">
      {/* Header */}
      <div className="border-b border-[#e5e7eb] pb-5">
        <h1 className="text-[24px] font-black text-[#111827] tracking-tight">System & Pricing Settings</h1>
        <p className="text-[13px] text-[#6b7280] font-semibold mt-[2px]">
          Configure platform membership subscription pricing and rules centrally.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="h-8 w-8 animate-spin text-[#f14f98]" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Notice Banner */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100 rounded-2xl p-5 flex items-start gap-3">
            <Info className="h-5 w-5 text-[#f14f98] shrink-0 mt-0.5" />
            <div className="text-[13px] text-[#4b5563] space-y-1">
              <p className="font-bold text-[#111827]">Central Subscription Pricing Management</p>
              <p className="leading-relaxed">
                Subscription pricing set here applies to access for the <strong>Resources Dashboard</strong>.
                Opportunities, Chat, and Community features remain 100% free for all users.
                Changing prices here will dynamically create or update Stripe Checkout pricing without code changes.
              </p>
            </div>
          </div>

          {/* Feedback Messages */}
          {message && (
            <div
              className={`p-4 rounded-xl text-xs font-bold ${
                message.type === "success"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-rose-50 text-rose-700 border border-rose-200"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Pricing Form */}
          <form onSubmit={handleSave} className="bg-white rounded-2xl border border-[#e5e7eb] p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-[#f3f4f6] pb-4">
              <CreditCard className="h-5 w-5 text-[#f14f98]" />
              <h2 className="text-[16px] font-black text-[#111827]">Resources Membership Pricing</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Monthly Plan Input */}
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#374151] block uppercase tracking-wider">
                  Monthly Subscription Price ({currency.toUpperCase()})
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 font-bold">
                    $
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={monthlyPrice}
                    onChange={(e) => setMonthlyPrice(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-[#d1d5db] text-[14px] font-black text-[#111827] focus:border-[#f14f98] focus:ring-2 focus:ring-[#f14f98]/20 outline-none transition-all"
                  />
                </div>
                <p className="text-[11px] text-[#6b7280]">Default: $8/month. Auto-renews every month.</p>
              </div>

              {/* Yearly Plan Input */}
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#374151] block uppercase tracking-wider">
                  Yearly Subscription Price ({currency.toUpperCase()})
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 font-bold">
                    $
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={yearlyPrice}
                    onChange={(e) => setYearlyPrice(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-[#d1d5db] text-[14px] font-black text-[#111827] focus:border-[#f14f98] focus:ring-2 focus:ring-[#f14f98]/20 outline-none transition-all"
                  />
                </div>
                <p className="text-[11px] text-[#6b7280]">Default: $12/year. Auto-renews every year.</p>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-[#f3f4f6] flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-gradient-to-r from-[#f14f98] to-[#c2185b] text-white px-6 py-3 rounded-xl text-[13px] font-black shadow-md hover:shadow-lg hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Subscription Prices
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security & System Info Card */}
          <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 font-black text-[14px]">
              <ShieldCheck className="h-5 w-5" />
              <span>Stripe Security & Access Rule Enforcement</span>
            </div>
            <ul className="text-[12px] text-[#4b5563] space-y-2 list-disc list-inside">
              <li>Stripe Secret Keys remain securely stored on the backend server environment.</li>
              <li>Resource API routes strictly enforce server-side subscription verification before returning data.</li>
              <li>If a user cancels auto-renewal, their access remains active until the end of the paid billing period.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
