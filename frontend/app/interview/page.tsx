"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useRef, useState, Suspense } from "react"
import Navbar from "@/components/layout/Navbar"
import { getJsonHeaders } from "@/lib/auth"
import { jsPDF } from "jspdf"

function InterviewPage() {

  const router = useRouter()
  const params = useSearchParams()

  const career = params.get("career")

  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const [started, setStarted] = useState(false)

  const [questions, setQuestions] = useState<string[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const recognitionRef = useRef<any>(null)
  const questionsRef = useRef<string[]>([])
  const currentQuestionRef = useRef(0)
  const [analysis, setAnalysis] = useState<any>(null)
  const answersRef = useRef<string[]>([])
  const [latestAnswer, setLatestAnswer] = useState("")
  const followUpCountRef = useRef(0)
  const interviewEndedRef = useRef(false)

  // Loading and UX States
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false)
  const [isProcessingAnswer, setIsProcessingAnswer] = useState(false)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [micError, setMicError] = useState<string | null>(null)
  const [showStopModal, setShowStopModal] = useState(false)

  const stopCamera = () => {

    if (streamRef.current) {

      streamRef.current
        .getTracks()
        .forEach(track => track.stop())

      streamRef.current = null
    }
  }

  const handleBack = () => {

    stopCamera()

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (e) {
        console.error(e)
      }
      recognitionRef.current = null
    }

    try {
      speechSynthesis.cancel()
    } catch (e) {
      console.error(e)
    }

    setStarted(false)

    setTimeout(() => {
      router.back()
    }, 300)
  }

  const confirmStopAndExit = () => {
    setShowStopModal(true)
  }

  const evaluateInterview = async () => {
    setIsEvaluating(true)

    stopCamera()
    try {
      speechSynthesis.cancel()
    } catch (e) {
      console.error(e)
    }

    try {
      const user = JSON.parse(localStorage.getItem("user") || "null")
      const answeredQuestions = questionsRef.current.slice(0, answersRef.current.length)

      const response = await fetch(
        "http://localhost:8080/interview/evaluate",
        {
          method: "POST",
          headers: getJsonHeaders(),
          body: JSON.stringify({
            userId: user?.userId,
            career,
            questions: answeredQuestions,
            answers: answersRef.current,
            resumeText: localStorage.getItem("resumeText")
          })
        }
      )

      const data = await response.json()
      localStorage.setItem("latestInterviewAnalysis", JSON.stringify(data))
      setAnalysis(data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsEvaluating(false)
    }
  }

  const startInterview = async () => {
    setAnalysis(null)
    localStorage.removeItem("latestInterviewAnalysis")
    setCurrentQuestion(0)
    currentQuestionRef.current = 0
    setAnswers([])
    answersRef.current = []
    setQuestions([])
    questionsRef.current = []
    setLatestAnswer("")
    followUpCountRef.current = 0
    interviewEndedRef.current = false

    setStarted(true)
    setIsGeneratingQuestions(true)

    try {
      const response = await fetch(
        "http://localhost:8080/interview/ask",
        {
          method: "POST",
          headers: getJsonHeaders(),
          body: JSON.stringify({
            career: career,
            resumeText: localStorage.getItem("resumeText")
          })
        }
      )

      const data = await response.json()
      setQuestions(data.questions)
      questionsRef.current = data.questions
      speak(data.questions[0])
    } catch (err) {
      console.error(err)
    } finally {
      setIsGeneratingQuestions(false)
    }
  }

  const speak = (text: string) => {
    setLatestAnswer("")
    const utterance = new SpeechSynthesisUtterance(text)

    utterance.onend = () => {
      setTimeout(() => {
        startListening()
      }, 500)
    }

    speechSynthesis.speak(utterance)
  }

  const moveToNextQuestion = async () => {

    followUpCountRef.current = 0

    const next = currentQuestionRef.current + 1

    if (next < questionsRef.current.length) {

      setCurrentQuestion(next)

      currentQuestionRef.current = next

      speak(questionsRef.current[next])

    }
    else {
      interviewEndedRef.current = true

      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }

      alert("Interview Completed")
      await evaluateInterview()
    }
  }

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (e) {
        console.error(e)
      }
      recognitionRef.current = null
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setMicError("Browser does not support Speech Recognition.")
      return
    }

    const recognition = new SpeechRecognition()

    recognition.onstart = () => {
      console.log("🎤 Listening...")
      setIsListening(true)
      setMicError(null)
    }

    recognition.onend = () => {
      console.log("🔇 Recognition ended")
      setIsListening(false)
    }

    recognition.onerror = (e: any) => {
      console.log("❌ Recognition error", e)
      setIsListening(false)
      if (e.error !== "no-speech") {
        setMicError(e.error)
      }
    }

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"

    recognition.onresult = (event: any) => {
      if (interviewEndedRef.current) {
        return
      }

      const speechResult = event.results[event.results.length - 1]
      if (!speechResult.isFinal) {
        return
      }

      const transcript = speechResult[0].transcript
      setLatestAnswer(prev => {
        const trimmed = prev.trim()
        return trimmed ? trimmed + " " + transcript : transcript
      })
    }

    try {
      recognition.start()
      recognitionRef.current = recognition
    } catch (e) {
      console.error(e)
      setIsListening(false)
    }
  }

  const submitAnswer = async () => {
    if (isProcessingAnswer || isEvaluating) return // prevent duplicates sending
    if (!latestAnswer.trim()) {
      alert("Please speak or type your answer before submitting.")
      return
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop() // turn off the mic
      } catch (e) {
        console.error(e)
      }
    }

    setIsProcessingAnswer(true)
    const transcript = latestAnswer.trim()
    setLatestAnswer("")

    try {
      const updatedAnswers = [
        ...answersRef.current,
        transcript
      ]

      answersRef.current = updatedAnswers
      setAnswers(updatedAnswers)

      const interviewResult = await processAnswer(
        questionsRef.current[currentQuestionRef.current],
        transcript
      )

      if (interviewResult.action === "FOLLOW_UP") {
        if (followUpCountRef.current >= 2) {
          await moveToNextQuestion()
          return
        }

        followUpCountRef.current++

        const updatedQuestions = [...questionsRef.current]
        updatedQuestions[currentQuestionRef.current] = interviewResult.nextQuestion
        questionsRef.current = updatedQuestions
        setQuestions(updatedQuestions)

        speak(interviewResult.nextQuestion)
        return
      }

      await moveToNextQuestion()
    } catch (err) {
      console.error(err)
    } finally {
      setIsProcessingAnswer(false)
    }
  }



  const processAnswer = async (
    question: string,
    answer: string
  ) => {

    const response =
      await fetch(
        "http://localhost:8080/interview/respond",
        {
          method: "POST",

          headers: getJsonHeaders(),

          body: JSON.stringify({
            career,
            currentQuestion: question,
            answer,
            resumeText:
              localStorage.getItem(
                "resumeText"
              )
          })
        }
      )

    const data = await response.json()

    return data
  }

  useEffect(() => {

    if (!started) return

    const startCamera = async () => {

      try {

        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          })

        streamRef.current = stream

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }

      } catch (err) {
        console.error(err)
      }
    }

    startCamera()

    return () => {
      stopCamera()
    }

  }, [started])

  const downloadReport = () => {
    if (!analysis) return

    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 20
    const maxLineWidth = pageWidth - (margin * 2)
    let y = 30

    const checkPageBreak = (neededHeight: number) => {
      if (y + neededHeight > pageHeight - margin) {
        doc.addPage()
        y = margin + 10
      }
    }

    const addHeading = (text: string) => {
      checkPageBreak(15)
      doc.setFont("helvetica", "bold")
      doc.setFontSize(14)
      doc.setTextColor(109, 40, 217) // Violet color to match branding
      doc.text(text, margin, y)
      y += 8
      doc.setDrawColor(229, 231, 235) // Light gray divider line
      doc.line(margin, y, pageWidth - margin, y)
      y += 10
    }

    const addBodyText = (label: string, text: string) => {
      doc.setFont("helvetica", "bold")
      doc.setFontSize(10)
      doc.setTextColor(31, 41, 55) // Dark slate for label

      const labelLines: string[] = doc.splitTextToSize(`${label}: `, maxLineWidth)
      checkPageBreak(labelLines.length * 6)

      doc.text(`${label}:`, margin, y)

      doc.setFont("helvetica", "normal")
      doc.setTextColor(75, 85, 99) // Gray for content
      const textLines: string[] = doc.splitTextToSize(text || "", maxLineWidth)

      textLines.forEach((line) => {
        checkPageBreak(6)
        doc.text(line, margin + 25, y)
        y += 6
      })
      y += 4
    }

    // Document Header
    doc.setFont("helvetica", "bold")
    doc.setFontSize(22)
    doc.setTextColor(109, 40, 217)
    doc.text("FUTUREYOU INTERVIEW REPORT", margin, 20)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)
    doc.setTextColor(107, 114, 128)
    doc.text(`Target Role: ${career || ""}`, margin, 28)

    // Divider
    doc.setDrawColor(109, 40, 217)
    doc.setLineWidth(0.5)
    doc.line(margin, 31, pageWidth - margin, 31)
    y = 42

    // Overall Score
    addHeading("OVERALL SCORE")
    addBodyText("Overall Score", `${analysis.overallScore}/100`)
    addBodyText("Professional Knowledge", `${analysis.professionalKnowledgeScore ?? analysis.technicalScore}/100`)
    addBodyText("Communication", `${analysis.communicationScore}/100`)
    y += 5

    // Strengths
    if (analysis.strengths && analysis.strengths.length > 0) {
      addHeading("STRENGTHS")
      analysis.strengths.forEach((strength: string) => {
        const lines: string[] = doc.splitTextToSize(`• ${strength}`, maxLineWidth)
        doc.setFont("helvetica", "normal")
        doc.setFontSize(10)
        doc.setTextColor(75, 85, 99)
        lines.forEach((line) => {
          checkPageBreak(6)
          doc.text(line, margin, y)
          y += 6
        })
      })
      y += 8
    }

    // Weaknesses
    if (analysis.weaknesses && analysis.weaknesses.length > 0) {
      addHeading("WEAKNESSES")
      analysis.weaknesses.forEach((weakness: string) => {
        const lines: string[] = doc.splitTextToSize(`• ${weakness}`, maxLineWidth)
        doc.setFont("helvetica", "normal")
        doc.setFontSize(10)
        doc.setTextColor(75, 85, 99)
        lines.forEach((line) => {
          checkPageBreak(6)
          doc.text(line, margin, y)
          y += 6
        })
      })
      y += 8
    }

    // Suggestions
    if (analysis.suggestions && analysis.suggestions.length > 0) {
      addHeading("SUGGESTIONS")
      analysis.suggestions.forEach((suggestion: string) => {
        const lines: string[] = doc.splitTextToSize(`• ${suggestion}`, maxLineWidth)
        doc.setFont("helvetica", "normal")
        doc.setFontSize(10)
        doc.setTextColor(75, 85, 99)
        lines.forEach((line) => {
          checkPageBreak(6)
          doc.text(line, margin, y)
          y += 6
        })
      })
      y += 8
    }

    // Question Review
    if (analysis.questionReview && analysis.questionReview.length > 0) {
      addHeading("QUESTION-BY-QUESTION REVIEW")
      analysis.questionReview.forEach((review: any, index: number) => {
        checkPageBreak(25)
        doc.setFont("helvetica", "bold")
        doc.setFontSize(12)
        doc.setTextColor(109, 40, 217)
        doc.text(`Question ${index + 1}`, margin, y)
        y += 8

        addBodyText("Question", review.question)
        addBodyText("Your Answer", review.answer)
        addBodyText("AI Feedback", review.feedback)
        addBodyText("Suggested", review.suggestedAnswer)

        y += 4
      })
    }

    doc.save("FutureYou-Interview-Report.pdf")
  }

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/auth")
      return
    }

    const savedAnalysis =
      localStorage.getItem(
        "latestInterviewAnalysis"
      )

    if (savedAnalysis) {
      setAnalysis(
        JSON.parse(savedAnalysis)
      )
    }

  }, [])

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex items-center mb-6">

          <button
            onClick={started && !analysis ? confirmStopAndExit : handleBack}
            className="
            px-4
            py-2
            rounded-xl
            border
            border-white/10
            hover:bg-white/5
            transition-colors
          "
          >
            ←
          </button>

          <h1 className="text-3xl font-bold">
            🎤 Mock Interview : {career}
          </h1>

        </div>

        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
        "
        >

          {/* LEFT COLUMN */}

          <div
            className="
            h-[650px]
            rounded-2xl
            overflow-hidden
            border
            border-white/10
            bg-zinc-900
          "
          >

            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="
              w-full
              h-full
              object-cover
            "
            />

          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4">
            {!started && (
              <button
                onClick={startInterview}
                className="
                rounded-xl
                bg-violet-600
                px-6
                py-3
                font-semibold
              "
              >
                Start Interview
              </button>
            )}

            {started && isGeneratingQuestions && (
              <div className="bg-zinc-900 rounded-2xl p-8 border border-white/10 flex flex-col items-center justify-center text-center py-16">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Generating Interview Questions</h3>
                <p className="text-sm text-zinc-400 max-w-xs">
                  Gemini is parsing your resume and target role to craft tailored questions...
                </p>
              </div>
            )}

            {started && questions.length > 0 && !analysis && (
              <>
                <div
                  className="
                  bg-zinc-900
                  rounded-2xl
                  p-5
                  border
                  border-white/10
                "
                >
                  <h2 className="text-xl font-bold">
                    Question {currentQuestion + 1}
                  </h2>
                  <p className="mt-3 text-zinc-300">
                    {questions[currentQuestion]}
                  </p>
                </div>

                <div
                  className="
                  bg-zinc-900
                  rounded-2xl
                  p-5
                "
                >
                  <div className="flex justify-between mb-3">
                    <span>Progress</span>
                    <span>
                      {currentQuestion + 1} / {questions.length}
                    </span>
                  </div>
                  <div
                    className="
                    h-3
                    bg-zinc-700
                    rounded-full
                  "
                  >
                    <div
                      className="
                      h-3
                      bg-violet-600
                      rounded-full
                    "
                      style={{
                        width: `${((currentQuestion + 1) / questions.length) * 100}%`
                      }}
                    />
                  </div>
                </div>

                {/* Microphone Status Indicator */}
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isListening ? (
                      <>
                        <span className="flex h-3 w-3 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        <div>
                          <p className="font-semibold text-red-400 text-sm">Microphone: Active</p>
                          <p className="text-xs text-zinc-400">Listening to your answer... speak clearly.</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="h-3 w-3 rounded-full bg-zinc-600"></span>
                        <div>
                          <p className="font-semibold text-zinc-400 text-sm">Microphone: Inactive</p>
                          <p className="text-xs text-zinc-400">Mic is idle. Resume speaking or type your answer.</p>
                        </div>
                      </>
                    )}
                  </div>
                  {!isListening && !isProcessingAnswer && (
                    <button
                      onClick={startListening}
                      className="rounded-lg border border-violet-500/60 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-300 hover:bg-violet-500/20 transition-colors"
                    >
                      🎤 Resume Mic
                    </button>
                  )}
                </div>

                {/* Text Input / Response Area */}
                <div className="bg-zinc-900 rounded-2xl p-5 border border-white/10 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-sm">Your Response</h3>
                    {latestAnswer && (
                      <button
                        onClick={() => setLatestAnswer("")}
                        className="text-xs text-zinc-500 hover:text-zinc-300"
                      >
                        Clear Text
                      </button>
                    )}
                  </div>
                  <textarea
                    value={latestAnswer}
                    onChange={(e) => setLatestAnswer(e.target.value)}
                    placeholder="Transcribed answer will show here automatically. You can also type or edit your answer directly..."
                    disabled={isProcessingAnswer}
                    className="w-full min-h-[120px] bg-black border border-white/10 rounded-xl p-3 text-sm text-zinc-200 focus:outline-none focus:border-violet-500 transition-colors placeholder:text-zinc-600 resize-none text-white"
                  />

                  {micError && (
                    <p className="text-xs text-red-400 font-semibold px-1">
                      ⚠️ Microphone issue detected: {micError}. Try typing your response instead.
                    </p>
                  )}

                  {isProcessingAnswer && (
                    <div className="flex items-center gap-2 text-violet-400 px-1 py-1">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span className="text-xs font-semibold animate-pulse">AI is processing your answer...</span>
                    </div>
                  )}

                  <button
                    onClick={submitAnswer}
                    disabled={isProcessingAnswer || !latestAnswer.trim()}
                    className="w-full rounded-xl bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed px-4 py-2.5 font-semibold text-sm transition-colors mt-1 flex items-center justify-center gap-2"
                  >
                    {isProcessingAnswer && (
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    )}
                    {isProcessingAnswer ? "Processing..." : "Submit Answer & Proceed"}
                  </button>
                </div>

                {/* Stop Interview Button */}
                <button
                  onClick={confirmStopAndExit}
                  className="w-full rounded-xl border border-red-500/30 hover:border-red-500/60 bg-red-950/20 hover:bg-red-950/40 px-4 py-2.5 font-semibold text-sm text-red-400 transition-all duration-200 mt-2 flex items-center justify-center gap-2"
                >
                  🛑 Stop Interview
                </button>
              </>
            )}

            {analysis && (
              <div className="bg-zinc-900 rounded-2xl p-6 border border-white/10 text-center py-10 flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mb-4 text-xl font-bold">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Interview Completed!</h3>
                <p className="text-sm text-zinc-400 max-w-xs mb-6">
                  Your performance has been evaluated. Review the comprehensive feedback report and breakdown below.
                </p>
                <button
                  onClick={startInterview}
                  className="rounded-xl bg-violet-600 hover:bg-violet-700 px-6 py-2.5 font-semibold text-sm transition-colors text-white"
                >
                  Start New Interview
                </button>
              </div>
            )}

            {!analysis && !isGeneratingQuestions && (
              <div
                className="
                bg-violet-950/30
                border
                border-violet-500/30
                rounded-2xl
                p-5
              "
              >
                <h3 className="font-bold mb-2 text-sm text-violet-300">
                  Suggested Answer Structure
                </h3>
                <ul
                  className="
                  list-disc
                  ml-5
                  text-zinc-300
                  space-y-1
                  text-xs
                "
                >
                  <li>Answer directly</li>
                  <li>Give a real example (STAR method)</li>
                  <li>Mention measurable impact</li>
                  <li>Keep your answer concise</li>
                </ul>
              </div>
            )}
          </div>

        </div>

        {/* ANALYSIS */}

        {analysis && (

          <div className="mt-10">

            <h2 className="text-3xl font-bold mb-6">
              Interview Analysis
            </h2>

            <div className="mb-6">

              <button
                onClick={downloadReport}
                className="
                bg-violet-600
                hover:bg-violet-700
                px-5
                py-3
                rounded-xl
                font-semibold
              "
              >
                📄 Download Report
              </button>

            </div>

            <div
              className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-4
            "
            >

              <div className="bg-zinc-900 rounded-2xl p-5 text-center">
                <p>Overall</p>
                <h2 className="text-3xl font-bold">
                  {analysis.overallScore}
                </h2>
              </div>

              <div className="bg-zinc-900 rounded-2xl p-5 text-center">
                <p>Professional Knowledge</p>
                <h2 className="text-3xl font-bold">
                  {analysis.professionalKnowledgeScore ?? analysis.technicalScore}
                </h2>
              </div>

              <div className="bg-zinc-900 rounded-2xl p-5 text-center">
                <p>Communication</p>
                <h2 className="text-3xl font-bold">
                  {analysis.communicationScore}
                </h2>
              </div>

            </div>

            <div
              className="
              mt-6
              grid
              md:grid-cols-3
              gap-4
            "
            >

              <div className="bg-zinc-900 rounded-2xl p-5">
                <h3 className="font-bold mb-3">
                  Strengths
                </h3>

                {analysis.strengths?.map(
                  (item: string, i: number) => (
                    <p key={i} className="mb-2">
                      • {item}
                    </p>
                  )
                )}
              </div>

              <div className="bg-zinc-900 rounded-2xl p-5">
                <h3 className="font-bold mb-3">
                  Weaknesses
                </h3>

                {analysis.weaknesses?.map(
                  (item: string, i: number) => (
                    <p key={i} className="mb-2">
                      • {item}
                    </p>
                  )
                )}
              </div>

              <div className="bg-zinc-900 rounded-2xl p-5">
                <h3 className="font-bold mb-3">
                  Suggestions
                </h3>

                {analysis.suggestions?.map(
                  (item: string, i: number) => (
                    <p key={i} className="mb-2">
                      • {item}
                    </p>
                  )
                )}

              </div>

            </div>

            {analysis.questionReview?.length > 0 && (

              <div className="mt-8">

                <h2 className="text-2xl font-bold mb-4">
                  ⭐ Question Review
                </h2>

                <div className="space-y-6">

                  {analysis.questionReview.map(
                    (review: any, index: number) => (

                      <div
                        key={index}
                        className="
                      bg-zinc-900
                      rounded-2xl
                      p-6
                      border
                      border-white/10
                    "
                      >

                        <h3 className="font-bold text-lg mb-4">
                          Question {index + 1}
                        </h3>

                        <div className="mb-5">

                          <p className="text-violet-400 font-semibold mb-2">
                            Question
                          </p>

                          <p className="text-zinc-300">
                            {review.question}
                          </p>

                        </div>

                        <div className="mb-5">

                          <p className="text-blue-400 font-semibold mb-2">
                            Your Answer
                          </p>

                          <p className="text-zinc-300 whitespace-pre-line">
                            {review.answer}
                          </p>

                        </div>

                        <div className="mb-5">

                          <p className="text-yellow-400 font-semibold mb-2">
                            AI Feedback
                          </p>

                          <p className="text-zinc-300 whitespace-pre-line">
                            {review.feedback}
                          </p>

                        </div>

                        <div>

                          <p className="text-green-400 font-semibold mb-2">
                            ⭐ Suggested Strong Answer
                          </p>

                          <p className="text-zinc-300 whitespace-pre-line">
                            {review.suggestedAnswer}
                          </p>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

            )}

          </div>

        )}

      </main>

      {isEvaluating && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm p-6 text-center">
          <svg className="animate-spin h-12 w-12 text-violet-500 mb-6" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">Analyzing Mock Interview</h2>
          <p className="text-zinc-400 max-w-md text-sm">Gemini is calculating scores and generating a feedback report...</p>
        </div>
      )}

      {showStopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all duration-300">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl transition-all duration-300">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-500 mb-4">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Stop Interview?</h3>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              Are you sure you want to stop and exit the interview? Your progress will not be saved and you will not get an evaluation feedback report.
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowStopModal(false)}
                className="flex-1 py-3 px-4 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-300 hover:text-white text-sm font-semibold rounded-xl transition-all duration-200"
              >
                Keep Going
              </button>
              <button
                onClick={() => {
                  setShowStopModal(false)
                  handleBack()
                }}
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-red-950/20"
              >
                Stop & Exit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>

  )
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
      </div>
    }>
      <InterviewPage />
    </Suspense>
  )
}


