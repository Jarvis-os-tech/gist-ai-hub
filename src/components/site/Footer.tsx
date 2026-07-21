import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import { DEPARTMENT } from "@/lib/department-data";

export function SiteFooter() {
  return (
    <footer style={{ background: "var(--navy-deep)", color: "rgba(255,255,255,0.82)", marginTop: "auto" }}>
      {/* ─── Top Grid ─── */}
      <div
        className="container-page"
        style={{
          paddingTop: 56,
          paddingBottom: 40,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 40,
        }}
      >
        {/* Brand */}
        <div style={{ gridColumn: "span 1" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <img
              src={DEPARTMENT.logoUrl}
              alt="GIST Logo"
              style={{ height: 52, width: "auto" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: "#fff" }}>
                Dept. of CSE
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                GIST · Nellore
              </div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 280 }}>
            Preparing students for a wide range of IT careers — molding tomorrow's technocrats with high caliber and commitment since {DEPARTMENT.established}.
          </p>
          {/* Socials */}
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            {[
              { href: DEPARTMENT.socialMedia.facebook, Icon: Facebook, label: "Facebook" },
              { href: DEPARTMENT.socialMedia.twitter, Icon: Twitter, label: "Twitter" },
              { href: DEPARTMENT.socialMedia.youtube, Icon: Youtube, label: "YouTube" },
              { href: DEPARTMENT.socialMedia.instagram, Icon: Instagram, label: "Instagram" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  display: "grid", placeItems: "center",
                  color: "rgba(255,255,255,0.7)",
                  transition: "var(--transition)",
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = "var(--gist-orange)"; e.currentTarget.style.color = "#fff"; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <FooterCol title="CSE Department">
          {[
            { to: "/about", label: "About Department" },
            { to: "/faculty", label: "Faculty (49 Members)" },
            { to: "/labs", label: "Laboratories" },
            { to: "/programs", label: "Course Structure & Syllabus" },
            { to: "/events", label: "Events & VOICE" },
            { to: "/research", label: "Research" },
          ]}
        </FooterCol>

        {/* Resources */}
        <FooterCol title="Resources">
          {[
            { to: "/downloads", label: "Department Calendar" },
            { to: "/downloads", label: "Newsletters (Techies Chronicle)" },
            { to: "/downloads", label: "Tech Magazine (Tech Spark)" },
            { to: "/downloads", label: "MOUs & Internships" },
            { to: "/placements", label: "Roll of Honour" },
            { to: "/gallery", label: "Gallery" },
          ]}
        </FooterCol>

        {/* Contact */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--gold-soft)", marginBottom: 16 }}>
            Contact
          </div>
          <ul style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none" }}>
            <li style={{ display: "flex", gap: 10, fontSize: 13, color: "rgba(255,255,255,0.72)", alignItems: "flex-start" }}>
              <MapPin size={14} style={{ marginTop: 2, flexShrink: 0, color: "var(--gold-soft)" }} />
              <span>{DEPARTMENT.contact.address}</span>
            </li>
            <li style={{ display: "flex", gap: 10, fontSize: 13, alignItems: "center" }}>
              <Phone size={14} style={{ flexShrink: 0, color: "var(--gold-soft)" }} />
              <a href={`tel:${DEPARTMENT.contact.phone}`} style={{ color: "rgba(255,255,255,0.72)" }}>
                {DEPARTMENT.contact.phone}
              </a>
            </li>
            <li style={{ display: "flex", gap: 10, fontSize: 13, alignItems: "center" }}>
              <Mail size={14} style={{ flexShrink: 0, color: "var(--gold-soft)" }} />
              <a href={`mailto:${DEPARTMENT.contact.email}`} style={{ color: "rgba(255,255,255,0.72)" }}>
                {DEPARTMENT.contact.email}
              </a>
            </li>
          </ul>
          <div style={{ marginTop: 20 }}>
            <a
              href={DEPARTMENT.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "8px 18px",
                background: "var(--gist-orange)",
                color: "#fff",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Visit Official Website ↗
            </a>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div
          className="container-page"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            paddingTop: 20,
            paddingBottom: 20,
            fontSize: 12,
            color: "rgba(255,255,255,0.45)",
          }}
        >
          <span>© {new Date().getFullYear()} Geethanjali Institute of Science & Technology. All Rights Reserved.</span>
          <span style={{ display: "flex", gap: 16 }}>
            <a href="https://gist.edu.in/gist/computer-science-and-engineering/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.5)" }}>Official CSE Page</a>
            <a href="https://gist.edu.in/gist/contact-us/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.5)" }}>Contact GIST</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: { to: string; label: string }[] }) {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--gold-soft)", marginBottom: 16 }}>
        {title}
      </div>
      <ul style={{ display: "flex", flexDirection: "column", gap: 8, listStyle: "none" }}>
        {children.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "color 0.15s" }}
              onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}