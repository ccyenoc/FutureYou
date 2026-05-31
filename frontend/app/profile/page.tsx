"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import Navbar from "@/components/layout/Navbar"


export default function ProfilePage() {

  const router = useRouter()

  useEffect(() => {

    const storedUser =
        localStorage.getItem("user")

    if (storedUser) {
        const user = JSON.parse(storedUser)

        setUsername( user.username )
        setEmail( user.email )
    }

    }, [])

  const [username, setUsername] = useState("User")
  const [email, setEmail] = useState("Email")
  const [password, setPassword] = useState("")
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const interviewHistory = [
    {
      id: 1,
      career: "Full Stack Developer",
      score: 84,
      date: "31 May 2026"
    },
    {
      id: 2,
      career: "Full Stack Developer",
      score: 79,
      date: "25 May 2026"
    },
    {
      id: 3,
      career: "Mobile Developer",
      score: 75,
      date: "20 May 2026"
    }
  ]

  const handleSave = async () => {

        try {

            const storedUser =
            JSON.parse(
                localStorage.getItem("user") || "{}"
            )

            const response =
            await fetch(
                `http://localhost:8080/users/${storedUser.userId}`,
                {
                method: "PUT",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    username,
                    email,
                    password
                })
                }
            )

            if (!response.ok) {

            throw new Error(
                "Failed to update profile"
            )

            }

            const updatedUser =
            await response.json()

            localStorage.setItem(
            "user",
            JSON.stringify({
                ...storedUser,
                username:
                updatedUser.username,
                email:
                updatedUser.email
            })
            )

            alert(
            "Profile updated successfully!"
            )

        }
        catch (error) {

            console.error(error)

            alert(
            "Update failed"
            )

        }

        }

  return (

    <>
      <Navbar />

    <div
      className="
        min-h-screen
        bg-black
        text-white
        p-8
      "
    >

      <div
        className="
          max-w-6xl
          mx-auto
        "
      >

        <button
        onClick={() => router.back()}
        className="
            flex
            items-center
            gap-2
            text-zinc-400
            hover:text-white
            mb-6
        "
        >
        ← Back
        </button>

        <h1
          className="
            text-4xl
            font-bold
            mb-8
          "
        >
          My Profile
        </h1>

        {/* Profile Card */}

        <div
          className="
            bg-zinc-900
            rounded-3xl
            p-8
            mb-8
          "
        >

          <div
            className="
              flex
              flex-col
              md:flex-row
              gap-8
            "
          >

            <div>

              <img
                src={
                    profileImage ||
                    "https://placehold.co/150"
                }
                alt="Profile"
                className="
                    w-36
                    h-36
                    rounded-full
                    object-cover
                    border
                    border-white/20
                "
                />

              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {

                    const file =
                    e.target.files?.[0]

                    if (!file) return

                    const imageUrl =
                    URL.createObjectURL(file)

                    setProfileImage(imageUrl)

                }}
              />

              <label
                htmlFor="profile-upload"
                className="
                    mt-4
                    inline-block
                    px-5
                    py-2
                    rounded-xl
                    bg-violet-600
                    hover:bg-violet-700
                    text-white
                    text-sm
                    font-medium
                    cursor-pointer
                    transition
                "
                >
                Upload Photo
                </label>
            </div>

            <div
              className="
                flex-1
                space-y-4
              "
            >

              <div>

                <label className="block mb-2">
                  Username
                </label>

                <input
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    p-3
                    rounded-xl
                    bg-zinc-800
                  "
                />

              </div>

              <div>

                <label className="block mb-2">
                  Email
                </label>

                <input
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    p-3
                    rounded-xl
                    bg-zinc-800
                  "
                />

              </div>

              <div>

                <label className="block mb-2">
                  New Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    p-3
                    rounded-xl
                    bg-zinc-800
                  "
                />

              </div>

              <button
                onClick={handleSave}
                className="
                  bg-violet-600
                  hover:bg-violet-700
                  px-6
                  py-3
                  rounded-xl
                  font-semibold
                "
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

        {/* Career Overview */}

        <div
          className="
            grid
            md:grid-cols-3
            gap-4
            mb-8
          "
        >

          <div
            className="
              bg-zinc-900
              rounded-2xl
              p-6
            "
          >
            <h3 className="text-zinc-400">
              Current Career
            </h3>

            <p className="text-xl font-bold mt-2">
              Full Stack Developer
            </p>
          </div>

          <div
            className="
              bg-zinc-900
              rounded-2xl
              p-6
            "
          >
            <h3 className="text-zinc-400">
              Average Score
            </h3>

            <p className="text-xl font-bold mt-2">
              79
            </p>
          </div>

          <div
            className="
              bg-zinc-900
              rounded-2xl
              p-6
            "
          >
            <h3 className="text-zinc-400">
              Total Interviews
            </h3>

            <p className="text-xl font-bold mt-2">
              3
            </p>
          </div>

        </div>

        {/* Interview History */}

        <div
          className="
            bg-zinc-900
            rounded-3xl
            p-8
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              mb-6
            "
          >
            Interview History
          </h2>

          <div className="space-y-4">

            {interviewHistory.map(
              (interview) => (

                <div
                  key={interview.id}
                  className="
                    bg-zinc-800
                    rounded-xl
                    p-5
                    flex
                    justify-between
                    items-center
                  "
                >

                  <div>

                    <h3 className="font-semibold">
                      {interview.career}
                    </h3>

                    <p className="text-zinc-400">
                      {interview.date}
                    </p>

                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >

                    <p
                      className="
                        font-bold
                        text-green-400
                      "
                    >
                      {interview.score}
                    </p>

                    <button
                      className="
                        bg-violet-600
                        px-4
                        py-2
                        rounded-lg
                      "
                    >
                      View Report
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </div>
    </>

  )
}