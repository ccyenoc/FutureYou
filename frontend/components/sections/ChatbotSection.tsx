"use client"

import {
  Send,
  Sparkles,
  BookOpen,
  Briefcase,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

import { useState } from "react"

type Career = {
  title: string
  reasoning: string
  futurePotential: number
  salaryPotential: number
  growthPotential: number
}

type ChatbotSectionProps = {
  career: Career
  analysis: any
}

type ChatMessage = {
    role: "user" | "bot"
    text?: string
    jobs?: any[]
    skillGap?: any
    courses?: any[]
  }

export default function ChatbotSection({career, analysis} : ChatbotSectionProps) {


  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)

  const [jobType, setJobType] = useState("Full Time")

  const [showJobModal, setShowJobModal] = useState(false)

  const [region, setRegion] = useState("")

  const sendMessage = async () => {

    if (!message.trim()) return

    if (loading) return

    const current = message

    setMessages(prev => [
      ...prev,
      {
        role: "user",
        text: current
      }
    ])

    setMessage("")
    setLoading(true)

    try {

      const res = await fetch(
        "http://localhost:8080/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
            "application/json"
          },

          body: JSON.stringify({
            message: current
          })
        }
      )

      if (!res.ok) {
        throw new Error(
          "Backend failed"
        )
      }

      const data = await res.json()

      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          text: data.reply
        }
      ])

    }
    catch {

      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          text: "Career Echo is busy 👻"
        }
      ])

    }
    finally {
      setLoading(false)
    }

  }

  const handleQuickAction = async ( action: string ) => {

    let url = ""

    switch(action){

      case "jobs":
         setShowJobModal(true)
         return

    case "course":{

        const response = await fetch(
            "http://localhost:8080/courses",
            {
              method:"POST",

              headers:{
                "Content-Type":
                "application/json"
              },

              body:JSON.stringify({
                career: career.title
              })
            }
          )

        const data =
          await response.json()

        setMessages(prev => [
          ...prev,
          {
            role:"bot",
            courses:data.courses
          }
        ])

        return
      }

     case "skills":{

        const response = await fetch(
          "http://localhost:8080/skill-gap",
          {
            method:"POST",

            headers:{
              "Content-Type":
              "application/json"
            },

            body:JSON.stringify({
              career: career.title,
              skills: analysis.skills,
              strengths: analysis.strengths
            })
          }
        )

        const data =
          await response.json()

        setMessages(prev => [
          ...prev,
          {
            role:"bot",
            skillGap:data
          }
        ])

        return
      }

      case "roadmap": 
        url = `http://localhost:8080/career/roadmap?career=${career.title}`
        break
    }

    const response = await fetch(url)

    const data = await response.json()

    setMessages(prev => [
      ...prev,
      {
        role:"bot",
        text:data.message
      }
    ])
  }

  const searchJobs = async () => {

  const response = await fetch(
    "http://localhost:8080/jobs",
    {
      method: "POST",

      headers: {
        "Content-Type":
        "application/json"
      },

      body: JSON.stringify({
        career: career.title,
        jobType,
        region
      })
    }
  )

  const data = await response.json()

  setMessages(prev => [
      ...prev,
      {
        role: "bot",
        jobs: data.jobs
      }
    ])

  console.log(data)

  setShowJobModal(false)
}

  return (

    <div
      className="
      h-[calc(100vh-140px)]
      rounded-[32px]
      border
      border-white/[0.06]
      bg-[linear-gradient(
      180deg,
      rgba(16,16,30,.95),
      rgba(8,8,18,.98)
      )]

      backdrop-blur-xl
      flex
      flex-col
      overflow-hidden
    "
    >

      {/* HEADER */}

      <div
        className="
        px-8
        py-7
        border-b
        border-white/[0.06]
        flex-shrink-0
      "
      >
        <h2
          className="
          text-[24px]
          font-bold
          text-white
        "
        >
          Meet Your Future Self 👻
        </h2>
      </div>

      {/* SCROLLABLE AREA */}

      <div
        className="
        flex-1
        overflow-y-auto
        px-6
        py-6
        space-y-6
      "
      >

        {/* QUICK ACTIONS */}

        <div>

          <p
            className="
            text-zinc-500
            mb-4
          "
          >
            Quick actions
          </p>

          <div className="space-y-3">

            {[
              {
                id:"skills",
                icon: TrendingUp,
                title:
                `${career.title} Skill Gap`,
                subtitle:
                "See what skills you need"
              },

              {
                id:"course",
                icon: BookOpen,
                title:
                `${career.title} Courses`,
                subtitle:
                "Courses for your path"
              },

              {
                id:"jobs",
                icon: Briefcase,
                title:
                `${career.title} Jobs`,
                subtitle:
                "Jobs matching your future"
              },

            ].map((item) => (

              <button
                key={item.title}
                onClick={ () => handleQuickAction(item.id)}
                className="
                w-full
                rounded-[20px]
                border
                border-white/[0.05]
                bg-white/[0.03]
                p-5
                text-left
                hover:border-violet-500/30
                transition
              "
              >

                <div className="flex gap-4">

                  <item.icon
                    size={18}
                    className="text-violet-400"
                  />

                  <div>

                    <p className="text-white">
                      {item.title}
                    </p>

                    <p
                      className="
                      text-zinc-500
                      text-sm
                    "
                    >
                      {item.subtitle}
                    </p>

                  </div>

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* CHAT MESSAGES */}

        <div className="space-y-4">

          {messages.map((msg, index) => (

          <div key={index}>

            {msg.jobs?.map((job, i) => (

              <a
                key={i}
                href={job.url}
                target="_blank"
                rel="noreferrer"
                className="
                  block
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  p-4
                  hover:border-violet-500/40
                "
              >

                <h4 className="font-semibold text-white">
                  {job.title}
                </h4>

                <p className="text-sm text-violet-300 mt-1">
                  {job.company}
                </p>

                <p className="text-sm text-zinc-400">
                  {job.location}
                </p>

                <span
                  className="
                    inline-block
                    mt-2
                    rounded-full
                    bg-violet-500/20
                    px-2
                    py-1
                    text-xs
                    text-violet-300
                  "
                >
                  {job.type}
                </span>

                {job.summary && (
                  <p className="text-sm text-zinc-300 mt-3">
                    {job.summary}
                  </p>
                )}

                <p className="text-xs text-violet-400 mt-3">
                  Open Job →
                </p>

              </a>

            ))}
            {msg.skillGap && (

              <div
                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  p-4
                "
              >

                <h3 className="text-white font-bold mb-3">
                  🎯 Skill Gap Analysis
                </h3>

                <div className="mb-4">

                  <p className="text-green-400 mb-2">
                    Matched Skills
                  </p>

                  {msg.skillGap.matchedSkills?.map(
                    (skill:string) => (

                      <div
                        key={skill}
                        className="text-zinc-300"
                      >
                        ✓ {skill}
                      </div>

                  ))}
                </div>

                <div className="mb-4">

                  <p className="text-yellow-400 mb-2">
                    Missing Technical Skills
                  </p>

                  {msg.skillGap.missingTechnicalSkills?.map(
                    (skill:string) => (

                      <div
                        key={skill}
                        className="text-zinc-300"
                      >
                        ⚠ {skill}
                      </div>

                  ))}
                </div>

                <div className="mb-4">

                  <p className="text-pink-400 mb-2">
                    Missing Soft Skills
                  </p>

                  {msg.skillGap.missingSoftSkills?.map(
                    (skill:string) => (

                      <div
                        key={skill}
                        className="text-zinc-300"
                      >
                        ⚠ {skill}
                      </div>

                  ))}
                </div>

                <div>

                  <p className="text-violet-400 mb-2">
                    Top Priority Skills
                  </p>

                  {msg.skillGap.topPrioritySkills?.map(
                    (skill:string) => (

                      <div
                        key={skill}
                        className="text-zinc-300"
                      >
                        🔥 {skill}
                      </div>

                  ))}
                </div>

              </div>

            )}
            {msg.courses?.map((course, i) => (
              <a
                key={i}
                href={course.url}
                target="_blank"
                rel="noreferrer"
                className="
                  block
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  p-4
                  hover:border-violet-500/40
                "
              >

                <h4 className="font-semibold text-white">
                  {course.title}
                </h4>

                <p className="text-sm text-violet-300 mt-1">
                  {course.provider}
                </p>

                <p className="text-sm text-zinc-300 mt-3">
                  {course.description}
                </p>

                <p className="text-xs text-violet-400 mt-3">
                  Open Course →
                </p>

              </a>

            ))}

          </div>

        ))}

        </div>

      </div>

      {/* INPUT */}

      <div
        className="
        p-5
        border-t
        border-white/[0.06]
        flex
        gap-3
        flex-shrink-0
      "
      >

        <input
          value={message}

          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }

          placeholder="Ask your future self..."

          className="
          flex-1
          rounded-xl
          bg-white/[0.05]
          px-5
          py-3
          text-white
          outline-none
        "
        />

        <button
          className="
          w-12
          h-12
          rounded-xl
          bg-violet-600
          flex
          items-center
          justify-center
        "

          onClick={sendMessage}
        >
          <Send size={16} />
        </button>
        

      </div>

      {showJobModal && (

  <div
    className="
      fixed
      inset-0
      bg-black/70
      flex
      items-center
      justify-center
      z-50
    "
  >

    <div
      className="
        w-[420px]
        rounded-2xl
        border
        border-white/10
        bg-[#111]
        p-6
      "
    >

      <h3 className="text-xl font-bold text-white mb-4">
        Find {career.title} Jobs
      </h3>

      {/* Job Type */}

      <label className="block text-sm text-zinc-400 mb-2">
        Job Type
      </label>

      <select
        value={jobType}
        onChange={(e) =>
          setJobType(e.target.value)
        }
        className="
          w-full
          rounded-xl
          bg-white/5
          p-3
          text-white
          mb-4
        "
      >
        <option value="Full Time">
          Full Time
        </option>

        <option value="Part Time">
          Part Time
        </option>

        <option value="Internship">
          Internship
        </option>
      </select>

      {/* Region */}

      <label className="block text-sm text-zinc-400 mb-2">
        Region
      </label>

      <input
        value={region}
        onChange={(e) =>
          setRegion(e.target.value)
        }
        placeholder="Malaysia, Singapore, Remote..."
        className="
          w-full
          rounded-xl
          bg-white/5
          p-3
          text-white
        "
      />

      <div className="flex gap-3 mt-5">

        <button
          onClick={() =>
            setShowJobModal(false)
          }
          className="
            flex-1
            rounded-xl
            border
            border-white/10
            py-3
            text-white
          "
        >
          Cancel
        </button>

        <button
          onClick={searchJobs}
          className="
            flex-1
            rounded-xl
            bg-violet-600
            py-3
            text-white
          "
        >
          Search Jobs
        </button>

      </div>

    </div>

  </div>

)}

    </div>

  )


}