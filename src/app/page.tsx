"use client";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handlePost = async () => {
    setLoading(true);
    setStatus("🤖 AI is thinking & creating image...");
    try {
      const res = await fetch("/api/cron/post-ai");
      if (res.ok) {
        setStatus("✅ Successfully Posted to Facebook!");
      } else {
        setStatus("❌ Failed to post. Check logs.");
      }
    } catch (err) {
      setStatus("⚠️ Connection Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-6 font-sans">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-2xl w-full text-center space-y-8 bg-white/5 p-12 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
        <h1 className="text-5xl font-extrabold tracking-tight bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          AI Auto-Poster
        </h1>
        
        <p className="text-gray-400 text-lg">
          Generate professional AI content and high-quality images directly to Facebook with a single click.
        </p>

        <div className="flex flex-col items-center gap-6">
          <button
            onClick={handlePost}
            disabled={loading}
            className={`group relative px-8 py-4 text-xl font-bold rounded-full transition-all duration-300 transform active:scale-95 ${
              loading 
              ? "bg-gray-700 cursor-not-allowed" 
              : "bg-linear-to-r from-blue-600 to-indigo-600 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:-translate-y-1"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-3">
                <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              "🚀 Post to Facebook Now"
            )}
          </button>

          {status && (
            <div className={`mt-4 px-6 py-2 rounded-lg text-sm font-medium animate-bounce ${
              status.includes("✅") ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "bg-blue-500/10 text-blue-300 border border-blue-500/30"
            }`}>
              {status}
            </div>
          )}
        </div>

        <div className="pt-8 border-t border-white/10 mt-10">
          <p className="text-gray-500 text-sm font-medium italic tracking-widest uppercase">
            Crafted with ❤️ by <span className="text-white font-bold hover:text-blue-400 transition-colors cursor-default">Ghulam Abbas Bhatti</span>
          </p>
        </div>
      </div>
    </main>
  );
}