"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Moon, ChevronDown } from "lucide-react"
import {useState, useEffect} from "react"
import Image from "next/image";

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
            overflow-hidden
            "
          >
            <img
               src="/logo.png"
               alt="Future You"
               width={50}
               height={50}
               className="w-full h-full object-cover"
            />
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
                Future
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
                You
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
                overflow-hidden
                shadow-lg
                cursor-pointer
                "
              >
                {user?.profilePictureUrl ? (
                  <img
                    src={user.profilePictureUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="
                    w-full
                    h-full
                    rounded-full
                    bg-gradient-to-br
                    from-amber-300
                    to-orange-500
                    flex
                    items-center
                    justify-center
                    text-black
                    font-bold
                    "
                  >
                    {user?.username?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
              </div>

             <button
              onClick={(e) => { e.stopPropagation()
                localStorage.removeItem("user")
                router.push("/auth")
              }}
              className="
              text-sm
              text-red-400
              hover:text-red-300
              transition
              "
            >
              Logout
            </button>
            </button>
          )}

        </div>
      </div>
    </header>
  )
}