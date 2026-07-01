"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { ThemeToggle } from "@/components/theme-toggle"
import { CheckCircle, XCircle, Bookmark, ExternalLink, Sparkles, Target, MapPin, GraduationCap, Search, Shield, Rocket, MousePointer, Facebook, Twitter, Instagram } from "lucide-react"

export default function InternshipRecommender() {
  const [formData, setFormData] = useState({
    skills: "",
    sector: "",
    location: "",
    education: "",
  })
  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [metadata, setMetadata] = useState({
    sectors: [],
    locations: [],
    education: [],
  })
  const { toast } = useToast()
  const [featuredInternships, setFeaturedInternships] = useState([])
  const [isFeaturedLoading, setIsFeaturedLoading] = useState(false)

  useEffect(() => {
    const fetchFeatured = async () => {
      setIsFeaturedLoading(true)
      try {
        const response = await fetch("/api/featured")
        if (response.ok) {
          const data = await response.json()
          setFeaturedInternships(data.featured || [])
        }
      } catch (error) {
        console.error("Error fetching featured internships:", error)
      } finally {
        setIsFeaturedLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  useEffect(() => {
    const fetchMetadata = async () => {
      
        const response = await fetch("/api/meta")
        if (response.ok) {
          const data = await response.json()
          setMetadata(data)
        } else {
          setMetadata({
            sectors: [
              { value: "software-development", label: "Software Development" },
              { value: "data-science", label: "Data Science" },
              { value: "marketing", label: "Marketing" },
              { value: "design", label: "Design" },
              { value: "finance", label: "Finance" },
            ],
            locations: [
              { value: "bangalore", label: "Bangalore" },
              { value: "delhi", label: "Delhi" },
              { value: "mumbai", label: "Mumbai" },
              { value: "hyderabad", label: "Hyderabad" },
              { value: "pune", label: "Pune" },
            ],
            education: [
              { value: "btech", label: "B.Tech" },
              { value: "bca", label: "BCA" },
              { value: "mca", label: "MCA" },
              { value: "mtech", label: "M.Tech" },
              { value: "bsc", label: "B.Sc" },
            ],
          })
        }
     
    }

    fetchMetadata()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSearched(true)

    if (!formData.skills) {
    toast({
      title: "Missing Skills",
      description: "Please enter at least one skill (comma separated) to get recommendations.",
      variant: "destructive",
      duration: 4000,
    })
    return;
  }

  if (!formData.education) {
    toast({
      title:"Missing Education Level",
      description: "Please select your education level to get accurate recommendations.",
      variant: "destructive",
      duration: 4000,
    })
    return;
  }

    setIsLoading(true)

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })


      if (response.ok) {
        const data = await response.json()
        setRecommendations(data.recommendations || [])
      } else {
        console.log("[v0] Recommend API response not ok:", response.statusText)
        const errorText = await response.text()
        setRecommendations([])
      }
    } catch (error) {
      console.error("[v0] Error fetching recommendations:", error)
      setRecommendations([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleFeedback = async (internshipId, feedback) => {
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ internshipId, feedback }),
      })
      toast({
        title: "Thanks for your feedback!",
        description: "Your feedback helps us improve our recommendations.",
        duration: 3000,
      })
    } catch (error) {
      console.error("Error sending feedback:", error)
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  const handleFeaturedSearch = async (title, sector, location, education, skills) => {
    setFormData({
      skills,
      sector,
      location,
      education
    })
    setHasSearched(true)
    setIsLoading(true)

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skills, sector, location, education }),
      })

      if (response.ok) {
        const data = await response.json()
        setRecommendations(data.recommendations || [])
        toast({
          title: `Recommendations Loaded`,
          description: `Showing top matches for ${title} profile.`,
          duration: 4000,
        })
      } else {
        const errorText = await response.text()
        console.error("Featured search error:", errorText)
        setRecommendations([])
      }
    } catch (error) {
      console.error("Featured search failed:", error)
      setRecommendations([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background world map network */}
      <div className="absolute inset-0 bg-world-map opacity-[0.35] mix-blend-screen pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none z-0" />

      {/* Floating neon glows */}
      <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[130px] animate-float pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[55%] h-[55%] rounded-full bg-indigo-500/5 blur-[110px] animate-float-reverse pointer-events-none" />

      <ThemeToggle />

      {/* Hero section */}
      <div className="relative overflow-hidden z-10 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
            Find Your Perfect <span className="text-blue-500">Internship</span>
          </h1>
          <p className="text-lg text-muted-foreground font-semibold mb-10 tracking-wider uppercase">
            Simple. Efficient. Free.
          </p>

          {/* Pill-shaped Search Bar */}
          <div className="max-w-3xl mx-auto mb-6 relative z-20">
            <form 
              onSubmit={handleSubmit} 
              className="flex items-center bg-[#1c1c24]/90 backdrop-blur-md border border-white/10 rounded-full p-2 pl-6 shadow-2xl focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/40 transition-all"
            >
              <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
              <input
                type="text"
                placeholder="Search roles, locations, or companies..."
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="bg-transparent border-0 outline-none text-white placeholder-muted-foreground w-full text-base py-2.5"
              />
              <Button
                type="submit"
                className="bg-[#bf5728] hover:bg-[#bf5728]/95 text-white font-semibold rounded-full px-8 py-3.5 h-auto transition-transform hover:scale-[1.02] active:scale-[0.98] duration-150"
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </form>
          </div>

          {/* Advanced Dropdown Filters */}
          <div className="flex flex-wrap justify-center gap-3 relative z-20 mt-4 max-w-2xl mx-auto">
            <div className="w-44">
              <Select
                value={formData.sector}
                onValueChange={(value) => setFormData({ ...formData, sector: value })}
              >
                <SelectTrigger className="bg-[#18181b]/70 backdrop-blur-sm border border-white/10 rounded-full h-10 px-4 text-xs font-semibold text-muted-foreground focus:ring-[#bf5728] hover:bg-white/5 transition-all">
                  <SelectValue placeholder="Sector" />
                </SelectTrigger>
                <SelectContent>
                  {metadata.sectors.map((sector) => (
                    <SelectItem key={sector.value} value={sector.label}>
                      {sector.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-44">
              <Select
                value={formData.location}
                onValueChange={(value) => setFormData({ ...formData, location: value })}
              >
                <SelectTrigger className="bg-[#18181b]/70 backdrop-blur-sm border border-white/10 rounded-full h-10 px-4 text-xs font-semibold text-muted-foreground focus:ring-[#bf5728] hover:bg-white/5 transition-all">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {metadata.locations.map((location) => (
                    <SelectItem key={location.value} value={location.label}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-44">
              <Select
                value={formData.education}
                onValueChange={(value) => setFormData({ ...formData, education: value })}
              >
                <SelectTrigger className="bg-[#18181b]/70 backdrop-blur-sm border border-white/10 rounded-full h-10 px-4 text-xs font-semibold text-muted-foreground focus:ring-[#bf5728] hover:bg-white/5 transition-all">
                  <SelectValue placeholder="Education" />
                </SelectTrigger>
                <SelectContent>
                  {metadata.education.map((education) => (
                    <SelectItem key={education.value} value={education.label}>
                      {education.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(formData.sector || formData.location || formData.education || formData.skills) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFormData({ skills: "", sector: "", location: "", education: "" })}
                className="rounded-full h-10 px-4 text-xs font-semibold text-muted-foreground hover:text-white hover:bg-white/5 transition-all"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Featured Internships (when !hasSearched) */}
      {!hasSearched && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-left mb-8 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white tracking-tight">Featured Internships</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {isFeaturedLoading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <Card key={idx} className="bg-[#1c1c24]/50 border border-white/5 p-6 rounded-xl animate-pulse h-[250px] flex flex-col justify-between" />
              ))
            ) : (
              featuredInternships.map((job) => {
                const companyName = job.company.toLowerCase()
                let logoComponent = (
                  <div className="p-1.5 bg-[#bf5728]/10 rounded-lg border border-[#bf5728]/25 text-[#bf5728]">
                    <Target className="w-5 h-5" />
                  </div>
                )

                if (companyName.includes("google")) {
                  logoComponent = (
                    <svg className="w-7 h-7" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )
                } else if (companyName.includes("microsoft")) {
                  logoComponent = (
                    <div className="grid grid-cols-2 gap-0.5 w-6 h-6 shrink-0">
                      <div className="bg-[#F25022] w-2.5 h-2.5" />
                      <div className="bg-[#7FBA00] w-2.5 h-2.5" />
                      <div className="bg-[#00A4EF] w-2.5 h-2.5" />
                      <div className="bg-[#FFB900] w-2.5 h-2.5" />
                    </div>
                  )
                } else if (companyName.includes("amazon")) {
                  logoComponent = (
                    <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.8 17.8c-1.3 1.1-3 1.7-4.9 1.7-3.7 0-6.4-2.2-6.4-6 0-4.3 3.3-6.6 7.4-6.6 1.4 0 2.8.3 3.8.8v7.2c-.3 1.2-1.3 2.1-2.4 2.1-1.3 0-2.1-.9-2.1-2.1v-3.7c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6v3.7c0 2.8 1.9 4.7 4.7 4.7 1.8 0 3.3-.9 4.1-2.2v.9c0 .9.7 1.6 1.6 1.6s1.6-.7 1.6-1.6v-7c0-4.4-3.1-6.7-8.1-6.7-5.1 0-8.8 2.9-8.8 8.4 0 5.1 3.2 8.3 8.3 8.3 2.6 0 5-.9 6.8-2.5.6-.5.6-1.4.1-1.9s-1.4-.6-2 .1z" fill="white" />
                      <path d="M21.2 21.2c-5.5 3.3-12.9 3.3-18.4 0-.6-.3-.8-1.1-.5-1.7.3-.6 1.1-.8 1.7-.5 4.7 2.8 11 2.8 15.7 0 .6-.3 1.4-.1 1.7.5.3.6.1 1.4-.5 1.7z" fill="#bf5728"/>
                    </svg>
                  )
                }

                return (
                  <Card key={job.id} className="bg-[#1c1c24]/50 border border-white/5 p-6 rounded-xl hover:border-white/10 transition-all flex flex-col justify-between h-full group">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        {logoComponent}
                        <span className="text-muted-foreground font-semibold text-sm line-clamp-1">{job.company}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2 h-14">{job.title}</h3>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-6">
                        <MapPin className="w-4 h-4 text-[#bf5728] shrink-0" />
                        <span className="line-clamp-1">{job.location}</span>
                      </div>
                    </div>
                    {job.id.toString().startsWith("feat-") ? (
                      <Button 
                        variant="outline" 
                        onClick={() => handleFeaturedSearch(job.title, job.sector, job.location, job.education, job.skills)}
                        className="w-full border-border hover:bg-accent text-foreground dark:border-white/10 dark:text-white dark:hover:bg-white/5 font-medium rounded-lg py-2.5 h-auto transition-all"
                      >
                        View Details
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        asChild
                        className="w-full border-border hover:bg-accent text-foreground dark:border-white/10 dark:text-white dark:hover:bg-white/5 font-medium rounded-lg py-2.5 h-auto transition-all"
                      >
                        <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
                          View Details
                        </a>
                      </Button>
                    )}
                  </Card>
                )
              })
            )}
          </div>
        </div>
      )}

      {/* Recommendations Section (when hasSearched) */}
      {hasSearched && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Your Personalized Recommendations
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {recommendations.length > 0
                ? `We found ${recommendations.length} internships that perfectly match your profile`
                : "No recommendations found. Try adjusting your criteria for better results."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendations.map((internship) => (
              <Card
                key={internship.id}
                className="group glass-card glass-card-hover flex flex-col justify-between h-full"
              >
                <div>
                  <CardHeader className="pb-4 relative">
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {internship.title}
                      </CardTitle>
                      <div className="shrink-0 flex flex-col items-end">
                        <div className="inline-flex items-center gap-1.5 bg-[#bf5728]/10 text-[#bf5728] border border-[#bf5728]/25 px-3 py-1.5 rounded-full text-sm font-bold shadow-sm shadow-[#bf5728]/5">
                          <Sparkles className="w-3.5 h-3.5" />
                          {internship.matchScore}%
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-muted-foreground font-semibold text-base">{internship.company}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {internship.breakdown && (
                      <div className="space-y-4 bg-background/30 border border-border/30 rounded-xl p-4">
                        <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">
                          Match Strength Breakdown
                        </h4>
                        <div className="space-y-3">
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-medium">
                              <span className="flex items-center gap-1.5 text-muted-foreground">
                                <Target className="w-3.5 h-3.5 text-emerald-500" />
                                Skills Match
                              </span>
                              <span className="font-mono">{Math.round(internship.breakdown.skillScore)} / 50</span>
                            </div>
                            <div className="w-full bg-muted/60 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                                style={{ width: `${(internship.breakdown.skillScore / 50) * 100}%` }}
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-medium">
                              <span className="flex items-center gap-1.5 text-muted-foreground">
                                <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                                Sector Relevance
                              </span>
                              <span className="font-mono">{Math.round(internship.breakdown.sectorScore)} / 20</span>
                            </div>
                            <div className="w-full bg-muted/60 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-violet-500 h-full rounded-full transition-all duration-500" 
                                style={{ width: `${(internship.breakdown.sectorScore / 20) * 100}%` }}
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-medium">
                              <span className="flex items-center gap-1.5 text-muted-foreground">
                                <MapPin className="w-3.5 h-3.5 text-sky-500" />
                                Location Fit
                              </span>
                              <span className="font-mono">{Math.round(internship.breakdown.locationScore)} / 20</span>
                            </div>
                            <div className="w-full bg-muted/60 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-sky-500 h-full rounded-full transition-all duration-500" 
                                style={{ width: `${(internship.breakdown.locationScore / 20) * 100}%` }}
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-medium">
                              <span className="flex items-center gap-1.5 text-muted-foreground">
                                <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                                Education Alignment
                              </span>
                              <span className="font-mono">{Math.round(internship.breakdown.educationScore)} / 10</span>
                            </div>
                            <div className="w-full bg-muted/60 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                                style={{ width: `${(internship.breakdown.educationScore / 10) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2.5 text-sm">
                      {internship.sector && (
                        <div className="flex items-center justify-between p-2.5 bg-muted/30 border border-border/10 rounded-lg">
                          <span className="text-muted-foreground flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            Sector
                          </span>
                          <span className="font-medium text-foreground text-right">{internship.sector}</span>
                        </div>
                      )}
                      {internship.location && (
                        <div className="flex items-center justify-between p-2.5 bg-muted/30 border border-border/10 rounded-lg">
                          <span className="text-muted-foreground flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
                            <MapPin className="w-3.5 h-3.5 text-primary" />
                            Location
                          </span>
                          <span className="font-medium text-foreground text-right">{internship.location}</span>
                        </div>
                      )}
                      {internship.education && (
                        <div className="flex items-center justify-between p-2.5 bg-muted/30 border border-border/10 rounded-lg">
                          <span className="text-muted-foreground flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
                            <GraduationCap className="w-3.5 h-3.5 text-primary" />
                            Education
                          </span>
                          <span className="font-medium text-foreground text-right">{internship.education}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </div>

                <CardContent className="pt-0 pb-6 space-y-4">
                  <div className="space-y-4 pt-2">
                    {internship.applyLink && (
                      <Button
                        asChild
                        className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold shadow-md hover:shadow-emerald-500/10 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                        size="lg"
                      >
                        <a
                          href={internship.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-4.5 h-4.5" />
                          Apply Now
                        </a>
                      </Button>
                    )}

                    <div className="space-y-2">
                      <div className="text-center text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                        Was this recommendation useful?
                      </div>

                      <div className="flex justify-between gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFeedback(internship.id, "useful")}
                          className="flex-1 h-9 rounded-lg text-xs font-medium text-emerald-600 hover:text-emerald-500 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/20 transition-all border border-transparent hover:border-emerald-500/20"
                        >
                          <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                          Useful
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFeedback(internship.id, "not_useful")}
                          className="flex-1 h-9 rounded-lg text-xs font-medium text-rose-600 hover:text-rose-500 hover:bg-rose-500/10 dark:hover:bg-rose-500/20 transition-all border border-transparent hover:border-rose-500/20"
                        >
                          <XCircle className="w-3.5 h-3.5 mr-1.5" />
                          Not Useful
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFeedback(internship.id, "applied")}
                          className="flex-1 h-9 rounded-lg text-xs font-medium text-sky-600 hover:text-sky-500 hover:bg-sky-500/10 dark:hover:bg-sky-500/20 transition-all border border-transparent hover:border-sky-500/20"
                        >
                          <Bookmark className="w-3.5 h-3.5 mr-1.5" />
                          Applied
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Why InternFind? Section */}
      <div className="border-t border-white/5 bg-[#18181b]/30 py-16 mt-24 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-12 tracking-tight">Why InternFind?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-[#eab308]/10 rounded-full mb-4 border border-[#eab308]/20 animate-pulse-subtle">
                <Shield className="w-7 h-7 text-[#eab308]" />
              </div>
              <span className="font-semibold text-white text-lg">Verified Listings</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="p-4 bg-[#bf5728]/10 rounded-full mb-4 border border-[#bf5728]/20 animate-pulse-subtle">
                <Rocket className="w-7 h-7 text-[#bf5728]" />
              </div>
              <span className="font-semibold text-white text-lg">Fast Application</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="p-4 bg-[#10b981]/10 rounded-full mb-4 border border-[#10b981]/20 animate-pulse-subtle">
                <MousePointer className="w-7 h-7 text-[#10b981]" />
              </div>
              <span className="font-semibold text-white text-lg">Smart Recommendation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0a0a0d] py-12 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a href="/about" className="text-muted-foreground hover:text-white text-sm transition-colors">About</a>
            <a href="/contact" className="text-muted-foreground hover:text-white text-sm transition-colors">Contact</a>
            <a href="/privacy" className="text-muted-foreground hover:text-white text-sm transition-colors">Privacy</a>
          </div>

        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 text-center md:text-left">
          <p className="text-xs text-muted-foreground">© InternFind. All Rights reserved.</p>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}


