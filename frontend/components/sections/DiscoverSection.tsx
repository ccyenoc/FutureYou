"use client"

import { User, Heart, Grid3X3, ArrowRight, Sparkles } from "lucide-react"

type DiscoverSectionProps = {
  profile: any
}


export default function DiscoverSection({ profile }: DiscoverSectionProps) {

  const discoverItems = [

    {
      id: "strengths",
      icon: User,
      title: "Your Strengths",
      subtitle: "What you're good at",
      items: profile?.strengths || [],
      color: "text-blue-400",
      bgColor: "from-blue-500/10 to-blue-500/5"
    },

    {
      id: "interests",
      icon: Heart,
      title: "Your Interests",
      subtitle: "What excites you",
      items: profile?.interests || [],
      color: "text-pink-400",
      bgColor: "from-pink-500/10 to-pink-500/5"
    },

    {
      id: "workstyle",
      icon: Grid3X3,
      title: "Your Work Style",
      subtitle: "How you like to work",
      items: profile?.workStyle || [],
      color: "text-emerald-400",
      bgColor: "from-emerald-500/10 to-emerald-500/5"
    }

  ]

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="h-5 w-5 text-amber-400" />
          <h2 className="text-2xl font-bold text-white">Discover You</h2>
        </div>
        <p className="text-sm text-zinc-400">Generated from your profile</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-3 gap-5">
        {discoverItems.map((item) => {
          const IconComponent = item.icon
          return (
            <div
              key={item.id}
              className={`rounded-xl border border-white/10 bg-gradient-to-br ${item.bgColor} p-6 hover:border-white/20 transition-all`}
            >
              {/* Icon and Title */}
              <div className="flex items-start gap-3 mb-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 ${item.color}`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                  <p className="text-xs text-zinc-400">{item.subtitle}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {item.items.map((skill: string) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}