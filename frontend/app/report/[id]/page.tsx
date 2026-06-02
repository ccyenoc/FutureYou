"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/navigation";

export default function ReportPage() {
    const router = useRouter();

    const { id } = useParams();

    const [report, setReport] = useState<any>(null);

    useEffect(() => {

        fetch(`http://localhost:8080/interview/report/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setReport(data);
            });

    }, [id]);

    if (!report) {
        return (
            <div className="min-h-screen bg-black text-white p-10">
                Loading...
            </div>
        );
    }

    return (
    <>
        <Navbar />

        <div className="min-h-screen bg-black text-white p-8">

            <div className="max-w-6xl mx-auto">

                <button
                    onClick={() => router.back()}
                    className="
                        mb-6
                        text-zinc-400
                        hover:text-white
                    "
                >
                    ← Back
                </button>

                <h1 className="text-4xl font-bold mb-2">
                    Interview Report
                </h1>

                <p className="text-gray-400 mb-8">
                    {report.interview.career}
                </p>

                {/* Scores */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-zinc-900 rounded-xl p-6">
                        <p className="text-gray-400">
                            Overall Score
                        </p>

                        <h2 className="text-5xl font-bold text-violet-400">
                            {report.interview.overallScore}
                        </h2>
                    </div>

                    <div className="bg-zinc-900 rounded-xl p-6">
                        <p className="text-gray-400">
                            Professional Knowledge
                        </p>

                        <h2 className="text-5xl font-bold text-blue-400">
                            {report.interview.professionalKnowledgeScore}
                        </h2>
                    </div>

                    <div className="bg-zinc-900 rounded-xl p-6">
                        <p className="text-gray-400">
                            Communication
                        </p>

                        <h2 className="text-5xl font-bold text-green-400">
                            {report.interview.communicationScore}
                        </h2>
                    </div>

                </div>

                {/* Strengths */}
                <div className="bg-zinc-900 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4">
                        Strengths
                    </h3>

                    {report.strengths?.map(
                        (item: string, index: number) => (
                            <p key={index} className="mb-2">
                                ✓ {item}
                            </p>
                        )
                    )}
                </div>

                {/* Reviews */}
                <div className="space-y-6">

                    <h2 className="text-3xl font-bold">
                        Question Review
                    </h2>

                    {report.reviews?.map(
                        (review: any, index: number) => (

                            <div
                                key={index}
                                className="bg-zinc-900 rounded-xl p-6"
                            >

                                <h3 className="font-bold text-violet-400 mb-3">
                                    {review.question}
                                </h3>

                                <div className="mb-4">
                                    <p className="text-sm text-gray-400">
                                        Your Answer
                                    </p>

                                    <p>
                                        {review.answer}
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm text-gray-400">
                                        Feedback
                                    </p>

                                    <p>
                                        {review.feedback}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400">
                                        Suggested Answer
                                    </p>

                                    <p>
                                        {review.suggestedAnswer}
                                    </p>
                                </div>

                            </div>
                        )
                    )}

                </div>

            </div>

        </div>

    </>
    );
}