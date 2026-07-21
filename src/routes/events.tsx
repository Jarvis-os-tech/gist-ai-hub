import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { EVENTS } from "@/lib/department-data";
import { CalendarDays } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — CSE, GIST" },
      { name: "description", content: "Events, workshops, and technical fests organised by the Department of CSE, GIST and its student association VOICE." },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const grouped = EVENTS.reduce<Record<string, typeof EVENTS>>((acc, e) => {
    (acc[e.year] ??= [] as any).push(e);
    return acc;
  }, {});
  const years = Object.keys(grouped).sort().reverse();
  return (
    <PageShell
      eyebrow="Association & Activities"
      title="Events & VOICE association"
      description="The department's student association VOICE hosts technical quizzes, coding contests, tech fests and mentoring programmes each semester."
      crumbs={[{ label: "Events" }]}
    >
      <div className="container-page py-14">
        <div className="relative border-l-2 border-border ml-3 space-y-8">
          {years.map((year) => (
            <div key={year} className="relative">
              <div className="absolute -left-[15px] top-1 grid h-6 w-6 place-items-center rounded-full bg-navy text-gold">
                <CalendarDays className="h-3 w-3" />
              </div>
              <div className="ml-6">
                <div className="text-xs uppercase tracking-widest text-gold font-semibold">Academic Year</div>
                <h2 className="font-serif text-2xl text-navy-deep">{year}</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {grouped[year].map((e, i) => (
                    <li key={i} className="rounded-xl border border-border bg-card p-4">
                      <div className="text-sm font-medium text-navy-deep">{e.title}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{e.date} · {e.level}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}