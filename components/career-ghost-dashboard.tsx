"use client"

import { useState } from "react"
import { 
  Ghost, 
  Moon,
  ChevronDown,
  ArrowRight,
  MessageSquare,
  Calendar,
  Sparkles,
  Upload,
  User,
  Heart,
  Grid3X3,
  MapPin,
  Briefcase,
  Building,
  Settings,
  TrendingUp,
  BookOpen,
  FileText
} from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  { number: 1, label: "Resume", active: true },
  { number: 2, label: "Discover", active: false },
  { number: 3, label: "Ghost", active: false },
  { number: 4, label: "Action", active: false },
]

const strengths = ["Python", "Machine Learning", "Problem Solving", "Data Analysis"]
const interests = ["AI & Technology", "Building Products", "Solving Problems", "Innovation"]
const workStyles = ["Analytical Thinker", "Independent", "Detail-Oriented", "Growth Focused"]

const roadmapPhases = [
  {
    number: 1,
    title: "Foundation",
    duration: "0 - 3 months",
    items: ["Strengthen core skills", "Build 2-3 projects", "Learn key tools"],
    completed: 0,
    total: 3,
  },
  {
    number: 2,
    title: "Build & Explore",
    duration: "3 - 6 months",
    items: ["Work on real projects", "Explore different roles", "Gain practical experience"],
    completed: 0,
    total: 3,
  },
  {
    number: 3,
    title: "Specialize",
    duration: "6 - 12 months",
    items: ["Choose your direction", "Upskill in chosen area", "Get certified"],
    completed: 0,
    total: 3,
  },
  {
    number: 4,
    title: "Launch",
    duration: "12+ months",
    items: ["Build your portfolio", "Apply for roles", "Grow your network"],
    completed: 0,
    total: 3,
  },
]

const whatsNextItems = [
  { icon: TrendingUp, title: "Skill Gap Analysis", description: "See what skills you need to grow" },
  { icon: BookOpen, title: "Recommended Courses", description: "Courses tailored for your path" },
  { icon: Briefcase, title: "Career Opportunities", description: "Jobs that match your profile" },
  { icon: FileText, title: "Resume Insights", description: "Improve your resume with AI" },
]

export default function CareerGhostDashboard() {
  const [isDragOver, setIsDragOver] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
            <Ghost className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-semibold text-foreground">
            Career <span className="text-primary">Ghost</span>
          </span>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2">
          {steps.map((step, index) => (
            <div key={step.label} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium",
                    step.active
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {step.number}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium",
                    step.active ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="mx-4 w-16 border-t-2 border-dashed border-border" />
              )}
            </div>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Moon className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 overflow-hidden">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-05-27%20at%2011.59.44%E2%80%AFAM-X3fTwrGGWi3MO1RLuIqrxWEl28kkbJ.png" 
                alt="User" 
                className="h-full w-full object-cover opacity-0"
              />
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Resume Upload Section */}
        <div className="rounded-xl border border-border bg-card p-5 mb-6">
          <div className="flex items-center gap-6">
            {/* Left - Resume Title */}
            <div className="flex items-center gap-4 min-w-48">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-primary">Resume</h2>
                <p className="text-sm text-muted-foreground">Upload your resume or start<br />with a few questions.</p>
              </div>
            </div>

            {/* Center - Drag & Drop */}
            <div 
              className={cn(
                "flex-1 flex items-center justify-center gap-4 rounded-xl border-2 border-dashed py-6 px-8 transition-colors",
                isDragOver ? "border-primary bg-primary/5" : "border-border"
              )}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={() => setIsDragOver(false)}
            >
              <Upload className="h-5 w-5 text-muted-foreground" />
              <div className="text-center">
                <p className="font-medium text-foreground">Drag & drop your resume</p>
                <p className="text-sm text-muted-foreground">PDF, DOCX (Max 5MB)</p>
              </div>
              <span className="text-muted-foreground">or</span>
              <button className="rounded-lg border border-primary bg-transparent px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors">
                Browse Files
              </button>
            </div>

            {/* Right - Alternative */}
            <div className="text-right min-w-48">
              <p className="text-sm text-muted-foreground mb-2">{"Don't have a resume?"}</p>
              <button className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors ml-auto">
                <MessageSquare className="h-4 w-4" />
                Answer a Few Questions
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Welcome Card */}
          <div className="col-span-3">
            <div className="rounded-xl border border-border bg-card p-6 h-full">
              <p className="text-sm text-muted-foreground mb-1">Hey there!</p>
              <h2 className="text-2xl font-bold text-foreground mb-1">{"Let's discover"}</h2>
              <h2 className="text-2xl font-bold text-primary mb-4">your best path</h2>
              <p className="text-sm text-muted-foreground mb-6">
                {"We'll analyze your skills, interests, and goals to find the perfect career paths for you."}
              </p>
              {/* Ghost Illustration */}
              <div className="relative flex justify-center">
                <div className="relative">
                  <svg width="140" height="160" viewBox="0 0 140 160" className="drop-shadow-lg">
                    {/* Ghost body */}
                    <defs>
                      <linearGradient id="ghostGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M70 10 C30 10 15 50 15 90 C15 130 15 150 15 150 L30 135 L45 150 L60 135 L75 150 L90 135 L105 150 L120 135 L125 150 C125 150 125 130 125 90 C125 50 110 10 70 10 Z" 
                      fill="url(#ghostGradient)"
                    />
                    {/* Eyes */}
                    <ellipse cx="50" cy="70" rx="12" ry="14" fill="white" />
                    <ellipse cx="90" cy="70" rx="12" ry="14" fill="white" />
                    <circle cx="52" cy="72" r="6" fill="#1a1a2e" />
                    <circle cx="92" cy="72" r="6" fill="#1a1a2e" />
                    {/* Blush */}
                    <ellipse cx="35" cy="85" rx="8" ry="4" fill="#f9a8d4" opacity="0.6" />
                    <ellipse cx="105" cy="85" rx="8" ry="4" fill="#f9a8d4" opacity="0.6" />
                    {/* Smile */}
                    <path d="M55 95 Q70 110 85 95" fill="none" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  {/* Sparkles around ghost */}
                  <div className="absolute -top-2 -left-2">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                  </div>
                  <div className="absolute top-4 -right-4">
                    <Sparkles className="h-3 w-3 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Discover You */}
          <div className="col-span-5">
            <div className="rounded-xl border border-border bg-card p-6 h-full">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-5">
                <Sparkles className="h-5 w-5 text-amber-400" /> Discover You
              </h2>
              
              <div className="grid grid-cols-3 gap-4">
                {/* Your Strengths */}
                <div className="rounded-xl border border-border bg-secondary/30 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">Your Strengths</h3>
                      <p className="text-xs text-muted-foreground">{"What you're good at"}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {strengths.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <button className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                    View Full Analysis <ArrowRight className="h-3 w-3" />
                  </button>
                </div>

                {/* Your Interests */}
                <div className="rounded-xl border border-border bg-secondary/30 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">Your Interests</h3>
                      <p className="text-xs text-muted-foreground">What excites you</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {interests.map((interest) => (
                      <span
                        key={interest}
                        className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                  <button className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                    View Full Analysis <ArrowRight className="h-3 w-3" />
                  </button>
                </div>

                {/* Your Work Style */}
                <div className="rounded-xl border border-border bg-secondary/30 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20">
                      <Grid3X3 className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">Your Work Style</h3>
                      <p className="text-xs text-muted-foreground">How you like to work</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {workStyles.map((style) => (
                      <span
                        key={style}
                        className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                      >
                        {style}
                      </span>
                    ))}
                  </div>
                  <button className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                    View Full Analysis <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Meet Your Future Self */}
          <div className="col-span-4">
            <div className="rounded-xl border border-border bg-card p-6 h-full">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-5">
                Meet Your Future Self <Ghost className="h-5 w-5 text-amber-400" />
              </h2>
              
              <div className="flex gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-primary/30 via-primary/20 to-transparent overflow-hidden flex items-center justify-center">
                    <svg viewBox="0 0 100 120" className="h-28 w-28">
                      {/* Face */}
                      <ellipse cx="50" cy="40" rx="30" ry="32" fill="#F5D0C5" />
                      {/* Hair */}
                      <path d="M20 35 Q20 10 50 10 Q80 10 80 35 Q80 25 70 20 Q60 15 50 15 Q40 15 30 20 Q20 25 20 35 Z" fill="#1a1a2e" />
                      {/* Glasses */}
                      <rect x="28" y="35" width="18" height="12" rx="2" fill="none" stroke="#1a1a2e" strokeWidth="2" />
                      <rect x="54" y="35" width="18" height="12" rx="2" fill="none" stroke="#1a1a2e" strokeWidth="2" />
                      <line x1="46" y1="41" x2="54" y2="41" stroke="#1a1a2e" strokeWidth="2" />
                      {/* Eyes */}
                      <circle cx="37" cy="41" r="3" fill="#1a1a2e" />
                      <circle cx="63" cy="41" r="3" fill="#1a1a2e" />
                      {/* Smile */}
                      <path d="M40 55 Q50 62 60 55" fill="none" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
                      {/* Body/Shirt */}
                      <path d="M25 72 Q25 68 50 68 Q75 68 75 72 L80 120 L20 120 Z" fill="#1a1a2e" />
                      {/* Collar */}
                      <path d="M40 68 L50 80 L60 68" fill="none" stroke="#2d3748" strokeWidth="3" />
                    </svg>
                  </div>
                </div>

                {/* Quote */}
                <div className="flex-1">
                  <div className="rounded-xl bg-secondary/50 p-4 mb-3 relative">
                    <p className="text-sm text-foreground leading-relaxed">
                      {"\"Hey! I'm your future self."}<br />
                      {"I know right now it feels confusing."}<br />
                      {"But you have the skills to build amazing things and lead impact."}<br /><br />
                      {"Let's build that future together.\""} <span>{"🚀"}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Role & Details */}
              <div className="mt-4">
                <h3 className="text-lg font-bold text-primary mb-3">AI Product Manager</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Age: <span className="text-foreground">27</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Location: <span className="text-foreground">Bengaluru, India</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building className="h-4 w-4" />
                    <span>Industry: <span className="text-foreground">Technology</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Settings className="h-4 w-4" />
                    <span>Work Style: <span className="text-foreground">Hybrid</span></span>
                  </div>
                </div>
              </div>

              {/* Talk to Ghost Button */}
              <button className="w-full mt-5 flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                <MessageSquare className="h-4 w-4" /> Talk to Ghost
              </button>
            </div>
          </div>
        </div>

        {/* Career Roadmap & What's Next */}
        <div className="grid grid-cols-12 gap-6 mt-6">
          {/* Career Roadmap */}
          <div className="col-span-8">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-lg font-semibold text-foreground">Your Career Roadmap</h2>
                </div>
                <button className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">
                  View Full Roadmap <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mb-6">Personalized path based on your profile</p>

              {/* Timeline */}
              <div className="relative">
                {/* Connection line */}
                <div className="absolute top-5 left-6 right-6 h-0.5 bg-border" style={{ zIndex: 0 }}>
                  <div className="absolute top-0 left-0 h-full w-1/4 bg-primary" />
                </div>

                {/* Phases */}
                <div className="grid grid-cols-4 gap-4 relative">
                  {roadmapPhases.map((phase, index) => (
                    <div key={phase.number} className="relative">
                      {/* Number circle */}
                      <div className={cn(
                        "relative z-10 mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold",
                        index === 0 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-secondary text-muted-foreground border border-border"
                      )}>
                        {phase.number}
                      </div>
                      
                      {/* Phase content */}
                      <div className="rounded-xl border border-border bg-secondary/30 p-4">
                        <h3 className={cn(
                          "font-semibold mb-1",
                          index === 0 ? "text-primary" : "text-foreground"
                        )}>
                          {phase.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-3">{phase.duration}</p>
                        <ul className="space-y-1.5 mb-4">
                          {phase.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground border border-border">
                          {phase.completed}/{phase.total} completed
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="col-span-4">
            <div className="rounded-xl border border-border bg-card p-6 h-full">
              <h2 className="text-lg font-semibold text-foreground mb-5">{"What's Next?"}</h2>
              <div className="space-y-3">
                {whatsNextItems.map((item) => (
                  <button
                    key={item.title}
                    className="w-full flex items-center gap-4 rounded-xl border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors text-left"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground text-sm">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-6 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              {"Every great career starts with a single step. You've got this!"}
              <span className="text-lg">{"💪"}</span>
            </p>
            <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Get Started <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
