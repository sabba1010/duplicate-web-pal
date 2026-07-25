import { useState } from "react";

export function StudentSettingsView() {
  const [notifications, setNotifications] = useState({
    newOpportunities: true,
    deadlineReminders: true,
    mentorMessages: true,
  });

  const toggle = (key: keyof typeof notifications) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-6 pb-8 max-w-[720px]">
      {/* ── Page Header ── */}
      <div className="border-b border-[#f1e4e9] pb-5">
        <h1 className="text-[24px] font-black text-[#2a2026] tracking-tight">Settings</h1>
        <p className="text-[13px] text-[#8b7e85] font-semibold mt-[2px]">
          Manage your profile, notifications and privacy.
        </p>
      </div>

      {/* ── Profile Row ── */}
      <div className="flex items-center gap-[16px] bg-white border border-[#f1e4e9] rounded-[20px] p-[20px]">
        <div className="w-[52px] h-[52px] rounded-full bg-[#f14f98] flex items-center justify-center text-white text-[20px] font-black shrink-0">
          K
        </div>
        <div>
          <div className="text-[15px] font-black text-[#2a2026]">Karla M.</div>
          <div className="text-[12px] font-bold text-[#8b7e85]">karla.m@email.com</div>
        </div>
      </div>

      {/* ── Account Section ── */}
      <div className="bg-white border border-[#f1e4e9] rounded-[20px] overflow-hidden">
        {/* Section Title */}
        <div className="px-[24px] py-[16px] border-b border-[#f1e4e9]">
          <h2 className="text-[14px] font-black text-[#2a2026]">Account</h2>
        </div>

        {/* Full name */}
        <div className="flex items-center justify-between gap-[20px] px-[24px] py-[18px] border-b border-[#f9f0f5]">
          <div className="min-w-0">
            <div className="text-[13.5px] font-extrabold text-[#2a2026]">Full name</div>
            <div className="text-[11.5px] font-bold text-[#8b7e85] mt-[1px]">Shown to mentors and friends</div>
          </div>
          <input
            type="text"
            defaultValue="Karla M."
            className="w-[200px] text-[13px] font-bold text-[#2a2026] bg-[#fff7fa] border border-[#f1e4e9] rounded-[12px] px-[14px] py-[9px] outline-none focus:border-[#f14f98] focus:ring-2 focus:ring-[#f14f98]/10 transition-all shrink-0"
          />
        </div>

        {/* Email */}
        <div className="flex items-center justify-between gap-[20px] px-[24px] py-[18px] border-b border-[#f9f0f5]">
          <div className="min-w-0">
            <div className="text-[13.5px] font-extrabold text-[#2a2026]">Email</div>
            <div className="text-[11.5px] font-bold text-[#8b7e85] mt-[1px]">Used for sign-in and alerts</div>
          </div>
          <input
            type="email"
            defaultValue="karla.m@email.com"
            className="w-[200px] text-[13px] font-bold text-[#2a2026] bg-[#fff7fa] border border-[#f1e4e9] rounded-[12px] px-[14px] py-[9px] outline-none focus:border-[#f14f98] focus:ring-2 focus:ring-[#f14f98]/10 transition-all shrink-0"
          />
        </div>

        {/* School */}
        <div className="flex items-center justify-between gap-[20px] px-[24px] py-[18px]">
          <div className="min-w-0">
            <div className="text-[13.5px] font-extrabold text-[#2a2026]">School</div>
            <div className="text-[11.5px] font-bold text-[#8b7e85] mt-[1px]">Helps us find opportunities near you</div>
          </div>
          <input
            type="text"
            defaultValue="Lincoln High School"
            className="w-[200px] text-[13px] font-bold text-[#2a2026] bg-[#fff7fa] border border-[#f1e4e9] rounded-[12px] px-[14px] py-[9px] outline-none focus:border-[#f14f98] focus:ring-2 focus:ring-[#f14f98]/10 transition-all shrink-0"
          />
        </div>
      </div>

      {/* ── Notifications Section ── */}
      <div className="bg-white border border-[#f1e4e9] rounded-[20px] overflow-hidden">
        {/* Section Title */}
        <div className="px-[24px] py-[16px] border-b border-[#f1e4e9]">
          <h2 className="text-[14px] font-black text-[#2a2026]">Notifications</h2>
        </div>

        {/* New opportunities */}
        <div className="flex items-center justify-between gap-[20px] px-[24px] py-[18px] border-b border-[#f9f0f5]">
          <div>
            <div className="text-[13.5px] font-extrabold text-[#2a2026]">New opportunities</div>
            <div className="text-[11.5px] font-bold text-[#8b7e85] mt-[1px]">Weekly digest of new matches</div>
          </div>
          <button
            onClick={() => toggle("newOpportunities")}
            className={`relative w-[46px] h-[26px] rounded-full transition-colors shrink-0 ${
              notifications.newOpportunities ? "bg-[#f14f98]" : "bg-[#e5d6db]"
            }`}
          >
            <span
              className={`absolute top-[3px] left-[3px] w-[20px] h-[20px] rounded-full bg-white shadow-sm transition-transform ${
                notifications.newOpportunities ? "translate-x-[20px]" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Deadline reminders */}
        <div className="flex items-center justify-between gap-[20px] px-[24px] py-[18px] border-b border-[#f9f0f5]">
          <div>
            <div className="text-[13.5px] font-extrabold text-[#2a2026]">Deadline reminders</div>
            <div className="text-[11.5px] font-bold text-[#8b7e85] mt-[1px]">3 days before a saved deadline</div>
          </div>
          <button
            onClick={() => toggle("deadlineReminders")}
            className={`relative w-[46px] h-[26px] rounded-full transition-colors shrink-0 ${
              notifications.deadlineReminders ? "bg-[#f14f98]" : "bg-[#e5d6db]"
            }`}
          >
            <span
              className={`absolute top-[3px] left-[3px] w-[20px] h-[20px] rounded-full bg-white shadow-sm transition-transform ${
                notifications.deadlineReminders ? "translate-x-[20px]" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Mentor messages */}
        <div className="flex items-center justify-between gap-[20px] px-[24px] py-[18px]">
          <div>
            <div className="text-[13.5px] font-extrabold text-[#2a2026]">Mentor messages</div>
            <div className="text-[11.5px] font-bold text-[#8b7e85] mt-[1px]">Instant notification on reply</div>
          </div>
          <button
            onClick={() => toggle("mentorMessages")}
            className={`relative w-[46px] h-[26px] rounded-full transition-colors shrink-0 ${
              notifications.mentorMessages ? "bg-[#f14f98]" : "bg-[#e5d6db]"
            }`}
          >
            <span
              className={`absolute top-[3px] left-[3px] w-[20px] h-[20px] rounded-full bg-white shadow-sm transition-transform ${
                notifications.mentorMessages ? "translate-x-[20px]" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* ── Save Button ── */}
      <div className="flex justify-end pt-[4px]">
        <button className="bg-[#f14f98] hover:bg-[#cf3478] text-white text-[13px] font-extrabold px-[28px] py-[11px] rounded-full transition-colors shadow-sm">
          Save changes
        </button>
      </div>
    </div>
  );
}
