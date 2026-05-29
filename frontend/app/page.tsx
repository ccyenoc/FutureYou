"use client"

import { useState } from "react"

import Navbar from "@/components/layout/Navbar"

import ResumeSection from "@/components/sections/ResumeSection"
import DiscoverSection from "@/components/sections/DiscoverSection"
import RoadmapSection from "@/components/sections/RoadmapSection"
import ChatbotSection from "@/components/sections/ChatbotSection"

export type Career = {
  title: string
  reasoning: string
  futurePotential: number
  salaryPotential: number
  growthPotential: number
}

export default function Home() {

  const [profile, setProfile] = useState<any>(null)

  const [selectedCareer, setSelectedCareer] =
  useState(0)

  const careers = profile?.careers || []

  const currentCareer = careers[selectedCareer]

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <main
        className="
          max-w-7xl
          mx-auto
          px-6
          py-8
          space-y-6
        "
      >

        {/* RESUME */}

        <ResumeSection setProfile={setProfile} />



        {/* DISCOVER */}

        <DiscoverSection profile={profile} />



        {/* ROADMAP + CHAT */}

        <div
          className="
            grid
            grid-cols-[1fr_420px]
            gap-6
            items-start
          "
        >

          {/* LEFT */}


         <div className="space-y-4">

            {/* CAREER SELECTOR */}

            {careers.length > 0 && (

              <div className="flex gap-3">

                {careers.map((career: Career, index: number) => (

                  <button
                    key={career.title}
                    onClick={() => setSelectedCareer(index)}
                    className={`
                      px-4 py-2 rounded-xl border transition-all

                      ${
                        selectedCareer === index
                          ? "border-purple-500 bg-purple-500/10 text-purple-300"
                          : "border-white/10 bg-white/5 text-white"
                      }
                    `}
                  >
                    {career.title}
                  </button>

                ))}

              </div>

            )}

            {/* ROADMAP */}

            {currentCareer && (
              <RoadmapSection career={currentCareer} />
            )}

          </div>

          {/* RIGHT CHAT */}

          <div
            className="
              sticky
              top-28
              h-[calc(100vh-140px)]
            "
          >

            {currentCareer && (
              <ChatbotSection
                career={currentCareer}
              />
            )}

          </div>

        </div>

      </main>

    </div>

  )
}