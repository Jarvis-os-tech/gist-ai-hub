import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { DEPARTMENT } from "@/lib/department-data";
import { ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — Department of CSE, GIST" },
      {
        name: "description",
        content:
          "Research areas, student publications, NPTEL certifications and faculty research work in the CSE Department at GIST.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const reduce = useReducedMotion();

  return (
    <PageShell
      eyebrow="Research"
      title="Research & Development"
      description="The CSE Department actively promotes research across emerging technology domains through industry-institute collaboration, student projects and faculty publications."
      crumbs={[{ label: "About", to: "/about" }, { label: "Research" }]}
    >
      <div className="container-page" style={{ paddingTop: 32, paddingBottom: 72 }}>
        {/* Navigation back to About & Downloads */}
        <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
          <a
            href="/about"
            style={{
              fontSize: 13,
              fontWeight: 700,
              padding: "8px 16px",
              borderRadius: "var(--radius-md)",
              background: "var(--surface)",
              color: "var(--navy-deep)",
              border: "1px solid var(--border)",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              textDecoration: "none",
            }}
          >
            ← Back to About Overview
          </a>
          <a
            href="/downloads"
            style={{
              fontSize: 13,
              fontWeight: 700,
              padding: "8px 16px",
              borderRadius: "var(--radius-md)",
              background: "var(--surface)",
              color: "var(--navy-deep)",
              border: "1px solid var(--border)",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              textDecoration: "none",
            }}
          >
            Downloads & Resources →
          </a>
        </div>
        {/* Research Areas Grid */}
        <div style={{ marginBottom: 56 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--gist-orange)",
              marginBottom: 14,
            }}
          >
            Major Areas
          </div>
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 26,
              color: "var(--navy-deep)",
              marginBottom: 28,
            }}
          >
            Research Focus Areas
          </motion.h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 14,
            }}
          >
            {DEPARTMENT.researchAreas.map((area, i) => (
              <motion.div
                key={area}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: "20px",
                  background: i % 2 === 0 ? "var(--navy-deep)" : "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  color: i % 2 === 0 ? "#fff" : "var(--navy-deep)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  lineHeight: 1.4,
                }}
              >
                {area}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Two columns: Research statement + Resources */}
        <div
          style={{
            display: "grid",
            gap: 40,
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            marginBottom: 48,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--gist-orange)",
                marginBottom: 14,
              }}
            >
              Approach
            </div>
            <motion.h2
              initial={reduce ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 22,
                color: "var(--navy-deep)",
                marginBottom: 18,
              }}
            >
              Industry-Institute Collaboration
            </motion.h2>
            <p
              style={{
                fontSize: 15,
                color: "var(--text-body)",
                lineHeight: 1.75,
                marginBottom: 14,
              }}
            >
              {DEPARTMENT.about[1]}
            </p>
            <p style={{ fontSize: 15, color: "var(--text-body)", lineHeight: 1.75 }}>
              {DEPARTMENT.about[3]}
            </p>
          </div>

          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--gist-orange)",
                marginBottom: 14,
              }}
            >
              NPTEL
            </div>
            <motion.h2
              initial={reduce ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 22,
                color: "var(--navy-deep)",
                marginBottom: 18,
              }}
            >
              Online Certifications
            </motion.h2>
            <p
              style={{
                fontSize: 15,
                color: "var(--text-body)",
                lineHeight: 1.75,
                marginBottom: 18,
              }}
            >
              The department actively encourages students and faculty to enrol in NPTEL courses and
              earn industry-recognised certifications in advanced computing technologies.
            </p>
            <a
              href="https://gist.edu.in/gist/gist-as-remote-center-of-iitbombay/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 20px",
                borderRadius: 999,
                background: "var(--gist-orange)",
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Spoken Tutorials — IIT Bombay <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Student Publications & Activities */}
        <motion.div
          style={{ marginBottom: 48 }}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 24,
              color: "var(--navy-deep)",
              marginBottom: 24,
            }}
          >
            Student Research Activities
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                label: "Student Paper and Poster Presentations",
                url: "https://gist.edu.in/gist/student-paper-and-poster-presentations-cse/",
              },
              {
                label: "Student Publications in International Journals",
                url: "https://gist.edu.in/gist/student-publications-in-international-journals-cse/",
              },
              {
                label: "Student Other Co-curricular Activities",
                url: "https://gist.edu.in/gist/student-other-co-curricular-activities-cse/",
              },
              {
                label: "GDSC Report (Google Developer Student Clubs)",
                url: "https://gist.edu.in/gist/wp-content/uploads/2024/08/GDSC-Report-NBA.pdf",
              },
              {
                label: "Amrita Virtual Labs (GIST Nodal Centre)",
                url: "https://gist.edu.in/gist/gist-recognised-as-nodal-center-for-virtual-labs/",
              },
              {
                label: "Research & Development — GIST",
                url: "https://gist.edu.in/gist/research-development/",
              },
            ].map(({ label, url }, i) => (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 14,
                  padding: "16px 20px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  textDecoration: "none",
                  color: "var(--text-body)",
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
                <span style={{ fontWeight: 500, fontSize: 14 }}>{label}</span>
                <ExternalLink size={14} style={{ flexShrink: 0 }} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* PSOs relevance */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            padding: 28,
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-xl)",
            borderLeft: "4px solid var(--gist-orange)",
          }}
        >
          <h3
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 20,
              color: "var(--navy-deep)",
              marginBottom: 14,
            }}
          >
            Programme Specific Outcomes (Research Focus)
          </h3>
          {DEPARTMENT.psos.map((pso) => (
            <div
              key={pso.id}
              style={{ display: "flex", gap: 14, marginBottom: 10, alignItems: "flex-start" }}
            >
              <span
                style={{
                  minWidth: 52,
                  padding: "3px 10px",
                  background: "var(--gist-orange)",
                  color: "#fff",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {pso.id}
              </span>
              <span style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.65 }}>
                {pso.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </PageShell>
  );
}
