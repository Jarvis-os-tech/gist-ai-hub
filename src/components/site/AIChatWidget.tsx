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
    "weather", "recipe", "cook", "food", "movie", "film", "song", "sing",
    "music", "joke", "story", "cricket", "football", "match", "game", "gaming",
    "playstation", "xbox", "election", "politics", "president", "prime minister",
    "crypto", "bitcoin", "stock", "trading", "relationship", "dating", "love",
    "hack", "password", "bypass", "illegal", "drug", "alcohol", "gambling",
    "casino", "weapon", "bomb", "kill", "die", "horoscope", "astrology",
  ];

  if (unwantedKeywords.some((kw) => t.includes(kw))) {
    return `⚠️ **Off-Topic Query**\n\nI am the official **CSE Department Assistant for GIST** and I can only help with college details, faculty, laboratories, academic programs, placements, events, and admissions.`;
  }

  // Greetings & Conversational Queries
  if (
    t === "hi" ||
    t === "hello" ||
    t === "hey" ||
    t.startsWith("hi ") ||
    t.startsWith("hello ") ||
    t.startsWith("hey ") ||
    t.includes("good morning") ||
    t.includes("good afternoon") ||
    t.includes("good evening") ||
    t.includes("greetings")
  ) {
    return `👋 **Welcome to GIST CSE Assistant!**\n\nHow can I help you today? You can ask me about:\n- 👥 **Faculty & HOD** profiles\n- 🎓 **B.Tech & M.Tech** programmes & Regulations\n- 🧪 **9 Laboratories** (including NVIDIA AI Nexus Lab)\n- 🏆 **Placements & Roll of Honour**\n- 🤝 **Industry MOUs** & Collaborations\n- 📅 **VOICE Events** & Workshops\n- 📞 **Contact & EAPCET Code (\`GTNN\`)**`;
  }

  // Who are you / Identity Queries
  if (
    t.includes("who are you") ||
    t.includes("what is your name") ||
    t.includes("tell me about yourself") ||
    t.includes("about you") ||
    t.includes("introduce yourself")
  ) {
    return `🤖 **Official GIST CSE AI Assistant**\n\nI am designed to provide instant, verified information regarding the **Department of Computer Science & Engineering** at **Geethanjali Institute of Science and Technology (GIST)**.`;
  }

  // What can you do / Capabilities Queries
  if (
    t.includes("what can you do") ||
    t.includes("how can you help") ||
    t.includes("help me") ||
    t.includes("features") ||
    t.includes("options")
  ) {
    return `💡 **How I Can Assist You:**\n- 👥 **Faculty Lookup:** Information on all 49 faculty members & HOD.\n- 🎓 **Academics & Regulations:** B.Tech intake (420 seats), M.Tech, and R20/R23 syllabus.\n- 🧪 **Laboratories:** Configurations and incharges for all 9 labs.\n- 🏆 **Placements & Toppers:** CGPA toppers and top recruiter data.\n- 🤝 **Industry MOUs:** Codegnan, Cisco, Oracle, and EduSkills partnerships.\n- 📞 **Admissions & Codes:** EAPCET Code (\`GTNN\`) and campus location.`;
  }

  // Thank you Queries
  if (t.includes("thank") || t.includes("thanks") || t.includes("great") || t.includes("awesome")) {
    return `😊 **You're very welcome!** Feel free to ask if you need anything else about the CSE Department at GIST. Have a great day!`;
  }

  // Stop words to prevent false substring matches on faculty names
  const stopWords = new Set([
    "are", "the", "and", "who", "how", "what", "where", "many", "there", "is", "of",
    "in", "to", "for", "with", "tell", "show", "list", "name", "past", "former",
    "faculty", "faculties", "faculits", "professor", "professors", "teacher", "teachers",
    "staff", "college", "dept", "department", "gist", "cse", "about", "details", "give", "located"
  ]);

  // EAPCET / College Code
  if (t.includes("eapcet") || t.includes("eamcet") || t.includes("appgecet") || (t.includes("code") && !t.includes("coding"))) {
    return `**College Admission Codes (GIST):**\n- **EAPCET / ECET / POLYCET Code:** \`${DEPARTMENT.eapcetCode}\`\n- **APPGECET Code:** \`${DEPARTMENT.appgecetCode}\``;
  }

  // Academic Regulations (Autonomous / R20 / R23)
  if (t.includes("regulation") || t.includes("r20") || t.includes("r23") || t.includes("curriculum")) {
    return `**Academic Regulations:**\n- **Status:** Autonomous (JNTUA Affiliated)\n- **Regulations:** R20 & R23 Regulations\n- **Downloads:** Detailed course structures & syllabi for all semesters are available under the Downloads page.`;
  }

  // Past / Former HOD
  if (t.includes("past hod") || t.includes("previous hod") || t.includes("former hod") || t.includes("old hod")) {
    return `Historical records for past HODs are not archived here. The current Head of Department (HOD) is **${DEPARTMENT.hod.name}** (${DEPARTMENT.hod.designation}).`;
  }

  // Faculty Count / How many faculty
  if (
    (t.includes("how many") || t.includes("count") || t.includes("total") || t.includes("number")) &&
    (t.includes("facul") || t.includes("teacher") || t.includes("staff") || t.includes("professor"))
  ) {
    return `**CSE Faculty Strength:**\n- **Total Full-Time Faculty:** **${FACULTY.length} members**\n- **Breakdown:** 1 HOD, 4 Professors, 6 Associate Professors, 38 Assistant Professors`;
  }

  // Facilities / Infrastructure
  if (
    t.includes("facility") ||
    t.includes("facilities") ||
    t.includes("facilits") ||
    t.includes("facilites") ||
    t.includes("infrastructure") ||
    t.includes("amenity") ||
    t.includes("amenities")
  ) {
    return `**CSE Department Facilities:**\n- **9 Laboratories:** 580+ High-End PCs, NVIDIA AI Workstation Lab & AI Nexus Lab\n- **ICT Classrooms:** Smart interactive digital classrooms & Seminar Halls\n- **Connectivity:** 1 Gbps High-Speed Broadband & 24/7 Power Backup\n- **Clubs & Academies:** VOICE Association, CISCO Networking Academy & Oracle Academy`;
  }

  // Establishment / History
  if (t.includes("established") || t.includes("start") || t.includes("history") || t.includes("founded") || (t.includes("year") && !t.includes("1st"))) {
    return `**Department Establishment:**\n- **Year Established:** ${DEPARTMENT.established}\n- **Growth:** Commenced in 2008 with 60 seats and expanded to 420 intake by 2024.`;
  }

  // Accreditation / Affiliation / NAAC / NBA / Autonomous
  if (
    t.includes("accreditation") ||
    t.includes("naac") ||
    t.includes("nba") ||
    t.includes("autonomous") ||
    t.includes("affiliated") ||
    t.includes("jntua") ||
    t.includes("aicte")
  ) {
    return `**Accreditation & Affiliations:**\n- **Status:** ${DEPARTMENT.accreditation}\n- **Affiliation:** Approved by AICTE, New Delhi & Affiliated to JNTUA, Anantapuramu`;
  }

  // Intake / Seats / Students
  if (t.includes("intake") || t.includes("seats") || t.includes("capacity") || t.includes("students")) {
    return `**Annual Student Intake:**\n- **B.Tech CSE (UG):** ${DEPARTMENT.currentIntakeUG} seats\n- **M.Tech CSE (PG):** ${DEPARTMENT.currentIntakePG} seats`;
  }

  // HOD query
  if (
    t.includes("hod") ||
    t.includes("head") ||
    t.includes("lakshmana rao")
  ) {
    const hod = DEPARTMENT.hod;
    return `**Head of Department (HOD):**\n- **Name:** ${hod.name}\n- **Designation:** ${hod.designation}\n- **Qualification:** ${hod.qualification}\n- **Email:** [${hod.email}](mailto:${hod.email})`;
  }

  // Location / Address / Where / Located
  if (
    t.includes("location") ||
    t.includes("located") ||
    t.includes("address") ||
    t.includes("where") ||
    t.includes("nellore")
  ) {
    const c = DEPARTMENT.contact;
    return `**Location & Contact:**\n- **Address:** ${c.address}\n- **Phone:** ${c.phone}\n- **Email:** [${c.email}](mailto:${c.email})`;
  }

  // Direct Name Search across 49 Faculty Members
  const queryTokens = t.split(/[\s,.-]+/).filter((w) => w.length >= 4 && !stopWords.has(w));
  if (queryTokens.length > 0) {
    const matchedByName = FACULTY.find((f) => {
      const fn = f.name.toLowerCase();
      return queryTokens.some((token) => fn.includes(token));
    });
    if (matchedByName) {
      return `**Faculty Profile:**\n- **Name:** ${matchedByName.name}\n- **Designation:** ${matchedByName.designation}\n- **Qualification:** ${matchedByName.qualification}\n- **Email:** [${matchedByName.email}](mailto:${matchedByName.email})`;
    }
  }

  // Faculty general query
  if (
    t.includes("faculty") ||
    t.includes("professor") ||
    t.includes("teacher") ||
    t.includes("staff")
  ) {
    const topFaculty = FACULTY.slice(0, 6)
      .map((f) => `- **${f.name}** (${f.designation})`)
      .join("\n");
    return `**CSE Faculty Roster (${FACULTY.length} Total Members):**\n${topFaculty}\n\n🔗 [View All 49 Faculty Members](https://gist.edu.in/gist/computer-science-and-engineering/)`;
  }

  // Research Areas
  if (t.includes("research") || t.includes("domain") || t.includes("area")) {
    return `**CSE Research Specializations:**\n${DEPARTMENT.researchAreas.map((r) => `- ${r}`).join("\n")}`;
  }

  // Programs query
  if (
    t.includes("program") ||
    t.includes("b.tech") ||
    t.includes("btech") ||
    t.includes("course") ||
    t.includes("specialization") ||
    t.includes("degree")
  ) {
    const ug = PROGRAMMES[0];
    return `**Academic Programmes Offered:**\n1. **${ug.title} (UG):** ${ug.duration} | Intake: ${ug.intake} seats\n2. **${PROGRAMMES[1]?.title || "M.Tech CSE"} (PG):** 2 Years | Intake: 18 seats\n\n**Specializations:** AI, Machine Learning, Data Science, Cyber Security, Cloud Computing, & IoT.`;
  }

  // Labs query
  if (
    t.includes("lab") ||
    t.includes("laboratory") ||
    t.includes("nvidia") ||
    t.includes("computer") ||
    t.includes("hardware")
  ) {
    // Specific: New Lab query
    if (t.includes("new lab") || t.includes("latest lab") || t.includes("newest lab") || t.includes("recent lab")) {
      const newLab = LABORATORIES.find((l) => l.sno === 9);
      return `**New Laboratory:**\n- **Name:** ${newLab?.name}\n- **Kits/Systems:** ${newLab?.computers}\n- **Incharge:** ${newLab?.incharge}\n- **Configuration:** ${newLab?.config}`;
    }

    // Specific: AI / NVIDIA / Nexus Lab query
    if (t.includes("ai lab") || t.includes("nvidia") || t.includes("nexus") || t.includes("ai first")) {
      const aiLabs = LABORATORIES.filter((l) => l.sno >= 8);
      return `**AI & Edge GPU Laboratories:**\n` + aiLabs.map((l) => `- **${l.name}:** ${l.computers} Systems | *Incharge:* ${l.incharge}\n  *Config:* ${l.config}`).join("\n\n");
    }

    // Specific: How many / count
    if (t.includes("how many") || t.includes("count") || t.includes("total")) {
      return `The CSE Department has **${LABORATORIES.length} state-of-the-art laboratories** (580+ total workstations).`;
    }

    // Specific: Individual Lab name/number match
    const specificLab = LABORATORIES.find((l) =>
      t.includes(l.name.toLowerCase()) ||
      t.includes(`lab ${l.sno}`) ||
      t.includes(`lab-${l.sno}`)
    );
    if (specificLab) {
      return `**${specificLab.name}:**\n- **Systems:** ${specificLab.computers}\n- **Incharge:** ${specificLab.incharge}\n- **Configuration:** ${specificLab.config}`;
    }

    // General list of all labs
    const labsList = LABORATORIES.map(
      (l) => `- **${l.name}:** ${l.computers} Systems | *Incharge:* ${l.incharge}`,
    ).join("\n");
    return `**Department Laboratories (${LABORATORIES.length} Total):**\n${labsList}`;
  }

  // Placements & Toppers query
  if (
    t.includes("placement") ||
    t.includes("topper") ||
    t.includes("rank") ||
    t.includes("cgpa") ||
    t.includes("roll of honour")
  ) {
    const toppers = ROLL_OF_HONOUR.slice(0, 5)
      .map((r) => `- **${r.batch}:** ${r.name} — **CGPA: ${r.cgpa}**`)
      .join("\n");
    return `**Batch Toppers & Roll of Honour:**\n${toppers}`;
  }

  // MOUs / Industry Collaborations
  if (
    t.includes("mou") ||
    t.includes("industry") ||
    t.includes("collaboration") ||
    t.includes("codegnan") ||
    t.includes("eduskills") ||
    t.includes("cisco") ||
    t.includes("oracle")
  ) {
    const mousList = MOUS.map((m) => `- **${m.company}:** ${m.areas}`).join("\n");
    return `**Industry MOUs & Collaborations:**\n${mousList}`;
  }

  // Events & VOICE Association
  if (
    t.includes("event") ||
    t.includes("voice") ||
    t.includes("workshop") ||
    t.includes("hackathon") ||
    t.includes("fest") ||
    t.includes("seminar")
  ) {
    const eventsList = VOICE_EVENTS.slice(0, 5)
      .map((e) => `- **${e.event}** (${e.ay}) — Date: ${e.date}`)
      .join("\n");
    return `**Recent VOICE Association Events:**\n${eventsList}`;
  }

  // Hostel & Hostal Queries (handles typos like "hostal", "hostel")
  if (t.includes("hostel") || t.includes("hostal") || t.includes("canteen") || t.includes("mess") || t.includes("stay") || t.includes("accommodation")) {
    if (t.includes("fee") || t.includes("fees") || t.includes("cost") || t.includes("charge") || t.includes("price") || t.includes("rent")) {
      return `**GIST Hostel & Mess Fees:**\n- **Accommodation:** In-campus separate hostels for boys and girls with 24/7 security, Wi-Fi, and RO water.\n- **Food & Mess:** Includes daily breakfast, lunch, evening snacks, and dinner.\n- **Fee Details & Office Contact:** Hostel fee structures depend on room configuration. For exact current year fee slabs, contact the GIST Admin/Hostel Office at **+91 9912566220** or visit [gist.edu.in](https://gist.edu.in).`;
    }
    return `**GIST Campus Hostel & Food Facilities:**\n- **Hostels:** Modern, safe, in-campus separate hostels for boys and girls.\n- **Dining & Mess:** Hygienic campus canteen offering quality meals, snacks, and beverages.\n- **Amenities:** 24/7 RO Purified Water, Wi-Fi, Resident Wardens & CCTV Security.\n\n🔗 *For hostel admissions & fee details, visit:* [gist.edu.in](https://gist.edu.in)`;
  }

  // General Tuition Fee / College Fee / Fee Structure
  if (t.includes("fee") || t.includes("fees") || t.includes("tuition") || t.includes("payment")) {
    return `**GIST Fee Structure & Payment Information:**\n- **Tuition Fee:** Standardized as per APHERMC norms for Autonomous Engineering Colleges.\n- **Convenor Quota (Category-A):** Fee reimbursement (Jagananna Vidya Deevena) applicable for eligible EAPCET rank holders.\n- **Management Quota (Category-B):** Direct seat allotment as per APSCHE guidelines.\n- **Accounts Office Contact:** For exact course-wise fee breakdowns (B.Tech, M.Tech, Bus Fee), contact the GIST Accounts Section at **+91 9912566220** or visit [gist.edu.in](https://gist.edu.in).`;
  }

  // Transport & Bus Routes
  if (t.includes("transport") || t.includes("bus") || t.includes("route") || t.includes("commute") || t.includes("travel")) {
    return `**GIST Transport & Fleet:**\n- **College Buses:** Extensive bus service covering Nellore city, Kovur, Buchireddypalem, Allur, Kavali, and surrounding mandals.\n- **Safety & Comfort:** Experienced drivers, GPS tracking, and safety compliance.\n\n🔗 *For bus routes & timings, visit:* [gist.edu.in](https://gist.edu.in)`;
  }

  // Library & Digital Resources
  if (t.includes("library") || t.includes("book") || t.includes("journal") || t.includes("ieee") || t.includes("digital library")) {
    return `**GIST Central Library:**\n- **Collection:** 30,000+ volumes of textbooks, reference books, and national/international journals.\n- **Digital Library:** High-speed internet terminals with access to IEEE, DELNET, NPTEL, and e-journals.\n- **Working Hours:** Open on all working days for students and faculty.`;
  }

  // Admissions & Counseling
  if (t.includes("admission") || t.includes("join") || t.includes("apply") || t.includes("cutoff") || t.includes("counseling")) {
    return `**GIST Admissions & Counseling:**\n- **EAPCET / ECET Code:** \`${DEPARTMENT.eapcetCode}\` | **APPGECET Code:** \`${DEPARTMENT.appgecetCode}\`\n- **Admission Quotas:** Category-A (EAPCET Convener Quota) & Category-B (Management Quota).\n- **Eligibility:** 10+2 with Physics, Chemistry & Mathematics for B.Tech.\n\n🔗 *For application guidelines & seat matrix, visit:* [gist.edu.in](https://gist.edu.in)`;
  }

  // Sports & Extracurriculars
  if (t.includes("sport") || t.includes("game") || t.includes("gym") || t.includes("playground") || t.includes("nss") || t.includes("ncc")) {
    return `**Sports & Student Life at GIST:**\n- **Grounds:** Dedicated sports fields for Cricket, Football, Volleyball, Basketball, and Track Events.\n- **Indoor Facilities:** Table Tennis, Chess, Carrom, and Gymnasium.\n- **Clubs & Events:** Active NSS unit, annual sports meets, and cultural festivals.`;
  }

  // Other branches / departments
  if (t.includes("other branch") || t.includes("other department") || t.includes("other course") || t.includes("branches") || t.includes("departments")) {
    return `**B.Tech Departments at GIST:**\n- **CSE:** Computer Science & Engineering (Intake: 420 seats)\n- **ECE:** Electronics & Communication Engineering\n- **EEE:** Electrical & Electronics Engineering\n- **CE:** Civil Engineering\n- **ME:** Mechanical Engineering\n- **H&S:** Humanities & Sciences\n\n*Note: This platform is specifically tailored for the CSE Department.*`;
  }

  // More details / More information
  if (t === "more details" || t === "more info" || t.includes("more detail") || t.includes("more information") || t.includes("tell me more")) {
    return `**GIST & CSE Department Detailed Profile:**\n- **Established:** 2008 in Gangavaram (V), Kovur (M), Nellore\n- **Accreditation:** Autonomous | NAAC 'A' Grade | NBA Accredited (ECE, EEE, ME)\n- **Affiliation:** Approved by AICTE, New Delhi & Affiliated to JNTUA, Anantapuramu\n- **EAPCET Code:** \`${DEPARTMENT.eapcetCode}\` | **APPGECET Code:** \`${DEPARTMENT.appgecetCode}\`\n- **Infrastructure:** 9 Computer & AI Labs (580+ PCs), NVIDIA Edge AI Hub, Library, ICT Classrooms\n- **Contact:** [csehod@gist.edu.in](mailto:csehod@gist.edu.in) | +91 9912566220`;
  }

  // Vision & Mission
  if (t.includes("vision") || t.includes("mission") || t.includes("peo") || t.includes("po") || t.includes("pso")) {
    return `**Department Vision:**\n> "${DEPARTMENT.vision}"\n\n**Mission:**\n${DEPARTMENT.mission.map((m, i) => `- M${i + 1}: ${m}`).join("\n")}`;
  }

  // About GIST / College Overview
  if (t.includes("about") || t.includes("gist") || t.includes("college") || t.includes("overview")) {
    return `**Geethanjali Institute of Science and Technology (GIST):**\n- **Established:** 2008 in Gangavaram, Kovur, Nellore, A.P.\n- **Status:** Autonomous Institute | NAAC 'A' Grade | NBA Accredited\n- **Affiliation:** Approved by AICTE, New Delhi & Affiliated to JNTUA\n- **Department:** ${DEPARTMENT.name} (HOD: ${DEPARTMENT.hod.name})\n- **EAPCET Code:** \`${DEPARTMENT.eapcetCode}\` | **APPGECET Code:** \`${DEPARTMENT.appgecetCode}\``;
  }

  // Helpful Clear & Informative Default Response for any GIST College / CSE query
  return `**Geethanjali Institute of Science and Technology (GIST):**\n\nI am here to help with any information regarding GIST and the CSE Department:\n\n- **HOD:** ${DEPARTMENT.hod.name} ([${DEPARTMENT.hod.email}](mailto:${DEPARTMENT.hod.email}))\n- **Campus Location:** Gangavaram (V), Kovur (M), Nellore, A.P. 524137\n- **EAPCET / ECET Code:** \`${DEPARTMENT.eapcetCode}\` | **APPGECET Code:** \`${DEPARTMENT.appgecetCode}\`\n- **Intake:** 420 seats (B.Tech CSE) | 18 seats (M.Tech CSE)\n- **Accreditation:** Autonomous | NAAC 'A' Grade | NBA Accredited\n\n💡 **Need specific information?** You can ask about:\n- 👥 **Faculty & HOD Profiles**\n- 🧪 **9 Laboratories & NVIDIA AI Hub**\n- 🏠 **Hostel, Mess & Bus Transport**\n- 🎓 **Admissions, Fees & Scholarships**\n- 🏆 **Placements, Toppers & Industry MOUs**\n\n📞 **GIST Admin Helpline:** +91 9912566220 | 🌐 [gist.edu.in](https://gist.edu.in)`;
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

    // Instant local response check for 0-delay responses (<50ms)
    const instantReply = getAccurateDepartmentReply(trimmed);
    const isDefaultFallback = instantReply.startsWith("**Geethanjali Institute of Science and Technology (GIST):**\n\nI am here to help");

    if (!isDefaultFallback) {
      setTimeout(() => {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: instantReply,
          from: "bot",
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, 50);
      return;
    }

    try {
      // Attempt backend API stream for general unmapped questions
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
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const data = await res.json();
          if (data?.content) {
            const botMsg: Message = {
              id: (Date.now() + 1).toString(),
              text: data.content,
              from: "bot",
            };
            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
            return;
          }
        }

        const textData = await res.text();
        if (textData && !textData.includes("API Key Required")) {
          let extractedText = "";
          const lines = textData.split("\n");

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith("data: ")) {
              const payload = trimmedLine.slice(6);
              if (payload === "[DONE]") continue;
              try {
                const parsed = JSON.parse(payload);
                if (parsed.type === "text-delta" && typeof parsed.delta === "string") {
                  extractedText += parsed.delta;
                } else if (parsed.type === "text" && typeof parsed.text === "string") {
                  extractedText += parsed.text;
                }
              } catch {
                if (payload && !payload.startsWith("{")) {
                  extractedText += payload;
                }
              }
            } else if (/^[0-9]+:"/.test(trimmedLine)) {
              const match = trimmedLine.match(/^[0-9]+:"(.*)"$/);
              if (match?.[1]) {
                extractedText += match[1].replace(/\\n/g, "\n").replace(/\\"/g, '"');
              }
            }
          }

          if (!extractedText.trim() && textData.trim() && !textData.includes("data: {")) {
            extractedText = textData;
          }

          if (extractedText.trim().length > 0) {
            const botMsg: Message = {
              id: (Date.now() + 1).toString(),
              text: extractedText.trim(),
              from: "bot",
            };
            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
            return;
          }
        }
      }
    } catch {
      // Fall through
    }

    // Reliable Fallback
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: instantReply,
        from: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 100);
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
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
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
            <button
              id="cse-refresh"
              onClick={handleReset}
              title="Restart chat"
              aria-label="Restart chat"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
            </button>
            <button id="cse-close" onClick={() => setOpen(false)} title="Close" aria-label="Close">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
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
            <div className="cse-welcome-text">
              Ask me about faculty, programs, laboratories, placements, events, or department
              information.
            </div>
          </div>

          <div className="cse-quick-label">Quick Actions</div>
          <div className="cse-quick-grid" id="cse-quick-grid">
            <button
              className="cse-quick-btn"
              onClick={() => handleSend("Tell me about the faculty")}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0d2a5a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>Faculty</span>
            </button>

            <button
              className="cse-quick-btn"
              onClick={() => handleSend("What programs do you offer?")}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0d2a5a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 10 12 5 2 10l10 5 10-5Z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              <span>Programs</span>
            </button>

            <button
              className="cse-quick-btn"
              onClick={() => handleSend("Tell me about the laboratories")}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0d2a5a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 2v6.4a2 2 0 0 1-.3 1L4 18a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3l-4.7-8.6a2 2 0 0 1-.3-1V2" />
                <path d="M7 15h10" />
                <path d="M9 2h6" />
              </svg>
              <span>Labs</span>
            </button>

            <button
              className="cse-quick-btn"
              onClick={() => handleSend("Tell me about placements")}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0d2a5a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <span>Placements</span>
            </button>

            <button
              className="cse-quick-btn"
              onClick={() => handleSend("What events are coming up?")}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0d2a5a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Events</span>
            </button>

            <button
              className="cse-quick-btn"
              onClick={() => handleSend("How can I contact the department?")}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0d2a5a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
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
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8a94a6"
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Temporary session. Grounded on official GIST records.
        </div>
      </div>

      <style>{`
        #cse-widget-root, #cse-widget-root * { box-sizing: border-box; }
        #cse-widget-root { position: fixed; bottom: 24px; right: 24px; z-index: 999999; font-family: 'Inter', 'Segoe UI', Arial, sans-serif; }

        #cse-launcher {
          width: 60px; height: 60px; border-radius: 50%; border: none; cursor: pointer;
          background: linear-gradient(135deg,#0d2a5a,#153a78);
          box-shadow: 0 8px 32px rgba(13,42,90,0.4);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
        }
        #cse-launcher:hover { transform: scale(1.1) translateY(-2px); box-shadow: 0 12px 40px rgba(13,42,90,0.5); }

        #cse-panel {
          position: absolute; bottom: 76px; right: 0;
          width: 380px; max-width: calc(100vw - 32px);
          height: 600px; max-height: calc(100vh - 120px);
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-radius: 20px; overflow: hidden;
          box-shadow: 0 25px 60px rgba(0,0,0,0.25);
          border: 1px solid rgba(255,255,255,0.3);
          display: flex; flex-direction: column;
          transform-origin: bottom right;
          transition: opacity .2s ease, transform .2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        #cse-panel.hidden { opacity: 0; transform: scale(.85) translateY(20px); pointer-events: none; }

        .cse-header {
          background: linear-gradient(135deg,#0d2a5a,#123362);
          padding: 16px 18px; display: flex; align-items: center; justify-content: space-between; flex-shrink:0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .cse-header-left { display:flex; align-items:center; gap:12px; }
        .cse-logo-img {
          width: 42px; height: 42px; border-radius: 50%; background:#fff; object-fit: cover; flex-shrink:0; border: 2px solid rgba(255,255,255,0.3);
        }
        .cse-logo-fallback {
          width: 42px; height: 42px; border-radius: 50%; background:#fff;
          display:none; align-items:center; justify-content:center; font-size:20px; flex-shrink:0;
        }
        .cse-title { color:#fff; font-size:17px; font-weight:700; line-height:1.2; }
        .cse-subtitle { color:#c7d2e6; font-size:12px; margin-top:2px; }
        .cse-header-actions { display:flex; gap:6px; }
        .cse-header-actions button {
          background: rgba(255,255,255,0.1); border:none; cursor:pointer; padding:6px; border-radius:8px;
          display:flex; align-items:center; justify-content:center; transition: background 0.2s ease;
        }
        .cse-header-actions button:hover { background: rgba(255,255,255,0.2); }

        .cse-body { flex:1; overflow-y:auto; padding:18px; scrollbar-width: thin; }

        .cse-welcome {
          background: linear-gradient(135deg, #f2f4f8, #e8ecf4);
          border-radius: 14px; padding: 18px; margin-bottom: 20px;
          border: 1px solid rgba(255,255,255,0.5);
        }
        .cse-welcome-title { font-weight:700; font-size:16px; color:#1a2440; margin-bottom:8px; }
        .cse-welcome-text { font-size:13.5px; color:#4a5470; line-height:1.5; }

        .cse-quick-label { font-size:13px; font-weight:600; color:#5c6680; margin-bottom:10px; }
        .cse-quick-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:8px; }
        .cse-quick-btn {
          display:flex; align-items:center; gap:8px; padding:12px 10px;
          background: rgba(255,255,255,0.8); backdrop-filter: blur(8px);
          border: 1.5px solid rgba(200,210,230,0.5); border-radius:12px;
          font-size:13.5px; font-weight:600; color:#0d2a5a; cursor:pointer;
          transition: all .15s ease;
        }
        .cse-quick-btn:hover { background:#eef2fa; border-color:#0d2a5a; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(13,42,90,0.1); }

        .cse-messages { display:flex; flex-direction:column; gap:10px; margin-top:16px; }
        .cse-msg { max-width:85%; padding:10px 13px; border-radius:14px; font-size:13.5px; line-height:1.5; word-break: break-word; }
        .cse-msg a { color: #0d2a5a; font-weight: 600; text-decoration: underline; }
        .cse-msg.user { align-self:flex-end; background:#0d2a5a; color:#fff; border-bottom-right-radius:4px; }
        .cse-msg.bot { align-self:flex-start; background:#f2f4f8; color:#1a2440; border-bottom-left-radius:4px; border: 1px solid rgba(0,0,0,0.04); }

        .cse-input-row {
          display:flex; align-items:center; gap:10px; padding:12px 16px; border-top:1px solid rgba(200,210,230,0.4); flex-shrink:0; background:transparent;
        }
        #cse-input {
          flex:1; border:1.5px solid rgba(200,210,230,0.6); border-radius:22px; padding:10px 16px;
          font-size:13.5px; outline:none; background:rgba(255,255,255,0.8); color:#1a2440; transition: all 0.2s ease;
        }
        #cse-input:focus { border-color:#0d2a5a; box-shadow: 0 0 0 3px rgba(13,42,90,0.1); background:#fff; }
        #cse-send {
          width:38px; height:38px; border-radius:50%; border:none; background:#0d2a5a; cursor:pointer;
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
          transition: all 0.2s ease;
        }
        #cse-send:hover { background:#153a78; transform: scale(1.05); }

        .cse-footer {
          display:flex; align-items:center; gap:6px; justify-content:center;
          font-size:11px; color:#8a94a6; padding:8px 12px 14px; background:transparent;
          border-top: 1px solid rgba(200,210,230,0.2);
        }

        @media (max-width: 420px) {
          #cse-panel { width: calc(100vw - 24px); right: -12px; }
        }
      `}</style>
    </div>
  );
}
