"use client";

import { motion, useReducedMotion } from "motion/react";
import { Sparkles, Calendar, Award, Code, Lightbulb, Users } from "lucide-react";

const VOICE_TIMELINE_EVENTS = [
  {
    title: "National Level Technical Quiz & Coding Contest",
    organizer: "VOICE Student Association",
    date: "2024",
    tag: "Coding & Algo",
    description: "Annual flagship coding battle testing algorithmic speed, Python programming, and rapid debugging under pressure.",
    icon: Code,
  },
  {
    title: "Google Developer Student Clubs (GDSC) Expo",
    organizer: "GIST GDSC Chapter",
    date: "2024",
    tag: "Web3 & Cloud",
    description: "Showcasing student-built fullstack apps, Flutter mobile tools, and Cloud solutions presented to industry mentors.",
    icon: Lightbulb,
  },
  {
    title: "NVIDIA Jetson AI Hands-on Workshop",
    organizer: "CSE AI Lab Cell",
    date: "2023",
    tag: "Edge AI & Vision",
    description: "Intensive training on Jetson Nano kits covering YOLO object detection, PyTorch model deployment, and OpenCV.",
    icon: Sparkles,
  },
  {
    title: "Student Paper & Poster Presentations (CSI Chapter)",
    organizer: "CSI Student Chapter",
    date: "2023",
    tag: "Research & Paper",
    description: "Research paper presentations on Machine Learning and Cyber Security with publication support.",
    icon: Award,
  },
];

export function VoiceTimeline() {
  const reduce = useReducedMotion();

  return (
    <section className="py-16 bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="eyebrow flex items-center gap-2">
              <Users size={14} className="text-[var(--gist-orange)]" /> Student Association
            </div>
            <h2 className="section-title">
              VOICE — Vision Of Innovative <br className="hidden md:block" /> Computer Engineers.
            </h2>
          </div>
          <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed">
            The active student association running national-level coding hackathons, guest lectures, quiz expos, and CSI/ACM professional chapter events.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-[var(--gist-orange)]/30 ml-4 md:ml-8 pl-6 md:pl-10 space-y-10">
          {VOICE_TIMELINE_EVENTS.map((event, i) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={event.title}
                initial={reduce ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Node Icon on Timeline Line */}
                <div className="absolute -left-[35px] md:-left-[51px] top-1.5 w-8 h-8 rounded-full bg-[var(--gist-orange)] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Icon size={16} />
                </div>

                <div className="p-6 rounded-[var(--radius-xl)] bg-[var(--surface)] border border-[var(--border)] shadow-xs hover:shadow-md hover:border-[var(--gist-orange)]/40 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--gist-orange-subtle)] text-[var(--gist-orange)]">
                      {event.tag}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)]">
                      <Calendar size={13} /> {event.date}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--navy-deep)] font-sans mb-1">
                    {event.title}
                  </h3>
                  <div className="text-xs font-semibold text-[var(--gist-orange)] mb-3">
                    {event.organizer}
                  </div>
                  <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
