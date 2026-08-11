export const API_BASE = typeof window !== "undefined" && window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "https://goc-backend-swart.vercel.app";
