import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { LABORATORIES } from "@/lib/department-data";
import { Monitor } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState, useRef, useEffect } from "react";

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "Laboratories — Department of CSE, GIST" },
      {
        name: "description",
        content:
          "8 modern laboratories in the CSE Department at GIST — including Dell & Lenovo workstations and a dedicated NVIDIA AI Lab for deep learning and computer vision research.",
      },
    ],
  }),
  component: LabsPage,
});

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) { setVal(to); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const duration = 1600;
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
            setVal(Math.floor(ease * to));
            if (p < 1) requestAnimationFrame(step);
            else setVal(to);
          };
          requestAnimationFrame(step);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, reduce]);

  return <span ref={ref}>{val}{suffix}</span>;
}

function LabsPage() {
  const reduce = useReducedMotion();

  return (
    <PageShell
      eyebrow="Infrastructure"
      title="Laboratories"
      description="8 state-of-the-art laboratories equipped with latest hardware, software, and dedicated lab incharges — including a specialised NVIDIA AI Lab."
      crumbs={[{ label: "Laboratories" }]}
    >
      <div className="container-page" style={{ paddingTop: 40, paddingBottom: 72 }}>
        {/* Summary stats — animated counters */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 16,
            marginBottom: 48,
          }}
        >
          {[
            { label: "Laboratories", value: 8, suffix: "" },
            { label: "Total Systems", value: 550, suffix: "+" },
            { label: "Incharges", value: 8, suffix: "" },
            { label: "AI / GPU Lab", value: 1, suffix: "" },
          ].map(({ label, value, suffix }, i) => (
            <motion.div
              key={label}
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "var(--navy-deep)",
                borderRadius: "var(--radius-lg)",
                padding: "24px 20px",
                textAlign: "center",
                color: "#fff",
              }}
            >
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 36,
                  color: "var(--gold-soft)",
                }}
              >
                <Counter to={value} suffix={suffix} />
              </div>
              <div
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.6)",
                  marginTop: 4,
                }}
              >
                {label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Labs Grid — staggered */}
        <div
          style={{
            display: "grid",
            gap: 20,
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          }}
        >
          {LABORATORIES.map((lab, i) => (
            <motion.article
              key={lab.sno}
              className="card"
              style={{
                borderTop: `3px solid ${lab.sno === 8 ? "var(--gist-orange)" : "var(--navy-deep)"}`,
              }}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Lab header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "var(--radius-md)",
                    background: lab.sno === 8 ? "var(--gist-orange-10)" : "var(--navy-10)",
                    display: "grid",
                    placeItems: "center",
                    color: lab.sno === 8 ? "var(--gist-orange)" : "var(--navy-deep)",
                  }}
                >
                  <Monitor size={20} />
                </div>
                {lab.sno === 8 && <span className="badge badge-orange">NVIDIA AI Lab</span>}
              </div>

              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "var(--navy-deep)",
                  lineHeight: 1.3,
                }}
              >
                {lab.name}
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginTop: 16,
                }}
              >
                <div
                  style={{
                    padding: "10px 12px",
                    background: "var(--surface-2)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--text-muted)",
                      marginBottom: 3,
                    }}
                  >
                    Systems
                  </div>
                  <div
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: 22,
                      color: "var(--navy-deep)",
                    }}
                  >
                    {lab.computers}
                  </div>
                </div>
                <div
                  style={{
                    padding: "10px 12px",
                    background: "var(--surface-2)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--text-muted)",
                      marginBottom: 3,
                    }}
                  >
                    Incharge
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-body)" }}>
                    {lab.incharge}
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 14,
                  padding: "12px 14px",
                  background: "var(--surface-2)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: 12,
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                }}
              >
                <span style={{ fontWeight: 600, color: "var(--text-body)" }}>Configuration: </span>
                {lab.config}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
