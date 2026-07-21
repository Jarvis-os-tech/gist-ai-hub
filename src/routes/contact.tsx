import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { DEPARTMENT } from "@/lib/department-data";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — CSE, GIST" },
      { name: "description", content: "Contact the Department of Computer Science & Engineering at Geethanjali Institute of Science & Technology." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell
      eyebrow="Get in touch"
      title="Contact the department"
      description="For admissions, academics, research collaboration or recruitment queries — reach out to the HoD's office."
      crumbs={[{ label: "Contact" }]}
    >
      <div className="container-page py-14 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <Row icon={MapPin} label="Address" value={DEPARTMENT.contact.address} />
          <Row icon={Phone} label="Phone" value={DEPARTMENT.contact.phone} href={`tel:${DEPARTMENT.contact.phone}`} />
          <Row icon={Mail} label="Email (HoD Office)" value={DEPARTMENT.contact.email} href={`mailto:${DEPARTMENT.contact.email}`} />
          <Row icon={Globe} label="Official page" value={DEPARTMENT.contact.website} href={DEPARTMENT.contact.website} />
        </div>
        <div className="rounded-2xl overflow-hidden border border-border bg-card min-h-[360px]">
          <iframe
            title="GIST location map"
            src="https://www.google.com/maps?q=Geethanjali+Institute+of+Science+and+Technology+Bommasamudram+Nellore&output=embed"
            className="h-full w-full min-h-[360px]"
            loading="lazy"
          />
        </div>
      </div>
    </PageShell>
  );
}

function Row({ icon: Icon, label, value, href }: { icon: any; label: string; value: string; href?: string }) {
  const Cmp: any = href ? "a" : "div";
  return (
    <Cmp href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noopener" className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 hover:border-navy transition-colors">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-navy/5 text-navy shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-widest text-gold font-semibold">{label}</div>
        <div className="mt-1 text-sm text-navy-deep break-words">{value}</div>
      </div>
    </Cmp>
  );
}