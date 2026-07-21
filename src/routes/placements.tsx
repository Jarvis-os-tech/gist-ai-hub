import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PLACEMENTS_NOTE } from "@/lib/department-data";
import { Info, Briefcase, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/placements")({
  head: () => ({
    meta: [
      { title: "Placements — CSE, GIST" },
      { name: "description", content: "Placements information for the Department of CSE at GIST — official statistics are maintained by the GIST Training & Placement Cell." },
    ],
  }),
  component: PlacementsPage,
});

function PlacementsPage() {
  return (
    <PageShell
      eyebrow="Careers"
      title="Placements & careers"
      description="Consolidated department placement statistics are compiled by the institute Training & Placement Cell. What is published here is drawn only from the official GIST website."
      crumbs={[{ label: "Placements" }]}
    >
      <div className="container-page py-14 space-y-10">
        <div className="rounded-2xl border border-gold/30 bg-gold-soft/30 p-6 flex gap-4">
          <Info className="h-5 w-5 text-navy shrink-0" />
          <div className="text-sm text-navy-deep">
            <div className="font-semibold">Official statistics pending</div>
            <p className="mt-1 text-foreground/80">{PLACEMENTS_NOTE}</p>
          </div>
        </div>

        <section>
          <div className="flex items-center gap-2 text-navy">
            <Briefcase className="h-4 w-4 text-gold" />
            <h2 className="font-serif text-2xl text-navy-deep">How placements work at GIST</h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { t: "Training", d: "Aptitude, coding, communication and interview preparation drives run through the pre-final and final year." },
              { t: "Certifications", d: "Access to CISCO, Oracle Academy, EduSkills, Codegnan and Great Learning tracks through department MoUs." },
              { t: "Recruitment", d: "On-campus and pool drives coordinated by the institute Training & Placement Cell." },
            ].map((s) => (
              <div key={s.t} className="rounded-xl border border-border bg-card p-5">
                <div className="text-xs uppercase tracking-widest text-gold font-semibold">{s.t}</div>
                <p className="mt-2 text-sm text-foreground/80">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-2xl border border-border bg-card p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="font-serif text-lg text-navy-deep">Recruiter or partner?</div>
            <div className="text-sm text-muted-foreground">Reach out to the department to plan a campus visit, guest lecture or training programme.</div>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm text-white hover:bg-navy-deep transition-colors">
            Get in touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </PageShell>
  );
}