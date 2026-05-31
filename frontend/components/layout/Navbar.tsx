"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Moon, ChevronDown } from "lucide-react"
import {useState, useEffect} from "react"

export default function Navbar() {

  const router = useRouter()

  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      setUser( JSON.parse(storedUser))
    }
  }, [])

  const isLoggedIn = !!user

  return (
    <header
      className="
      sticky
      top-0
      z-50

      border-b
      border-white/5

      bg-[rgba(6,8,22,.72)]
      backdrop-blur-2xl
      "
    >
      <div
        className="
        max-w-[1600px]
        mx-auto

        px-10
        py-5

        flex
        items-center
        justify-between
        "
      >
        {/* LEFT */}

        <Link
          href="/"
          className="
          flex
          items-center
          gap-4
          "
        >
          <div
            className="
            w-12
            h-12

            rounded-2xl

            bg-gradient-to-br
            from-[#E7D4FF]
            via-[#B889FF]
            to-[#7D4BFF]

            flex
            items-center
            justify-center

            shadow-[0_0_40px_rgba(133,83,255,.45)]
            "
          >
            👻
          </div>

          <div>
            <h1
              className="
              text-[30px]
              font-bold
              tracking-[-1px]
              "
            >
              <span className="text-white">
                Career
              </span>

              <span
                className="
                bg-gradient-to-r
                from-[#D0B0FF]
                to-[#8A56FF]

                bg-clip-text
                text-transparent
                "
              >
                {" "}
                Echo
              </span>
            </h1>

            <p
              className="
              text-sm
              text-zinc-500
              "
            >
              Meet your future self
            </p>
          </div>
        </Link>

        {/* RIGHT */}

        <div
          className="
          flex
          items-center
          gap-5
          "
        >
          {/* Theme */}

          <button
            className="
            w-12
            h-12

            rounded-full

            border
            border-white/10

            bg-white/[0.03]

            flex
            items-center
            justify-center

            hover:border-violet-500/40

            transition
            "
          >
            <Moon
              size={18}
              className="text-zinc-300"
            />
          </button>

          {/* Guest User */}

          {!isLoggedIn && (
            <button
              onClick={() => router.push("/auth")}
              className="
              px-5
              py-2.5

              rounded-full

              bg-gradient-to-r
              from-violet-600
              to-purple-500

              text-white
              font-medium

              hover:scale-105
              hover:shadow-[0_0_25px_rgba(139,92,246,.5)]

              transition
              "
            >
              Login / Sign Up
            </button>
          )}

          {/* Logged In User */}

          {isLoggedIn && (
            <button
              onClick={() => router.push("/profile")}
              className="
              flex
              items-center
              gap-3

              px-2
              py-1

              rounded-full

              hover:bg-white/[0.04]

              transition
              "
            >
              <div
                className="
                w-11
                h-11

                rounded-full

                bg-gradient-to-br
                from-amber-300
                to-orange-500

                shadow-lg

                cursor-pointer
                "
              />

              <ChevronDown
                size={18}
                className="text-zinc-400"
              />
            </button>
          )}

        </div>
      </div>
    </header>
  )
}