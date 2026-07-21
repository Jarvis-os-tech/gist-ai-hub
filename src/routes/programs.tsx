import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { DEPARTMENT, PROGRAMMES, DOWNLOADS } from "@/lib/department-data";
import { Download, GraduationCap, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — CSE, GIST" },
      { name: "description", content: "B.Tech and M.Tech programs offered by the Department of CSE at GIST — CSE, CSE (AI & ML), AI & Data Science and M.Tech CSE." },
    ],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  return (
    <PageShell
      eyebrow="Academics"
      title="Programmes offered"
      description="Four programmes designed to prepare students for careers and higher study in Computer Science, AI/ML and Data Science."
      crumbs={[{ label: "Programs" }]}
    >
      <div className="container-page py-14 space-y-14">
        <div className="grid gap-6 md:grid-cols-2">
          {PROGRAMMES.map((p) => (
            <article key={p.title} className="rounded-2xl border border-border bg-card p-6 flex flex-col">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-semibold">
                <GraduationCap className="h-4 w-4" /> {p.level}
              </div>
              <h3 className="mt-3 font-serif text-2xl text-navy-deep">{p.title}</h3>
              <div className="mt-4 flex gap-6 text-sm">
                <div>
                  <div className="font-serif text-3xl text-navy">{p.intake}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Sanctioned intake</div>
                </div>
                <div>
                  <div className="font-serif text-3xl text-navy">{p.duration.split(" ")[0]}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Years</div>
                </div>
              </div>
              <ul className="mt-5 space-y-2 text-sm text-foreground/85 flex-1">
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" /> Autonomous curriculum aligned with JNTUA</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" /> Outcome-based education (COs, POs, PSOs)</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" /> Industry certifications via CISCO, Oracle Academy, EduSkills</li>
              </ul>
            </article>
          ))}
        </div>

        <div>
          <h2 className="font-serif text-2xl text-navy-deep">Curriculum & syllabus</h2>
          <p className="text-muted-foreground mt-2 text-sm max-w-2xl">Course structures and syllabi for the current and recent autonomous regulations.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {DOWNLOADS.filter((d) => d.category.startsWith("Syllabus")).map((d) => (
              <li key={d.title} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-xs text-gold uppercase tracking-widest">{d.category}</div>
                  <div className="text-sm font-medium text-navy-deep truncate">{d.title}</div>
                </div>
                <a href={d.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-xs text-navy hover:underline shrink-0">
                  <Download className="h-3 w-3" /> Open
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl bg-navy-deep text-white p-8 md:p-12">
          <div className="text-xs uppercase tracking-widest text-gold-soft">Program Educational Objectives</div>
          <h2 className="mt-2 font-serif text-3xl">What our graduates go on to do.</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {DEPARTMENT.peos.map((p, i) => (
              <li key={i} className="rounded-xl bg-white/5 border border-white/10 p-4 text-sm text-white/85">{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </PageShell>
  );
}