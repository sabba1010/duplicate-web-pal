import { Link } from "@tanstack/react-router";
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
} from "lucide-react";

export function StudentSidebar() {
  return (
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
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 bg-[#e04f96] text-white font-semibold text-xs rounded-2xl shadow-md transition-transform hover:scale-[1.02]"
          >
            <LayoutGrid className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>

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
            <circle cx="35" cy="22" r="10" stroke="#e04f96" strokeWidth="3.5" fill="#fdeef5" />
            <path d="M35 32V58M35 42L22 52M35 42L48 30" stroke="#e04f96" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M35 58L26 76M35 58L44 76" stroke="#e04f96" strokeWidth="3.5" strokeLinecap="round" />

            <circle cx="65" cy="22" r="10" stroke="#e04f96" strokeWidth="3.5" fill="#fdeef5" />
            <path d="M65 32V58M65 42L78 52M65 42L52 30" stroke="#e04f96" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M65 58L56 76M65 58L74 76" stroke="#e04f96" strokeWidth="3.5" strokeLinecap="round" />

            <path d="M50 22L52 28L58 30L52 32L50 38L48 32L42 30L48 28Z" fill="#e04f96" />
          </svg>
        </div>

        <button className="w-full bg-[#e04f96] hover:bg-[#c73d7f] text-white text-xs font-bold py-2 rounded-xl shadow-xs transition-colors cursor-pointer">
          Invite now
        </button>
      </div>
    </aside>
  );
}
