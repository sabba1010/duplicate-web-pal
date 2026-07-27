import { useState, useEffect } from "react";
import { Check } from "lucide-react";

export function StudentSettingsView() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    school: "",
    certificates: [] as { title: string; url: string }[],
    customFields: [] as { label: string; value: string }[],
  });
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [notifications, setNotifications] = useState({
    newOpportunities: true,
    deadlineReminders: true,
    mentorMessages: true,
  });

  useEffect(() => {
    const stored = localStorage.getItem("goc_user");
    if (stored) {
      try {
        const u = JSON.parse(stored);
        setProfile({
          name: u.name || "",
          email: u.email || "",
          school: u.school || "",
          certificates: u.certificates || [],
          customFields: u.customFields || [],
        });
      } catch (e) {}
    }
  }, []);

  const toggle = (key: keyof typeof notifications) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch("http://localhost:5000/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("goc_user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("goc_user_updated"));
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Failed to update profile", err);
    } finally {
      setLoading(false);
    }
  };

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
        <div className="w-[52px] h-[52px] rounded-full bg-[#f14f98] flex items-center justify-center text-white text-[20px] font-black shrink-0 uppercase">
          {profile.name ? profile.name[0] : "K"}
        </div>
        <div>
          <div className="text-[15px] font-black text-[#2a2026]">{profile.name || "Student"}</div>
          <div className="text-[12px] font-bold text-[#8b7e85]">{profile.email}</div>
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
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
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
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
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
            value={profile.school}
            onChange={(e) => setProfile({ ...profile, school: e.target.value })}
            placeholder="e.g. Lincoln High School"
            className="w-[200px] text-[13px] font-bold text-[#2a2026] bg-[#fff7fa] border border-[#f1e4e9] rounded-[12px] px-[14px] py-[9px] outline-none focus:border-[#f14f98] focus:ring-2 focus:ring-[#f14f98]/10 transition-all shrink-0"
          />
        </div>
      </div>

      {/* ── Certificates Section ── */}
      <div className="bg-white border border-[#f1e4e9] rounded-[20px] overflow-hidden">
        <div className="px-[24px] py-[16px] border-b border-[#f1e4e9] flex justify-between items-center">
          <h2 className="text-[14px] font-black text-[#2a2026]">Certificates</h2>
          <button 
            onClick={() => setProfile({ ...profile, certificates: [...profile.certificates, { title: "", url: "" }] })}
            className="text-[12px] font-bold text-[#f14f98] hover:text-[#cf3478]"
          >
            + Add New
          </button>
        </div>
        
        {profile.certificates.length === 0 ? (
          <div className="px-[24px] py-[18px] text-[13px] text-[#8b7e85] font-semibold text-center">
            No certificates added yet.
          </div>
        ) : (
          <div className="divide-y divide-[#f9f0f5]">
            {profile.certificates.map((cert, index) => (
              <div key={index} className="px-[24px] py-[18px] flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Certificate Title"
                  value={cert.title}
                  onChange={(e) => {
                    const newCerts = [...profile.certificates];
                    newCerts[index].title = e.target.value;
                    setProfile({ ...profile, certificates: newCerts });
                  }}
                  className="flex-1 text-[13px] font-bold text-[#2a2026] bg-[#fff7fa] border border-[#f1e4e9] rounded-[12px] px-[14px] py-[9px] outline-none focus:border-[#f14f98] focus:ring-2 focus:ring-[#f14f98]/10 transition-all"
                />
                <input
                  type="text"
                  placeholder="Certificate URL (e.g. Google Drive link)"
                  value={cert.url}
                  onChange={(e) => {
                    const newCerts = [...profile.certificates];
                    newCerts[index].url = e.target.value;
                    setProfile({ ...profile, certificates: newCerts });
                  }}
                  className="flex-1 text-[13px] font-bold text-[#2a2026] bg-[#fff7fa] border border-[#f1e4e9] rounded-[12px] px-[14px] py-[9px] outline-none focus:border-[#f14f98] focus:ring-2 focus:ring-[#f14f98]/10 transition-all"
                />
                <button
                  onClick={() => {
                    const newCerts = profile.certificates.filter((_, i) => i !== index);
                    setProfile({ ...profile, certificates: newCerts });
                  }}
                  className="px-3 py-2 text-rose-500 hover:bg-rose-50 rounded-xl text-[12px] font-bold transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Custom Details Section ── */}
      <div className="bg-white border border-[#f1e4e9] rounded-[20px] overflow-hidden">
        <div className="px-[24px] py-[16px] border-b border-[#f1e4e9] flex justify-between items-center">
          <h2 className="text-[14px] font-black text-[#2a2026]">Extra Details</h2>
          <button 
            onClick={() => setProfile({ ...profile, customFields: [...profile.customFields, { label: "", value: "" }] })}
            className="text-[12px] font-bold text-[#f14f98] hover:text-[#cf3478]"
          >
            + Add New
          </button>
        </div>
        
        {profile.customFields.length === 0 ? (
          <div className="px-[24px] py-[18px] text-[13px] text-[#8b7e85] font-semibold text-center">
            No extra details added yet.
          </div>
        ) : (
          <div className="divide-y divide-[#f9f0f5]">
            {profile.customFields.map((field, index) => (
              <div key={index} className="px-[24px] py-[18px] flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Label (e.g. Portfolio)"
                  value={field.label}
                  onChange={(e) => {
                    const newFields = [...profile.customFields];
                    newFields[index].label = e.target.value;
                    setProfile({ ...profile, customFields: newFields });
                  }}
                  className="w-1/3 text-[13px] font-bold text-[#2a2026] bg-[#fff7fa] border border-[#f1e4e9] rounded-[12px] px-[14px] py-[9px] outline-none focus:border-[#f14f98] focus:ring-2 focus:ring-[#f14f98]/10 transition-all"
                />
                <input
                  type="text"
                  placeholder="Value (e.g. https://... or My Hobby)"
                  value={field.value}
                  onChange={(e) => {
                    const newFields = [...profile.customFields];
                    newFields[index].value = e.target.value;
                    setProfile({ ...profile, customFields: newFields });
                  }}
                  className="flex-1 text-[13px] font-bold text-[#2a2026] bg-[#fff7fa] border border-[#f1e4e9] rounded-[12px] px-[14px] py-[9px] outline-none focus:border-[#f14f98] focus:ring-2 focus:ring-[#f14f98]/10 transition-all"
                />
                <button
                  onClick={() => {
                    const newFields = profile.customFields.filter((_, i) => i !== index);
                    setProfile({ ...profile, customFields: newFields });
                  }}
                  className="px-3 py-2 text-rose-500 hover:bg-rose-50 rounded-xl text-[12px] font-bold transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
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
      <div className="flex items-center justify-end gap-3 pt-[4px]">
        {savedSuccess && (
          <span className="text-[12px] font-bold text-[#39b86b] flex items-center gap-1">
            <Check className="h-4 w-4" /> Saved successfully
          </span>
        )}
        <button 
          onClick={handleSave}
          disabled={loading}
          className="bg-[#f14f98] hover:bg-[#cf3478] text-white text-[13px] font-extrabold px-[28px] py-[11px] rounded-full transition-colors shadow-sm disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>
  );
}
