import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { Sparkles, SendHorizonal, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Assistant — CSE, GIST" },
      { name: "description", content: "Chat with the CSE Department AI Assistant — trained only on official department information." },
    ],
  }),
  component: ChatPage,
});

const SUGGESTIONS = [
  "Who is the Head of Department?",
  "List all faculty members",
  "What laboratories does the department have?",
  "What programs are offered?",
  "Tell me about research areas",
  "How do I contact the department?",
];

const INITIAL: UIMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Hello! I'm the **CSE Department AI Assistant** at Geethanjali Institute of Science & Technology.\n\nAsk me about **faculty, programs, laboratories, research, downloads, events, or how to reach the department**. I only use information from the official department page.",
      },
    ],
  },
];

function ChatPage() {
  const { messages, sendMessage, status } = useChat({
    id: "cse-ai-page",
    messages: INITIAL,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    if (!busy) inputRef.current?.focus();
  }, [busy]);
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
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 flex flex-col">
        <section className="border-b border-border bg-navy-deep text-white">
          <div className="container-page py-10 flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-gold shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-gold-soft font-semibold">AI Assistant</div>
              <h1 className="mt-1 font-serif text-3xl md:text-4xl">Ask the CSE Department anything.</h1>
              <p className="mt-2 text-white/70 max-w-2xl text-sm">Grounded on the official GIST department page. If a detail isn't published, the assistant will say so.</p>
            </div>
          </div>
        </section>

        <div className="container-page flex-1 grid lg:grid-cols-[1fr_260px] gap-8 py-8">
          <div className="flex flex-col rounded-2xl border border-border bg-card min-h-[60vh]">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5">
              {messages.map((m) => {
                const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
                const isUser = m.role === "user";
                return (
                  <div key={m.id} className={cn("flex", isUser ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                      isUser ? "bg-navy text-white rounded-br-sm" : "bg-secondary text-foreground rounded-bl-sm"
                    )}>
                      {isUser ? (
                        <p className="whitespace-pre-wrap">{text}</p>
                      ) : (
                        <div className="prose prose-sm max-w-none prose-headings:font-serif prose-p:my-1.5 prose-li:my-0.5 prose-a:text-navy">
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
            <form
              onSubmit={(e) => { e.preventDefault(); submit(input); }}
              className="border-t border-border p-4 flex items-end gap-2"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(input); }
                }}
                rows={1}
                placeholder="Ask about faculty, labs, research, downloads…"
                className="flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 max-h-40"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="grid h-10 w-10 place-items-center rounded-lg bg-navy text-white disabled:opacity-50 hover:bg-navy-deep transition-colors"
                aria-label="Send"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
              </button>
            </form>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-xs uppercase tracking-widest text-gold font-semibold">Try asking</div>
              <ul className="mt-3 space-y-2">
                {SUGGESTIONS.map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => submit(s)}
                      disabled={busy}
                      className="text-left w-full text-sm rounded-lg border border-border px-3 py-2 hover:border-navy hover:bg-secondary transition-colors disabled:opacity-50"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5 text-xs text-muted-foreground">
              <div className="font-semibold text-navy-deep mb-1">About this assistant</div>
              Grounded solely on the department's official information. No chat history is stored — refreshing starts a new session.
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}