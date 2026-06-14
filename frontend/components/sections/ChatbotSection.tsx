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

import Image from "next/image";

import { useState, useEffect, useRef } from "react"

import { useRouter } from "next/navigation"
import { getJsonHeaders } from "@/lib/auth"

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

const parseBotResponse = (text: string) => {
  try {
    const trimmed = text.trim()
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      const parsed = JSON.parse(trimmed)
      if (
        parsed.greeting ||
        parsed.career_suggestions ||
        parsed.closing_remark ||
        parsed.career_advice ||
        parsed.suggested_career ||
        parsed.roadmap
      ) {
        return parsed
      }
    }
  } catch (e) {
    // Ignore
  }
  return null
}

export default function ChatbotSection({ career, analysis }: ChatbotSectionProps) {

  const router = useRouter()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [jobType, setJobType] = useState("Full Time")
  const [showJobModal, setShowJobModal] = useState(false)
  const [region, setRegion] = useState("")
  const [activeAction, setActiveAction] = useState<string | null>(null)
  const [loadingText, setLoadingText] = useState("Career Echo is thinking...")
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
    setActiveAction(null)
    setLoadingText("Career Echo is thinking...")

    try {

      const res = await fetch(
        "http://localhost:8080/chat",
        {
          method: "POST",

          headers: getJsonHeaders(),

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

  const handleQuickAction = async (action: string) => {

    switch (action) {

      case "jobs":
        setShowJobModal(true)
        return

      case "interview":
        setLoading(true)
        setActiveAction("interview")
        setLoadingText("Preparing your mock interview...")
        router.push(
          `/interview?career=${encodeURIComponent(
            career.title
          )}`
        )

        return

      case "course": {
        setLoading(true)
        setActiveAction("course")
        setLoadingText("Finding recommended courses for you...")

        try {
          const response = await fetch(
            "http://localhost:8080/courses",
            {
              method: "POST",

              headers: getJsonHeaders(),

              body: JSON.stringify({
                career: career.title
              })
            }
          )

          if (!response.ok) throw new Error("Failed to fetch courses")
          const data = await response.json()

          setMessages(prev => [
            ...prev,
            {
              role: "bot",
              courses: data.courses
            }
          ])
        } catch (err) {
          console.error(err)
          setMessages(prev => [
            ...prev,
            {
              role: "bot",
              text: "Failed to find courses. Try again later."
            }
          ])
        } finally {
          setLoading(false)
          setActiveAction(null)
        }

        return
      }

      case "skills": {
        setLoading(true)
        setActiveAction("skills")
        setLoadingText("Analyzing your skill gaps...")

        try {
          const response = await fetch(
            "http://localhost:8080/skill-gap",
            {
              method: "POST",

              headers: getJsonHeaders(),

              body: JSON.stringify({
                career: career.title,
                skills: analysis.skills,
                strengths: analysis.strengths
              })
            }
          )

          if (!response.ok) throw new Error("Failed to fetch skill gap analysis")
          const data = await response.json()

          setMessages(prev => [
            ...prev,
            {
              role: "bot",
              skillGap: data
            }
          ])
        } catch (err) {
          console.error(err)
          setMessages(prev => [
            ...prev,
            {
              role: "bot",
              text: "Failed to analyze skill gap. Try again later."
            }
          ])
        } finally {
          setLoading(false)
          setActiveAction(null)
        }

        return
      }

    }
  }

  const searchJobs = async () => {
    setLoading(true)
    setActiveAction("jobs")
    setLoadingText("Searching for matching jobs...")

    try {
      const response = await fetch(
        "http://localhost:8080/jobs",
        {
          method: "POST",

          headers: getJsonHeaders(),

          body: JSON.stringify({
            career: career.title,
            jobType,
            region
          })
        }
      )

      if (!response.ok) throw new Error("Failed to fetch jobs")
      const data = await response.json()

      console.log("JOB RESPONSE : ", data)

      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          jobs: data.jobs
        }
      ])
    } catch (err) {
      console.error(err)
      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          text: "Failed to fetch jobs. Try again later."
        }
      ])
    } finally {
      setLoading(false)
      setActiveAction(null)
      setShowJobModal(false)
    }
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

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
                id: "skills",
                icon: TrendingUp,
                title:
                  `${career.title} Skill Gap`,
                subtitle:
                  "See what skills you need"
              },

              {
                id: "course",
                icon: BookOpen,
                title:
                  `${career.title} Courses`,
                subtitle:
                  "Courses for your path"
              },

              {
                id: "jobs",
                icon: Briefcase,
                title:
                  `${career.title} Jobs`,
                subtitle:
                  "Jobs matching your future"
              },

              {
                id: "interview",
                icon: Sparkles,
                title:
                  `${career.title} Mock Interview`,
                subtitle:
                  "Practice a realistic interview"
              },

            ].map((item) => (

              <button
                key={item.title}
                onClick={() => handleQuickAction(item.id)}
                disabled={loading}
                className={`
                w-full
                rounded-[20px]
                border
                border-white/[0.05]
                bg-white/[0.03]
                p-5
                text-left
                transition
                ${loading ? "opacity-50 cursor-not-allowed" : "hover:border-violet-500/30"}
              `}
              >

                <div className="flex items-center justify-between gap-4">

                  <div className="flex gap-4">
                    <item.icon
                      size={18}
                      className="text-violet-400 flex-shrink-0"
                    />

                    <div>

                      <p className="text-white font-medium">
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

                  {loading && activeAction === item.id && (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-violet-500 border-t-transparent flex-shrink-0" />
                  )}

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* CHAT MESSAGES */}

        <div className="space-y-4">

          {messages.map((msg, index) => (

            <div key={index} className="w-full">

              {msg.text && (() => {
                const parsed = parseBotResponse(msg.text);
                if (parsed) {
                  return (
                    <div className="space-y-4 w-full">
                      {/* Schema A: Greeting bubble */}
                      {parsed.greeting && (
                        <div className="flex gap-3 items-start justify-start w-full">
                          <div className="h-8 w-8 rounded-full bg-violet-900/50 flex items-center justify-center text-sm flex-shrink-0">
                            <Image
                              src="/logo.png"
                              alt="Future You"
                              width={50}
                              height={50}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="bg-white/5 border border-white/10 text-zinc-200 rounded-2xl rounded-tl-none p-4 max-w-[85%] text-sm leading-relaxed">
                            {parsed.greeting}
                          </div>
                        </div>
                      )}

                      {/* Schema B: Career advice bubble */}
                      {parsed.career_advice && (
                        <div className="flex gap-3 items-start justify-start w-full">
                          <div className="h-8 w-8 rounded-full bg-violet-900/50 flex items-center justify-center text-sm flex-shrink-0">
                            <Image
                              src="/logo.png"
                              alt="Future You"
                              width={50}
                              height={50}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="bg-white/5 border border-white/10 text-zinc-200 rounded-2xl rounded-tl-none p-4 max-w-[85%] text-sm leading-relaxed">
                            {parsed.career_advice}
                          </div>
                        </div>
                      )}

                      {/* Schema A: Career Suggestions container */}
                      {parsed.career_suggestions && parsed.career_suggestions.length > 0 && (
                        <div className="flex gap-3 items-start justify-start w-full">
                          <div className="h-8 w-8 rounded-full bg-violet-900/50 flex items-center justify-center text-sm flex-shrink-0">
                            <Image
                              src="/logo.png"
                              alt="Future You"
                              width={50}
                              height={50}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4 max-w-[85%]">
                            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                              <Sparkles size={16} className="text-violet-400" />
                              <span className="font-bold text-white text-sm">Suggested Career Paths</span>
                            </div>

                            <div className="space-y-5">
                              {parsed.career_suggestions.map((path: any, i: number) => (
                                <div key={i} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 space-y-3">
                                  <h4 className="font-bold text-violet-300 text-sm">{path.title}</h4>
                                  <p className="text-xs text-zinc-300 leading-relaxed">{path.description}</p>

                                  {path.roadmap && path.roadmap.length > 0 && (
                                    <div className="pt-2">
                                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">ROADMAP TO THIS PATH</p>
                                      <div className="relative pl-4 border-l border-violet-500/20 space-y-3">
                                        {path.roadmap.map((step: string, sIdx: number) => (
                                          <div key={sIdx} className="relative text-xs text-zinc-400 leading-relaxed pl-1">
                                            <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-violet-500 border border-black" />
                                            {step}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Schema B: Single Career Suggestion and Roadmap container */}
                      {(parsed.suggested_career || (parsed.roadmap && !parsed.career_suggestions)) && (
                        <div className="flex gap-3 items-start justify-start w-full">
                          <div className="h-8 w-8 rounded-full bg-violet-900/50 flex items-center justify-center text-sm flex-shrink-0">
                            <Image
                              src="/logo.png"
                              alt="Future You"
                              width={50}
                              height={50}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4 max-w-[85%]">
                            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                              <Sparkles size={16} className="text-violet-400" />
                              <span className="font-bold text-white text-sm">
                                {parsed.suggested_career || "Suggested Career Path"}
                              </span>
                            </div>

                            {parsed.roadmap && parsed.roadmap.length > 0 && (
                              <div className="pt-2">
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-3">ROADMAP TO THIS PATH</p>
                                <div className="relative pl-4 border-l border-violet-500/20 space-y-4">
                                  {parsed.roadmap.map((item: any, sIdx: number) => {
                                    const isObject = typeof item === "object" && item !== null;
                                    const stepTitle = isObject ? (item.title || `Step ${item.step || sIdx + 1}`) : `Step ${sIdx + 1}`;
                                    const stepDesc = isObject ? item.description : item;
                                    return (
                                      <div key={sIdx} className="relative text-xs text-zinc-300 leading-relaxed pl-1 space-y-1">
                                        <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-violet-500 border border-black" />
                                        {isObject ? (
                                          <>
                                            <p className="font-bold text-violet-300 text-xs">
                                              {item.step ? `${item.step}. ` : ""}{stepTitle}
                                            </p>
                                            {stepDesc && <p className="text-zinc-400 text-xs">{stepDesc}</p>}
                                          </>
                                        ) : (
                                          <p>{item}</p>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Schema A: Closing remark bubble */}
                      {parsed.closing_remark && (
                        <div className="flex gap-3 items-start justify-start w-full">
                          <div className="h-8 w-8 rounded-full bg-violet-900/50 flex items-center justify-center text-sm flex-shrink-0">
                            <Image
                              src="/logo.png"
                              alt="Future You"
                              width={50}
                              height={50}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="bg-white/5 border border-white/10 text-zinc-200 rounded-2xl rounded-tl-none p-4 max-w-[85%] text-sm leading-relaxed">
                            {parsed.closing_remark}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // Fallback to standard chat bubble
                return (
                  <div className={`flex gap-3 items-start ${msg.role === "user" ? "justify-end" : "justify-start"} w-full`}>
                    {msg.role === "bot" && (
                      <div className="h-8 w-8 rounded-full bg-violet-900/50 flex items-center justify-center text-sm flex-shrink-0">
                        <Image
                          src="/logo.png"
                          alt="Future You"
                          width={50}
                          height={50}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div
                      className={`
                      rounded-2xl
                      p-4
                      max-w-[85%]
                      text-sm
                      leading-relaxed
                      ${msg.role === "user"
                          ? "bg-violet-600 text-white rounded-tr-none border border-violet-500/20"
                          : "bg-white/5 border border-white/10 text-zinc-200 rounded-tl-none"
                        }
                    `}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })()}

              {msg.jobs && msg.jobs.length > 0 && (
                <div className="flex gap-3 items-start justify-start w-full">
                  <div className="h-8 w-8 rounded-full bg-violet-900/50 flex items-center justify-center text-sm flex-shrink-0">
                    <Image
                      src="/logo.png"
                      alt="Future You"
                      width={50}
                      height={50}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4 max-w-[85%]">
                    <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                      <Briefcase size={16} className="text-violet-400" />
                      <span className="font-bold text-white text-sm">Matching Jobs for {career.title}</span>
                    </div>
                    <div className="space-y-3">
                      {msg.jobs.map((job, i) => (
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
                          transition-all
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
                          <p className="text-xs text-violet-400 mt-3 font-semibold">
                            Open Job →
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Render Skill Gap response container (Unified Card) */}
              {msg.skillGap && (
                <div className="flex gap-3 items-start justify-start w-full">
                  <div className="h-8 w-8 rounded-full bg-violet-900/50 flex items-center justify-center text-sm flex-shrink-0">
                    <Image
                      src="/logo.png"
                      alt="Future You"
                      width={50}
                      height={50}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4 max-w-[85%]">
                    <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                      <TrendingUp size={16} className="text-violet-400" />
                      <span className="font-bold text-white text-sm">Skill Gap Analysis</span>
                    </div>
                    <div className="space-y-4">
                      {msg.skillGap.matchedSkills && msg.skillGap.matchedSkills.length > 0 && (
                        <div>
                          <p className="text-green-400 mb-2 text-xs font-semibold uppercase tracking-wider">
                            Matched Skills
                          </p>
                          <div className="space-y-1">
                            {msg.skillGap.matchedSkills.map((skill: string) => (
                              <div key={skill} className="text-zinc-300 text-sm flex items-center gap-1.5">
                                <span className="text-green-500">✓</span> {skill}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {msg.skillGap.missingTechnicalSkills && msg.skillGap.missingTechnicalSkills.length > 0 && (
                        <div>
                          <p className="text-yellow-400 mb-2 text-xs font-semibold uppercase tracking-wider">
                            Missing Technical Skills
                          </p>
                          <div className="space-y-1">
                            {msg.skillGap.missingTechnicalSkills.map((skill: string) => (
                              <div key={skill} className="text-zinc-300 text-sm flex items-center gap-1.5">
                                <span className="text-yellow-500">⚠</span> {skill}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {msg.skillGap.missingSoftSkills && msg.skillGap.missingSoftSkills.length > 0 && (
                        <div>
                          <p className="text-pink-400 mb-2 text-xs font-semibold uppercase tracking-wider">
                            Missing Soft Skills
                          </p>
                          <div className="space-y-1">
                            {msg.skillGap.missingSoftSkills.map((skill: string) => (
                              <div key={skill} className="text-zinc-300 text-sm flex items-center gap-1.5">
                                <span className="text-pink-500">⚠</span> {skill}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {msg.skillGap.topPrioritySkills && msg.skillGap.topPrioritySkills.length > 0 && (
                        <div>
                          <p className="text-violet-400 mb-2 text-xs font-semibold uppercase tracking-wider">
                            Top Priority Skills
                          </p>
                          <div className="space-y-1">
                            {msg.skillGap.topPrioritySkills.map((skill: string) => (
                              <div key={skill} className="text-zinc-300 text-sm flex items-center gap-1.5">
                                <span className="text-violet-400">🔥</span> {skill}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Render Courses response container (Unified Card) */}
              {msg.courses && msg.courses.length > 0 && (
                <div className="flex gap-3 items-start justify-start w-full">
                  <div className="h-8 w-8 rounded-full bg-violet-900/50 flex items-center justify-center text-sm flex-shrink-0">
                    <Image
                      src="/logo.png"
                      alt="Future You"
                      width={50}
                      height={50}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4 max-w-[85%]">
                    <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                      <BookOpen size={16} className="text-violet-400" />
                      <span className="font-bold text-white text-sm">Recommended Courses</span>
                    </div>
                    <div className="space-y-3">
                      {msg.courses.map((course, i) => (
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
                          transition-all
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
                          <p className="text-xs text-violet-400 mt-3 font-semibold">
                            Open Course →
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>

          ))}

          {/* Dynamic Bot Loader Bubble */}
          {loading && (
            <div className="flex gap-3 items-start justify-start w-full">
              <Image
                src="/logo.png"
                alt="Future You"
                width={50}
                height={50}
                className="w-full h-full object-cover"
              />
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center gap-3 max-w-[85%]">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-violet-500 border-t-transparent flex-shrink-0" />
                <span className="text-sm text-zinc-400">{loadingText}</span>
              </div>
            </div>
          )}

          {/* Scroll Target */}
          <div ref={messagesEndRef} />

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