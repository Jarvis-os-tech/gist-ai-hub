import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { DEPARTMENT } from "@/lib/department-data";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Department of CSE, GIST" },
      {
        name: "description",
        content:
          "Contact the Department of Computer Science & Engineering at GIST — address, phone, email and official links.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Get in Touch"
      description="Reach the Department of Computer Science & Engineering at Geethanjali Institute of Science & Technology for academic, research, or partnership enquiries."
      crumbs={[{ label: "Contact" }]}
    >
      <div className="container-page" style={{ paddingTop: 40, paddingBottom: 72 }}>
        <div style={{ display: "grid", gap: 32, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {/* Contact Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "var(--navy-deep)" }}>
              Department Contact
            </h2>

            {[
              {
                Icon: MapPin,
                label: "Address",
                value: DEPARTMENT.contact.address,
                href: `https://maps.google.com/?q=${encodeURIComponent(DEPARTMENT.contact.address)}`,
                linkLabel: "View on Maps",
              },
              {
                Icon: Phone,
                label: "Phone",
                value: DEPARTMENT.contact.phone,
                href: `tel:${DEPARTMENT.contact.phone}`,
                linkLabel: "Call",
              },
              {
                Icon: Mail,
                label: "HOD Email",
                value: DEPARTMENT.contact.email,
                href: `mailto:${DEPARTMENT.contact.email}`,
                linkLabel: "Send Email",
              },
            ].map(({ Icon, label, value, href, linkLabel }) => (
              <div
                key={label}
                style={{
                  display: "flex", gap: 16, padding: "20px 22px",
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)", alignItems: "flex-start",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div
                  style={{
                    width: 44, height: 44, borderRadius: "var(--radius-md)",
                    background: "var(--gist-orange-10)", display: "grid",
                    placeItems: "center", color: "var(--gist-orange)", flexShrink: 0,
                  }}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.6 }}>{value}</div>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    style={{ fontSize: 13, color: "var(--gist-orange)", fontWeight: 600, textDecoration: "none", marginTop: 6, display: "inline-block" }}
                  >
                    {linkLabel} →
                  </a>
                </div>
              </div>
            ))}

            {/* HOD Card */}
            <div
              style={{
                background: "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%)",
                borderRadius: "var(--radius-xl)",
                padding: 24, color: "#fff",
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--gold-soft)", marginBottom: 14 }}>
                Head of Department
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "var(--gist-orange)",
                    display: "grid", placeItems: "center",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 20, fontWeight: 700, color: "#fff", flexShrink: 0,
                  }}
                >
                  {DEPARTMENT.hod.name.split(" ").filter(w => !["Dr.", "Mr.", "Ms."].includes(w)).map(w => w[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17 }}>{DEPARTMENT.hod.name}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{DEPARTMENT.hod.designation}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{DEPARTMENT.hod.qualification}</div>
                  <a
                    href={`mailto:${DEPARTMENT.hod.email}`}
                    style={{ fontSize: 13, color: "var(--gold-soft)", marginTop: 6, display: "block" }}
                  >
                    {DEPARTMENT.hod.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "var(--navy-deep)", marginBottom: 24 }}>
              Useful Links
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Official CSE Department Page", url: "https://gist.edu.in/gist/computer-science-and-engineering/" },
                { label: "GIST Official Website", url: "https://gist.edu.in/gist/" },
                { label: "GIST Contact Us", url: "https://gist.edu.in/gist/contact-us/" },
                { label: "GIST Location & Maps", url: "https://gist.edu.in/gist/location-and-maps/" },
                { label: "GIST NAAC Reports", url: "https://gist.edu.in/gist/naac/" },
                { label: "GIST NBA Reports", url: "https://gist.edu.in/gist/nba-3/" },
                { label: "AICTE Approvals", url: "https://gist.edu.in/gist/a-i-c-t-e/" },
                { label: "GIST Campus Tour (YouTube)", url: "https://www.youtube.com/watch?v=cGGjMT91-CQ" },
                { label: "Anti-Ragging Cell", url: "https://gist.edu.in/gist/antiragging/" },
                { label: "Online Certificate Verification", url: "https://gist.edu.in/gist/verification-of-certificates/" },
              ].map(({ label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    gap: 12, padding: "14px 18px",
                    background: "var(--surface)", border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    fontSize: 14, color: "var(--text-body)", textDecoration: "none",
                    transition: "var(--transition)",
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--gist-orange)";
                    (e.currentTarget as HTMLElement).style.color = "var(--gist-orange)";
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-body)";
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{label}</span>
                  <ExternalLink size={13} style={{ flexShrink: 0 }} />
                </a>
              ))}
            </div>

            {/* Social Media */}
            <div style={{ marginTop: 28, padding: "20px", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "var(--navy-deep)", marginBottom: 14 }}>
                Follow GIST
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {[
                  { label: "Facebook", url: DEPARTMENT.socialMedia.facebook },
                  { label: "Twitter", url: DEPARTMENT.socialMedia.twitter },
                  { label: "YouTube", url: DEPARTMENT.socialMedia.youtube },
                  { label: "Instagram", url: DEPARTMENT.socialMedia.instagram },
                ].map(({ label, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "7px 16px", borderRadius: 999,
                      background: "var(--navy-deep)", color: "#fff",
                      fontSize: 13, fontWeight: 600, textDecoration: "none",
                    }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}