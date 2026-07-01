import { NextResponse } from "next/server"

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY

export async function POST(request) {
  try {
    const body = await request.json()
    const { skills, sector, location, education } = body

    let internships = []

    if (ADZUNA_APP_ID && ADZUNA_APP_KEY && ADZUNA_APP_ID !== "xxxxxxxx") {
      try {
        // Resolve country code (in for India, us for US/Remote)
        let country = "in"
        const locLower = (location || "").toLowerCase()
        if (
          locLower.includes("ca") ||
          locLower.includes("usa") ||
          locLower.includes("california") ||
          locLower.includes("united states") ||
          locLower.includes("mountain view") ||
          locLower.includes("remote") ||
          locLower.includes("work from home")
        ) {
          country = "us"
        }

        // Construct Adzuna search URL
        let url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=10&what=internship`

        if (skills) {
          url += `&what_and=${encodeURIComponent(skills)}`
        }
        if (location && !locLower.includes("remote") && !locLower.includes("home") && !locLower.includes("online")) {
          url += `&where=${encodeURIComponent(location)}`
        }

        const response = await fetch(url, {
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(10000),
        })

        if (response.ok) {
          const data = await response.json()
          const results = data.results || []
          
          internships = results.map((job) => ({
            id: job.id,
            title: cleanHtml(job.title),
            company: job.company?.display_name || "Adzuna Partner",
            location: job.location?.display_name || "Remote",
            sector: job.category?.label || sector || "Technology",
            education: education || "Bachelor's degree",
            applyLink: job.redirect_url,
            description: cleanHtml(job.description)
          }))
        } else {
          console.error("Adzuna API response error:", response.status)
        }
      } catch (err) {
        console.error("Failed to fetch from Adzuna API, falling back to local recommendation generator:", err)
      }
    }

    // Fallback/Simulated recommendation generator if API results are empty or keys are missing
    if (internships.length === 0) {
      internships = getFallbackInternships(sector, location)
    }

    // Calculate match scores dynamically based on user profile
    const scoredRecommendations = internships.map((intern) => {
      const breakdown = calculateMatchBreakdown(intern, { skills, sector, location, education })
      const matchScore = breakdown.skillScore + breakdown.sectorScore + breakdown.locationScore + breakdown.educationScore
      
      return {
        ...intern,
        matchScore: Math.round(matchScore),
        breakdown
      }
    })

    // Sort by matchScore descending
    scoredRecommendations.sort((a, b) => b.matchScore - a.matchScore)

    // Return the top 6 recommendations
    return NextResponse.json({ recommendations: scoredRecommendations.slice(0, 6) })
  } catch (error) {
    console.error("[v0] Error in API route:", error)
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 })
  }
}

function cleanHtml(text) {
  if (!text) return ""
  return text.replace(/<\/?[^>]+(>|$)/g, "").replace(/&nbsp;/g, " ")
}

function calculateMatchBreakdown(job, userProfile) {
  const { skills, sector, location, education } = userProfile
  
  // 1. Skills score (out of 50)
  let skillScore = 10 // base score
  if (skills) {
    const userSkills = skills.split(",").map(s => s.trim().toLowerCase()).filter(Boolean)
    const content = `${job.title} ${job.description || ""}`.toLowerCase()
    
    if (userSkills.length > 0) {
      let matches = 0
      userSkills.forEach(skill => {
        if (content.includes(skill)) matches++
      })
      skillScore = 10 + Math.round((matches / userSkills.length) * 40)
    }
  }

  // 2. Sector score (out of 20)
  let sectorScore = 5
  if (sector) {
    const sectorLower = sector.toLowerCase()
    const content = `${job.sector} ${job.title} ${job.description || ""}`.toLowerCase()
    if (content.includes(sectorLower)) {
      sectorScore = 20
    } else {
      sectorScore = 10 // partial relevance
    }
  }

  // 3. Location score (out of 20)
  let locationScore = 5
  if (location) {
    const locLower = location.toLowerCase()
    const jobLocLower = job.location.toLowerCase()
    if (locLower === "remote" || locLower === "work from home" || locLower === "online") {
      if (jobLocLower.includes("remote") || jobLocLower.includes("home") || jobLocLower.includes("online")) {
        locationScore = 20
      } else {
        locationScore = 15 // remote preference fits most
      }
    } else if (jobLocLower.includes(locLower)) {
      locationScore = 20
    } else {
      locationScore = 8 // different location
    }
  }

  // 4. Education score (out of 10)
  let educationScore = 5
  if (education) {
    const eduLower = education.toLowerCase()
    const content = `${job.description || ""}`.toLowerCase()
    if (content.includes(eduLower)) {
      educationScore = 10
    } else if (eduLower.includes("btech") || eduLower.includes("mtech") || eduLower.includes("bca") || eduLower.includes("mca")) {
      if (content.includes("engineering") || content.includes("science") || content.includes("technical") || content.includes("developer")) {
        educationScore = 8 // technical degree match
      }
    }
  }

  return {
    skillScore,
    sectorScore,
    locationScore,
    educationScore
  }
}

function getFallbackInternships(selectedSector, selectedLocation) {
  const sector = selectedSector || "Software Development"
  const location = selectedLocation || "Bangalore"
  
  return [
    {
      id: "mock-1",
      title: "Full-Stack Web Developer Intern",
      company: "InnovateTech Labs",
      location: location,
      sector: sector,
      education: "Pursuing CS/IT Degree",
      applyLink: "#",
      description: "Looking for an enthusiastic intern with skills in HTML, CSS, React, and Node.js. Join our fast-paced startup team."
    },
    {
      id: "mock-2",
      title: "Data Science & Analytics Intern",
      company: "Quantum Analytics Group",
      location: location,
      sector: "Data Science",
      education: "B.Tech/MCA/MSC Statistics",
      applyLink: "#",
      description: "Work on real-world business intelligence problems using Python, SQL, Pandas, and machine learning models."
    },
    {
      id: "mock-3",
      title: "Associate Product Designer (UI/UX) Intern",
      company: "CreativeFlow Design Co.",
      location: "Remote",
      sector: "Design",
      education: "Design Graduate or equivalent",
      applyLink: "#",
      description: "Collaborate with product managers and engineers to build wireframes, user flows, and high-fidelity layouts in Figma."
    },
    {
      id: "mock-4",
      title: "Digital Marketing & Growth Intern",
      company: "Sprint Media Group",
      location: location,
      sector: "Marketing",
      education: "Marketing/Business Graduate",
      applyLink: "#",
      description: "Manage social media campaigns, analyze website SEO keyword performance, and structure high-converting content marketing plans."
    },
    {
      id: "mock-5",
      title: "Python Software Engineer Intern",
      company: "ByteForge Solutions",
      location: "Remote",
      sector: "Software Development",
      education: "B.Tech/BCA",
      applyLink: "#",
      description: "Assist in developing secure RESTful APIs using Python, Django, and Flask. Write clean backend unit tests and document integrations."
    },
    {
      id: "mock-6",
      title: "Financial Analyst Intern",
      company: "Capital Growth Partners",
      location: location,
      sector: "Finance",
      education: "Finance Graduate / MBA desirable",
      applyLink: "#",
      description: "Support our analysts in valuation research, financial modeling, market trends collection, and drafting investor pitches."
    }
  ]
}
