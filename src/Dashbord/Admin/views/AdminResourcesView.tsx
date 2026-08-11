import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Image as ImageIcon,
  Trash2,
  Plus,
  X,
  BookOpen,
  Eye,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

const API_BASE = typeof window !== "undefined" && window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "https://goc-backend-swart.vercel.app";

const CATEGORY_OPTIONS = [
  "SCHOLARSHIPS",
  "INTERNSHIPS",
  "INTERVIEWS",
  "MENTORSHIP",
  "STEM",
  "CONFIDENCE",
  "LEADERSHIP",
  "RESEARCH",
  "GENERAL",
];

const CATEGORY_COLORS: Record<string, string> = {
  SCHOLARSHIPS: "#f14f98",
  INTERNSHIPS: "#f14f98",
  INTERVIEWS: "#7c5cbf",
  MENTORSHIP: "#2b9e6a",
  STEM: "#2196f3",
  CONFIDENCE: "#f6b83c",
  LEADERSHIP: "#e67e22",
  RESEARCH: "#1abc9c",
  GENERAL: "#8b7e85",
};

interface Resource {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  pdfFile: string;
  pdfOriginalName: string;
  uploadedBy: { name: string };
  status: string;
  createdAt: string;
}

type ToastType = "success" | "error" | null;

export function AdminResourcesView() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("GENERAL");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Toast
  const [toast, setToast] = useState<{ type: ToastType; message: string }>({ type: null, message: "" });

  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast({ type: null, message: "" }), 3500);
  };

  const fetchResources = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/resources/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setResources(data.resources || []);
    } catch {
      showToast("error", "Failed to load resources");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPdfFile(file);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("GENERAL");
    setImageFile(null);
    setImagePreview("");
    setPdfFile(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (pdfInputRef.current) pdfInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast("error", "Title and description are required");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("goc_token");
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("category", category);
      if (imageFile) formData.append("image", imageFile);
      if (pdfFile) formData.append("pdf", pdfFile);

      const res = await fetch(`${API_BASE}/api/resources`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        showToast("success", "Resource uploaded successfully!");
        resetForm();
        setShowForm(false);
        fetchResources();
      } else {
        showToast("error", data.message || "Upload failed");
      }
    } catch {
      showToast("error", "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    setDeletingId(id);
    try {
      const token = localStorage.getItem("goc_token");
      const res = await fetch(`${API_BASE}/api/resources/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        showToast("success", "Resource deleted successfully");
        setResources((prev) => prev.filter((r) => r._id !== id));
      } else {
        showToast("error", "Failed to delete resource");
      }
    } catch {
      showToast("error", "Network error");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* ── Toast ── */}
      <AnimatePresence>
        {toast.type && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-6 left-1/2 z-[100] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-[13px] font-bold"
            style={{
              background: toast.type === "success" ? "#2b9e6a" : "#e74c3c",
              color: "#fff",
            }}
          >
            {toast.type === "success" ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ── */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-5">
        <div>
          <h1 className="text-[24px] font-black text-[#111827] tracking-tight flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-[#4f46e5]" />
            Resources
          </h1>
          <p className="text-[13px] text-gray-400 font-semibold mt-[2px]">
            Upload guides, PDFs, and articles for students
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#6366f1] text-white text-[13px] font-bold shadow-lg cursor-pointer"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Upload Resource"}
        </motion.button>
      </div>

      {/* ── Upload Form ── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-[#eef2ff] rounded-2xl p-6 shadow-sm space-y-5"
            >
              <h2 className="text-[16px] font-black text-[#111827] flex items-center gap-2">
                <Upload className="h-4 w-4 text-[#4f46e5]" />
                New Resource
              </h2>

              {/* Title + Category row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-black text-gray-600 uppercase tracking-wider">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Resource title..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[13px] font-semibold text-[#111827] outline-none focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/10 transition-all"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-black text-gray-600 uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[13px] font-semibold text-[#111827] outline-none focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/10 transition-all bg-white cursor-pointer"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-black text-gray-600 uppercase tracking-wider">
                  Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what students will learn from this resource..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[13px] font-semibold text-[#111827] outline-none focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/10 transition-all resize-none"
                  required
                />
              </div>

              {/* File Upload Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Image Upload */}
                <div className="space-y-1.5">
                  <label className="text-[12px] font-black text-gray-600 uppercase tracking-wider">
                    Cover Image (optional)
                  </label>
                  <div
                    onClick={() => imageInputRef.current?.click()}
                    className="relative h-[140px] rounded-xl border-2 border-dashed border-gray-200 hover:border-[#4f46e5] transition-colors cursor-pointer overflow-hidden flex items-center justify-center bg-gray-50 group"
                  >
                    {imagePreview ? (
                      <>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-[12px] font-bold">Change Image</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-[12px] font-bold text-gray-400">Click to upload image</p>
                        <p className="text-[10px] text-gray-300 mt-0.5">JPG, PNG, WebP — max 20MB</p>
                      </div>
                    )}
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* PDF Upload */}
                <div className="space-y-1.5">
                  <label className="text-[12px] font-black text-gray-600 uppercase tracking-wider">
                    PDF File (optional)
                  </label>
                  <div
                    onClick={() => pdfInputRef.current?.click()}
                    className="relative h-[140px] rounded-xl border-2 border-dashed border-gray-200 hover:border-[#4f46e5] transition-colors cursor-pointer flex items-center justify-center bg-gray-50 group"
                  >
                    {pdfFile ? (
                      <div className="text-center px-4">
                        <div className="w-10 h-10 bg-[#eef2ff] rounded-xl flex items-center justify-center mx-auto mb-2">
                          <FileText className="h-5 w-5 text-[#4f46e5]" />
                        </div>
                        <p className="text-[12px] font-black text-[#4f46e5] truncate max-w-[180px]">
                          {pdfFile.name}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <p className="text-[10px] text-gray-300 mt-1">Click to change</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <FileText className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-[12px] font-bold text-gray-400">Click to upload PDF</p>
                        <p className="text-[10px] text-gray-300 mt-0.5">PDF format — max 20MB</p>
                      </div>
                    )}
                    <input
                      ref={pdfInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handlePdfChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { resetForm(); setShowForm(false); }}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-[13px] font-bold text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#6366f1] text-white text-[13px] font-black shadow-lg disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  {submitting ? "Uploading..." : "Publish Resource"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Resources List ── */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="h-8 w-8 animate-spin text-[#4f46e5]" />
        </div>
      ) : resources.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-center">
          <BookOpen className="h-12 w-12 text-gray-200 mb-3" />
          <p className="text-[14px] font-bold text-gray-400">No resources uploaded yet</p>
          <p className="text-[12px] text-gray-300 mt-1">Click "Upload Resource" to add the first one</p>
        </div>
      ) : (
        <div>
          <p className="text-[12px] font-bold text-gray-400 mb-3 uppercase tracking-wider">
            {resources.length} Resource{resources.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <AnimatePresence>
              {resources.map((resource, idx) => (
                <motion.div
                  key={resource._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.04 }}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col"
                >
                  {/* Image */}
                  <div className="h-[150px] bg-gradient-to-br from-[#eef2ff] to-[#f5f3ff] overflow-hidden shrink-0">
                    {resource.image ? (
                      <img
                        src={`${API_BASE}${resource.image}`}
                        alt={resource.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="h-10 w-10 text-[#c7d2fe]" />
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-4 flex flex-col flex-1">
                    {/* Category badge */}
                    <span
                      className="text-[9px] font-black tracking-[0.1em] uppercase mb-2 inline-block"
                      style={{ color: CATEGORY_COLORS[resource.category] ?? "#8b7e85" }}
                    >
                      {resource.category}
                    </span>
                    <h3 className="text-[13px] font-black text-[#111827] leading-[1.4] mb-1 line-clamp-2">
                      {resource.title}
                    </h3>
                    <p className="text-[11px] text-gray-400 font-semibold line-clamp-2 mb-auto">
                      {resource.description}
                    </p>

                    {/* PDF Indicator */}
                    {resource.pdfFile && (
                      <div className="flex items-center gap-1.5 mt-3 bg-[#eef2ff] px-2.5 py-1.5 rounded-lg w-fit">
                        <FileText className="h-3 w-3 text-[#4f46e5]" />
                        <span className="text-[10px] font-black text-[#4f46e5]">PDF attached</span>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                      <span className="text-[10px] text-gray-300 font-semibold">
                        {new Date(resource.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <div className="flex items-center gap-2">
                        {/* View PDF */}
                        {resource.pdfFile && (
                          <a
                            href={`${API_BASE}${resource.pdfFile}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg hover:bg-[#eef2ff] text-[#4f46e5] transition-colors"
                            title="View PDF"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(resource._id)}
                          disabled={deletingId === resource._id}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors cursor-pointer disabled:opacity-50"
                          title="Delete resource"
                        >
                          {deletingId === resource._id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
