"use client"

import { Upload } from "lucide-react"
import { useState } from "react"

import { getMultipartHeaders } from "@/lib/auth"

type ResumeSectionProps = {
  setProfile: (profile: any) => void
}

export default function ResumeSection({ setProfile }: ResumeSectionProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const browseFile = () => {
    document.getElementById("resume-upload")?.click()
  }

  const [fileName, setFileName] = useState("")
  const [loading, setLoading] = useState(false)

  const handleFileChanged = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    console.log(file);

    if (!file) return

    setFileName(file.name)

    const formData = new FormData()
    formData.append("file", file)

    if (!file) return

    const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null

    let response

    try {
      setLoading(true)

      response = await fetch(
        "http://localhost:8080/resume/upload-save",
        {
          method: "POST",
          headers: getMultipartHeaders(),
          body: formData
        }
      )
      const data = await response.json()

      localStorage.setItem("resumeText", data.resumeText)
      localStorage.setItem("careerAnalysis", JSON.stringify(data))

      setProfile(data)
    }
    catch (err) {
      console.log(err)
      alert(
        "AI analysis is temporarily unavailable. Please try again in a few minutes."
      )
    }
    finally {
      setLoading(false)
    }
  }



  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/[0.02] p-6">
      <div className="flex items-center justify-between gap-6">
        {/* Left - Resume Title */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/20">
            <svg className="h-7 w-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Resume</h2>
            <p className="text-sm text-zinc-400">Upload your resume</p>
          </div>
        </div>

        {/* Center - Drag & Drop */}
        <div
          className={`flex-1 flex items-center justify-center gap-3 rounded-lg border-2 border-dashed py-4 px-6 transition-all ${isDragOver
            ? "border-purple-400 bg-purple-500/10"
            : "border-white/20 hover:border-white/40"
            }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={() => setIsDragOver(false)}
        >
          <Upload className="h-5 w-5 text-white/60" />
          <div className="text-center">
            <p className="font-medium text-white">
              {loading ? "Analyzing resume..." : "Drag & drop your resume"}
            </p>
            <p className="text-xs text-zinc-400">
              {
                loading ? "AI is parsing your profile..." : (fileName ? fileName : "PDF, DOCX (Max 5MB)")
              }
            </p>
          </div>
          <span className="text-white/40">or</span>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChanged}
            disabled={loading}
          />

          <button
            className="rounded-lg border border-purple-500/60 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300 hover:bg-purple-500/20 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={browseFile}
            disabled={loading}
          >
            {loading && (
              <svg className="animate-spin h-4 w-4 text-purple-300" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            {loading ? "Analyzing..." : "Browse Files"}
          </button>
        </div>
      </div>
    </div>
  )
}