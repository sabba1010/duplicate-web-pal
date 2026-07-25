import { Search, Bookmark, Share2, Calendar as CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";

interface MetricCardProps {
  icon: React.ElementType;
  value: number | string;
  label: string;
  delay?: number;
}

function MetricCard({ icon: Icon, value, label, delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white rounded-[14px] p-[15px_16px] border border-pink-100 shadow-xs flex items-center gap-[12px] hover:shadow-sm hover:-translate-y-[1px] hover:border-pink-200 transition-all cursor-pointer group"
    >
      <div className="w-10 h-10 rounded-2xl border border-pink-200 bg-pink-50/60 flex items-center justify-center text-[#e04f96] shrink-0 group-hover:scale-105 transition-transform">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-xl font-extrabold text-[#2d1b28]">{value}</div>
        <div className="text-[10px] text-gray-500 leading-tight font-medium">{label}</div>
      </div>
    </motion.div>
  );
}

export function StudentMetrics() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <MetricCard icon={Search} value={36} label="New opportunities this week" delay={0} />
      <MetricCard icon={Bookmark} value={24} label="Saved opportunities" delay={0.05} />
      <MetricCard icon={Share2} value={12} label="Shared with others" delay={0.1} />
      <MetricCard icon={CalendarIcon} value={7} label="Upcoming deadlines" delay={0.15} />
    </div>
  );
}
