import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, GraduationCap, Users, FlaskConical, Award, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { AIChatWidget } from "@/components/site/AIChatWidget";
import { DEPARTMENT, QUICK_LINKS, PROGRAMMES, FACULTY } from "@/lib/department-data";
import heroImage from "@/assets/lab-computers.jpg";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Department of Computer Science & Engineering — GIST" },
      { name: "description", content: "The official portal of the Department of Computer Science & Engineering at Geethanjali Institute of Science & Technology — established 2008, 27 faculty, 8 modern labs, an AI-powered assistant." },
    ],
  }),
  component: HomePage,
});

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const duration = 1200;
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          setVal(Math.floor(p * to));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="h-full w-full object-cover" width={1200} height={800} />
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="container-page relative py-20 md:py-32 text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-gold-soft animate-fade-up">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Est. {DEPARTMENT.established} · Autonomous · NAAC ‘A’
          </div>
          <h1 className="mt-6 max-w-4xl font-serif text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] text-balance animate-fade-up">
            Computer Science & Engineering, built for what’s <span className="text-gold">next.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-white/80 animate-fade-up">
            The Department of CSE at Geethanjali Institute of Science & Technology — 27 faculty, 8 modern laboratories, research across AI, ML, Cyber Security and IoT, and an AI assistant that helps you find anything in seconds.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 animate-fade-up">
            <Link to="/about" className="inline-flex items-center gap-2 rounded-full bg-white text-navy-deep px-5 py-3 text-sm font-semibold hover:bg-gold-soft transition-colors">
              Explore the Department <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/faculty" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/15 backdrop-blur transition-colors">
              Meet the Faculty
            </Link>
            <Link to="/chat" className="inline-flex items-center gap-2 rounded-full bg-gold text-navy-deep px-5 py-3 text-sm font-semibold hover:bg-gold-soft transition-colors">
              <Sparkles className="h-4 w-4" /> Ask the AI Assistant
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-surface">
        <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-6 py-10">
          {[
            { label: "Faculty", value: DEPARTMENT.stats.faculty, icon: Users },
            { label: "UG Intake", value: DEPARTMENT.stats.studentIntakeUG, icon: GraduationCap },
            { label: "Laboratories", value: DEPARTMENT.stats.laboratories, icon: FlaskConical },
            { label: "Years of Excellence", value: DEPARTMENT.stats.yearsOfExcellence, icon: Award },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-navy/5 text-navy">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-serif text-3xl font-semibold text-navy-deep"><Counter to={s.value} />+</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK ACCESS */}
      <section className="container-page py-20">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Quick Access</div>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl text-navy-deep">Everything a visitor needs, one click away.</h2>
          </div>
          <Link to="/chat" className="text-sm text-navy hover:underline inline-flex items-center gap-1">Or ask the assistant <Sparkles className="h-3 w-3" /></Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_LINKS.map((q) => (
            <Link
              key={q.to}
              to={q.to}
              className="group rounded-2xl border border-border bg-card p-6 hover:border-navy hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-navy-deep">{q.title}</h3>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-navy group-hover:translate-x-1 transition-all" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{q.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* HOD BLURB + PROGRAMMES */}
      <section className="bg-surface border-y border-border">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-2">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">From the HoD</div>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl text-navy-deep">A department that molds tomorrow’s technocrats.</h2>
            <p className="mt-5 text-muted-foreground">{DEPARTMENT.about[0]}</p>
            <p className="mt-4 text-muted-foreground">{DEPARTMENT.about[1]}</p>
            <div className="mt-6 rounded-2xl border border-border bg-card p-5">
              <div className="text-sm font-semibold text-navy-deep">{DEPARTMENT.hod.name}</div>
              <div className="text-xs text-muted-foreground">{DEPARTMENT.hod.designation} · {DEPARTMENT.hod.experience}</div>
              <a href={`mailto:${DEPARTMENT.hod.email}`} className="text-xs text-navy hover:underline">{DEPARTMENT.hod.email}</a>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Programmes</div>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl text-navy-deep">Undergraduate & postgraduate offerings.</h2>
            <ul className="mt-6 space-y-3">
              {PROGRAMMES.map((p) => (
                <li key={p.title} className="rounded-xl border border-border bg-card p-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-widest text-gold">{p.level}</div>
                    <div className="mt-1 font-serif text-lg text-navy-deep">{p.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{p.duration}</div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-serif text-2xl text-navy">{p.intake}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Intake</div>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/programs" className="mt-6 inline-flex items-center gap-2 text-sm text-navy hover:underline">
              View all programs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FACULTY PREVIEW */}
      <section className="container-page py-20">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Faculty</div>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl text-navy-deep">Experienced educators & researchers.</h2>
          </div>
          <Link to="/faculty" className="text-sm text-navy hover:underline inline-flex items-center gap-1">All 27 members <ArrowRight className="h-3 w-3" /></Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FACULTY.slice(0, 4).map((f) => (
            <div key={f.slug} className="rounded-2xl border border-border bg-card p-5">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-navy text-gold font-serif text-lg">
                {f.name.replace(/^(Dr\.|Mr\.|Ms\.)\s*/,'').split(" ").map(n=>n[0]).slice(0,2).join("")}
              </div>
              <div className="mt-4 font-serif text-lg text-navy-deep leading-snug">{f.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{f.designation}</div>
              <div className="text-xs text-muted-foreground">{f.qualification}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AI CTA */}
      <section className="container-page pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-navy-deep px-8 py-14 md:px-16 md:py-20 text-white">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-widest text-gold-soft">
              <Sparkles className="h-3 w-3" /> Meet your CSE guide
            </div>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl">Ask anything about the department.</h2>
            <p className="mt-4 text-white/80">
              “Who is the HOD?” · “Show me the syllabus” · “What labs do you have?” · “What research areas?” — the AI assistant answers instantly using only official department information.
            </p>
            <Link to="/chat" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep hover:bg-gold-soft transition-colors">
              Open the AI Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <AIChatWidget />
    </div>
  );
}

