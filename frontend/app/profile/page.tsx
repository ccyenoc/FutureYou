"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import Navbar from "@/components/layout/Navbar"
import AlertModal from "@/components/ui/AlertModal"
import { getJsonHeaders } from "@/lib/auth"


export default function ProfilePage() {

  const router = useRouter()

  useEffect(() => {

    const storedUser =
      JSON.parse(localStorage.getItem("user") || "null")

    console.log("USER:", storedUser)

    if (!storedUser) return

    setUsername(storedUser.username || "")
    setEmail(storedUser.email || "")
    setProfileImage(storedUser.profilePictureUrl)

    loadInterviews(storedUser.userId)

  }, [])

  const [username, setUsername] = useState("User")
  const [email, setEmail] = useState("Email")
  const [password, setPassword] = useState("")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [modal, setModal] = useState<{ title: string; message: string; variant: "info" | "success" | "error" } | null>(null)

  const [interviews, setInterviews] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const loadInterviews = async (userId: number) => {

    try {

      const response = await fetch(
        `http://localhost:8080/interview/user/${userId}`,
        {
          headers: getJsonHeaders()
        }
      )

      const data = await response.json()
      const sortedData = [...data].sort((a: any, b: any) => b.id - a.id)
      setInterviews(sortedData)

      console.log("INTERVIEWS : ", data)

    } catch (err) {
      console.error(err)
    }
  }


  const averageScore =
    interviews.length > 0
      ? interviews.reduce(
        (sum, interview) => sum + interview.overallScore,
        0
      ) / interviews.length
      : 0;

  const highestScore =
    interviews.length > 0
      ? Math.max(
        ...interviews.map(
          interview => interview.overallScore
        )
      )
      : 0;

  const totalInterviews =
    interviews.length;

  const handleSave = async () => {
    if (loading) return

    try {
      setLoading(true)
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}")

      const response =
        await fetch(
          `http://localhost:8080/users/${storedUser.userId}`,
          {
            method: "PUT",
            headers: getJsonHeaders(),

            body: JSON.stringify({
              username,
              email,
              password,
              profilePictureUrl: profileImage,
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
          username: updatedUser.username,
          email: updatedUser.email,
          profilePictureUrl: updatedUser.profilePictureUrl
        })
      )

      setModal({
        title: "Success",
        message: "Profile updated successfully!",
        variant: "success"
      })

    }
    catch (error) {

      console.error(error)

      setModal({
        title: "Error",
        message: "Update failed. Please try again.",
        variant: "error"
      })

    } finally {
      setLoading(false)
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

                    const file = e.target.files?.[0]

                    if (!file) return

                    const reader = new FileReader()

                    reader.onloadend = () => {
                      setProfileImage(reader.result as string)
                    }

                    reader.readAsDataURL(file)

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
                  disabled={loading}
                  className="
                  bg-violet-600
                  hover:bg-violet-700
                  px-6
                  py-3
                  rounded-xl
                  font-semibold
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  flex
                  items-center
                  justify-center
                  gap-2
                "
                >
                  {loading && (
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                  {loading ? "Saving..." : "Save Changes"}
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
                Average Score
              </h3>

              <p className="text-xl font-bold mt-2">
                {Math.round(averageScore)}
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
                Highest Score
              </h3>

              <p className="text-xl font-bold mt-2">
                {highestScore}
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
                {totalInterviews}
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

              {interviews.map(
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

                      <p className="text-zinc-400 text-sm mt-1">
                        {interview.createdAt
                          ? new Date(interview.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })
                          : "No date"}
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
                        {interview.overallScore}
                      </p>

                      <button
                        onClick={() => router.push(`/report/${interview.id}`)}
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
      <AlertModal
        isOpen={!!modal}
        title={modal?.title || ""}
        message={modal?.message || ""}
        variant={modal?.variant || "info"}
        onClose={() => setModal(null)}
      />
    </>

  )
}