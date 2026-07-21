import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { FACULTY } from "@/lib/department-data";
import { ExternalLink, Mail } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: "Faculty — Department of CSE, GIST" },
      { name: "description", content: "Meet the 27 faculty members of the Department of Computer Science & Engineering at GIST — professors, associate and assistant professors." },
      { property: "og:title", content: "Faculty — Department of CSE, GIST" },
    ],
  }),
  component: FacultyPage,
});

const ROLES = ["All", "Professor & HoD", "Associate Professor", "Assistant Professor"] as const;

function FacultyPage() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState<(typeof ROLES)[number]>("All");

  const list = useMemo(() => {
    return FACULTY.filter((f) => {
      const roleOk = role === "All" || f.designation === role;
      const qOk = q.trim() === "" || (f.name + f.qualification).toLowerCase().includes(q.toLowerCase());
      return roleOk && qOk;
    });
  }, [q, role]);

  return (
    <PageShell
      eyebrow="People"
      title="Faculty of Computer Science & Engineering"
      description="27 experienced educators and researchers driving teaching, research and mentorship across UG and PG programs."
      crumbs={[{ label: "Faculty" }]}
    >
      <div className="container-page py-12">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {ROLES.map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`rounded-full px-4 py-2 text-xs font-medium border transition-colors ${role === r ? "bg-navy text-white border-navy" : "border-border bg-card hover:border-navy"}`}
              >
                {r}
              </button>
            ))}
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or qualification…"
            className="w-full sm:w-72 rounded-full border border-border bg-card px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
          />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((f) => {
            const initials = f.name.replace(/^(Dr\.|Mr\.|Ms\.)\s*/, "").split(" ").map((n) => n[0]).slice(0, 2).join("");
            return (
              <article key={f.slug} className="rounded-2xl border border-border bg-card p-5 hover:border-navy hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-navy text-gold font-serif text-lg">{initials}</div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg text-navy-deep leading-snug">{f.name}</h3>
                    <div className="text-xs text-gold uppercase tracking-widest mt-0.5">{f.designation}</div>
                    <div className="text-xs text-muted-foreground mt-1">{f.qualification}</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs">
                  <span className="text-muted-foreground">Sl. No. {f.sno}</span>
                  <a href={f.profileUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-navy hover:underline">
                    Profile <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {list.length === 0 && (
          <div className="mt-10 text-center text-muted-foreground">No faculty match your search.</div>
        )}

        <div className="mt-14 rounded-2xl border border-border bg-surface p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-serif text-lg text-navy-deep">Reach the department</div>
            <div className="text-sm text-muted-foreground">Write to the HoD for academic, research or partnership queries.</div>
          </div>
          <a href="mailto:csehod@gist.edu.in" className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm text-white hover:bg-navy-deep transition-colors">
            <Mail className="h-4 w-4" /> csehod@gist.edu.in
          </a>
        </div>
      </div>
    </PageShell>
  );
}