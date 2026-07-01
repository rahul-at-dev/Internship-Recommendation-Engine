"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ShieldAlert, Lock, Eye, Database } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col justify-between">
      {/* Background world map network */}
      <div className="absolute inset-0 bg-world-map opacity-[0.2] mix-blend-screen pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none z-0" />

      {/* Floating neon glows */}
      <div className="absolute top-[-10%] left-[-15%]. w-[60%] h-[60%] rounded-full bg-primary/5 blur-[130px] pointer-events-none" />
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
              <Lock className="w-3.5 h-3.5" />
              Privacy Policy
            </div>
            <CardTitle className="text-3xl font-bold text-white tracking-tight">
              Privacy Policy
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-2">Effective Date: July 1, 2026</p>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground leading-relaxed text-base">
            <p>
              At <strong className="text-white">InternFind</strong>, we prioritize the privacy of our visitors. This Privacy Policy documents the types of information we collect and how we handle it.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex gap-3">
                <Database className="w-6 h-6 text-[#bf5728] shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">1. Information We Collect</h3>
                  <p className="text-sm">
                    We collect the parameters you input into the search interface (skills, sector preferences, location, and education levels). This information is processed ephemerally on our server to query the job search API and is not stored in any permanent database.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Eye className="w-6 h-6 text-[#bf5728] shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">2. How We Use Information</h3>
                  <p className="text-sm">
                    The search data is strictly utilized to fetch relevant job postings via the Adzuna API and compute a relative Match Score. We do not share, sell, or monetize your search queries or preferences.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <ShieldAlert className="w-6 h-6 text-[#bf5728] shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">3. Third-Party Links</h3>
                  <p className="text-sm">
                    Our platform lists external internship opportunities that link directly to third-party recruitment sites or job boards (such as Adzuna and partners). Once you redirect to these sites, you are subject to their respective privacy terms and policies.
                  </p>
                </div>
              </div>
            </div>

            <p className="pt-4 border-t border-white/5 text-sm">
              If you have any questions or concern regarding this policy, please reach out to us at <strong className="text-white">privacy@internfind.com</strong>.
            </p>
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
