"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { getJsonHeaders } from "@/lib/auth";
import { 
  ArrowLeft, 
  TrendingUp, 
  Award, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  User, 
  Bot 
} from "lucide-react";

export default function ReportPage() {
    const router = useRouter();
    const { id } = useParams();
    const [report, setReport] = useState<any>(null);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            router.push("/auth");
            return;
        }

        fetch(`http://localhost:8080/interview/report/${id}`, {
            headers: getJsonHeaders()
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setReport(data);
            });

    }, [id, router]);

    if (!report) {
        return (
            <div className="min-h-screen bg-black text-white">
                <Navbar />
                <div className="max-w-6xl mx-auto px-6 py-8">
                    {/* Header Skeleton */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-10 w-12 rounded-xl bg-white/[0.05] animate-pulse" />
                        <div className="space-y-2 flex-1">
                            <div className="h-8 w-48 rounded-lg bg-white/[0.05] animate-pulse" />
                            <div className="h-4 w-32 rounded-lg bg-white/[0.05] animate-pulse" />
                        </div>
                    </div>

                    {/* Scores Skeleton */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-28 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse space-y-3">
                                <div className="h-4 w-28 rounded bg-white/[0.05]" />
                                <div className="h-8 w-16 rounded bg-white/[0.05]" />
                            </div>
                        ))}
                    </div>

                    {/* Feedback Blocks Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-48 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse space-y-4">
                                <div className="h-6 w-24 rounded bg-white/[0.05]" />
                                <div className="space-y-2">
                                    <div className="h-3 w-full rounded bg-white/[0.05]" />
                                    <div className="h-3 w-5/6 rounded bg-white/[0.05]" />
                                    <div className="h-3 w-4/5 rounded bg-white/[0.05]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-8">
                <button
                    onClick={() => router.back()}
                    className="
                        mb-6
                        flex
                        items-center
                        gap-2
                        text-zinc-400
                        hover:text-white
                        transition-colors
                        px-4
                        py-2
                        rounded-xl
                        border
                        border-white/10
                        hover:bg-white/5
                    "
                >
                    <ArrowLeft size={16} /> Back to Profile
                </button>

                <div className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                        Interview Report
                    </h1>
                    <p className="text-violet-400 font-semibold mt-1 flex items-center gap-1.5">
                        <Award size={16} /> {report.interview.career}
                    </p>
                </div>

                {/* Score Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    {/* Overall Score */}
                    <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent p-6 backdrop-blur-xl relative overflow-hidden group hover:border-violet-500/20 transition-all duration-300">
                        <div className="absolute top-4 right-4 text-violet-400 opacity-40">
                            <TrendingUp size={24} />
                        </div>
                        <p className="text-zinc-400 text-sm font-medium">Overall Score</p>
                        <h2 className="text-5xl font-extrabold text-violet-400 mt-3 tracking-tight">
                            {report.interview.overallScore}%
                        </h2>
                    </div>

                    {/* Technical Score */}
                    <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent p-6 backdrop-blur-xl relative overflow-hidden group hover:border-blue-500/20 transition-all duration-300">
                        <div className="absolute top-4 right-4 text-blue-400 opacity-40">
                            <Award size={24} />
                        </div>
                        <p className="text-zinc-400 text-sm font-medium">Professional Knowledge</p>
                        <h2 className="text-5xl font-extrabold text-blue-400 mt-3 tracking-tight">
                            {report.interview.professionalKnowledgeScore}%
                        </h2>
                    </div>

                    {/* Communication Score */}
                    <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent p-6 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-300">
                        <div className="absolute top-4 right-4 text-emerald-400 opacity-40">
                            <MessageSquare size={24} />
                        </div>
                        <p className="text-zinc-400 text-sm font-medium">Communication</p>
                        <h2 className="text-5xl font-extrabold text-emerald-400 mt-3 tracking-tight">
                            {report.interview.communicationScore}%
                        </h2>
                    </div>
                </div>

                {/* Feedback Sections (Strengths, Weaknesses, Suggestions) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Strengths Card */}
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl">
                        <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold border-b border-white/10 pb-2">
                            <CheckCircle2 size={18} />
                            <h3>Strengths</h3>
                        </div>
                        <div className="space-y-3">
                          {report.interview.strengths && report.interview.strengths.length > 0 ? (
                            report.interview.strengths.map((item: string, i: number) => (
                                <p key={i} className="text-sm text-zinc-300 leading-relaxed flex items-start gap-2">
                                    <span className="text-emerald-500 mt-0.5">•</span> {item}
                                </p>
                            ))
                          ) : (
                            <p className="text-zinc-500 text-sm italic">No specific strengths listed.</p>
                          )}
                        </div>
                    </div>

                    {/* Weaknesses Card */}
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl">
                        <div className="flex items-center gap-2 mb-4 text-rose-400 font-bold border-b border-white/10 pb-2">
                            <XCircle size={18} />
                            <h3>Weaknesses</h3>
                        </div>
                        <div className="space-y-3">
                          {report.interview.weaknesses && report.interview.weaknesses.length > 0 ? (
                            report.interview.weaknesses.map((item: string, i: number) => (
                                <p key={i} className="text-sm text-zinc-300 leading-relaxed flex items-start gap-2">
                                    <span className="text-rose-500 mt-0.5">•</span> {item}
                                </p>
                            ))
                          ) : (
                            <p className="text-zinc-500 text-sm italic">No specific weaknesses listed.</p>
                          )}
                        </div>
                    </div>

                    {/* Suggestions Card */}
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl">
                        <div className="flex items-center gap-2 mb-4 text-amber-400 font-bold border-b border-white/10 pb-2">
                            <Lightbulb size={18} />
                            <h3>Suggestions</h3>
                        </div>
                        <div className="space-y-3">
                          {report.interview.suggestions && report.interview.suggestions.length > 0 ? (
                            report.interview.suggestions.map((item: string, i: number) => (
                                <p key={i} className="text-sm text-zinc-300 leading-relaxed flex items-start gap-2">
                                    <span className="text-amber-500 mt-0.5">•</span> {item}
                                </p>
                            ))
                          ) : (
                            <p className="text-zinc-500 text-sm italic">No suggestions listed.</p>
                          )}
                        </div>
                    </div>
                </div>

                {/* Question Review Section */}
                {report.reviews && report.reviews.length > 0 && (
                    <div className="mt-8 space-y-6">
                        <h2 className="text-2xl font-bold tracking-tight border-b border-white/10 pb-3">
                            ⭐ Question Review
                        </h2>
                        <div className="space-y-6">
                            {report.reviews.map((review: any, index: number) => (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl space-y-4 hover:border-white/10 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-2.5 pb-2 border-b border-white/5">
                                        <div className="h-7 w-7 rounded-lg bg-violet-600/20 text-violet-400 flex items-center justify-center font-bold text-sm">
                                            Q{index + 1}
                                        </div>
                                        <h3 className="font-bold text-white text-base">
                                            {review.question}
                                        </h3>
                                    </div>

                                    {/* Your Answer */}
                                    <div className="rounded-xl bg-blue-500/[0.03] border border-blue-500/10 p-4 space-y-1">
                                        <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                                            <User size={12} /> Your Answer
                                        </p>
                                        <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
                                            {review.answer || "No answer provided."}
                                        </p>
                                    </div>

                                    {/* AI Feedback */}
                                    <div className="rounded-xl bg-amber-500/[0.03] border border-amber-500/10 p-4 space-y-1">
                                        <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                                            <Bot size={12} /> AI Feedback
                                        </p>
                                        <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
                                            {review.feedback || "No feedback generated."}
                                        </p>
                                    </div>

                                    {/* Suggested Answer */}
                                    <div className="rounded-xl bg-emerald-500/[0.03] border border-emerald-500/10 p-4 space-y-1">
                                        <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                                            <CheckCircle2 size={12} /> Suggested Strong Answer
                                        </p>
                                        <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
                                            {review.suggestedAnswer || "No suggested answer generated."}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}