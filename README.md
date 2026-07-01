# Internship Recommendation Engine 
## Home Page

![Home Page](/)
🔗 **Live Demo**: [internship-recommendation-engine-two.vercel.app](https://internship-recommendation-engine-two.vercel.app/)

Ever spent hours scrolling through internship listings, only to find that most don't match what you're actually looking for? I've been there too, and that's exactly why I built this recommendation engine.

This is an **AI-powered, lightweight system** that actually understands what students and freshers need. Instead of drowning in hundreds of irrelevant postings, users get **3–5 personalized suggestions** that genuinely fit their profile—all presented in clean, mobile-friendly cards that are a breeze to browse through.

---

## 🎯 Who Can Benefit

- **🎓 Students & Recent Graduates** — tired of playing the guessing game with applications, this tool actually matches you with opportunities that align with your skills and interests
- **🏫 Universities & Career Cells** — imagine being able to offer personalized guidance to every student without the manual headache. This makes that possible
- **🌐 Career Portals & Platforms** — looking to add smart recommendations without overhauling your entire infrastructure? This integrates smoothly without demanding heavy resources

---

## 🛑 What We're Solving

Let's be honest—finding the right internship can feel like searching for a needle in a haystack. Here's what students typically face:

- A flood of irrelevant listings that waste precious time
- No easy way to filter for what actually matters to them
- A huge gap between their skills and what opportunities are looking for

This isn't just frustrating—it leads to wasted applications, missed chances, and a whole lot of disappointment. Students from remote or underrepresented areas often feel this pain even more acutely.

What we really need is a **simple, intuitive system** that cuts through the noise and makes finding opportunities feel personal and accessible again.

---

## 💡 How It Works

I've built this recommendation engine to be straightforward yet effective:

1. Users share their profile—skills, education level, what domains excite them, and where they'd like to work
2. The system represents both user profiles and internship listings as text vectors (using TF‑IDF)
3. It calculates similarity scores using cosine similarity
4. The **top 3–5 best-matching internships** rise to the top
5. Results display as clean cards with all the key details and direct "Apply Now" links
6. There's even a **feedback system**—users can mark suggestions as "useful", "not useful", or "applied"—which helps the system learn and adjust weights over time

---

## 🏗 Architecture & Stack

### Frontend (Next.js / React)

Built with Next.js and React, the frontend handles:
- An intuitive interface where users can easily input their preferences
- Displaying recommendations in an organized, scannable format
- Feedback buttons that capture user signals
- Code organized across `app/`, `components/`, `hooks/` for maintainability

### Backend & Recommendation Engine

- Runs server-side through Next.js API routes or server components
- Vectorizes internship data alongside user profiles
- Computes cosine similarity and weighted scoring
- Returns clean JSON of top matches

### Data Layer

- Internship metadata—titles, companies, domains, required skills, locations, application links, etc.
- Feedback logs tracking user responses for weight adjustments

### Deployment & Hosting

- Deployed on Vercel (works with any Node.js/Next.js-friendly platform)
- Lightweight design means no GPU requirements
- Fast response times thanks to efficient vector math and caching

---

## 🔄 Learning from Feedback

Here's where things get interesting. The system doesn't just give recommendations and call it a day—it actually learns:

- Users can provide feedback on each recommendation
- The system adjusts component weights based on what people find useful (skills match, education relevance, location fit, domain alignment)
- Over time, the engine becomes more attuned to what users actually value
- The architecture is ready for more sophisticated ranking models or reinforcement learning down the road

---

## ✅ Why This Approach Works

| Feature | Why It Matters |
|---|---|
| **Lightweight & Fast** | No expensive GPUs or complex infrastructure—keeps costs minimal |
| **Transparent & Explainable** | TF‑IDF and cosine similarity are easy to understand and explain |
| **Adaptable** | Can easily upgrade to more advanced ML later without starting from scratch |
| **Accessible** | Mobile-first design works well even in low-bandwidth situations |
| **Integration-Friendly** | Plugs into existing portals or university career sites without friction |

---

## 🛠 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/rahul-at-dev/Internship-Recommendation-Engine.git
cd internfind-internship-recommender

# Install dependencies (choose your preferred package manager)
npm install
# or
yarn install
# or
pnpm install

# Launch the development server
npm run dev
# or
yarn dev
# or
pnpm dev

# Open http://localhost:3000 in your browser to start exploring