"use client";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-2xl w-full text-center space-y-8 bg-white/5 p-12 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl relative">
        
        {/* Title */}
        <h1 className="text-5xl font-extrabold tracking-tight bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          AI Auto-Facebook-Poster
        </h1>
        
        <p className="text-gray-400 text-lg leading-relaxed">
          Generating professional AI content and high-quality images directly to Facebook with zero manual effort.
        </p>

        {/* Automation Status (Replacing the Button) */}
        <div className="flex flex-col items-center justify-center space-y-4 py-6">
          <div className="relative">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-purple-600 rounded-full blur opacity-40 animate-pulse"></div>
            <div className="relative bg-[#1e293b] border border-white/20 px-8 py-4 rounded-full flex items-center gap-4">
              <span className="text-3xl">🤖</span>
              <div className="text-left">
                <p className="text-xs uppercase tracking-[0.2em] text-blue-400 font-bold">System Status</p>
                <p className="text-white font-medium">Fully Autonomous Mode Active</p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/30 px-6 py-3 rounded-2xl">
            <p className="text-emerald-400 text-sm font-semibold flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Next content will be automatically shared at 9:00 PM
            </p>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="pt-8 border-t border-white/10 mt-10">
          <p className="text-gray-500 text-xs font-medium italic tracking-widest uppercase">
            Crafted with ❤️ by <span className="text-white font-bold hover:text-blue-400 transition-colors cursor-default">Ghulam Abbas Bhatti</span>
          </p>
        </div>

      </div>
    </main>
  );
}