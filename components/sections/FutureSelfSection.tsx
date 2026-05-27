"use client"

export default function FutureSelfSection() {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-8 h-full flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-white">Meet Your Future Self</h2>
          <span className="text-xl">👻</span>
        </div>
      </div>

      {/* Avatar Section */}
      <div className="flex-1 flex flex-col items-center justify-center mb-6">
        {/* AI Avatar Circle */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg">
            <div className="w-20 h-20 rounded-full bg-amber-200 flex items-center justify-center text-4xl font-bold text-orange-600">
              👨
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-400 border-2 border-white/20 flex items-center justify-center text-lg">
            ✨
          </div>
        </div>

        {/* Role Title */}
        <h3 className="text-lg font-bold text-white text-center mb-4">AI Product Manager</h3>

        {/* Details */}
        <div className="w-full space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-white/40 mt-0.5">📍</span>
            <div>
              <p className="text-white/60 text-xs">Location</p>
              <p className="text-white font-medium">Bangalore, India</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="text-white/40 mt-0.5">🏢</span>
            <div>
              <p className="text-white/60 text-xs">Industry</p>
              <p className="text-white font-medium">Technology</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="text-white/40 mt-0.5">💼</span>
            <div>
              <p className="text-white/60 text-xs">Work Style</p>
              <p className="text-white font-medium">Hybrid</p>
            </div>
          </div>
        </div>
      </div>

      {/* Talk to Ghost Button */}
      <button className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-3 font-semibold text-white hover:from-purple-500 hover:to-purple-600 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50">
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.474-2.237-1.668-2.237-.909 0-1.45.613-1.687 1.205-.087.216-.109.517-.109.817v5.784h-3.555s.047-9.383 0-10.363h3.555v1.468c-.007.011-.016.023-.023.035h.023v-.035c.458-.706 1.277-1.712 3.113-1.712 2.275 0 3.985 1.487 3.985 4.685v5.922zM5.337 8.433c-1.144 0-1.915-.758-1.915-1.707 0-.968.779-1.708 1.959-1.708 1.18 0 1.914.74 1.939 1.708 0 .949-.759 1.707-1.983 1.707zm1.946 12.019H3.392V9.089h3.891v11.363zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
        Talk to Ghost
      </button>
    </div>
  )
}