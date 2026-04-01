import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Send,
  Mic,
  MicOff,
  Loader2,
  Bot,
  User,
  Wand2,
  FileText,
  Target,
  TrendingUp,
  RefreshCw,
  Copy,
  Check,
  ChevronRight,
  Star,
  Zap,
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { Input } from "@/src/components/ui/Input";
import { Sidebar } from "@/src/components/ui/Sidebar";
import { BackButton } from "@/src/components/ui/BackButton";
import { cn } from "@/src/lib/utils";
import {
  PROFILE_FILL_SYSTEM_SNIPPET,
  stripProfileBlockFromAssistantText,
  applyProfileJson,
  applyLocalProfileIntents,
  formatAppliedFooter,
} from "@/src/lib/profileChatFill";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AITool {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  prompt: string;
  badge?: string;
}

const AI_TOOLS: AITool[] = [
  {
    id: "profile-fill",
    icon: <User className="h-5 w-5 text-emerald-400" />,
    title: "Fill Profile by Chat",
    description: "Tell me your name, city, bio, skills — I'll save them to My Profile",
    prompt:
      "I want to update my actor profile by chatting. Ask me one short question at a time (name, location, bio, top skills, phone optional). After I answer each, acknowledge and ask the next. When you have enough, summarize what you'll save and include the PROFILE_UPDATE JSON block with every field I gave you.",
    badge: "Chat → Profile",
  },
  {
    id: "profile-review",
    icon: <Target className="h-5 w-5 text-primary" />,
    title: "Profile Optimizer",
    description: "Get AI feedback on your actor profile to maximize casting chances",
    prompt: "Analyze my actor profile and give me specific, actionable tips to make it stand out to casting directors. Consider my bio, skills, and experience. What should I add, remove, or change to increase my match score?",
    badge: "Most Popular",
  },
  {
    id: "cover-letter",
    icon: <FileText className="h-5 w-5 text-accent" />,
    title: "Cover Letter Generator",
    description: "Generate a compelling cover letter for any audition listing",
    prompt: "Write me a compelling, professional cover letter for an audition. I'm applying for a Lead Actor role in a historical drama. My strengths are emotional depth, classical training, and 5 years of theatre experience. Make it concise (under 200 words), personalized, and memorable.",
    badge: "New",
  },
  {
    id: "script-coach",
    icon: <Wand2 className="h-5 w-5 text-emerald-400" />,
    title: "Script Coach",
    description: "Get line readings, character analysis, and performance tips",
    prompt: "Help me prepare for this audition scene. I'm playing Raja Vikram, a conflicted king who must choose between duty and compassion. Give me: 1) Character analysis, 2) Three different emotional approaches to the opening monologue, 3) Tips for connecting with the scene authentically.",
  },
  {
    id: "career-path",
    icon: <TrendingUp className="h-5 w-5 text-blue-400" />,
    title: "Career Strategist",
    description: "Get a personalized roadmap to advance your acting career",
    prompt: "I'm an actor with 3 years of experience mostly in regional theatre and one web series. I want to break into Bollywood feature films. Create a realistic 12-month career strategy for me, including which types of auditions to target, skills to develop, and networking steps.",
  },
  {
    id: "audition-prep",
    icon: <Star className="h-5 w-5 text-amber-400" />,
    title: "Audition Prep Coach",
    description: "Simulate a casting director interview to prepare you",
    prompt: "Act as a tough casting director for a Netflix original drama. Ask me 5 challenging questions you'd ask in a callback audition. After I respond to each, give me honest feedback on my answers. Start with: 'Tell me, why should I cast you specifically for this lead role?'",
  },
  {
    id: "match-analyzer",
    icon: <Zap className="h-5 w-5 text-primary" />,
    title: "Audition Match Analyzer",
    description: "Understand why you match (or don't) for specific roles",
    prompt: "Based on my profile - Hindi film actor, 28 years old, trained in Kathak dance and martial arts, 2 films and 4 web series credits, fluent in Hindi/English/Punjabi - analyze my match percentage for these types of roles: 1) Action hero, 2) Romantic lead, 3) Period drama protagonist, 4) Comic relief. Be specific about what helps and hurts each match.",
  },
];

const QUICK_PROMPTS = [
  "Fill my profile: my name is [Your Name], I'm based in Mumbai, skills: method acting, dance, Hindi & English",
  "How do I stand out in a crowded audition?",
  "What should I never do in a self-tape?",
  "How do I negotiate my first paid role?",
  "Tips for cold auditions with no preparation?",
];

export function AICastingAssistantPage() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Namaste! 🎬 I'm your AI Casting Assistant, powered by Gemini. Ask me anything—or **type details to save to your profile** (e.g. *My name is…*, *I'm based in…*, *Bio: …*, *Skills: …*). I'll store what you share so it shows on **My Profile**. What would you like to work on?",
      timestamp: new Date(),
      suggestions: QUICK_PROMPTS,
    },
  ]);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [activeToolId, setActiveToolId] = React.useState<string | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const callGemini = async (userMessage: string): Promise<string> => {
    const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || "AIzaSyDt5vbHTwUigptIdQ7I6YY8J86xjsmCQD8";

    const systemContext = `You are an expert AI Casting Assistant for Auditions Adda, India's #1 casting marketplace. You specialize in:
- Helping actors optimize profiles, write cover letters, and prepare for auditions
- Providing script coaching, character analysis, and performance tips
- Giving career strategy advice for the Indian film industry (Bollywood, OTT, regional cinema)
- Analyzing casting compatibility and match scores
- Simulating casting director interactions for practice

Keep responses concise, actionable, and specific to the Indian entertainment industry context. Use a warm, encouraging but honest tone. Format responses with clear sections when helpful.

${PROFILE_FILL_SYSTEM_SNIPPET}`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: systemContext + "\n\nUser: " + userMessage }],
              },
            ],
            generationConfig: {
              temperature: 0.8,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I couldn't generate a response. Please try again."
      );
    } catch {
      const lowerMsg = userMessage.toLowerCase();

      // Profile Fill
      if (lowerMsg.includes("update my actor profile by chatting")) {
        return `Hello! I'd love to help you fill out your profile. Let's go step by step.

**Question 1 of 5:** What is your full name as you'd like it to appear on your profile?`;
      }

      // Profile Optimizer
      if (lowerMsg.includes("analyze my actor profile") && lowerMsg.includes("match score")) {
        return `**Profile Optimization Report**

Here's what I'd improve based on top-performing actor profiles on Auditions Adda:

**Critical Fixes (do these first):**
• Add a video showreel — profiles with reels get **3x more callbacks**
• Rewrite your bio in first person, keep it under 80 words, end with a hook
• List skills with specificity: not just "dancing" — write "Bharatanatyam (12 yrs), Hip-hop, Bollywood choreography"

**Boost Your Match Score:**
• Add your age range and exact measurements — casting directors filter by these
• Upload 3–5 headshots: one neutral, one smiling, one character shot
• Specify languages + dialect fluency (e.g., "Hindi – native, English – fluent, Marathi – conversational")

**What's Working:**
• Having a verified profile already puts you ahead of 60% of actors

**Estimated score jump:** Implementing these changes typically increases your match score from 65% → 85%+.

Want help rewriting your bio or crafting your skills list?`;
      }

      // Cover Letter Generator
      if (lowerMsg.includes("cover letter")) {
        return `**Your Cover Letter — Lead Actor, Historical Drama**

---
Dear [Casting Director's Name],

I'm writing to express my deep interest in the Lead Actor role for your historical drama. With five years of classical theatre training and a strong foundation in emotional realism, I believe I can bring both authenticity and gravity to this character.

My recent work in [Production Name] required the same balance of restraint and intensity this role demands — an experience I've spent years honing through intensive Stanislavski-based training.

I would be honoured to audition at your convenience and bring this character to life for you.

Warm regards,
[Your Name]

---

**Why this works:**
• Opens with purpose, not flattery
• Ties your specific training to the role's demands
• Confident but not boastful — exactly what directors want
• Under 120 words — respects their time

Want me to rewrite this with your actual name and credits?`;
      }

      // Script Coach
      if (lowerMsg.includes("raja vikram") || lowerMsg.includes("conflicted king")) {
        return `**Script Coaching: Raja Vikram — The Conflicted King**

**Character Analysis:**
Raja Vikram is a man caught between two identities — the king his kingdom needs and the human being he actually is. His conflict is not weakness; it is the mark of a truly evolved ruler. Play the weight of both crowns.

**Three Emotional Approaches for the Opening Monologue:**

**1. Controlled Grief (restrained power)**
Speak quietly. The quieter you are, the more the audience leans in. Let one tear form — don't let it fall. This signals a man holding himself together by sheer will.

**2. Righteous Anger (duty over heart)**
Stand upright, shoulders back. Let the words come out as decisions, not feelings. You are a king first, human second — and you know it costs you everything.

**3. Broken Surrender (compassion wins)**
Slow your breathing visibly. Let the pauses be long and deliberate. This is a man choosing love over legacy — make the audience feel the exact moment he decides.

**Performance Tips:**
• Find one physical anchor — a ring, a sword hilt — that you touch only when Vikram the king speaks
• Never play "conflicted" — play the decision you've already made, and let the conflict show in what you're suppressing
• Record yourself and watch without sound first — your body should tell the story before a word is spoken

Which approach resonates most? I can drill deeper into any of the three.`;
      }

      // Career Strategist
      if (lowerMsg.includes("12-month career strategy") || lowerMsg.includes("break into bollywood")) {
        return `**Your 12-Month Bollywood Breakthrough Strategy**

**Months 1–3: Foundation**
• Audit your reel — cut it to 90 seconds max, lead with your strongest 10 seconds
• Join at least one reputed Mumbai-based acting workshop (Anupam Kher School, Barry John Acting Studio)
• Create profiles on BookMyShow Talent, Casting India, and Auditions Adda — all three

**Months 4–6: Visibility**
• Target OTT auditions (Amazon miniTV, MX Player, Zee5) — lower competition than Netflix/Prime, faster callbacks
• Submit to 3–5 short films per month — these become your new reel material
• Attend industry events: FICCI Frames, MAMI Film Festival for genuine networking

**Months 7–9: Relationships**
• Get a casting agency on your side — approach mid-tier agencies first (not top-tier, they won't respond yet)
• Assistant directors are your best friends — many become directors; be genuinely helpful to them
• Do one commercial or music video — income + industry exposure

**Months 10–12: Breakthrough Push**
• By now you should have 2–3 fresh OTT credits — use them to pitch directly to production houses
• Submit a polished package (reel + bio + press kit) to 5 target production houses

**Realistic Expectation:** Most actors who follow a structured plan land their first feature audition callback within 12–18 months. You're ahead by starting now.

Which phase do you want to plan in more detail?`;
      }

      // Audition Prep Coach
      if (lowerMsg.includes("tough casting director") || lowerMsg.includes("callback audition")) {
        return `**Casting Director Simulation — Netflix Original Drama Callback**

*[In character as casting director]*

I've seen 47 actors today. You have my attention for exactly 3 minutes. So —

**"Tell me, why should I cast YOU specifically for this lead role?"**

---

*Take your time and answer. I'll give you honest feedback after each response.*

**What I'm looking for in your answer:**
• Specificity — "I'm a good actor" tells me nothing
• Self-awareness — do you know what makes you different?
• Confidence without desperation — I can smell both from across the room

Go ahead. Impress me.`;
      }

      // Audition Match Analyzer
      if (lowerMsg.includes("kathak") || lowerMsg.includes("match percentage") || lowerMsg.includes("action hero")) {
        return `**Audition Match Analysis — Your Profile**

*Profile: Hindi film actor, 28, Kathak + martial arts trained, 2 films + 4 web series, Hindi/English/Punjabi fluent*

---

**1. Action Hero — Match: 82%**
**Helps:** Martial arts training is a major differentiator — most actors fake it, you can do it for real. Athletic build implied by training background.
**Hurts:** 2 film credits is still early — action leads typically need stronger name recognition. Build this via OTT action roles first.
**Verdict:** Target action-supporting roles now; lead roles in 18–24 months.

---

**2. Romantic Lead — Match: 78%**
**Helps:** Kathak training gives you grace, expressiveness, and screen presence that pure gym actors lack. Trilingual is a huge advantage for pan-India romantic films.
**Hurts:** 28 is ideal, but romantic leads in Bollywood currently skew younger (22–26) unless you have a breakthrough credit.
**Verdict:** Strong fit for OTT romantic dramas right now.

---

**3. Period Drama Protagonist — Match: 91%**
**Helps:** Kathak + martial arts = you can handle the physicality AND the classical bearing. This is your strongest category by far.
**Hurts:** Period dramas need studios to trust you with a big budget — credits matter more here.
**Verdict:** This is your sweet spot. Prioritize period drama auditions immediately.

---

**4. Comic Relief — Match: 55%**
**Helps:** Trilingual fluency helps with comic timing across regional films.
**Hurts:** Your training profile signals "serious actor" — comedy casting directors may not think of you first.
**Verdict:** Possible, but not where your competitive advantage lies.

---

**Top Recommendation:** Focus 70% of your audition energy on period dramas and action-support roles. These maximize your unique training advantages.

Want a tailored cover letter for a period drama audition?`;
      }

      // Keyword-aware fallback for custom questions
      if (lowerMsg.includes("headshot") || lowerMsg.includes("photo")) {
        return `**Headshot Guide for Indian Casting**

**What casting directors actually want:**
• Clean, neutral background — white or light grey works best
• Natural light or soft studio lighting — no heavy filters or editing
• Eyes sharp and in focus — this is non-negotiable
• Genuine expression — not a forced smile, not a blank stare

**Common mistakes to avoid:**
• Full-body shots as your primary headshot — face only, shoulders at most
• Sunglasses, props, or heavy makeup that obscures your features
• Low resolution or compressed images — upload minimum 1MB

**Pro tip:** Take 3 versions — natural smile, neutral/serious, and a character look. Use the neutral one as your primary on Auditions Adda.

Want help writing a bio to go alongside your headshot?`;
      }

      if (lowerMsg.includes("self-tape") || lowerMsg.includes("self tape")) {
        return `**Self-Tape Mistakes That Kill Your Chances**

**Never do these:**
• Shoot in portrait mode on your phone — always landscape
• Use a busy background — a plain wall is your best friend
• Record in bad lighting — face the window, don't sit with it behind you
• Submit your first take — do at least 5, pick the best

**Do these instead:**
• Mark your eyeline just above the lens — never look directly into camera unless instructed
• Have someone read the other lines off-screen — never read to silence
• Slate clearly: name, age, role you're reading for
• Keep it under 2 minutes unless specified otherwise

**Sound matters more than you think** — bad audio will get you rejected faster than bad acting. Use earphones as a mic if you don't have a proper one.`;
      }

      if (lowerMsg.includes("negotiat") || lowerMsg.includes("pay") || lowerMsg.includes("salary") || lowerMsg.includes("fee")) {
        return `**Negotiating Your First Paid Acting Role**

**Before the conversation:**
• Know the industry rate for your level — day rates in Hindi OTT range ₹5,000–₹25,000 for newcomers
• Never be the first to name a number — let them offer first
• Know your minimum acceptable figure before the call

**In the negotiation:**
• "What is the budget allocated for this role?" is a perfectly professional question
• If the offer is low, say: "I'm very interested in this project. Is there any flexibility on the fee?"
• Always negotiate usage rights — a commercial may pay less upfront but more in residuals

**What to never do:**
• Accept verbally without a written contract
• Negotiate via WhatsApp — get everything on email
• Work for "exposure" on a commercial production that has a budget

Your first paid role sets your rate — don't undersell it.`;
      }

      if (lowerMsg.includes("nervous") || lowerMsg.includes("anxiety") || lowerMsg.includes("confident") || lowerMsg.includes("scared")) {
        return `**Turning Audition Nerves Into Power**

What you feel as nervousness is the same physiological state as excitement — your brain just labels it differently. The fix is to relabel it.

**Before you walk in:**
• Do 2 minutes of "power posing" in the bathroom — hands on hips, chest out. Research shows this measurably reduces cortisol.
• Breathe in for 4 counts, hold for 4, out for 6. Repeat 3 times. This activates your parasympathetic nervous system.
• Say: "I'm excited" — not "I'm calm." Calm is a lie your body won't believe. Excited is the truth.

**In the room:**
• Take 3 seconds before you start — casting directors respect actors who don't rush
• If you stumble, stay in character or simply say "May I start again?" — this shows professionalism, not weakness
• Remember: they WANT you to be good. They're rooting for you to save them the search.

**The real secret:** Preparation is the only cure for nerves. The more prepared you are, the less there is to be nervous about.`;
      }

      if (lowerMsg.includes("network") || lowerMsg.includes("contact") || lowerMsg.includes("industry")) {
        return `**Building Real Industry Connections in India**

**Where to actually meet people:**
• Film festivals: MAMI (Mumbai), IFFI (Goa), Jio MAMI — attend every year without fail
• Industry workshops: these put you in a room with working directors and ADs
• Theatre productions: do them even if unpaid — industry people attend

**How to approach people:**
• Never lead with "I'm an actor looking for work" — lead with genuine interest in their work
• "I saw your last project — the way you handled [specific scene] was brilliant" opens more doors than any pitch
• Ask for 15 minutes of advice, not a job. People love giving advice.

**Online presence:**
• Instagram is the new portfolio — casting directors check it
• Post process content (rehearsals, character prep) not just results
• Tag productions when you work with them — it builds your visible network

**Follow up within 48 hours** of meeting someone. A short, specific message: "Great meeting you at [event]. The insight you shared about [topic] stuck with me."`;
      }

      if (lowerMsg.includes("bollywood") || lowerMsg.includes("ott") || lowerMsg.includes("web series") || lowerMsg.includes("film")) {
        return `**Breaking Into Bollywood & OTT — What Actually Works**

**The honest truth about Bollywood in 2025:**
• The nepotism debate is real, but OTT has genuinely levelled the playing field
• Amazon Prime, Netflix India, JioCinema, ZEE5 are actively looking for fresh faces
• A strong OTT credit now opens Bollywood doors faster than any recommendation

**Your realistic entry path:**
1. Build a reel with short films (free, but choose ones with good directors)
2. Target OTT auditions on platforms like Auditions Adda — apply to everything in your type range
3. Get a mid-tier agency once you have 2–3 credits (agents won't look at you without credits)
4. Let one OTT role lead to the next — the industry is smaller than it looks

**Who's actually casting right now:**
• Assistant Directors (ADs) cast background and supporting roles — befriend them
• Casting directors post directly on Instagram — follow and engage authentically
• Production houses have open casting calls more often than people realise

Which part of this path do you want to focus on first?`;
      }

      if (lowerMsg.includes("audition") || lowerMsg.includes("casting call") || lowerMsg.includes("role")) {
        return `**Winning the Audition Room**

**Before you walk in:**
• Know the script cold — not just your lines, but what the scene is really about
• Research the director's 3 most recent projects — mention one specifically if you get a chance
• Dress as a version of the character, not in costume — suggest, don't costume

**In the room:**
• Greet everyone, not just the director — the assistant remembers who was kind
• Listen to direction and adjust immediately — this shows coachability, which matters more than perfection
• Make a strong choice — a wrong strong choice beats a timid safe one every time

**After the audition:**
• Send a short thank-you email within 24 hours (if you have the contact)
• Don't follow up more than once — trust the process
• Book the next audition immediately — momentum is everything

**The mindset shift that changes everything:**
You're not auditioning for them — you're showing them what you'd bring to the role. Walk in as a collaborator, not a supplicant.`;
      }

      // True generic fallback — different from all of the above
      return `**Here's my honest advice on that:**

The best actors in the industry share one trait — they treat their career like a business, not a passion project. Passion gets you started; systems keep you working.

**What that looks like practically:**
• Track every audition you submit to — what you applied for, who cast it, what the outcome was
• Set a weekly goal: minimum 5 applications, 1 new industry contact, 1 skill practice session
• Review your profile monthly — outdated information costs you matches you never even know you missed

**The question I'd ask you:**
What's the one thing standing between where you are now and where you want to be in 12 months? That answer tells us exactly where to focus.

Tell me more about your current situation and I'll give you a specific, actionable plan.`;
    }
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);
    setActiveToolId(null);

    try {
      const aiResponse = await callGemini(messageText);
      const { visible, json } = stripProfileBlockFromAssistantText(aiResponse);
      let appliedLabels = applyProfileJson(json);
      const fromTyping = applyLocalProfileIntents(messageText);
      appliedLabels = [...new Set([...appliedLabels, ...fromTyping])];
      let display = visible.trim();
      if (appliedLabels.length) display += formatAppliedFooter(appliedLabels);
      if (!display.trim()) display = aiResponse.trim();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: display,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I'm having trouble connecting right now. Please check your Gemini API key in the .env file and try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyMessage = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome-new",
        role: "assistant",
        content: "Chat cleared! How can I help you with your acting career today?",
        timestamp: new Date(),
        suggestions: QUICK_PROMPTS,
      },
    ]);
  };

  const renderMessageContent = (content: string) => {
    // Simple markdown-like rendering
    const lines = content.split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={i} className="font-bold text-white mt-3 first:mt-0">
            {line.slice(2, -2)}
          </p>
        );
      }
      if (line.startsWith("• ")) {
        return (
          <p key={i} className="flex gap-2 text-white/80 ml-2">
            <span className="text-primary mt-1 flex-shrink-0">•</span>
            <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </p>
        );
      }
      if (line.startsWith("---")) {
        return <hr key={i} className="border-white/10 my-3" />;
      }
      if (line === "") return <div key={i} className="h-1" />;
      return (
        <p
          key={i}
          className="text-white/80 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
          }}
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <Sidebar />

      <main className="flex-grow md:ml-64 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-5 border-b border-white/5 bg-neutral-900/50 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-1">
              <BackButton />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold font-display">AI Casting Assistant</h1>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-white/40">Powered by Gemini AI</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="text-white/40 hover:text-white/70"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-grow overflow-hidden">
          {/* AI Tools Sidebar */}
          <div className="hidden lg:flex flex-col w-72 flex-shrink-0 border-r border-white/5 bg-neutral-900/30 overflow-y-auto p-4 gap-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-2 mb-2">
              AI Tools
            </p>
            {AI_TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  setActiveToolId(tool.id);
                  sendMessage(tool.prompt);
                }}
                className={cn(
                  "w-full text-left p-3 rounded-xl border transition-all duration-200 group",
                  activeToolId === tool.id
                    ? "bg-primary/10 border-primary/30"
                    : "bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/10"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0">{tool.icon}</div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-white truncate">
                        {tool.title}
                      </span>
                      {tool.badge && (
                        <Badge variant="secondary" className="text-[9px] py-0 px-1.5 flex-shrink-0">
                          {tool.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-[11px] text-white/40 line-clamp-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Chat Area */}
          <div className="flex flex-col flex-grow overflow-hidden">
            {/* Messages */}
            <div className="flex-grow overflow-y-auto px-4 py-6 space-y-6">
              <div className="max-w-3xl mx-auto space-y-6">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "flex gap-3",
                        message.role === "user" ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      {/* Avatar */}
                      <div
                        className={cn(
                          "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1",
                          message.role === "assistant"
                            ? "bg-gradient-to-br from-primary to-accent"
                            : "bg-neutral-700"
                        )}
                      >
                        {message.role === "assistant" ? (
                          <Bot className="h-4 w-4 text-white" />
                        ) : (
                          <User className="h-4 w-4 text-white" />
                        )}
                      </div>

                      <div
                        className={cn(
                          "flex-grow max-w-[80%] space-y-2",
                          message.role === "user" ? "items-end" : "items-start"
                        )}
                      >
                        <div
                          className={cn(
                            "rounded-2xl px-5 py-4 text-sm",
                            message.role === "assistant"
                              ? "bg-neutral-800/80 border border-white/5"
                              : "bg-primary text-white rounded-tr-sm"
                          )}
                        >
                          {message.role === "assistant" ? (
                            <div className="space-y-1">
                              {renderMessageContent(message.content)}
                            </div>
                          ) : (
                            <p>{message.content}</p>
                          )}
                        </div>

                        {/* Suggestions */}
                        {message.suggestions && message.role === "assistant" && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {message.suggestions.map((suggestion, i) => (
                              <button
                                key={i}
                                onClick={() => sendMessage(suggestion)}
                                className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-1.5"
                              >
                                <ChevronRight className="h-3 w-3 flex-shrink-0" />
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Actions */}
                        {message.role === "assistant" && message.id !== "welcome" && (
                          <button
                            onClick={() => copyMessage(message.id, message.content)}
                            className="flex items-center gap-1.5 text-[11px] text-white/30 hover:text-white/60 transition-colors mt-1"
                          >
                            {copiedId === message.id ? (
                              <>
                                <Check className="h-3 w-3" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" /> Copy
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-neutral-800/80 border border-white/5 rounded-2xl px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 text-primary animate-spin" />
                        <span className="text-sm text-white/50">Thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="flex-shrink-0 p-4 border-t border-white/5 bg-neutral-900/50 backdrop-blur-xl">
              <div className="max-w-3xl mx-auto">
                <div className="flex gap-3 items-end">
                  <div className="flex-grow relative">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      placeholder="Ask anything, or save to profile: “My name is…”, “I'm based in…”, “Bio: …”, “Skills: …”"
                      rows={1}
                      className="w-full resize-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                      style={{ minHeight: "48px", maxHeight: "120px" }}
                    />
                  </div>
                  <Button
                    onClick={() => sendMessage()}
                    disabled={!inputValue.trim() || isLoading}
                    className="h-12 w-12 rounded-xl p-0 flex-shrink-0 shadow-lg shadow-primary/20"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                <p className="text-[10px] text-white/20 mt-2 text-center">
                  AI responses are for guidance only. Always verify important decisions independently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
