"use client"

import { useState } from "react"

import Navbar from "@/components/layout/Navbar"

import ResumeSection from "@/components/sections/ResumeSection"
import DiscoverSection from "@/components/sections/DiscoverSection"
import RoadmapSection from "@/components/sections/RoadmapSection"
import ChatbotSection from "@/components/sections/ChatbotSection"

export type Career = {
  title: string
  age: number
  location: string
  industry: string
  workStyle: string
}

const careers: Career[] = [

  {
    title: "AI Product Manager",
    age: 27,
    location: "Bangalore, India",
    industry: "Technology Industry",
    workStyle: "Hybrid Work Style"
  },

  {
    title: "AI Engineer",
    age: 26,
    location: "Singapore",
    industry: "AI Infrastructure",
    workStyle: "Remote First"
  },

  {
    title: "Startup Founder",
    age: 29,
    location: "San Francisco",
    industry: "Startup Ecosystem",
    workStyle: "Fast-Paced"
  }

]

export default function Home() {

  const [profile, setProfile] = useState<any>(null)

  const [selectedCareer, setSelectedCareer] =
  useState(0)

  const currentCareer =
  careers[selectedCareer]

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

          <RoadmapSection
            career={currentCareer}
          />



          {/* RIGHT CHAT */}

          <div
            className="
              sticky
              top-28
              h-[calc(100vh-140px)]
            "
          >

            <ChatbotSection
              careers={careers}
              selectedCareer={selectedCareer}
              setSelectedCareer={setSelectedCareer}
            />

          </div>

        </div>

      </main>

    </div>

  )
}