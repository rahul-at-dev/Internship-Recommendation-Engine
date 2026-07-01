import { NextResponse } from "next/server"

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY

export async function GET(request) {
  if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY || ADZUNA_APP_ID === "xxxxxxxx") {
    return NextResponse.json({ featured: getFallbackFeatured() })
  }

  try {
    // Search for Indian internship jobs as default, falling back if none found
    const response = await fetch(
      `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=3&what=internship`,
      {
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(10000),
      }
    )

    if (!response.ok) {
      throw new Error(`Adzuna API responded with status ${response.status}`)
    }

    const data = await response.json()
    const jobs = data.results || []

    const featured = jobs.map((job) => ({
      id: job.id,
      title: cleanHtml(job.title),
      company: job.company?.display_name || "Adzuna Partner",
      location: job.location?.display_name || "Remote",
      sector: job.category?.label || "General Sector",
      education: "Bachelor's or Master's degree",
      applyLink: job.redirect_url,
      description: cleanHtml(job.description),
      skills: "React, Python, Java" // default skills to trigger recommendations
    }))

    // Ensure we return exactly 3 jobs by filling in with fallbacks if needed
    if (featured.length < 3) {
      const fallbacks = getFallbackFeatured()
      const currentLength = featured.length
      for (let i = currentLength; i < 3; i++) {
        featured.push(fallbacks[i])
      }
    }

    return NextResponse.json({ featured })
  } catch (error) {
    console.error("[Adzuna Featured API Error]:", error)
    return NextResponse.json({ featured: getFallbackFeatured() })
  }
}

function cleanHtml(text) {
  if (!text) return ""
  return text.replace(/<\/?[^>]+(>|$)/g, "").replace(/&nbsp;/g, " ")
}

function getFallbackFeatured() {
  return [
    {
      id: "feat-google",
      title: "Software Engineering Intern",
      company: "Google",
      location: "Mountain View, CA",
      sector: "Software Development",
      education: "B.Tech",
      applyLink: "https://google.com/about/careers",
      skills: "React, Python, Java"
    },
    {
      id: "feat-microsoft",
      title: "Marketing Engineering Intern",
      company: "Microsoft",
      location: "Mountain View, CA",
      sector: "Marketing",
      education: "Any Graduate",
      applyLink: "https://careers.microsoft.com",
      skills: "Marketing, SEO, Content"
    },
    {
      id: "feat-amazon",
      title: "Software Engineering Intern",
      company: "Amazon",
      location: "Remote",
      sector: "Software Development",
      education: "B.Tech",
      applyLink: "https://amazon.jobs",
      skills: "Software Development, AWS, Go"
    }
  ]
}
