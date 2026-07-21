import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { LABORATORIES } from "@/lib/department-data";
import { Cpu, HardDrive, User } from "lucide-react";
import labImage from "@/assets/lab-nvidia.jpg";

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "Laboratories — CSE, GIST" },
      { name: "description", content: "8 modern laboratories at the Department of CSE, GIST — including an NVIDIA Jetson lab, research lab and 4 computer labs." },
      { property: "og:image", content: "/og-labs.jpg" },
    ],
  }),
  component: LabsPage,
});

function LabsPage() {
  const total = LABORATORIES.reduce((s, l) => s + l.computers, 0);
  return (
    <PageShell
      eyebrow="Infrastructure"
      title="Eight laboratories built for real work."
      description={`Over ${total} configured systems across four computer labs, a research lab, a project lab, an additional lab, and a dedicated NVIDIA Jetson Nano AI/edge computing lab.`}
      crumbs={[{ label: "Labs" }]}
    >
      <div className="container-page py-14 grid gap-8 lg:grid-cols-[1.4fr_1fr] items-start">
        <div className="grid gap-4">
          {LABORATORIES.map((lab) => (
            <article key={lab.name} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-serif text-xl text-navy-deep">{lab.name}</h3>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><HardDrive className="h-3 w-3 text-gold" /> {lab.computers} systems</span>
                    <span className="flex items-center gap-1"><User className="h-3 w-3 text-gold" /> {lab.incharge}</span>
                  </div>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-navy/5 text-navy">
                  <Cpu className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-3 text-sm text-foreground/80">{lab.config}</p>
            </article>
          ))}
        </div>
        <aside className="rounded-2xl overflow-hidden border border-border bg-card lg:sticky lg:top-24">
          <img src={labImage} alt="NVIDIA Jetson lab at GIST CSE" className="h-56 w-full object-cover" />
          <div className="p-6">
            <div className="text-xs uppercase tracking-widest text-gold font-semibold">Featured</div>
            <h3 className="mt-2 font-serif text-xl text-navy-deep">NVIDIA Laboratory</h3>
            <p className="mt-2 text-sm text-muted-foreground">Jetson Nano developer kits, Waveshare cameras (77° FoV) and wireless dev boards support student projects in computer vision, edge AI and robotics.</p>
            <ul className="mt-4 space-y-1 text-xs text-muted-foreground">
              <li>· 30 Jetson Nano dev kits</li>
              <li>· AC8265 Wireless NIC</li>
              <li>· Camera modules with 77° FoV</li>
            </ul>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}