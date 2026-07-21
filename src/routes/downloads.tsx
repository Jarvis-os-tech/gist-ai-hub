import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { DOWNLOADS } from "@/lib/department-data";
import { Download } from "lucide-react";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads — CSE, GIST" },
      { name: "description", content: "Syllabus, academic calendars, regulations and course outcomes — Department of CSE, GIST." },
    ],
  }),
  component: DownloadsPage,
});

function DownloadsPage() {
  const groups = DOWNLOADS.reduce<Record<string, typeof DOWNLOADS>>((acc, d) => {
    (acc[d.category] ??= [] as any).push(d);
    return acc;
  }, {});
  return (
    <PageShell
      eyebrow="Resources"
      title="Downloads"
      description="Official CSE course structures, syllabi, academic calendars, regulations and course outcomes."
      crumbs={[{ label: "Downloads" }]}
    >
      <div className="container-page py-14 space-y-10">
        {Object.entries(groups).map(([cat, items]) => (
          <section key={cat}>
            <h2 className="font-serif text-xl text-navy-deep">{cat}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {items.map((d) => (
                <li key={d.title} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between gap-4">
                  <div className="min-w-0 text-sm font-medium text-navy-deep truncate">{d.title}</div>
                  <a href={d.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-xs text-navy hover:underline shrink-0">
                    <Download className="h-3 w-3" /> Open
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p className="text-xs text-muted-foreground">All documents open on the official GIST website. Files marked with regulation codes (RG22/RG23/PRG25) correspond to the department's autonomous regulations.</p>
      </div>
    </PageShell>
  );
}