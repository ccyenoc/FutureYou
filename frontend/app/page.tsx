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

          {currentCareer && (
            <RoadmapSection
              career={currentCareer}
            />
          )}

          {/* RIGHT CHAT */}

          <div
            className="
              sticky
              top-28
              h-[calc(100vh-140px)]
            "
          >

            <ChatbotSection/>

          </div>

        </div>

      </main>

    </div>

  )
}