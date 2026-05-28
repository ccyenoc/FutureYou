"use client"

import {
  MapPin,
  Briefcase,
  Sparkles,
} from "lucide-react"

const roadmapPhases = [
  {
    number: 1,
    title: "Foundation",
    duration: "0 - 3 months",
    items: [
      "Strengthen core skills",
      "Build 2-3 projects",
      "Learn key tools",
    ],
    completed: 0,
    total: 3,
  },

  {
    number: 2,
    title: "Build & Explore",
    duration: "3 - 6 months",
    items: [
      "Work on real projects",
      "Explore different roles",
      "Gain practical experience",
    ],
    completed: 0,
    total: 3,
  },

  {
    number: 3,
    title: "Specialize",
    duration: "6 - 12 months",
    items: [
      "Choose your direction",
      "Upskill in chosen area",
      "Get certified",
    ],
    completed: 0,
    total: 3,
  },

  {
    number: 4,
    title: "Launch",
    duration: "12+ months",
    items: [
      "Build your portfolio",
      "Apply for roles",
      "Grow your network",
    ],
    completed: 0,
    total: 3,
  },
]

type Career = {
  title: string
  age: number
  location: string
  industry: string
  workStyle: string
}

type RoadmapSectionProps = {
  career: Career
}

export default function RoadmapSection({career} : RoadmapSectionProps) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-gradient-to-b
        from-white/5
        to-white/[0.02]
        p-8
      "
    >

      {/* TOP CAREER HEADER */}

      <div
        className="
          flex
          items-center
          gap-8

          border-b
          border-white/10

          pb-8
          mb-8
        "
      >

        {/* AVATAR */}

        <div
          className="
            relative

            flex
            h-36
            w-36
            items-center
            justify-center

            rounded-full

            bg-gradient-to-b
            from-yellow-300
            to-yellow-400

            text-7xl

            shadow-lg
            shadow-orange-500/20

            border-[10px]
            border-orange-400
          "
        >

          👨

          <div
            className="
              absolute
              bottom-1
              right-1

              flex
              h-14
              w-14
              items-center
              justify-center

              rounded-full

              border-4
              border-black

              bg-emerald-400

              text-xl
            "
          >
            ✨
          </div>

        </div>

        {/* CAREER INFO */}

        <div className="flex-1">

          <h1
            className="
              text-5xl
              font-extrabold
              text-purple-400
              leading-tight
            "
          >
            {career.title}
          </h1>

          <div
            className="
              mt-6
              flex
              flex-wrap
              gap-6
            "
          >

            <div className="flex items-center gap-2 text-white/70">
              <MapPin className="h-4 w-4 text-red-400" />
              <span>{career.location}</span>
            </div>

            <div className="flex items-center gap-2 text-white/70">
              <Briefcase className="h-4 w-4 text-zinc-400" />
              <span>{career.industry}</span>
            </div>

            <div className="flex items-center gap-2 text-white/70">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>{career.workStyle}</span>
            </div>

          </div>

        </div>

      </div>





      {/* ROADMAP HEADER */}

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-white">
          Your Career Roadmap
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Personalized path based on your profile
        </p>

      </div>





      {/* TIMELINE */}

      <div className="relative">

        {/* CONNECTION LINE */}

        <div
          className="
            absolute
            top-12
            left-0
            right-0

            h-1

            bg-gradient-to-r
            from-purple-600
            via-pink-500
            to-yellow-500

            opacity-30
          "
        />



        {/* PHASES */}

        <div className="grid grid-cols-4 gap-5">

          {roadmapPhases.map((phase, index) => (

            <div key={phase.number} className="relative">

              {/* STEP NUMBER */}

              <div className="flex justify-center mb-6">

                <div
                  className={`
                    relative
                    z-10

                    flex
                    h-12
                    w-12
                    items-center
                    justify-center

                    rounded-full

                    border-2

                    font-bold
                    text-white

                    ${
                      index === 0
                        ? `
                          bg-purple-600
                          border-purple-500
                          shadow-lg
                          shadow-purple-500/50
                        `
                        : `
                          bg-white/10
                          border-white/30
                          text-white/60
                        `
                    }
                  `}
                >
                  {phase.number}
                </div>

              </div>





              {/* PHASE CARD */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10

                  bg-white/5

                  p-6

                  transition-all
                  hover:border-white/20
                  hover:bg-white/[0.07]
                "
              >

                {/* TITLE */}

                <h3 className="text-2xl font-bold text-white mb-2">
                  {phase.title}
                </h3>

                <p className="text-sm text-zinc-400 mb-6">
                  {phase.duration}
                </p>





                {/* TASKS */}

                <div className="space-y-4 mb-6">

                  {phase.items.map((item, i) => (

                    <div
                      key={i}
                      className="
                        flex
                        items-start
                        gap-3
                      "
                    >

                      <div
                        className="
                          mt-2
                          h-2
                          w-2
                          rounded-full
                          bg-white/30
                        "
                      />

                      <p className="text-sm text-white/70">
                        {item}
                      </p>

                    </div>

                  ))}

                </div>





                {/* PROGRESS */}

                <div className="border-t border-white/10 pt-4">

                  <div className="flex items-center justify-between mb-2">

                    <p className="text-sm text-white/50">
                      Progress
                    </p>

                    <p className="text-sm font-semibold text-white/70">
                      {phase.completed}/{phase.total}
                    </p>

                  </div>

                  <div
                    className="
                      h-2
                      w-full
                      overflow-hidden
                      rounded-full
                      bg-white/10
                    "
                  >

                    <div
                      className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-purple-500
                        to-pink-500
                      "
                      style={{
                        width: `${(phase.completed / phase.total) * 100}%`
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>





      {/* BUTTON */}

      <div className="mt-10 flex justify-center">

        <button
          className="
            flex
            items-center
            gap-2

            text-sm
            font-semibold
            text-purple-400

            transition-colors
            hover:text-purple-300
          "
        >

          View Full Roadmap

          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>

        </button>

      </div>

    </div>

  )
}