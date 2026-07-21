import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { RefreshCw, X, SendHorizonal, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DEPARTMENT } from "@/lib/department-data";

const QUICK_CHIPS = [
  { label: "Faculty", prompt: "Show me the faculty list" },
  { label: "Programs", prompt: "What programs are offered?" },
  { label: "Labs", prompt: "Tell me about the laboratories" },
  { label: "Placements", prompt: "What are the placement statistics?" },
  { label: "Events", prompt: "What are the recent events?" },
  { label: "Contact", prompt: "How can I contact the department?" },
];

const INITIAL_MESSAGES: UIMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "👋 Welcome!\nAsk me anything about the CSE Department.\nExamples: Faculty • Programs • Labs • Placements • Events",
      },
    ],
  },
];

export function openAIChatWidget() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-ai-chat"));
  }
}

export function AIChatWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleOpen() {
      setOpen(true);
    }
    window.addEventListener("open-ai-chat", handleOpen);
    return () => window.removeEventListener("open-ai-chat", handleOpen);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto font-sans">
      {/* Chat Window */}
      {open && <ChatWindow onClose={() => setOpen(false)} />}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close Assistant" : "Open Assistant"}
        className="h-14 w-14 rounded-full bg-[#0F3D91] text-white shadow-xl hover:bg-[#0C3278] active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer border border-[#E5E7EB]"
      >
        {open ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <img
            src={DEPARTMENT.logoUrl}
            alt="GIST Logo"
            className="h-9 w-9 rounded-full object-cover border border-white/50 bg-white"
          />
        )}
      </button>
    </div>
  );
}

function ChatWindow({ onClose }: { onClose: () => void }) {
  const { messages, sendMessage, status, setMessages } = useChat({
    id: "cse-ai-widget-session",
    messages: INITIAL_MESSAGES,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitted" || status === "streaming";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, status]);

  async function submit(text: string) {
    const t = text.trim();
    if (!t || busy) return;
    setInput("");
    await sendMessage({ text: t });
  }

  function handleReset() {
    setMessages(INITIAL_MESSAGES);
  }

  return (
    <div className="w-[calc(100vw-2rem)] sm:w-[420px] max-w-[420px] h-[650px] max-h-[82vh] flex flex-col rounded-[20px] border border-[#E5E7EB] bg-white shadow-xl overflow-hidden animate-in fade-in duration-200 font-sans text-[#111827]">
      {/* Header Bar (72px Height, Spacious Padding) */}
      <div className="h-[72px] bg-[#0F3D91] px-5 py-4 text-white flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3.5 min-w-0">
          <img
            src={DEPARTMENT.logoUrl}
            alt="GIST Logo"
            className="h-10 w-10 rounded-full object-cover border border-white/30 shrink-0 bg-white p-0.5"
          />
          <div className="min-w-0">
            <div className="text-base font-semibold truncate leading-tight tracking-wide">CSE Assistant</div>
            <div className="text-xs text-[#E5E7EB] truncate mt-1 font-normal">Official Department Assistant</div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleReset}
            title="Refresh"
            aria-label="Refresh"
            className="rounded-full p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area with Clean Padding and Spacing */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto p-5 space-y-4 bg-white">
        {messages.map((m) => {
          const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
          const isUser = m.role === "user";

          return (
            <div key={m.id} className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                  isUser
                    ? "bg-[#0F3D91] text-white rounded-tr-xs"
                    : "bg-[#F3F4F6] text-[#111827] rounded-tl-xs"
                }`}
              >
                {isUser ? (
                  <p className="whitespace-pre-wrap">{text}</p>
                ) : (
                  <div className="prose prose-xs max-w-none text-[#111827] prose-headings:font-bold prose-headings:text-[#0F3D91] prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-a:text-[#0F3D91]">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Quick Actions (6 Outline Chips with Clean Whitespace) */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 pt-3 pb-1">
            {QUICK_CHIPS.map((chip) => (
              <button
                key={chip.label}
                onClick={() => submit(chip.prompt)}
                className="rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-xs text-[#111827] font-medium hover:border-[#0F3D91] hover:text-[#0F3D91] hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
              >
                {chip.label}
              </button>
            ))}
          </div>
        )}

        {busy && (
          <div className="flex items-center gap-2 text-xs text-[#6B7280] py-2 px-4 bg-[#F3F4F6] rounded-full max-w-fit">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-[#0F3D91]" />
            <span>Thinking…</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Sticky Bottom Form Input with Clean Spacing */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
        className="p-4 bg-white border-t border-[#E5E7EB] flex flex-col gap-2 shrink-0"
      >
        <div className="flex items-center gap-2.5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about faculty, labs, placements..."
            className="flex-1 rounded-full border border-[#E5E7EB] bg-white px-4.5 py-2.5 text-xs text-[#111827] placeholder:text-[#6B7280] focus:outline-none focus:border-[#0F3D91] focus:ring-1 focus:ring-[#0F3D91] transition-all"
          />

          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="grid h-9 w-9 place-items-center rounded-full bg-[#0F3D91] text-white disabled:opacity-40 hover:bg-[#0C3278] transition-colors shrink-0 cursor-pointer shadow-2xs"
            aria-label="Send message"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
          </button>
        </div>

        {/* Footer Notice */}
        <div className="text-[11px] text-[#6B7280] text-center pt-0.5 font-normal">
          Temporary session. Chat is cleared when closed.
        </div>
      </form>
    </div>
  );
}