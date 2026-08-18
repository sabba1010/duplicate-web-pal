import { useState, useEffect } from "react";
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2, X, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "../../../lib/api";

export function AdminOpportunitiesView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    category: "Scholarship",
    deadline: "",
    tags: "",
    image: "",
    description: "",
    status: "Published"
  });

  const fetchOpportunities = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/opportunities`);
      const data = await res.json();
      if (res.ok) {
        setOpportunities(data.opportunities);
      }
    } catch (err) {
      console.error("Failed to fetch opportunities", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setImageFile(null);
    setFormData({
      title: "",
      organization: "",
      category: "Scholarship",
      deadline: "",
      tags: "",
      image: "",
      description: "",
      status: "Published"
    });
    setShowModal(true);
  };

  const openEditModal = (opp: any) => {
    setEditingId(opp._id);
    setImageFile(null);
    setFormData({
      title: opp.title,
      organization: opp.organization || "",
      category: opp.category,
      deadline: opp.deadline,
      tags: opp.tags.join(", "),
      image: opp.image,
      description: opp.description,
      status: opp.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this opportunity?")) return;
    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/opportunities/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setOpportunities(prev => prev.filter(o => o._id !== id));
      } else {
        alert("Failed to delete");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("goc_token");
    setIsSubmitting(true);
    
    let finalImageUrl = formData.image;

    // 1. Upload image if a file was selected
    if (imageFile) {
      try {
        const uploadData = new FormData();
        uploadData.append("image", imageFile);
        
        const uploadRes = await fetch(`${API_BASE}/api/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: uploadData
        });
        
        const uploadResult = await uploadRes.json();
        if (uploadRes.ok) {
          finalImageUrl = `${API_BASE}${uploadResult.imageUrl}`;
        } else {
          alert("Image upload failed: " + uploadResult.message);
          setIsSubmitting(false);
          return;
        }
      } catch (err) {
        alert("Error uploading image");
        setIsSubmitting(false);
        return;
      }
    }

    if (!finalImageUrl) {
      alert("Please upload an image.");
      setIsSubmitting(false);
      return;
    }

    // 2. Submit the main form
    const payload = {
      ...formData,
      image: finalImageUrl,
      tags: formData.tags.split(",").map(t => t.trim()).filter(t => t)
    };

    try {
      const url = editingId 
        ? `${API_BASE}/api/opportunities/${editingId}`
        : `${API_BASE}/api/opportunities`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setShowModal(false);
        fetchOpportunities();
      } else {
        const data = await res.json();
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      alert("Error saving opportunity");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = opportunities.filter(o => 
    o.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (o.organization && o.organization.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col overflow-hidden relative">
      <div className="p-6 border-b border-slate-100 space-y-6 bg-slate-50/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Opportunity Database</h2>
            <p className="text-sm text-slate-500 mt-1">Manage public listings, drafts, and archives.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search database..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 text-sm text-slate-700 rounded-xl py-2 pl-9 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>
            <button className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="h-4 w-4" />
            </button>
            <button 
              onClick={openAddModal}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="h-4 w-4" /> New Listing
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="p-10 text-center text-slate-500">Loading opportunities...</div>
        ) : (
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100 sticky top-0 z-10 text-slate-500 font-bold text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Title / Organization</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Deadline</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((opp) => (
                <tr key={opp._id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${opp.image}')` }}
                      ></div>
                      <div>
                        <div className="font-bold text-slate-900">{opp.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{opp.organization || "-"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                      {opp.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">
                    {opp.deadline}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border ${
                      opp.status === "Published" 
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
                        : "bg-amber-100 text-amber-700 border-amber-200"
                    }`}>
                      {opp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openEditModal(opp)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg bg-white border border-slate-200 shadow-sm transition-colors" title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(opp._id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg bg-white border border-slate-200 shadow-sm transition-colors" title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg bg-white border border-slate-200 shadow-sm transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-slate-500">No opportunities found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ADD/EDIT MODAL */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed left-1/2 top-[5%] -translate-x-1/2 z-50 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-900">
                  {editingId ? "Edit Opportunity" : "Create New Opportunity"}
                </h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg hover:bg-slate-100">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <form id="opp-form" onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Title *</label>
                      <input 
                        required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-white border border-slate-200 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500" 
                        placeholder="e.g. Google STEP Internship"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Organization</label>
                      <input 
                        type="text" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})}
                        className="w-full bg-white border border-slate-200 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500" 
                        placeholder="e.g. Google"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Category *</label>
                      <select 
                        required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-white border border-slate-200 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500"
                      >
                        <option value="Scholarship">Scholarship</option>
                        <option value="Paid Internship">Paid Internship</option>
                        <option value="Research Program">Research Program</option>
                        <option value="Fellowship">Fellowship</option>
                        <option value="Volunteer">Volunteer</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Deadline *</label>
                      <input 
                        required type="text" value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})}
                        className="w-full bg-white border border-slate-200 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500" 
                        placeholder="e.g. Oct 1, 2026"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tags (Comma Separated)</label>
                    <input 
                      type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})}
                      className="w-full bg-white border border-slate-200 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500" 
                      placeholder="e.g. Merit, $10k, STEM"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Opportunity Image *</label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 relative">
                        <input 
                          type="file" 
                          accept="image/*"
                          required={!editingId && !formData.image} 
                          onChange={e => {
                            if (e.target.files && e.target.files[0]) {
                              setImageFile(e.target.files[0]);
                            }
                          }}
                          className="w-full bg-white border border-slate-200 text-sm rounded-xl py-2 px-3 outline-none focus:border-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" 
                        />
                      </div>
                      {(imageFile || formData.image) && (
                        <div 
                          className="w-12 h-12 rounded-lg border border-slate-200 shrink-0 bg-cover bg-center shadow-sm" 
                          style={{ backgroundImage: `url('${imageFile ? URL.createObjectURL(imageFile) : formData.image}')` }}
                        ></div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Description *</label>
                    <textarea 
                      required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-white border border-slate-200 text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500 min-h-[120px] resize-y" 
                      placeholder="Detailed description of the opportunity..."
                    ></textarea>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Status</label>
                    <select 
                      value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}
                      className="w-full bg-white border border-slate-200 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500"
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </form>
              </div>
              
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200/50 transition-colors" disabled={isSubmitting}>
                  Cancel
                </button>
                <button type="submit" form="opp-form" className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : (editingId ? "Save Changes" : "Create Opportunity")}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
