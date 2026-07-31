"use client";

import { motion, useReducedMotion } from "motion/react";
import { Handshake, Building2 } from "lucide-react";
import { MOUS } from "@/lib/department-data";

const RECRUITERS_AND_PARTNERS = [
  { name: "TCS", type: "Recruiter / Industry Partner" },
  { name: "Wipro", type: "Recruiter" },
  { name: "Infosys", type: "Recruiter" },
  { name: "Tech Mahindra", type: "Recruiter" },
  { name: "Accenture", type: "Recruiter" },
  { name: "Cognizant", type: "Recruiter" },
  { name: "HCL Technologies", type: "Recruiter" },
  { name: "Codegnan IT", type: "MOU Partner" },
  { name: "Great Learning", type: "MOU Partner" },
  { name: "EduSkills", type: "MOU Partner" },
  { name: "CISCO Academy", type: "Certification Partner" },
  { name: "Oracle Academy", type: "Certification Partner" },
  { name: "IIT Bombay Spoken Tutorials", type: "Nodal Partner" },
];

export function RecruiterMarquee() {
  const reduce = useReducedMotion();

  return (
    <div className="w-full py-12 bg-[var(--surface-2)] border-y border-[var(--border)] overflow-hidden">
      <div className="container-page mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="eyebrow">Industry Network</div>
          <h3 className="text-xl font-bold text-[var(--navy-deep)] font-sans">
            Top Recruiters & Collaboration MOUs
          </h3>
        </div>
        <div className="text-xs font-semibold text-[var(--text-muted)] flex items-center gap-2">
          <Handshake size={15} className="text-[var(--gist-orange)]" /> {MOUS.length} Official MOUs Signed
        </div>
      </div>

      {/* Marquee Track */}
      {!reduce ? (
        <div className="flex gap-6 overflow-hidden select-none py-2 relative">
          {/* Gradient Edge Blurs */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[var(--surface-2)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[var(--surface-2)] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6 shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...RECRUITERS_AND_PARTNERS, ...RECRUITERS_AND_PARTNERS].map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex items-center gap-3 px-6 py-3.5 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--border)] shadow-xs hover:border-[var(--gist-orange)]/50 transition-colors shrink-0"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--gist-orange-subtle)] text-[var(--gist-orange)] flex items-center justify-center font-bold text-xs">
                  <Building2 size={16} />
                </div>
                <div>
                  <div className="font-bold text-sm text-[var(--navy-deep)] font-sans whitespace-nowrap">
                    {partner.name}
                  </div>
                  <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                    {partner.type}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      ) : (
        /* Reduced Motion Fallback: Grid */
        <div className="container-page grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {RECRUITERS_AND_PARTNERS.slice(0, 6).map((partner) => (
            <div
              key={partner.name}
              className="p-3.5 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] text-center"
            >
              <div className="font-bold text-xs text-[var(--navy-deep)]">{partner.name}</div>
              <div className="text-[10px] text-[var(--text-muted)]">{partner.type}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
