import Navbar from "@/components/layout/Navbar"

import ResumeSection from "@/components/sections/ResumeSection"
import DiscoverSection from "@/components/sections/DiscoverSection"
import FutureSelfSection from "@/components/sections/FutureSelfSection"
import RoadmapSection from "@/components/sections/RoadmapSection"

import ChatbotSection from "@/components/sections/ChatbotSection"

export default function Home() {
  return (
    <div >

      <Navbar />

      <main
        className="
          max-w-7xl
          mx-auto

          px-6
          py-8
        "
      >

        <div
          className="
          grid

          grid-cols-[2fr_380px]

          gap-6

          items-start
        "
        >

          {/* LEFT */}

          <div className="space-y-6">

            <ResumeSection />

            <div className="grid grid-cols-3 gap-6">

              <div className="col-span-3">
                <DiscoverSection />
              </div>

            </div>

            <RoadmapSection />

          </div>

          {/* RIGHT */}

          <div
          className="
          sticky
          top-28

          h-[calc(100vh-140px)]

          self-start
          "
          >

            <ChatbotSection />

          </div>

        </div>

      </main>

    </div>
  )
}