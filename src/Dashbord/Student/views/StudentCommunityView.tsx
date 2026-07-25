import { COMMUNITY_POSTS } from "@/lib/mock-data";
import { MessageSquare, Heart, Share2, MoreHorizontal, PenSquare } from "lucide-react";

export function StudentCommunityView() {
  return (
    <div className="bg-white rounded-3xl border border-pink-100 shadow-sm h-full flex flex-col overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Community Feed</h2>
          <p className="text-sm text-slate-500 mt-1">Connect, share, and grow with peers and mentors.</p>
        </div>
        <button className="bg-[#e04f96] hover:bg-[#c43d83] text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm shadow-pink-300/20 transition-all flex items-center gap-2 cursor-pointer">
          <PenSquare className="h-4 w-4" /> New Post
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-pink-50/20">
        <div className="max-w-2xl mx-auto space-y-6">
          {COMMUNITY_POSTS.map((post) => (
            <div key={post.id} className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm hover:border-pink-200 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full border border-slate-100 object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-tight">{post.author.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="font-medium">{post.author.role}</span>
                      <span>·</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                </div>
                <button className="p-1 text-slate-400 hover:text-slate-800 transition-colors">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>

              <p className="text-slate-700 text-sm leading-relaxed mb-4">
                {post.content}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span key={tag} className="text-[11px] font-semibold text-[#e04f96] bg-pink-50 px-2.5 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                <button className="flex items-center gap-2 text-slate-500 hover:text-rose-500 transition-colors">
                  <Heart className="h-4 w-4" />
                  <span className="text-xs font-semibold">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-slate-500 hover:text-[#e04f96] transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-xs font-semibold">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors ml-auto">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
