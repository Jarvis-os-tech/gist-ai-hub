import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { Sparkles, SendHorizonal, Loader2, Info } from "lucide-react";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const busy = status === "submitted" || status === "streaming";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!busy) {
      inputRef.current?.focus();
    }
  }, [busy]);

  useEffect(() => {
    scrollToBottom();
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
        {/* Dark Navy Hero Header Section */}
        <section className="border-b border-border bg-navy-deep text-white">
          <div className="container-page py-10 flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-gold shrink-0">
              <Sparkles className="h-6 w-6 text-gold" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold-soft uppercase tracking-wider mb-2">
                <Sparkles className="h-3.5 w-3.5" /> AI Assistant
              </div>
              <h1 className="mt-1 font-serif text-3xl md:text-4xl font-bold">Ask the CSE Department anything.</h1>
              <p className="mt-2 text-white/80 max-w-2xl text-sm leading-relaxed">
                Grounded on the official GIST department page. If a detail isn't published, the assistant will say so.
              </p>
            </div>
          </div>
        </section>

        {/* Two-Column Layout */}
        <div className="container-page flex-1 grid lg:grid-cols-[1fr_260px] gap-8 py-8">
          {/* Main Stream Panel */}
          <div className="flex flex-col rounded-2xl border border-border bg-card min-h-[60vh] shadow-xs overflow-hidden">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5">
              {messages.map((m) => {
                const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
                const isUser = m.role === "user";
                return (
                  <div key={m.id} className={cn("flex", isUser ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-xs",
                        isUser
                          ? "bg-navy text-white rounded-br-xs"
                          : "bg-secondary text-foreground border border-border/50 rounded-bl-xs"
                      )}
                    >
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
              {busy && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground py-1 px-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-gold" />
                  <span>Assistant thinking…</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit(input);
              }}
              className="border-t border-border p-4 flex items-end gap-3 bg-card"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit(input);
                  }
                }}
                rows={1}
                placeholder="Ask about faculty, labs, research, downloads…"
                className="flex-1 resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 max-h-40 min-h-[44px] leading-relaxed"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-white disabled:opacity-50 hover:bg-navy-deep transition-colors shrink-0 cursor-pointer"
                aria-label="Send message"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
              </button>
            </form>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
              <div className="text-xs uppercase tracking-widest text-gold font-semibold flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Try asking
              </div>
              <ul className="mt-3 space-y-2">
                {SUGGESTIONS.map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => submit(s)}
                      disabled={busy}
                      className="text-left w-full text-sm rounded-xl border border-border px-3.5 py-2.5 hover:border-navy hover:bg-secondary transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5 text-xs text-muted-foreground leading-relaxed shadow-xs">
              <div className="font-semibold text-navy-deep mb-1 flex items-center gap-1.5 text-xs">
                <Info className="h-3.5 w-3.5 text-navy" /> About this assistant
              </div>
              Grounded solely on the department's official information. No chat history is stored — refreshing starts a new session.
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}