import { TrendingUp, BookOpen, Briefcase, FileText, ArrowRight } from "lucide-react"

const actionItems = [
  {
    id: "skills",
    icon: TrendingUp,
    title: "Skill Gap Analysis",
    description: "See what skills you need to grow",
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    id: "courses",
    icon: BookOpen,
    title: "Recommended Courses",
    description: "Courses tailored for your path",
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    id: "jobs",
    icon: Briefcase,
    title: "Career Opportunities",
    description: "Jobs that match your profile",
    color: "from-emerald-500/20 to-emerald-500/5"
  },
  {
    id: "resume",
    icon: FileText,
    title: "Resume Insights",
    description: "Improve your resume with AI",
    color: "from-pink-500/20 to-pink-500/5"
  },
]

export default function NextActionSection() {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-8 h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">What's Next?</h2>
        <p className="text-sm text-zinc-400 mt-1">Quick actions to accelerate your journey</p>
      </div>

      {/* Action Items */}
      <div className="space-y-3 flex-1">
        {actionItems.map((item) => {
          const IconComponent = item.icon
          return (
            <button
              key={item.id}
              className={`w-full group rounded-xl border border-white/10 bg-gradient-to-br ${item.color} p-4 text-left hover:border-white/30 hover:bg-white/10 transition-all`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <IconComponent className="h-5 w-5 text-white/60 group-hover:text-white/80 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm group-hover:text-white/95 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/50 group-hover:text-white/60 transition-colors mt-1">
                    {item.description}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-white/60 transition-all transform group-hover:translate-x-1 flex-shrink-0 mt-1" />
              </div>
            </button>
          )
        })}
      </div>

      {/* Footer CTA */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <button className="w-full rounded-lg bg-gradient-to-r from-amber-500/80 to-orange-500/80 px-4 py-3 font-semibold text-white hover:from-amber-500 hover:to-orange-500 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/50">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Get Started
        </button>
      </div>
    </div>
  )
}