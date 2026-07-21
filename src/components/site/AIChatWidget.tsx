import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Sparkles, X, SendHorizonal, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "Who is the HOD?",
  "Show the faculty list",
  "What programs does CSE offer?",
  "Tell me about the laboratories",
  "What research areas does the department focus on?",
];

const INITIAL: UIMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Hi! I'm the **CSE Department Assistant** at GIST. Ask me about faculty, programs, labs, research, downloads or events — I only use the department's official information.",
      },
    ],
  },
];

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open AI Assistant"
        className={cn(
          "fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-white shadow-lg shadow-navy/25 hover:bg-navy-deep transition-all",
          open && "opacity-0 pointer-events-none"
        )}
      >
        <Sparkles className="h-4 w-4 text-gold" />
        <span className="text-sm font-medium">Ask AI</span>
      </button>
      {open && <ChatPanel onClose={() => setOpen(false)} />}
    </>
  );
}

function ChatPanel({ onClose }: { onClose: () => void }) {
  const { messages, sendMessage, status } = useChat({
    id: "cse-ai-widget",
    messages: INITIAL,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  async function submit(text: string) {
    const t = text.trim();
    if (!t || busy) return;
    setInput("");
    await sendMessage({ text: t });
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 sm:inset-auto sm:bottom-5 sm:right-5 sm:w-[400px] max-h-[85vh] flex flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-2 border-b border-border bg-navy px-4 py-3 text-white">
        <div className="flex items-center gap-2 min-w-0">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-gold">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">CSE Assistant</div>
            <div className="text-[11px] text-white/60 truncate">Only official department info</div>
          </div>
        </div>
        <button onClick={onClose} aria-label="Close" className="rounded-md p-1 hover:bg-white/10">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((m) => {
          const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
          const isUser = m.role === "user";
          return (
            <div key={m.id} className={cn("flex", isUser ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm",
                  isUser
                    ? "bg-navy text-white rounded-br-sm"
                    : "bg-secondary text-foreground rounded-bl-sm"
                )}
              >
                {isUser ? (
                  <p className="whitespace-pre-wrap">{text}</p>
                ) : (
                  <div className="prose prose-sm max-w-none prose-headings:font-serif prose-p:my-1 prose-ul:my-1 prose-li:my-0">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {status === "submitted" && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin" /> Thinking…
          </div>
        )}
      </div>

      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => submit(s)}
              className="text-xs rounded-full border border-border bg-background px-3 py-1 hover:border-navy hover:text-navy transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
        className="border-t border-border p-3 flex items-end gap-2"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit(input);
            }
          }}
          rows={1}
          placeholder="Ask about faculty, labs, research…"
          className="flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 max-h-32"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="grid h-9 w-9 place-items-center rounded-lg bg-navy text-white disabled:opacity-50 hover:bg-navy-deep"
          aria-label="Send"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
        </button>
      </form>
    </div>
  );
}