"use client"

type RoadmapPhase = {
  phase: string
  duration: string
  items: string[]
}

type Career = {
  title: string
  reasoning: string
  futurePotential: number
  salaryPotential: number
  growthPotential: number
  roadmap: RoadmapPhase[]
}

type RoadmapSectionProps = {
  career: Career
}

export default function RoadmapSection({
  career,
}: RoadmapSectionProps) {

  const roadmapPhases =
  career.roadmap

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

          <div className="mt-6 space-y-3">

            <p className="text-white/70 leading-relaxed">
              {career.reasoning}
            </p>

            <div
              className="
                grid
                grid-cols-3
                gap-4
                pt-3
              "
            >

              <div
                className="
                  rounded-xl
                  border
                  border-purple-500/20
                  bg-purple-500/10
                  p-4
                "
              >

                <p className="text-sm text-purple-300">
                  Future Potential
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  {career.futurePotential}%
                </h2>

              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-green-500/20
                  bg-green-500/10
                  p-4
                "
              >

                <p className="text-sm text-green-300">
                  Salary Potential
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  {career.salaryPotential}%
                </h2>

              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-pink-500/20
                  bg-pink-500/10
                  p-4
                "
              >

                <p className="text-sm text-pink-300">
                  Growth Potential
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  {career.growthPotential}%
                </h2>

              </div>

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

            <div key={index} className="relative">

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
                  {index + 1}
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

                <h3   
                className="
                text-1xl
                leading-tight
                font-extrabold
                text-white
                mb-4
                break-words
                hyphens-auto
              ">
                  {phase.phase}
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
                          bg-purple-400
                        "
                      />

                      <p className="text-sm text-white/70">
                        {item}
                      </p>

                    </div>

                  ))}

                </div>





                {/* FOOTER */}

                <div className="border-t border-white/10 pt-4">

                  <p className="text-sm text-purple-300">
                    AI Personalized Phase
                  </p>

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