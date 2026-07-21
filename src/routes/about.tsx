import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { DEPARTMENT } from "@/lib/department-data";
import { Target, Compass, GraduationCap, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Department of CSE, GIST" },
      { name: "description", content: `About the Department of CSE at ${DEPARTMENT.institute} — established 2008, vision, mission, PEOs, PSOs and research focus.` },
      { property: "og:title", content: "About the Department of CSE — GIST" },
      { property: "og:description", content: "Established 2008, 27 faculty, 8 labs. Vision, mission, PEOs and PSOs." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell
      eyebrow="About the Department"
      title="Molding tomorrow's technocrats since 2008."
      description={DEPARTMENT.about[0]}
      crumbs={[{ label: "About" }]}
    >
      <div className="container-page py-16 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {DEPARTMENT.about.map((p, i) => (
            <p key={i} className="text-lg text-foreground/85 leading-relaxed first:text-xl first:text-navy-deep">{p}</p>
          ))}

          <div className="grid gap-6 sm:grid-cols-2 mt-10">
            <Card icon={Compass} title="Vision">{DEPARTMENT.vision}</Card>
            <Card icon={Target} title="Mission">
              <ol className="mt-2 space-y-2 list-decimal list-inside">
                {DEPARTMENT.mission.map((m, i) => <li key={i}>{m}</li>)}
              </ol>
            </Card>
          </div>

          <div className="mt-8">
            <SectionTitle icon={GraduationCap}>Program Educational Objectives (PEOs)</SectionTitle>
            <ul className="mt-4 grid gap-3">
              {DEPARTMENT.peos.map((p, i) => (
                <li key={i} className="rounded-xl border border-border bg-card p-4 text-sm text-foreground/85">{p}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <SectionTitle icon={Award}>Program Specific Outcomes (PSOs)</SectionTitle>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {DEPARTMENT.psos.map((p, i) => (
                <li key={i} className="rounded-xl border border-border bg-card p-4 text-sm text-foreground/85">{p}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 sticky top-24">
            <div className="text-xs uppercase tracking-widest text-gold font-semibold">Head of Department</div>
            <div className="mt-2 font-serif text-xl text-navy-deep">{DEPARTMENT.hod.name}</div>
            <div className="text-sm text-muted-foreground">{DEPARTMENT.hod.designation}</div>
            <div className="mt-3 text-sm">
              <div><span className="text-muted-foreground">Experience:</span> {DEPARTMENT.hod.experience}</div>
              <a href={`mailto:${DEPARTMENT.hod.email}`} className="text-navy hover:underline">{DEPARTMENT.hod.email}</a>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-xs uppercase tracking-widest text-gold font-semibold">Memberships & Chapters</div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {DEPARTMENT.memberships.map((m) => (
                <li key={m} className="rounded-full bg-secondary px-3 py-1 text-xs">{m}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-xs uppercase tracking-widest text-gold font-semibold">Institute</div>
            <p className="mt-3 text-sm text-muted-foreground">{DEPARTMENT.institute}</p>
            <p className="mt-1 text-xs text-muted-foreground">{DEPARTMENT.accreditation}</p>
            <p className="mt-1 text-xs text-muted-foreground">{DEPARTMENT.affiliation}</p>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

function SectionTitle({ icon: Icon, children }: { icon: any; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-gold" />
      <h2 className="font-serif text-2xl text-navy-deep">{children}</h2>
    </div>
  );
}

function Card({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 text-navy">
        <Icon className="h-4 w-4" />
        <div className="text-xs uppercase tracking-widest font-semibold">{title}</div>
      </div>
      <div className="mt-3 text-foreground/85">{children}</div>
    </div>
  );
}