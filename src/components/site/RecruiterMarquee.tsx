"use client";

import { motion, useReducedMotion } from "motion/react";
import { ExternalLink, CheckCircle2, Building2 } from "lucide-react";

interface PartnerItem {
  id: string;
  name: string;
  logoSvg: React.ReactNode;
}

const PARTNERS: PartnerItem[] = [
  {
    id: "tcs",
    name: "TCS",
    logoSvg: (
      <svg viewBox="0 0 120 40" className="max-h-9 w-auto max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="4" y="28" fill="#005696" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="900" fontSize="24" letterSpacing="1">TCS</text>
        <rect x="75" y="10" width="38" height="18" rx="4" fill="#005696" />
        <text x="80" y="23" fill="#ffffff" fontFamily="sans-serif" fontWeight="700" fontSize="9">TATA</text>
      </svg>
    ),
  },
  {
    id: "infosys",
    name: "Infosys",
    logoSvg: (
      <svg viewBox="0 0 120 40" className="max-h-9 w-auto max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="4" y="28" fill="#007CC3" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="24">Infosys</text>
      </svg>
    ),
  },
  {
    id: "wipro",
    name: "Wipro",
    logoSvg: (
      <svg viewBox="0 0 120 40" className="max-h-9 w-auto max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="20" r="5" fill="#E31837" />
        <circle cx="23" cy="14" r="4" fill="#FFC72C" />
        <circle cx="26" cy="26" r="4" fill="#00A3E0" />
        <circle cx="35" cy="20" r="5" fill="#78BE20" />
        <text x="46" y="27" fill="#0F172A" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="20">wipro</text>
      </svg>
    ),
  },
  {
    id: "cognizant",
    name: "Cognizant",
    logoSvg: (
      <svg viewBox="0 0 130 40" className="max-h-9 w-auto max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="4" y="27" fill="#0033A0" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="20">Cognizant</text>
      </svg>
    ),
  },
  {
    id: "accenture",
    name: "Accenture",
    logoSvg: (
      <svg viewBox="0 0 130 40" className="max-h-9 w-auto max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10L20 15L10 20" stroke="#A100FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <text x="26" y="27" fill="#0F172A" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="19">accenture</text>
      </svg>
    ),
  },
  {
    id: "hcl",
    name: "HCLTech",
    logoSvg: (
      <svg viewBox="0 0 120 40" className="max-h-9 w-auto max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="4" y="28" fill="#00529B" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="900" fontSize="24" letterSpacing="1">HCLTech</text>
      </svg>
    ),
  },
  {
    id: "techm",
    name: "Tech Mahindra",
    logoSvg: (
      <svg viewBox="0 0 150 40" className="max-h-9 w-auto max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="4" y="26" fill="#E31837" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="18">Tech Mahindra</text>
      </svg>
    ),
  },
  {
    id: "capgemini",
    name: "Capgemini",
    logoSvg: (
      <svg viewBox="0 0 130 40" className="max-h-9 w-auto max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 20C8 14 14 10 20 15C26 20 18 28 12 26" fill="#0070AD" />
        <text x="28" y="27" fill="#0070AD" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="18">Capgemini</text>
      </svg>
    ),
  },
  {
    id: "cisco",
    name: "Cisco Academy",
    logoSvg: (
      <svg viewBox="0 0 140 40" className="max-h-9 w-auto max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 24V14M14 26V10M20 28V6M26 26V10M32 24V14" stroke="#049FD9" strokeWidth="2.5" strokeLinecap="round" />
        <text x="40" y="27" fill="#049FD9" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="19">CISCO</text>
      </svg>
    ),
  },
  {
    id: "oracle",
    name: "Oracle Academy",
    logoSvg: (
      <svg viewBox="0 0 140 40" className="max-h-9 w-auto max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="10" width="30" height="20" rx="10" stroke="#F80000" strokeWidth="3" fill="none" />
        <text x="40" y="27" fill="#F80000" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="19">ORACLE</text>
      </svg>
    ),
  },
  {
    id: "codegnan",
    name: "Codegnan IT",
    logoSvg: (
      <svg viewBox="0 0 140 40" className="max-h-9 w-auto max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 12L18 20L6 28" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="26" y="27" fill="#0F172A" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="19">CODEGNAN</text>
      </svg>
    ),
  },
  {
    id: "eduskills",
    name: "EduSkills",
    logoSvg: (
      <svg viewBox="0 0 140 40" className="max-h-9 w-auto max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12L20 7L32 12L20 17L8 12Z" fill="#E45C04" />
        <path d="M12 15V23C12 23 20 27 28 23V15" stroke="#E45C04" strokeWidth="2.5" fill="none" />
        <text x="38" y="27" fill="#0F172A" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="18">EduSkills</text>
      </svg>
    ),
  },
  {
    id: "greatlearning",
    name: "Great Learning",
    logoSvg: (
      <svg viewBox="0 0 150 40" className="max-h-9 w-auto max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="20" r="10" fill="#0284C7" />
        <text x="32" y="26" fill="#0284C7" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="16">Great Learning</text>
      </svg>
    ),
  },
  {
    id: "redhat",
    name: "RedHat Academy",
    logoSvg: (
      <svg viewBox="0 0 140 40" className="max-h-9 w-auto max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 22C8 20 16 18 22 22C18 22 14 26 10 28" fill="#EE0000" />
        <text x="30" y="27" fill="#0F172A" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="18">RedHat</text>
      </svg>
    ),
  },
  {
    id: "aws",
    name: "AWS Academy",
    logoSvg: (
      <svg viewBox="0 0 130 40" className="max-h-9 w-auto max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="4" y="26" fill="#FF9900" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="900" fontSize="22">aws</text>
        <path d="M4 32C14 36 28 36 36 31" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function RecruiterMarquee() {
  const reduce = useReducedMotion();

  return (
    <section className="w-full py-20 md:py-24 bg-slate-50/60 dark:bg-slate-950/60 border-y border-slate-200/80 dark:border-slate-800/80 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Clean Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-orange-900/40 text-[var(--gist-orange)] text-xs font-semibold uppercase tracking-wider mb-3">
              <Building2 size={14} />
              Industry Ecosystem & Placement Partners
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight leading-tight">
              Top Corporate Recruiters & Official MoUs
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
              Partnering with global technology leaders to empower GIST CSE students with campus placements, industry certifications, and real-world exposure.
            </p>
          </div>
        </div>

        {/* Clean Logo Grid without Badges or Extra Text Clutter */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
          {PARTNERS.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
              className="group h-36 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-lg hover:border-orange-300 dark:hover:border-slate-700 p-6 flex flex-col items-center justify-center text-center transition-all duration-250 ease-out hover:-translate-y-1 cursor-default"
            >
              {/* Company Logo */}
              <div className="h-12 w-full flex items-center justify-center transition-transform duration-250 group-hover:scale-105">
                {partner.logoSvg}
              </div>

              {/* Company Name */}
              <div className="font-bold text-xs text-slate-700 dark:text-slate-300 font-sans group-hover:text-[var(--gist-orange)] transition-colors mt-3 line-clamp-1">
                {partner.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clean Verification Footer */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>Placement partner information verified by the CSE Department.</span>
          </div>

          <a
            href="https://gist.edu.in/gist/gist-home/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[var(--gist-orange)] hover:text-orange-600 dark:hover:text-orange-400 flex items-center gap-1.5 transition-colors group"
          >
            <span>View Complete Placement Records</span>
            <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
