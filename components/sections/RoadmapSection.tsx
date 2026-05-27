import { CheckCircle } from "lucide-react"

const roadmapPhases = [
  {
    number: 1,
    title: "Foundation",
    duration: "0 - 3 months",
    items: ["Strengthen core skills", "Build 2-3 projects", "Learn key tools"],
    completed: 0,
    total: 3,
  },
  {
    number: 2,
    title: "Build & Explore",
    duration: "3 - 6 months",
    items: ["Work on real projects", "Explore different roles", "Gain practical experience"],
    completed: 0,
    total: 3,
  },
  {
    number: 3,
    title: "Specialize",
    duration: "6 - 12 months",
    items: ["Choose your direction", "Upskill in chosen area", "Get certified"],
    completed: 0,
    total: 3,
  },
  {
    number: 4,
    title: "Launch",
    duration: "12+ months",
    items: ["Build your portfolio", "Apply for roles", "Grow your network"],
    completed: 0,
    total: 3,
  },
]

export default function RoadmapSection() {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-white">Your Career Roadmap</h2>
        </div>
        <p className="text-sm text-zinc-400 mt-1">Personalized path based on your profile</p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 opacity-30"></div>

        {/* Phases Grid */}
        <div className="grid grid-cols-4 gap-5">
          {roadmapPhases.map((phase, index) => (
            <div key={phase.number} className="relative">
              {/* Phase Number Circle */}
              <div className="flex justify-center mb-6">
                <div className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full font-bold text-white border-2 ${
                  index === 0 
                    ? "bg-purple-600 border-purple-500 shadow-lg shadow-purple-500/50" 
                    : "bg-white/10 border-white/30 text-white/60"
                }`}>
                  {phase.number}
                </div>
              </div>

              {/* Phase Card */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-all hover:border-white/20">
                {/* Title and Duration */}
                <h3 className="font-bold text-white mb-1">{phase.title}</h3>
                <p className="text-xs text-zinc-400 mb-4">{phase.duration}</p>

                {/* Items List */}
                <div className="space-y-2 mb-4">
                  {phase.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                      </div>
                      <p className="text-xs text-white/70">{item}</p>
                    </div>
                  ))}
                </div>

                {/* Progress */}
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-white/50">Progress</p>
                    <p className="text-xs font-semibold text-white/70">{phase.completed}/{phase.total}</p>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all" 
                      style={{ width: `${(phase.completed / phase.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View Full Roadmap Link */}
      <div className="mt-8 flex justify-center">
        <button className="flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors">
          View Full Roadmap
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}