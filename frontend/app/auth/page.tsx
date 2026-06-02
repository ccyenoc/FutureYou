"use client"

import { useState } from "react"

export default function AuthPage() {

  const [mode, setMode] = useState<"login" | "register">( "login")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const register = async () => {
    try {

        setLoading(true)
        setError("")

        const response = await fetch(
            "http://localhost:8080/auth/register",
            {
                method: "POST",

                headers: {
                "Content-Type": "application/json"
                },

                body: JSON.stringify({
                username,
                email,
                password
                })
            }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error( data.message || "Registration failed")
            }

            localStorage.setItem( "user", JSON.stringify(data))
            window.location.href = "/"
        }
        catch (err: any) {
            setError(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    const login = async () => {
        try {
            setLoading(true)
            setError("")

            const response = await fetch(
            "http://localhost:8080/auth/login",
            {
                method: "POST",

                headers: {
                "Content-Type": "application/json"
                },

                body: JSON.stringify({
                email,
                password
                })
            }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error( data.message || "Login failed" )
            }

            localStorage.setItem( "user", JSON.stringify(data) )
            window.location.href = "/"

        }
        catch (err: any) {
            setError(err.message)
        }
        finally {
            setLoading(false)
        }
    }

  return (
    <main
      className="
      min-h-screen

      bg-[#070B17]

      flex
      items-center
      justify-center

      px-6
      "
    >
      <div
        className="
        w-full
        max-w-[500px]

        rounded-[32px]

        border
        border-white/10

        bg-white/[0.03]

        backdrop-blur-xl

        p-8
        "
      >
        {/* LOGO */}

        <div className="text-center">

          <div
            className="
            w-20
            h-20

            mx-auto
            mb-5

            rounded-3xl


            flex
            items-center
            justify-center

            text-3xl
            "
          >
             <img
               src="/logo.png"
               alt="Future You"
               width={80}
               height={80}
               className="w-full h-full object-cover"
            />
          </div>

          <h1
            className="
            text-4xl
            font-bold
            text-white
            "
          >
            Future You
          </h1>

          <p
            className="
            text-zinc-400
            mt-2
            "
          >
            Meet your future self
          </p>

        </div>

        {/* TOGGLE */}

        <div
          className="
          mt-8

          bg-white/[0.04]

          rounded-full

          p-1

          flex
          "
        >
          <button
            onClick={() =>
              setMode("login")
            }
            className={`
              flex-1
              py-3

              rounded-full

              transition

              ${
                mode === "login"
                  ? "bg-violet-600 text-white"
                  : "text-zinc-400"
              }
            `}
          >
            Login
          </button>

          <button
            onClick={() =>
              setMode("register")
            }
            className={`
              flex-1
              py-3

              rounded-full

              transition

              ${
                mode === "register"
                  ? "bg-violet-600 text-white"
                  : "text-zinc-400"
              }
            `}
          >
            Register
          </button>
        </div>

        {/* FORM */}

        <div className="mt-8">

          {mode === "register" && (
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="
              w-full
              mb-4
              px-5
              py-4
              rounded-2xl
              bg-white/[0.04]
              border
              border-white/10
              text-white
              "
            />
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="
            w-full
            mb-4
            px-5
            py-4
            rounded-2xl
            bg-white/[0.04]
            border
            border-white/10
            text-white
            "
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="
            w-full
            px-5
            py-4
            rounded-2xl
            bg-white/[0.04]
            border
            border-white/10
            text-white
            "
          />

          <button
            onClick={ mode === "login" ? login : register }
            className="
            w-full
            mt-6
            py-4
            rounded-2xl
            bg-gradient-to-r
            from-violet-600
            to-purple-500
            text-white
            font-semibold
            hover:scale-[1.02]
            transition
            "
          >
            {mode === "login"
              ? "Login"
              : "Create Account"}
          </button>

        </div>

        {/* BENEFITS */}

        <div
          className="
          mt-8
          p-5
          rounded-2xl
          bg-violet-500/10
          border
          border-violet-500/20
          "
        >
          <p
            className="
            text-sm
            text-zinc-300
            "
          >
            ✨ Sign in to save:
          </p>

          <ul
            className="
            mt-3
            text-sm
            text-zinc-400
            space-y-2
            "
          >
            <li>• Interview History</li>
            <li>• Downloadable Reports</li>
            <li>• Suggested Answers</li>
            <li>• Progress Tracking</li>
          </ul>
        </div>

      </div>
    </main>
  )
}