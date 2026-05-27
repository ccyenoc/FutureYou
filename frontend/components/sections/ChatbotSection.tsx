"use client"

import {
  Send,
  Sparkles,
  BookOpen,
  Briefcase,
  TrendingUp,
} from "lucide-react"

import {useState, useEffect} from "react";
 
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

if(loading) return

const current =
    message

    setMessages(prev => [
    ...prev,
    {
    role:"user",
    text:current
    }
    ])

    setMessage("")
    setLoading(true)

    try{
    const res = await fetch( "http://localhost:8080/chat",
      {
      method:"POST",

      headers:{
      "Content-Type":
      "application/json"
      },

      body:JSON.stringify({
      message:current
      })
      }
    )

    if(!res.ok){
    throw new Error(
    "Backend failed"
    )
    }

    const data = await res.json()

    setMessages(prev=>[
    ...prev,
    {
    role:"bot",
    text:data.reply
    }
    ])
    }
    catch{

    setMessages(prev=>[
    ...prev,
    {
    role:"bot",
    text:"Career Echo is busy 👻"
    }
    ])

    }
    finally{
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
        px-8
        py-6
        space-y-6
      "
      >
        {/* Avatar */}

        <div className="flex flex-col items-center">
          <div className="relative">
            <div
              className="
              absolute
              inset-0
              bg-yellow-400/30
              blur-3xl
              rounded-full
            "
            />

            <div
              className="
              relative
              w-[110px]
              h-[110px]
              rounded-full
              bg-gradient-to-b
              from-[#FFD86E]
              to-[#FFAA00]
              border-[8px]
              border-[#FF8800]
              flex
              items-center
              justify-center

              text-[52px]
            "
            >
              🧑
            </div>

            <div
              className="
              absolute
              bottom-2
              right-0
              w-10
              h-10
              rounded-full
              bg-emerald-400
              border-4
              border-[#0B0B16]
              flex
              items-center
              justify-center
            "
            >
              ✨
            </div>

          </div>

          {/* Identity */}

          <div className="text-center mt-5">
            <h3
              className="
              text-[30px]
              font-semibold
              text-violet-400
            "
            >
              AI Product Manager
            </h3>

            <div
              className="
              mt-4
              space-y-2
              text-zinc-400
            "
            >
              <p>👤 Age: 27</p>
              <p>📍 Bangalore, India</p>
              <p>🏢 Technology Industry</p>
              <p>💼 Hybrid Work Style</p>
            </div>

          </div>
        </div>

        {/* Quick Actions */}

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
                title: "Skill Gap Analysis",
                subtitle: "See what skills you need"
              },
              {
                icon: BookOpen,
                title: "Recommended Courses",
                subtitle: "Courses for your path"
              },
              {
                icon: Briefcase,
                title: "Career Opportunities",
                subtitle: "Jobs matching your profile"
              },
              {
                icon: Sparkles,
                title: "Show My Roadmap",
                subtitle: "See your next steps"
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
                    <p className="text-zinc-500 text-sm">
                      {item.subtitle}
                    </p>
                  </div>

                </div>

              </button>
            ))}

          </div>

          <div className="space-y-4">

          {messages.map((msg,index)=>(


            <div
            key={index}
            className={`
            rounded-2xl
            p-4

            ${ msg.role==="user"? "ml-auto bg-violet-600 text-white" : "mr-auto bg-white/[0.05] text-zinc-200"}

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
          onChange={(e)=>
          setMessage(
          e.target.value
          )}
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