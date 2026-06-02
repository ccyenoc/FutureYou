"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import Navbar from "@/components/layout/Navbar"

export default function InterviewPage() {

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
  const [analysis,setAnalysis] = useState<any>(null)
  const answersRef = useRef<string[]>([])
  const [latestAnswer, setLatestAnswer] = useState("")
  const followUpCountRef = useRef(0)
  const interviewEndedRef = useRef(false)

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

    setStarted(false)

    setTimeout(() => {
      router.back()
    }, 300)
  }


  const evaluateInterview =
  async () => {

    const user = JSON.parse(localStorage.getItem("user") || "null")

    const response =
      await fetch(
        "http://localhost:8080/interview/evaluate",
        {
          method:"POST",

          headers:{
            "Content-Type":
            "application/json"
          },

          body: JSON.stringify({
            userId : user?.userId,
            career,
            questions:  questionsRef.current,
            answers: answersRef.current,
            resumeText: localStorage.getItem( "resumeText" )
          })
        }
      )

    const data = await response.json()

    setAnalysis(data)

    console.log(
        "Interview Analysis :",
        data
      )
  }

  const startInterview = async () => {

    setStarted(true)

    try {

      const response =
        await fetch(
          "http://localhost:8080/interview/ask",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              career: career,

              resumeText:
                localStorage.getItem(
                  "resumeText"
                )
            })
          }
        )

      const data = await response.json()

      localStorage.getItem( "resumeText" )

      setQuestions( data.questions )
      questionsRef.current = data.questions

      speak(data.questions[0])

    } catch (err) {

      console.error(err)

    }
  }

  const speak = (text: string) => {

    const utterance = new SpeechSynthesisUtterance( text )

    utterance.onend = () => {
      setTimeout(() => {
        startListening()
      }, 500)
    }

    speechSynthesis.speak( utterance )
  }

  const moveToNextQuestion = async () => {

    followUpCountRef.current = 0

    const next = currentQuestionRef.current + 1

    if ( next < questionsRef.current.length) {

      setCurrentQuestion(next)

      currentQuestionRef.current = next

      speak( questionsRef.current[next] )

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
      recognitionRef.current.stop()
      recognitionRef.current = null
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    const recognition = new SpeechRecognition()

    recognition.onstart = () => {
      console.log("🎤 Listening...")
    }

    recognition.onend = () => {
      console.log("🔇 Recognition ended")
    }

    recognition.onerror = (e: any) => {
      console.log("❌ Recognition error", e)
    }

    recognition.continuous = false

    recognition.interimResults = false

    recognition.lang = "en-US"


    recognition.onresult = async (
      event: any
    ) => {

      if (interviewEndedRef.current) {
        return
      }

      const speechResult = event.results[event.results.length - 1]

      if (!speechResult.isFinal) {
        return
      }

      const transcript = speechResult[0].transcript

      setLatestAnswer(transcript)

      const updatedAnswers = [
        ...answersRef.current,
        transcript
      ]

      answersRef.current = updatedAnswers
      setAnswers(updatedAnswers)

      const interviewResult =
        await processAnswer(
          questionsRef.current[currentQuestionRef.current],
          transcript
        )

      if ( interviewResult.action === "FOLLOW_UP" ) {
        if (followUpCountRef.current >= 2) {
          await moveToNextQuestion()
          return
        }

        followUpCountRef.current++

        const updatedQuestions = [ ...questionsRef.current ]

        updatedQuestions[ currentQuestionRef.current ] = interviewResult.nextQuestion

        questionsRef.current = updatedQuestions

        setQuestions( updatedQuestions )

        speak( interviewResult.nextQuestion )

        return
      }


      await moveToNextQuestion()
      }

      recognition.start()

      recognitionRef.current = recognition
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

          headers: {
            "Content-Type":
              "application/json"
          },

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

    let report = `
  FUTUREYOU INTERVIEW REPORT

  Career:
  ${career}

  ========================================

  OVERALL SCORE
  ========================================

  Overall Score: ${analysis.overallScore}
  Technical Score: ${analysis.technicalScore}
  Communication Score: ${analysis.communicationScore}
  Confidence Score: ${analysis.confidenceScore}

  ========================================

  STRENGTHS
  ========================================

  ${analysis.strengths.join("\n")}

  ========================================

  WEAKNESSES
  ========================================

  ${analysis.weaknesses.join("\n")}

  ========================================

  SUGGESTIONS
  ========================================

  ${analysis.suggestions.join("\n")}

  ========================================

  QUESTION REVIEW
  ========================================

  `

    analysis.questionReview?.forEach(
      (
        review: any,
        index: number
      ) => {

        report += `

  Question ${index + 1}

  Question:
  ${review.question}

  Your Answer:
  ${review.answer}

  Feedback:
  ${review.feedback}

  Suggested Answer:
  ${review.suggestedAnswer}

  ----------------------------------------

  `
      }
    )

    const blob = new Blob(
      [report],
      {
        type: "text/plain"
      }
    )

    const url =
      URL.createObjectURL(blob)

    const a =
      document.createElement("a")

    a.href = url

    a.download =
      "FutureYou-Interview-Report.txt"

    a.click()

    URL.revokeObjectURL(url)
  }

  return (
  <div className="min-h-screen bg-black text-white">

    <Navbar />

    <main className="max-w-7xl mx-auto px-6 py-8">

      <div className="flex items-center mb-6">

        <button
          onClick={handleBack}
          className="
            px-4
            py-2
            rounded-xl
            border
            border-white/10
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

          {questions.length > 0 && (

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

          )}

          <div
            className="
              bg-violet-950/30
              border
              border-violet-500/30
              rounded-2xl
              p-5
            "
          >

            <h3 className="font-bold mb-2">
              Suggested Answer Structure
            </h3>

            <ul
              className="
                list-disc
                ml-5
                text-zinc-300
                space-y-1
              "
            >
              <li>Answer directly</li>
              <li>Give a real example</li>
              <li>Mention measurable impact</li>
              <li>Keep your answer concise</li>
            </ul>

          </div>

          {questions.length > 0 && (

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
                  {currentQuestion + 1}
                  /
                  {questions.length}
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
                    width:
                      `${((currentQuestion + 1) /
                        questions.length) * 100}%`
                  }}
                />

              </div>

            </div>

          )}

          <div
            className="
              bg-zinc-900
              rounded-2xl
              p-5
              flex-1
            "
          >

            <h3 className="font-bold mb-2">
              Your Latest Answer
            </h3>

            <p className="text-zinc-300">
              {latestAnswer ||
                "Waiting for response..."}
            </p>

          </div>

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

          <button
            onClick={evaluateInterview}
            className="
              rounded-xl
              bg-green-600
              px-6
              py-3
              font-semibold
            "
          >
            Evaluate
          </button>


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
                {analysis.technicalScore}
              </h2>
            </div>

            <div className="bg-zinc-900 rounded-2xl p-5 text-center">
              <p>Communication</p>
              <h2 className="text-3xl font-bold">
                {analysis.communicationScore}
              </h2>
            </div>

            <div className="bg-zinc-900 rounded-2xl p-5 text-center">
              <p>Confidence</p>
              <h2 className="text-3xl font-bold">
                {analysis.confidenceScore}
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

  </div>
  
)
}

