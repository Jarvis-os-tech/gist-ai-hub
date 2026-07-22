import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DEPARTMENT } from "@/lib/department-data";
import { getAccurateDepartmentReply } from "@/components/site/AIChatWidget";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Assistant — CSE, GIST" },
      {
        name: "description",
        content:
          "Chat with the CSE Department AI Assistant — trained only on official department information.",
      },
    ],
  }),
  component: ChatPage,
});

interface Message {
  id: string;
  text: string;
  from: "user" | "bot";
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
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
    <div className="min-h-screen flex flex-col bg-[#eef1f6] font-sans">
      <SiteHeader />

      <main className="flex-1 flex flex-col container-page py-6 md:py-8 max-w-4xl mx-auto w-full">
        <div className="flex-1 flex flex-col rounded-[16px] bg-white overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.25)] min-h-[600px] h-[calc(85vh-100px)]">
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
              <button onClick={handleReset} title="Restart chat" aria-label="Restart chat">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10" />
                  <polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable body */}
          <div className="cse-body" ref={bodyRef}>
            <div className="cse-welcome max-w-2xl mx-auto">
              <div className="cse-welcome-title">👋 Welcome!</div>
              <div className="cse-welcome-text">Ask me about faculty, programs, laboratories, placements, events, or department information.</div>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="cse-quick-label">Quick Actions</div>
              <div className="cse-quick-grid">
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

              <div className="cse-messages">
                {messages.map((m) => (
                  <div key={m.id} className={`cse-msg ${m.from}`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
                  </div>
                ))}
                {isTyping && <div className="cse-msg bot">Searching official records…</div>}
              </div>
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
            <div className="flex items-center gap-[10px] max-w-2xl mx-auto w-full">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about faculty, labs, placements..."
              />
              <button type="submit" id="cse-send" aria-label="Send">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="cse-footer">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8a94a6" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Temporary session. Grounded on official GIST records.
          </div>
        </div>
      </main>

      <SiteFooter />

      <style>{`
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
        .cse-quick-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:10px; margin-bottom:8px; }
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
        .cse-input-row input {
          flex:1; border:1.5px solid #d7deea; border-radius:22px; padding:10px 16px;
          font-size:13.5px; outline:none; background:#fff; color:#1a2440;
        }
        .cse-input-row input:focus { border-color:#0d2a5a; }
        #cse-send {
          width:38px; height:38px; border-radius:50%; border:none; background:#0d2a5a; cursor:pointer;
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
        }
        #cse-send:hover { background:#153a78; }

        .cse-footer {
          display:flex; align-items:center; gap:6px; justify-content:center;
          font-size:11px; color:#8a94a6; padding:8px 12px 14px; background:#fff;
        }
      `}</style>
    </div>
  );
}