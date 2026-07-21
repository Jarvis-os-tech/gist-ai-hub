import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { DEPARTMENT, MOUS } from "@/lib/department-data";
import { Handshake, Sparkles } from "lucide-react";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research & Collaborations — CSE, GIST" },
      { name: "description", content: "Research areas, industry MoUs and collaborations at the Department of CSE, GIST." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <PageShell
      eyebrow="Research"
      title="Where our work lives."
      description="The department actively engages with industry through consultancy, internships and research collaborations across ten focus areas."
      crumbs={[{ label: "Research" }]}
    >
      <div className="container-page py-14 space-y-14">
        <section>
          <div className="flex items-center gap-2 text-navy">
            <Sparkles className="h-4 w-4 text-gold" />
            <h2 className="font-serif text-2xl text-navy-deep">Focus areas</h2>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DEPARTMENT.researchAreas.map((r) => (
              <div key={r} className="rounded-xl border border-border bg-card p-5">
                <div className="font-serif text-lg text-navy-deep">{r}</div>
                <div className="mt-1 text-xs text-muted-foreground uppercase tracking-widest">Active area</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 text-navy">
            <Handshake className="h-4 w-4 text-gold" />
            <h2 className="font-serif text-2xl text-navy-deep">Memorandums of Understanding</h2>
          </div>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">Active and past MoUs enabling training, internships, certifications and joint research.</p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-surface text-xs uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="text-left p-4">Partner</th>
                  <th className="text-left p-4 hidden md:table-cell">Scope</th>
                  <th className="text-left p-4">Validity</th>
                </tr>
              </thead>
              <tbody>
                {MOUS.map((m, i) => (
                  <tr key={m.partner} className={i % 2 ? "bg-card" : ""}>
                    <td className="p-4 font-medium text-navy-deep">{m.partner}</td>
                    <td className="p-4 text-foreground/80 hidden md:table-cell">{m.scope}</td>
                    <td className="p-4 text-muted-foreground whitespace-nowrap">{m.validity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PageShell>
  );
}