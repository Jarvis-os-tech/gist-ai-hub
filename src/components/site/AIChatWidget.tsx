import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  DEPARTMENT,
  FACULTY,
  LABORATORIES,
  MOUS,
  PROGRAMMES,
  ROLL_OF_HONOUR,
  VOICE_EVENTS,
} from "@/lib/department-data";

interface Message {
  id: string;
  text: string;
  from: "user" | "bot";
}

export function openAIChatWidget() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-ai-chat"));
  }
}

// Grounded Data Retrieval function matching official GIST Department records
export function getAccurateDepartmentReply(queryText: string): string {
  const t = queryText.toLowerCase().trim();

  // Guardrail for Unwanted / Off-Topic Queries
  const unwantedKeywords = [
    "weather", "recipe", "cook", "food", "movie", "film", "song", "sing", "music", "joke", "story",
    "cricket", "football", "match", "game", "gaming", "playstation", "xbox", "election",
    "politics", "president", "prime minister", "crypto", "bitcoin", "stock", "trading",
    "relationship", "dating", "love", "hack", "password", "bypass", "illegal", "drug",
    "alcohol", "gambling", "casino", "weapon", "bomb", "kill", "die", "horoscope", "astrology"
  ];

  if (unwantedKeywords.some((kw) => t.includes(kw))) {
    return `⚠️ **I won't be able to help you with that type of query.**\n\nI am the official **CSE Department Assistant for GIST** and I am specialized strictly in helping with department information, faculty, laboratories, academic programs, placements, events, and college details.`;
  }

  // Greetings & Conversational Queries
  if (t === "hi" || t === "hello" || t === "hey" || t.includes("good morning") || t.includes("good afternoon") || t.includes("good evening") || t.includes("greetings")) {
    return `👋 **Hello!** I am the official AI Assistant for the **Department of Computer Science & Engineering (CSE)** at **GIST**.\n\nHow can I help you today? You can ask me about:\n- 👥 Faculty & HOD details\n- 🎓 B.Tech & M.Tech programmes\n- 🧪 Computer & NVIDIA AI Labs\n- 🏆 Placements & Roll of Honour\n- 🤝 MOUs & Industry Collaborations\n- 📅 VOICE Events & Workshops\n- 📞 Department Contact & Codes`;
  }

  // Who are you / Identity Queries
  if (t.includes("who are you") || t.includes("what is your name") || t.includes("tell me about yourself") || t.includes("about you") || t.includes("introduce yourself")) {
    return `🤖 **I am the CSE Department Assistant**\n\nI am an AI assistant designed to provide official and accurate information regarding the **Department of Computer Science & Engineering** at **Geethanjali Institute of Science and Technology (GIST)**.\n\nAll my responses are grounded directly in verified department records!`;
  }

  // What can you do / Capabilities Queries
  if (t.includes("what can you do") || t.includes("how can you help") || t.includes("help me") || t.includes("features") || t.includes("options")) {
    return `💡 **Here is what I can do for you:**\n\n1. **Faculty Information:** Lookup any of our 49 faculty members, HOD profiles, and qualifications.\n2. **Academic Programmes:** Details on B.Tech & M.Tech intakes, durations, and specializations.\n3. **Laboratories:** Configurations and incharges for all 8 labs (including NVIDIA AI Lab).\n4. **Placements & Toppers:** Information on CGPA toppers and placement records.\n5. **Industry Collaborations:** Active MOUs (Codegnan, EduSkills, Cisco, Oracle).\n6. **Events & Contact:** VOICE student association events, EAPCET code (\`GTNN\`), and contact info.`;
  }

  // Thank you Queries
  if (t.includes("thank") || t.includes("thanks") || t.includes("great") || t.includes("awesome")) {
    return `😊 **You're very welcome!** Feel free to ask if you have any more questions about the CSE Department at GIST. Have a great day!`;
  }

  // HOD query
  if (t.includes("hod") || t.includes("head of department") || t.includes("lakshmana rao") || t.includes("who is the head")) {
    const hod = DEPARTMENT.hod;
    return `### 👨‍🏫 Head of Department (HOD)\n\n- **Name:** ${hod.name}\n- **Designation:** ${hod.designation}\n- **Qualification:** ${hod.qualification}\n- **Email:** [${hod.email}](mailto:${hod.email})\n- **Profile:** [View HOD Profile](${hod.profileUrl})`;
  }

  // Faculty query
  if (t.includes("faculty") || t.includes("professor") || t.includes("teacher") || t.includes("staff")) {
    const matched = FACULTY.find((f) => t.includes(f.name.toLowerCase()) || f.name.toLowerCase().split(" ").some(part => part.length > 3 && t.includes(part)));
    if (matched) {
      return `### 👤 Faculty Profile\n\n- **Name:** ${matched.name}\n- **Designation:** ${matched.designation}\n- **Qualification:** ${matched.qualification}${matched.profileUrl ? `\n- **Official Page:** [View Faculty Page](${matched.profileUrl})` : ""}`;
    }
    
    const topFaculty = FACULTY.slice(0, 8).map((f) => `- **${f.name}** (${f.designation}, ${f.qualification})`).join("\n");
    return `### 👥 CSE Department Faculty\n\nThe department has **49 full-time faculty members**.\n\n**Key Faculty Members:**\n${topFaculty}\n\n🔗 [View Full Faculty List (49 Members)](https://gist.edu.in/gist/computer-science-and-engineering/)`;
  }

  // Programs query
  if (t.includes("program") || t.includes("b.tech") || t.includes("btech") || t.includes("m.tech") || t.includes("mtech") || t.includes("course") || t.includes("intake") || t.includes("specialization")) {
    const ug = PROGRAMMES[0];
    const pg = PROGRAMMES[1];
    return `### 🎓 Academic Programmes\n\n1. **${ug.title} (UG)**\n   - **Duration:** ${ug.duration}\n   - **Intake:** ${ug.intake} seats\n\n2. **${pg.title} (PG)**\n   - **Duration:** ${pg.duration}\n   - **Intake:** ${pg.intake} seats\n\n**Specializations:** Artificial Intelligence, Machine Learning, Data Science, Cyber Security, Cloud Computing, & IoT.\n\n🔗 [View Syllabus & Course Structure](https://gist.edu.in/gist/computer-science-and-engineering/)`;
  }

  // Labs query
  if (t.includes("lab") || t.includes("laboratory") || t.includes("nvidia") || t.includes("computer") || t.includes("hardware")) {
    const labsList = LABORATORIES.map((l) => `- **${l.name}:** ${l.computers} Systems | *Incharge:* ${l.incharge}`).join("\n");
    return `### 🧪 Department Laboratories (${LABORATORIES.length} Labs)\n\n${labsList}\n\nAll labs have high-speed internet, UPS backup, and licensed software.\n\n🔗 [View Lab Facilities](https://gist.edu.in/gist/computer-science-and-engineering/)`;
  }

  // Placements & Toppers query
  if (t.includes("placement") || t.includes("topper") || t.includes("rank") || t.includes("cgpa") || t.includes("roll of honour")) {
    const toppers = ROLL_OF_HONOUR.slice(0, 5).map((r) => `- **${r.batch}:** ${r.name} (${r.rollNo}) — **CGPA: ${r.cgpa}**`).join("\n");
    return `### 🏆 Placements & Roll of Honour\n\nOur CSE department has strong placement records with leading IT companies.\n\n**Recent Batch Toppers:**\n${toppers}\n\n🔗 [View Placement Reports](https://gist.edu.in/gist/computer-science-and-engineering/)`;
  }

  // MOUs / Industry Collaborations
  if (t.includes("mou") || t.includes("industry") || t.includes("collaboration") || t.includes("codegnan") || t.includes("eduskills") || t.includes("cisco") || t.includes("oracle")) {
    const mousList = MOUS.map((m) => `- **${m.company}:** ${m.areas}`).join("\n");
    return `### 🤝 Industry MOUs & Collaborations\n\n${mousList}\n\nIncludes active **CSI, ACM, ISTE, CISCO Networking Academy, and ORACLE Academy** chapters.\n\n🔗 [View All MOUs](https://gist.edu.in/gist/computer-science-and-engineering/)`;
  }

  // Events & VOICE Association
  if (t.includes("event") || t.includes("voice") || t.includes("workshop") || t.includes("hackathon") || t.includes("fest") || t.includes("seminar")) {
    const eventsList = VOICE_EVENTS.slice(0, 5).map((e) => `- **${e.event}** (${e.ay}) — Date: ${e.date}`).join("\n");
    return `### 📅 Events & VOICE Association\n\n${eventsList}\n\nVOICE regularly organizes coding hackathons, guest lectures, and workshops.\n\n🔗 [View Events Gallery](https://gist.edu.in/gist/computer-science-and-engineering/)`;
  }

  // Contact / Address / Code
  if (t.includes("contact") || t.includes("address") || t.includes("phone") || t.includes("email") || t.includes("location") || t.includes("eapcet") || t.includes("eamcet") || t.includes("code")) {
    const c = DEPARTMENT.contact;
    return `### 📞 Department Contact Information\n\n- **College Codes:** EAPCET/ECET: \`${DEPARTMENT.eapcetCode}\` | APPGECET: \`${DEPARTMENT.appgecetCode}\`\n- **Address:** ${c.address}\n- **Phone:** ${c.phone}\n- **Email:** [${c.email}](mailto:${c.email})\n- **Main Website:** [https://gist.edu.in/gist/gist-home/](https://gist.edu.in/gist/gist-home/)`;
  }

  // Vision & Mission
  if (t.includes("vision") || t.includes("mission") || t.includes("about") || t.includes("gist")) {
    return `### 🏫 About CSE Department, GIST\n\n${DEPARTMENT.about[0]}\n\n**Vision:**\n> "${DEPARTMENT.vision}"\n\n🔗 [Main GIST Website](https://gist.edu.in/gist/gist-home/)`;
  }

  // Fallback for Unwanted / Unrecognized Queries
  return `⚠️ **I won't be able to help you with that type of query.**\n\nI am specialized strictly in official **GIST CSE Department** information. For general college details or other queries, please visit the official GIST website:\n👉 [https://gist.edu.in/gist/gist-home/](https://gist.edu.in/gist/gist-home/)`;
}

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOpen() {
      setOpen(true);
    }
    window.addEventListener("open-ai-chat", handleOpen);
    return () => window.removeEventListener("open-ai-chat", handleOpen);
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  async function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: trimmed,
      from: "user",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // Attempt backend API stream
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            id: m.id,
            role: m.from === "user" ? "user" : "assistant",
            parts: [{ type: "text", text: m.text }],
          })),
        }),
      });

      if (res.ok) {
        const textData = await res.text();
        if (textData && !textData.includes("API Key Required")) {
          // Cleanly parse text or stream
          const cleanedText = textData.replace(/^[0-9]+:"/g, "").replace(/"$/g, "").replace(/\\n/g, "\n");
          if (cleanedText.trim().length > 0) {
            const botMsg: Message = {
              id: (Date.now() + 1).toString(),
              text: cleanedText,
              from: "bot",
            };
            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
            return;
          }
        }
      }
    } catch {
      // Fall through to instant grounded retrieval
    }

    // Reliable Grounded Fallback Retrieval
    setTimeout(() => {
      const replyText = getAccurateDepartmentReply(trimmed);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: replyText,
        from: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 300);
  }

  function handleReset() {
    setMessages([]);
    setInput("");
  }

  return (
    <div id="cse-widget-root">
      {/* Floating launcher button */}
      <button
        id="cse-launcher"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open CSE Assistant"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      <div id="cse-panel" className={open ? "" : "hidden"}>
        {/* Header */}
        <div className="cse-header">
          <div className="cse-header-left">
            <img
              src={DEPARTMENT.logoUrl}
              alt="GIST Logo"
              className="cse-logo-img"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
            <div className="cse-logo-fallback">🌱</div>
            <div>
              <div className="cse-title">CSE Assistant</div>
              <div className="cse-subtitle">Official Department Assistant</div>
            </div>
          </div>
          <div className="cse-header-actions">
            <button id="cse-refresh" onClick={handleReset} title="Restart chat" aria-label="Restart chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
            </button>
            <button id="cse-close" onClick={() => setOpen(false)} title="Close" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable body: welcome + quick actions + messages */}
        <div className="cse-body" id="cse-body" ref={bodyRef}>
          <div className="cse-welcome">
            <div className="cse-welcome-title">👋 Welcome!</div>
            <div className="cse-welcome-text">Ask me about faculty, programs, laboratories, placements, events, or department information.</div>
          </div>

          <div className="cse-quick-label">Quick Actions</div>
          <div className="cse-quick-grid" id="cse-quick-grid">
            <button className="cse-quick-btn" onClick={() => handleSend("Tell me about the faculty")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d2a5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>Faculty</span>
            </button>

            <button className="cse-quick-btn" onClick={() => handleSend("What programs do you offer?")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d2a5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10 12 5 2 10l10 5 10-5Z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              <span>Programs</span>
            </button>

            <button className="cse-quick-btn" onClick={() => handleSend("Tell me about the laboratories")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d2a5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 2v6.4a2 2 0 0 1-.3 1L4 18a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3l-4.7-8.6a2 2 0 0 1-.3-1V2" />
                <path d="M7 15h10" />
                <path d="M9 2h6" />
              </svg>
              <span>Labs</span>
            </button>

            <button className="cse-quick-btn" onClick={() => handleSend("Tell me about placements")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d2a5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <span>Placements</span>
            </button>

            <button className="cse-quick-btn" onClick={() => handleSend("What events are coming up?")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d2a5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Events</span>
            </button>

            <button className="cse-quick-btn" onClick={() => handleSend("How can I contact the department?")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d2a5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1 .36 1.94.68 2.85a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.23-1.25a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.85.68A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Contact</span>
            </button>
          </div>

          <div className="cse-messages" id="cse-messages">
            {messages.map((m) => (
              <div key={m.id} className={`cse-msg ${m.from}`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
              </div>
            ))}
            {isTyping && <div className="cse-msg bot">Searching official records…</div>}
          </div>
        </div>

        {/* Input row */}
        <form
          className="cse-input-row"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
        >
          <input
            type="text"
            id="cse-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about faculty, labs, placements..."
          />
          <button type="submit" id="cse-send" aria-label="Send">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </button>
        </form>

        <div className="cse-footer">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8a94a6" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Temporary session. Grounded on official GIST records.
        </div>
      </div>

      <style>{`
        #cse-widget-root, #cse-widget-root * { box-sizing: border-box; }
        #cse-widget-root { position: fixed; bottom: 24px; right: 24px; z-index: 999999; font-family: 'Segoe UI', Arial, sans-serif; }

        #cse-launcher {
          width: 60px; height: 60px; border-radius: 50%; border: none; cursor: pointer;
          background: linear-gradient(135deg,#0d2a5a,#153a78);
          box-shadow: 0 8px 20px rgba(13,42,90,0.35);
          display: flex; align-items: center; justify-content: center;
          transition: transform .15s ease;
        }
        #cse-launcher:hover { transform: scale(1.06); }

        #cse-panel {
          position: absolute; bottom: 76px; right: 0;
          width: 380px; max-width: calc(100vw - 32px);
          height: 600px; max-height: calc(100vh - 120px);
          background: #ffffff; border-radius: 16px; overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.25);
          display: flex; flex-direction: column;
          transform-origin: bottom right;
          transition: opacity .18s ease, transform .18s ease;
        }
        #cse-panel.hidden { opacity: 0; transform: scale(.9); pointer-events: none; }

        .cse-header {
          background: linear-gradient(135deg,#0d2a5a,#123362);
          padding: 16px 18px; display: flex; align-items: center; justify-content: space-between; flex-shrink:0;
        }
        .cse-header-left { display:flex; align-items:center; gap:12px; }
        .cse-logo-img {
          width: 42px; height: 42px; border-radius: 50%; background:#fff; object-fit: cover; flex-shrink:0; border: 1px solid rgba(255,255,255,0.3);
        }
        .cse-logo-fallback {
          width: 42px; height: 42px; border-radius: 50%; background:#fff;
          display:none; align-items:center; justify-content:center; font-size:20px; flex-shrink:0;
        }
        .cse-title { color:#fff; font-size:17px; font-weight:700; line-height:1.2; }
        .cse-subtitle { color:#c7d2e6; font-size:12px; margin-top:2px; }
        .cse-header-actions { display:flex; gap:6px; }
        .cse-header-actions button {
          background: transparent; border:none; cursor:pointer; padding:6px; border-radius:8px;
          display:flex; align-items:center; justify-content:center;
        }
        .cse-header-actions button:hover { background: rgba(255,255,255,0.15); }

        .cse-body { flex:1; overflow-y:auto; padding:18px; }

        .cse-welcome { background:#f2f4f8; border-radius:12px; padding:16px; margin-bottom:20px; }
        .cse-welcome-title { font-weight:700; font-size:16px; color:#1a2440; margin-bottom:8px; }
        .cse-welcome-text { font-size:13.5px; color:#4a5470; line-height:1.5; }

        .cse-quick-label { font-size:13px; font-weight:600; color:#5c6680; margin-bottom:10px; }
        .cse-quick-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:8px; }
        .cse-quick-btn {
          display:flex; align-items:center; gap:8px; padding:12px 10px;
          background:#fff; border:1.5px solid #c8d2e6; border-radius:10px;
          font-size:13.5px; font-weight:600; color:#0d2a5a; cursor:pointer;
          transition: background .12s ease, border-color .12s ease;
        }
        .cse-quick-btn:hover { background:#eef2fa; border-color:#0d2a5a; }

        .cse-messages { display:flex; flex-direction:column; gap:10px; margin-top:16px; }
        .cse-msg { max-width:85%; padding:10px 13px; border-radius:12px; font-size:13.5px; line-height:1.45; word-break: break-word; }
        .cse-msg a { color: #0d2a5a; font-weight: 600; text-decoration: underline; }
        .cse-msg.user { align-self:flex-end; background:#0d2a5a; color:#fff; border-bottom-right-radius:4px; }
        .cse-msg.bot { align-self:flex-start; background:#f2f4f8; color:#1a2440; border-bottom-left-radius:4px; }

        .cse-input-row {
          display:flex; align-items:center; gap:10px; padding:12px 16px; border-top:1px solid #e7eaf1; flex-shrink:0; background:#fff;
        }
        #cse-input {
          flex:1; border:1.5px solid #d7deea; border-radius:22px; padding:10px 16px;
          font-size:13.5px; outline:none; background:#fff; color:#1a2440;
        }
        #cse-input:focus { border-color:#0d2a5a; }
        #cse-send {
          width:38px; height:38px; border-radius:50%; border:none; background:#0d2a5a; cursor:pointer;
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
        }
        #cse-send:hover { background:#153a78; }

        .cse-footer {
          display:flex; align-items:center; gap:6px; justify-content:center;
          font-size:11px; color:#8a94a6; padding:8px 12px 14px; background:#fff;
        }

        @media (max-width: 420px) {
          #cse-panel { width: calc(100vw - 24px); right: -12px; }
        }
      `}</style>
    </div>
  );
}