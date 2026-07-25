import { User, Bell, Lock, Chrome, Palette, Shield } from "lucide-react";

export function StudentSettingsView() {
  const sections = [
    { id: "profile", label: "Profile", icon: User, active: true },
    { id: "notifications", label: "Notifications", icon: Bell, active: false },
    { id: "privacy", label: "Privacy", icon: Lock, active: false },
    { id: "extension", label: "Chrome Extension", icon: Chrome, active: false },
    { id: "theme", label: "Appearance", icon: Palette, active: false },
    { id: "security", label: "Security", icon: Shield, active: false },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col md:flex-row overflow-hidden">
      {/* Settings Sidebar */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-100 p-6 bg-slate-50/30">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Settings</h2>
        <nav className="space-y-1">
          {sections.map(sec => (
            <button
              key={sec.id}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                sec.active 
                  ? "bg-white border border-slate-200 text-teal-700 shadow-sm" 
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <sec.icon className="h-4 w-4" />
              {sec.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Settings Content Area */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-2xl space-y-8">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Profile Details</h3>
            <p className="text-sm text-slate-500 mb-6">Manage your public profile and preferences.</p>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <img src="https://i.pravatar.cc/150?u=karla" alt="Avatar" className="w-20 h-20 rounded-full border-4 border-white shadow-sm object-cover" />
                <button className="absolute bottom-0 right-0 p-1.5 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-teal-600 shadow-sm">
                  <User className="h-4 w-4" />
                </button>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Karla Mora</h4>
                <p className="text-sm text-slate-500">karla.mora@university.edu</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                <input type="text" defaultValue="Karla Mora" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Major / Field</label>
                <input type="text" defaultValue="Computer Science" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Bio</label>
                <textarea rows={3} defaultValue="Aspiring software engineer interested in AI and social good." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 resize-none"></textarea>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
              <button className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
              <button className="px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
