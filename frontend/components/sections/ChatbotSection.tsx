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

type CareerCard = {
  title: string
  age: number
  location: string
  industry: string
  workStyle: string
}

type ChatbotSectionProps = {
  careers: CareerCard[]
  selectedCareer: number
  setSelectedCareer:
  React.Dispatch<React.SetStateAction<number>>
}

export default function ChatbotSection() {

  type ChatMessage = {
    role: "user" | "bot"
    text: string
  }

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)


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
                icon: TrendingUp,
                title:
                `Skill Gap`,
                subtitle:
                "See what skills you need"
              },

              {
                icon: BookOpen,
                title:
                `Courses`,
                subtitle:
                "Courses for your path"
              },

              {
                icon: Briefcase,
                title:
                `Jobs Opened`,
                subtitle:
                "Jobs matching your future"
              },

              {
                icon: Sparkles,
                title:
                `Career Roadmap`,
                subtitle:
                "See your next steps"
              }

            ].map((item) => (

              <button
                key={item.title}

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

            <div
              key={index}

              className={`
                rounded-2xl
                p-4

                ${
                  msg.role === "user"
                  ?
                  "ml-auto bg-violet-600 text-white"
                  :
                  "mr-auto bg-white/[0.05] text-zinc-200"
                }

                max-w-[85%]
              `}
            >
              {msg.text}
            </div>

          ))}

          {loading && (

            <div
              className="
              bg-white/[0.05]
              rounded-2xl
              p-4
              animate-pulse
            "
            >
              👻 Career Echo is thinking...
            </div>

          )}

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

    </div>

  )

}