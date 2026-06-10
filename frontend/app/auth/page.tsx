"use client"

import { useState } from "react"


export default function AuthPage() {

  const [mode, setMode] = useState<"login" | "register">("login")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

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
        throw new Error(data.message || "Registration failed")
      }

      setSuccess("Registration successful! Please login with your new account.")
      setMode("login")
      setPassword("")
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

      console.log(data)

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      localStorage.setItem("user", JSON.stringify(data))
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

              ${mode === "login"
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

              ${mode === "register"
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
            onClick={mode === "login" ? login : register}
            disabled={loading}
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
            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:hover:scale-100
            flex
            items-center
            justify-center
            gap-2
            "
          >
            {loading && (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            {loading 
              ? (mode === "login" ? "Logging in..." : "Creating Account...") 
              : (mode === "login" ? "Login" : "Create Account")}
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

      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all duration-300">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl transition-all duration-300 animate-in zoom-in-95 duration-200">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-500 mb-4">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">Authentication Error</h3>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              {error}
            </p>

            <button
              onClick={() => setError("")}
              className="w-full py-3 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-950/20"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all duration-300">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl transition-all duration-300 animate-in zoom-in-95 duration-200">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-500 mb-4">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">Success!</h3>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              {success}
            </p>

            <button
              onClick={() => setSuccess("")}
              className="w-full py-3 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-950/20"
            >
              Proceed to Login
            </button>
          </div>
        </div>
      )}
    </main>
  )
}