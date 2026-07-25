import { Bell, MoreVertical } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface StudentHeaderProps {
  user: { name: string; username: string } | null;
  onLogout: () => void;
}

export function StudentHeader({ user, onLogout }: StudentHeaderProps) {
  const [extensionOn, setExtensionOn] = useState(true);

  return (
    <div className="pt-[18px] pb-4 mb-[18px] border-b border-gray-100 flex items-center justify-between gap-3 flex-wrap">
      {/* Left side */}
      <div className="flex flex-col">
        <h2 className="text-base font-extrabold text-[#cf3478]">GOC Extension</h2>
        <p className="text-[11.5px] text-[#8b7e85] font-semibold">Opportunities. Community. Growth.</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-[14px]">
        {/* Toggle Pill */}
        <div className="flex items-center gap-[10px] border border-[#f1e4e9] rounded-[24px] py-[6px] pl-[14px] pr-[8px] bg-white">
          <span className="text-[12px] font-bold text-[#2a2026]">Extension {extensionOn ? "ON" : "OFF"}</span>
          <button
            onClick={() => setExtensionOn(!extensionOn)}
            className={`w-[40px] h-[22px] rounded-[22px] relative transition-colors cursor-pointer ${
              extensionOn ? "bg-[#f14f98]" : "bg-[#e8dbe1]"
            }`}
          >
            <motion.div
              layout
              className="absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
              animate={{ right: extensionOn ? "2px" : "20px" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>

        {/* Bell */}
        <button className="relative w-[34px] h-[34px] rounded-full flex items-center justify-center text-[#8b7e85] text-base hover:bg-[#fff7fa] hover:text-[#cf3478] transition-colors cursor-pointer">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute top-[6px] right-[6px] w-2 h-2 bg-[#f14f98] border-[2px] border-white rounded-full pointer-events-none" />
        </button>

        {/* Avatar */}
        <button className="w-[34px] h-[34px] rounded-full bg-[#fde8f1] text-[#f14f98] font-bold text-[15px] flex items-center justify-center hover:brightness-95 transition-all cursor-pointer">
          {user?.name?.[0] || "K"}
        </button>

        {/* More */}
        <button className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[#8b7e85] text-base hover:bg-[#fff7fa] hover:text-[#cf3478] transition-colors cursor-pointer">
          <MoreVertical className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}
