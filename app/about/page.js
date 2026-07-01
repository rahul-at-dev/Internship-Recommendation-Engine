"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Sparkles, Target, Shield, Rocket } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col justify-between">
      {/* Background world map network */}
      <div className="absolute inset-0 bg-world-map opacity-[0.2] mix-blend-screen pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none z-0" />

      {/* Floating neon glows */}
      <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[55%] h-[55%] rounded-full bg-indigo-500/5 blur-[110px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-8">
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-white rounded-full">
            <Link href="/" className="flex items-center gap-2 text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <Card className="glass-card rounded-2xl p-6 md:p-8 shadow-2xl relative">
          <CardHeader className="pb-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              About Our Platform
            </div>
            <CardTitle className="text-3xl font-bold text-white tracking-tight">
              About InternFind
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground leading-relaxed text-base">
            <p>
              <strong className="text-white">InternFind</strong> is an AI-powered internship discovery platform designed to connect students, freshers, and entry-level professionals with the most relevant opportunities. We believe the path to starting a career shouldn't be bogged down by mismatched search filters and tedious scrolling.
            </p>
            <p>
              By utilizing the <strong className="text-white">Adzuna Job API</strong>, we fetch active, real-world internship openings across major technical and non-technical domains. Our server-side engine dynamically scores and ranks these postings against your unique profile details—such as skills, sector, preferred location, and education levels—delivering a personalized dashboard of matches.
            </p>

            <div className="border-t border-white/5 pt-6 mt-6">
              <h3 className="text-white font-semibold text-lg mb-4">Our Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Target className="w-4 h-4 text-emerald-500" />
                    Relevance First
                  </div>
                  <p className="text-xs">We score listings dynamically to show you matches that actually fit your profile.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Shield className="w-4 h-4 text-[#eab308]" />
                    Verified Listings
                  </div>
                  <p className="text-xs">Partnered with global platforms to source live, authentic internship listings.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Rocket className="w-4 h-4 text-[#bf5728]" />
                    Fast Application
                  </div>
                  <p className="text-xs">Quick redirect links that take you straight to application pages in one click.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mini Footer */}
      <footer className="border-t border-white/5 bg-[#0a0a0d] py-6 relative z-10 text-center">
        <p className="text-xs text-muted-foreground">© InternFind. All Rights reserved.</p>
      </footer>
    </div>
  )
}
