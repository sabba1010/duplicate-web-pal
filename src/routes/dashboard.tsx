import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutGrid,
  Search,
  Heart,
  Share2,
  Calendar as CalendarIcon,
  FileText,
  Users,
  BookOpen,
  Settings,
  Bell,
  User,
  MoreVertical,
  Bookmark,
  ChevronRight,
  Send,
  Smile,
  Minus,
  Sparkles,
  ArrowRight,
  Lock,
  LogOut,
  CheckCircle2,
} from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — Girls On Campus" },
      {
        name: "description",
        content: "Access scholarships, internships, saved opportunities, deadlines and Girl Chat.",
      },
    ],
  }),
  component: DashboardPage,
});

export function DashboardPage() {
  // Auth state
  const [user, setUser] = useState<{ name: string; username: string } | null>(null);
  const [extensionOn, setExtensionOn] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedIds, setSavedIds] = useState<number[]>([1, 2]);
  
  // Live Chat state
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      name: "Sofia M.",
      time: "10:14 AM",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      text: "Does anyone know if the Google STEP Internship is open to sophomores?",
    },
    {
      id: 2,
      name: "Isabella R.",
      time: "10:15 AM",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      text: "Yes! I applied last year as a sophomore. You should go for it!",
    },
    {
      id: 3,
      name: "Ava K.",
      time: "10:17 AM",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80",
      text: "Thank you! Also, the deadline is Jun 30 so don't wait until the last minute 😊",
    },
  ]);
  const [newMsgText, setNewMsgText] = useState("");
  const [activeRightTab, setActiveRightTab] = useState<"chat" | "community" | "mentors">("chat");

  useEffect(() => {
    const stored = localStorage.getItem("goc_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        setUser({ name: "Karla", username: "student" });
      }
    } else {
      setUser({ name: "Karla", username: "student" });
    }
  }, []);

  const toggleBookmark = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsgText.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: user?.name || "Karla",
        time: timeStr,
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
        text: newMsgText,
      },
    ]);
    setNewMsgText("");
  };

  const handleLogout = () => {
    localStorage.removeItem("goc_user");
    window.location.href = "/login";
  };

  // Opportunities Data matching image
  const opportunities = [
    {
      id: 1,
      title: "$2,500 Women in Business Scholarship",
      category: "Scholarship",
      deadline: "Jul 1, 2026",
      featured: true,
      tags: ["Women", "Business"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      title: "Google STEP Internship 2026",
      category: "Paid Internship",
      deadline: "Jun 30, 2026",
      featured: false,
      tags: ["STEM", "Google"],
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      title: "Public Policy Fellowship",
      category: "Fellowship",
      deadline: "Jul 10, 2026",
      featured: false,
      tags: ["Policy", "Leadership"],
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 4,
      title: "Fully Funded Summer Program",
      category: "Paid Program",
      deadline: "Jul 15, 2026",
      featured: false,
      tags: ["Leadership", "Summer"],
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf5f8] text-[#2d1b28] font-sans antialiased flex flex-col justify-between">
      {/* Main Grid Wrapper */}
      <div className="flex-1 p-3 sm:p-5 max-w-[1600px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* ==================================================== */}
          {/* 1. LEFT SIDEBAR (Span 2) - Sticky Fixed */}
          {/* ==================================================== */}
          <aside className="lg:col-span-2 lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)] bg-white rounded-3xl p-5 border border-pink-100/60 shadow-xs flex flex-col justify-between overflow-y-auto z-20">
            <div>
              {/* Logo Area (Click to Home) */}
              <Link to="/" className="flex items-center gap-2 mb-8 px-2 group cursor-pointer" title="Go to Home Page">
                <div className="flex flex-col leading-none">
                  <div className="flex items-center gap-1">
                    <span className="font-serif italic text-3xl font-bold text-[#e04f96] tracking-tight group-hover:opacity-80 transition-opacity">goc</span>
                    <span className="text-[#e04f96] text-xl font-bold">✶</span>
                  </div>
                  <span className="text-[10px] text-pink-400 font-semibold tracking-wider uppercase -mt-1">
                    girls on campus
                  </span>
                </div>
              </Link>

              {/* Navigation Menu */}
              <nav className="space-y-1.5">
                {/* Active Dashboard Button */}
                <a
                  href="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 bg-[#e04f96] text-white font-semibold text-xs rounded-2xl shadow-md transition-transform hover:scale-[1.02]"
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span>Dashboard</span>
                </a>

                <a
                  href="#"
                  className="flex items-center justify-between px-4 py-3 text-xs text-gray-600 font-medium rounded-2xl hover:bg-pink-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Search className="h-4 w-4 text-gray-400" />
                    <span>Opportunities</span>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center justify-between px-4 py-3 text-xs text-gray-600 font-medium rounded-2xl hover:bg-pink-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="h-4 w-4 text-gray-400" />
                    <span>Saved</span>
                  </div>
                  <span className="bg-[#fceef5] text-[#e04f96] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    24
                  </span>
                </a>

                <a
                  href="#"
                  className="flex items-center justify-between px-4 py-3 text-xs text-gray-600 font-medium rounded-2xl hover:bg-pink-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Share2 className="h-4 w-4 text-gray-400" />
                    <span>Shared</span>
                  </div>
                  <span className="bg-[#fceef5] text-[#e04f96] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    12
                  </span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 text-xs text-gray-600 font-medium rounded-2xl hover:bg-pink-50/60 transition-colors"
                >
                  <CalendarIcon className="h-4 w-4 text-gray-400" />
                  <span>Calendar</span>
                </a>

                <a
                  href="#"
                  className="flex items-center justify-between px-4 py-3 text-xs text-gray-600 font-medium rounded-2xl hover:bg-pink-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span>Applications</span>
                  </div>
                  <span className="bg-[#fceef5] text-[#e04f96] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    3
                  </span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 text-xs text-gray-600 font-medium rounded-2xl hover:bg-pink-50/60 transition-colors"
                >
                  <Users className="h-4 w-4 text-gray-400" />
                  <span>Mentors</span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 text-xs text-gray-600 font-medium rounded-2xl hover:bg-pink-50/60 transition-colors"
                >
                  <BookOpen className="h-4 w-4 text-gray-400" />
                  <span>Resources</span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 text-xs text-gray-600 font-medium rounded-2xl hover:bg-pink-50/60 transition-colors"
                >
                  <Settings className="h-4 w-4 text-gray-400" />
                  <span>Settings</span>
                </a>
              </nav>
            </div>

            {/* Bottom Promo Card: Invite a friend! */}
            <div className="mt-8 bg-[#fdeef5] rounded-2xl p-4 text-center border border-pink-200/50 relative overflow-hidden">
              <h3 className="font-bold text-xs text-[#2d1b28]">Invite a friend!</h3>
              <p className="text-[10px] text-gray-500 mt-1 leading-tight">
                More girls, more opportunities...
              </p>

              {/* Handcrafted Coquette Illustration */}
              <div className="my-3 flex justify-center items-center">
                <svg width="70" height="60" viewBox="0 0 100 80" fill="none">
                  {/* Two Stick Figure Friends High-Fiving */}
                  <circle cx="35" cy="22" r="10" stroke="#e04f96" strokeWidth="3.5" fill="#fdeef5" />
                  <path d="M35 32V58M35 42L22 52M35 42L48 30" stroke="#e04f96" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M35 58L26 76M35 58L44 76" stroke="#e04f96" strokeWidth="3.5" strokeLinecap="round" />

                  <circle cx="65" cy="22" r="10" stroke="#e04f96" strokeWidth="3.5" fill="#fdeef5" />
                  <path d="M65 32V58M65 42L78 52M65 42L52 30" stroke="#e04f96" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M65 58L56 76M65 58L74 76" stroke="#e04f96" strokeWidth="3.5" strokeLinecap="round" />

                  {/* Sparkles / High Five Star */}
                  <path d="M50 22L52 28L58 30L52 32L50 38L48 32L42 30L48 28Z" fill="#e04f96" />
                </svg>
              </div>

              <button className="w-full bg-[#e04f96] hover:bg-[#c73d7f] text-white text-xs font-bold py-2 rounded-xl shadow-xs transition-colors cursor-pointer">
                Invite now
              </button>
            </div>
          </aside>

          {/* ==================================================== */}
          {/* 2. MAIN CENTER CONTENT (Span 7) */}
          {/* ==================================================== */}
          <main className="lg:col-span-7 space-y-5">
            
            {/* Top Bar (GOC Extension, Search, Header Profile) */}
            <div className="bg-white rounded-3xl p-5 border border-pink-100/60 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                {/* Left Extension status */}
                <div>
                  <h1 className="font-bold text-xs text-[#e04f96] uppercase tracking-wide">GOC Extension</h1>
                  <p className="text-[11px] text-gray-400 font-medium">Opportunities. Community. Growth.</p>
                </div>

                {/* Right controls: Extension Switch, Bell, Avatar */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  {/* Extension ON toggle switch */}
                  <div className="flex items-center gap-2 bg-pink-50/60 px-3 py-1.5 rounded-full border border-pink-100">
                    <span className="text-[11px] font-semibold text-gray-600">Extension ON</span>
                    <button
                      onClick={() => setExtensionOn(!extensionOn)}
                      className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 cursor-pointer ${
                        extensionOn ? "bg-[#e04f96]" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                          extensionOn ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Notifications */}
                  <button className="p-2 rounded-full bg-pink-50/60 text-[#e04f96] hover:bg-pink-100 transition-colors relative cursor-pointer">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#e04f96] rounded-full ring-2 ring-white"></span>
                  </button>

                  {/* Profile avatar */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-pink-100 border border-pink-300 flex items-center justify-center text-[#e04f96] font-bold text-xs shadow-xs">
                      {user?.name?.[0] || "K"}
                    </div>
                    <button onClick={handleLogout} title="Logout" className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Greeting & Search Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#2d1b28]">
                    Hi, {user?.name || "Karla"}! 💕
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Let's find your next opportunity.
                  </p>
                </div>

                {/* Search input */}
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search scholarships, internships, programs..."
                    className="w-full bg-pink-50/40 border border-pink-100 text-xs text-gray-700 rounded-2xl py-2.5 pl-4 pr-10 outline-none focus:border-[#e04f96] focus:ring-2 focus:ring-pink-100 transition-all placeholder:text-gray-400"
                  />
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-[#e04f96]" />
                </div>
              </div>
            </div>

            {/* Metrics Row (4 Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Card 1 */}
              <div className="bg-white rounded-3xl p-4 border border-pink-100/60 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl border border-pink-200 bg-pink-50/50 flex items-center justify-center text-[#e04f96] shrink-0">
                  <Search className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-[#2d1b28]">36</div>
                  <div className="text-[10px] text-gray-500 leading-tight">New opportunities this week</div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-3xl p-4 border border-pink-100/60 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl border border-pink-200 bg-pink-50/50 flex items-center justify-center text-[#e04f96] shrink-0">
                  <Bookmark className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-[#2d1b28]">24</div>
                  <div className="text-[10px] text-gray-500 leading-tight">Saved opportunities</div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-3xl p-4 border border-pink-100/60 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl border border-pink-200 bg-pink-50/50 flex items-center justify-center text-[#e04f96] shrink-0">
                  <Share2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-[#2d1b28]">12</div>
                  <div className="text-[10px] text-gray-500 leading-tight">Shared with others</div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-3xl p-4 border border-pink-100/60 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl border border-pink-200 bg-pink-50/50 flex items-center justify-center text-[#e04f96] shrink-0">
                  <CalendarIcon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-[#2d1b28]">7</div>
                  <div className="text-[10px] text-gray-500 leading-tight">Upcoming deadlines</div>
                </div>
              </div>
            </div>

            {/* "More opportunities for you" Section */}
            <div className="bg-white rounded-3xl p-5 border border-pink-100/60 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#2d1b28]">More opportunities for you</h3>
                <a href="#" className="text-xs font-semibold text-[#e04f96] hover:underline flex items-center gap-1">
                  View all →
                </a>
              </div>

              {/* 4 Cards Grid */}
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                  {opportunities.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-pink-100 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                    >
                      {/* Image Thumbnail */}
                      <div className="relative h-28 w-full overflow-hidden bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {item.featured && (
                          <span className="absolute top-2 left-2 bg-[#e04f96] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                            FEATURED
                          </span>
                        )}
                      </div>

                      {/* Card Info */}
                      <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                        <div>
                          <h4 className="font-bold text-xs text-[#2d1b28] line-clamp-2 leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-[10px] font-medium text-gray-500 mt-1">
                            {item.category}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            Deadline: {item.deadline}
                          </p>
                        </div>

                        {/* Bottom Tags & Bookmark */}
                        <div className="flex items-center justify-between pt-1 border-t border-gray-50">
                          <div className="flex items-center gap-1 flex-wrap">
                            {item.tags.map((t) => (
                              <span
                                key={t}
                                className="bg-pink-50 text-[#e04f96] text-[9px] font-bold px-1.5 py-0.5 rounded-md"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={() => toggleBookmark(item.id)}
                            className={`p-1 rounded-md transition-colors cursor-pointer ${
                              savedIds.includes(item.id)
                                ? "text-[#e04f96] fill-[#e04f96]"
                                : "text-gray-300 hover:text-[#e04f96]"
                            }`}
                          >
                            <Bookmark className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Scroll Arrow */}
                <button className="hidden xl:flex absolute -right-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full border border-gray-200 shadow-md items-center justify-center text-gray-500 hover:text-[#e04f96] transition-colors cursor-pointer">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Bottom 2-Column Split: Deadlines & Action Needed (Left) / Shared & Calendar (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Left Column (Upcoming deadlines & Pending/Action needed) */}
              <div className="space-y-5">
                {/* Upcoming Deadlines */}
                <div className="bg-white rounded-3xl p-5 border border-pink-100/60 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs text-[#2d1b28]">Upcoming deadlines</h3>
                    <a href="#" className="text-[11px] font-semibold text-[#e04f96] hover:underline">
                      View calendar →
                    </a>
                  </div>

                  <div className="space-y-2.5">
                    {/* Item 1 */}
                    <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-pink-50/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-pink-100/70 border border-pink-200 flex flex-col items-center justify-center text-[#e04f96] leading-none shrink-0">
                          <span className="text-[8px] font-bold uppercase">JUN</span>
                          <span className="text-sm font-extrabold">30</span>
                        </div>
                        <div>
                          <div className="font-bold text-xs text-[#2d1b28]">Google STEP Internship 2026</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-[#e04f96] bg-pink-50 px-2 py-0.5 rounded-full shrink-0">
                        5 days left
                      </span>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-pink-50/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-pink-100/70 border border-pink-200 flex flex-col items-center justify-center text-[#e04f96] leading-none shrink-0">
                          <span className="text-[8px] font-bold uppercase">JUL</span>
                          <span className="text-sm font-extrabold">01</span>
                        </div>
                        <div>
                          <div className="font-bold text-xs text-[#2d1b28]">$2,500 Women in Business Scholarship</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-[#e04f96] bg-pink-50 px-2 py-0.5 rounded-full shrink-0">
                        6 days left
                      </span>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-pink-50/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-pink-100/70 border border-pink-200 flex flex-col items-center justify-center text-[#e04f96] leading-none shrink-0">
                          <span className="text-[8px] font-bold uppercase">JUL</span>
                          <span className="text-sm font-extrabold">10</span>
                        </div>
                        <div>
                          <div className="font-bold text-xs text-[#2d1b28]">Public Policy Fellowship</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-[#e04f96] bg-pink-50 px-2 py-0.5 rounded-full shrink-0">
                        15 days left
                      </span>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <a href="#" className="text-[11px] font-bold text-[#e04f96] hover:underline">
                      See all deadlines →
                    </a>
                  </div>
                </div>

                {/* Pending / Action Needed */}
                <div className="bg-white rounded-3xl p-5 border border-pink-100/60 shadow-xs space-y-3">
                  <h3 className="font-bold text-xs text-[#2d1b28]">Pending / Action needed</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-2xl border border-pink-100/60 hover:border-pink-300 bg-pink-50/20 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-pink-100/70 text-[#e04f96] flex items-center justify-center shrink-0">
                          <FileText className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-xs font-bold text-gray-700">2 applications to complete</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-2xl border border-pink-100/60 hover:border-pink-300 bg-pink-50/20 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-pink-100/70 text-[#e04f96] flex items-center justify-center shrink-0">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-xs font-bold text-gray-700">1 recommendation request</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-2xl border border-pink-100/60 hover:border-pink-300 bg-pink-50/20 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-pink-100/70 text-[#e04f96] flex items-center justify-center shrink-0">
                          <FileText className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-xs font-bold text-gray-700">1 document to upload</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (What's been shared by others & Your calendar) */}
              <div className="space-y-5">
                {/* What's been shared by others */}
                <div className="bg-white rounded-3xl p-5 border border-pink-100/60 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs text-[#2d1b28]">What's been shared by others</h3>
                    <a href="#" className="text-[11px] font-semibold text-[#e04f96] hover:underline">
                      View all →
                    </a>
                  </div>

                  <div className="space-y-3">
                    {/* Share 1 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80"
                          alt="Isabella R."
                          className="w-8 h-8 rounded-full object-cover border border-pink-200 shrink-0"
                        />
                        <div>
                          <div className="text-xs font-bold text-[#2d1b28]">
                            Isabella R. <span className="font-normal text-gray-500">shared</span>
                          </div>
                          <div className="text-[10px] text-gray-500 italic">MIT Summer Research Program</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[9px] text-gray-400">2h ago</span>
                        <Bookmark className="h-3.5 w-3.5 text-gray-300 hover:text-[#e04f96] cursor-pointer" />
                      </div>
                    </div>

                    {/* Share 2 */}
                    <div className="flex items-center justify-between border-t border-gray-50 pt-2.5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                          alt="Sofia M."
                          className="w-8 h-8 rounded-full object-cover border border-pink-200 shrink-0"
                        />
                        <div>
                          <div className="text-xs font-bold text-[#2d1b28]">
                            Sofia M. <span className="font-normal text-gray-500">shared</span>
                          </div>
                          <div className="text-[10px] text-gray-500 italic">Yale Young Global Scholars</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[9px] text-gray-400">5h ago</span>
                        <Bookmark className="h-3.5 w-3.5 text-gray-300 hover:text-[#e04f96] cursor-pointer" />
                      </div>
                    </div>

                    {/* Share 3 */}
                    <div className="flex items-center justify-between border-t border-gray-50 pt-2.5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&auto=format&fit=crop&q=80"
                          alt="Ava K."
                          className="w-8 h-8 rounded-full object-cover border border-pink-200 shrink-0"
                        />
                        <div>
                          <div className="text-xs font-bold text-[#2d1b28]">
                            Ava K. <span className="font-normal text-gray-500">shared</span>
                          </div>
                          <div className="text-[10px] text-gray-500 italic">Nike Marketing Internship</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[9px] text-gray-400">1d ago</span>
                        <Bookmark className="h-3.5 w-3.5 text-gray-300 hover:text-[#e04f96] cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Your calendar Mini Widget */}
                <div className="bg-white rounded-3xl p-5 border border-pink-100/60 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs text-[#2d1b28]">Your calendar</h3>
                    <a href="#" className="text-[11px] font-semibold text-[#e04f96] hover:underline">
                      View full calendar →
                    </a>
                  </div>

                  {/* Mini Days Week */}
                  <div className="grid grid-cols-7 text-center gap-1">
                    {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
                      <span key={d} className="text-[9px] font-bold text-gray-400 uppercase">
                        {d}
                      </span>
                    ))}

                    {[
                      { day: 25, hasEvent: false },
                      { day: 26, hasEvent: false },
                      { day: 27, hasEvent: false },
                      { day: 28, isToday: true, hasEvent: true },
                      { day: 29, hasEvent: false },
                      { day: 30, hasEvent: true },
                      { day: 31, hasEvent: false },
                    ].map((item) => (
                      <div key={item.day} className="flex flex-col items-center py-1">
                        <span
                          className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold transition-all ${
                            item.isToday
                              ? "bg-[#e04f96] text-white shadow-sm"
                              : "text-gray-700 hover:bg-pink-50"
                          }`}
                        >
                          {item.day}
                        </span>
                        {item.hasEvent && !item.isToday && (
                          <span className="w-1 h-1 bg-[#e04f96] rounded-full mt-0.5"></span>
                        )}
                        {item.hasEvent && item.isToday && (
                          <span className="w-1 h-1 bg-[#e04f96] rounded-full mt-0.5"></span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </main>

          {/* ==================================================== */}
          {/* 3. RIGHT SIDEBAR (LIVE CHAT) (Span 3) - Sticky Fixed */}
          {/* ==================================================== */}
          <aside className="lg:col-span-3 lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)] bg-white rounded-3xl border border-pink-100/60 shadow-xs flex flex-col justify-between overflow-hidden z-20">
            
            {/* Top Header of Chat */}
            <div>
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <h3 className="font-extrabold text-sm text-[#2d1b28]">Live Chat</h3>
                  <span className="text-[10px] text-gray-400 font-medium">122 online</span>
                </div>
                <button className="w-6 h-6 rounded-full bg-pink-50/60 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                  <Minus className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Chat Message Stream */}
              <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="flex gap-2.5 items-start group">
                    <img
                      src={msg.avatar}
                      alt={msg.name}
                      className="w-7 h-7 rounded-full object-cover border border-pink-200 mt-0.5 shrink-0"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#2d1b28]">{msg.name}</span>
                        <span className="text-[9px] text-gray-400">{msg.time}</span>
                      </div>
                      <div className="bg-[#fceef5]/60 text-xs text-[#3b2334] p-3 rounded-2xl rounded-tl-xs leading-relaxed border border-pink-100/40">
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Controls: Input & Nav Tabs */}
            <div className="p-3 border-t border-gray-100 bg-white space-y-3">
              {/* Message Input Form */}
              <form onSubmit={handleSendChat} className="relative flex items-center">
                <input
                  type="text"
                  value={newMsgText}
                  onChange={(e) => setNewMsgText(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-pink-50/40 border border-pink-100 text-xs text-gray-700 rounded-full py-2.5 pl-4 pr-16 outline-none focus:border-[#e04f96] focus:ring-2 focus:ring-pink-100 transition-all placeholder:text-gray-400"
                />
                <div className="absolute right-1.5 flex items-center gap-1">
                  <button type="button" className="text-gray-400 hover:text-pink-400 p-1">
                    <Smile className="h-4 w-4" />
                  </button>
                  <button
                    type="submit"
                    className="w-7 h-7 bg-[#e04f96] hover:bg-[#c73d7f] text-white rounded-full flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>

              {/* Bottom Nav Tabs (Live Chat | Community | Mentors) */}
              <div className="grid grid-cols-3 gap-1 pt-1 border-t border-gray-100 text-center">
                <button
                  onClick={() => setActiveRightTab("chat")}
                  className={`py-2 text-[10px] font-bold rounded-xl flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                    activeRightTab === "chat"
                      ? "text-[#e04f96] bg-pink-50"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Smile className="h-3.5 w-3.5" />
                  <span>Live Chat</span>
                </button>

                <button
                  onClick={() => setActiveRightTab("community")}
                  className={`py-2 text-[10px] font-bold rounded-xl flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                    activeRightTab === "community"
                      ? "text-[#e04f96] bg-pink-50"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Users className="h-3.5 w-3.5" />
                  <span>Community</span>
                </button>

                <button
                  onClick={() => setActiveRightTab("mentors")}
                  className={`py-2 text-[10px] font-bold rounded-xl flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                    activeRightTab === "mentors"
                      ? "text-[#e04f96] bg-pink-50"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Mentors</span>
                </button>
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}
