"use client"

import { Upload } from "lucide-react"
import { useState } from "react"

type ResumeSectionProps = {
  setProfile: (profile: any) => void
}

export default function ResumeSection({setProfile} : ResumeSectionProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const browseFile= () => {
      document.getElementById("resume-upload")?.click()
  }

  const [fileName, setFileName] = useState("")
  const [loading, setLoading] = useState(false)

  const handleFileChanged = async ( e : React.ChangeEvent<HTMLInputElement> ) => {
    const file = e.target.files?.[0]
    console.log(file);

    if (!file) return

    setFileName(file.name)

    const formData = new FormData()

    formData.append("file", file)

    if(!file) return

    try{
      setLoading(true)

      const response = await fetch("http://localhost:8080/resume/upload",
        {
          method:"POST",
          body : formData,
        }
      )

      console.log("File Uploaded!");
      const data = await response.json()

      localStorage.setItem(
        "resumeText",
        data.resumeText
      )

      console.log("Data : ",data)
      console.log("Resume Text : ",data.resumeText)

      setProfile(data)

    }
    catch(err){
      console.log(err)
    }
    finally{
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
            <p className="text-sm text-zinc-400">Upload your resume or start<br />with a few questions.</p>
          </div>
        </div>

        {/* Center - Drag & Drop */}
        <div 
          className={`flex-1 flex items-center justify-center gap-3 rounded-lg border-2 border-dashed py-4 px-6 transition-all ${
            isDragOver 
              ? "border-purple-400 bg-purple-500/10" 
              : "border-white/20 hover:border-white/40"
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={() => setIsDragOver(false)}
        >
          <Upload className="h-5 w-5 text-white/60" />
          <div className="text-center">
            <p className="font-medium text-white">Drag & drop your resume</p>
            <p className="text-xs text-zinc-400">
                {
                    fileName? fileName : "PDF, DOCX (Max 5MB)"
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
          />

          <button className="rounded-lg border border-purple-500/60 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300 hover:bg-purple-500/20 transition-colors"
                onClick={browseFile}>

            Browse Files
          </button>
        </div>

        {/* Right - Alternative */}
        <div className="text-right">
          <p className="text-sm text-zinc-400 mb-2">Don't have a resume?</p>
          <button className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors ml-auto whitespace-nowrap">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Answer Questions
          </button>
        </div>
      </div>
    </div>
  )
}