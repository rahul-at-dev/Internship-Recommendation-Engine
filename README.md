# Internship Recommendation Engine v2

🔗 **Live Demo**: [internship-recommender-v2.vercel.app](https://internship-recommender-v2.vercel.app)  

An **AI‑powered lightweight recommendation system** that helps students and freshers find the most relevant internships based on their **skills, education, interests, and location preferences**.

Rather than wading through hundreds of mismatched listings, users get **3–5 personalized suggestions** surfaced via a clean, mobile‑friendly card UI.

---

## 🎯 Who It’s For

- 🎓 **Students & Recent Graduates** — seeking internships aligned with their profiles  
- 🏫 **Universities / Career Cells** — to provide personalized guidance without manual effort  
- 🌐 **Career Portals & Platforms** — to integrate smart recommendations with minimal infrastructure

---

## 🛑 Problem Statement

Many internship seekers, especially from underrepresented or remote regions, struggle with:

- Overwhelming number of listings  
- Difficulty filtering by relevance  
- Low match between their skills and opportunities  

This often results in misapplications, missed opportunities, and frustration.

We need a **simple, intuitive, resource‑efficient system** to make internship discovery personalized and accessible.

---

## 💡 Solution Overview

This project implements a **lightweight recommendation engine**:

1. Collects user inputs — skills, education level, domain interests, preferred locations  
2. Represents both user profiles and internship listings as textual vectors (e.g. via TF‑IDF)  
3. Computes similarity (cosine similarity)  
4. Returns the **top 3–5 best-matching internships**  
5. Rendered in a clean card UI with details and “Apply Now” links  
6. Includes a **feedback mechanism** (“useful”, “not useful”, “applied”) to adjust weights over time

You can later evolve it (e.g. move to embeddings, rank learning, multilingual support, reinforcement learning) — but this version begins with a transparent, CPU‑efficient base.

---

## 🏗 Architecture & Stack

### Frontend (Next.js / React)

- Built with Next.js (React) and server/client rendering  
- UI for capturing user preferences, showing recommendations  
- Feedback buttons (useful / not useful / applied) to gather user signals  
- Organized under `app/`, `components/`, `hooks/`, etc. in the repo

### Backend / Recommendation Logic

- Runs on server side (Next.js API routes or server components)  
- Vectorizes internship data + user profile (TF‑IDF or similar)  
- Computes cosine similarity or weighted scoring  
- Returns JSON of top matches  

### Data Layer

- Internship metadata (title, company, domain, required skills, location, link, etc.)  
- Feedback logs (user responses) for adjusting implicit weights  

### Deployment & Hosting

- Designed to deploy on Vercel / any Node.js / Next.js–friendly platform  
- Lightweight and efficient — no GPU requirement  
- Fast response times thanks to simple vector math & caching

---

## 🔄 Feedback & Self-Learning

- Users can give feedback on recommendations  
- The system uses feedback to adjust component weights (skills match, education, location, domain)  
- Over time, the engine becomes more tuned to what users actually find relevant  
- The architecture is future‑ready to incorporate ranking models or reinforcement learning

---

## ✅ Why This Approach?

| Feature | Benefit |
|---|---|
| **Lightweight & Fast** | No GPUs, minimal infra costs |
| **Transparent & Explainable** | TF‑IDF + cosine similarity are interpretable |
| **Adaptable** | Easy to upgrade to more advanced ML later |
| **Accessible** | Mobile-first, low bandwidth, usable in under‑resourced areas |
| **Easy Integration** | Can plug into existing portals or university sites |

---

## 🛠 Getting Started (Local Setup)

```bash
# Clone the repo
git clone https://github.com/Vivan-1045/internship-recommender-v2.git
cd internship-recommender-v2

# Install dependencies
npm install
# or
yarn install
# or (if using pnpm)
pnpm install

# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev

# Open browser to http://localhost:3000 to explore
