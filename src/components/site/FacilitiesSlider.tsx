"use client";

import { motion, useReducedMotion } from "motion/react";
import { LABORATORIES } from "@/lib/department-data";
import { GlassCard } from "@/components/animations/GlassCard";

export function FacilitiesSlider() {
  const reduce = useReducedMotion();

  return (
    <section className="py-20 bg-surface-alt">
      <div className="container-page">
        <h2 className="section-title mb-12">Department Facilities</h2>
        
        {/* Native scroll-snap slider */}
        <div 
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8"
          style={{ scrollbarWidth: "none" }}
        >
          {LABORATORIES.map((lab, i) => (
            <motion.div
              key={lab.name}
              className="snap-start flex-shrink-0 w-[85vw] max-w-[800px]"
              initial={reduce ? false : { opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="flex flex-col md:flex-row gap-6 h-full items-center">
                <div className="w-full md:w-1/2 h-64 md:h-80 bg-surface-alt rounded-[var(--radius-lg)] flex items-center justify-center text-text-muted">
                    {/* Placeholder for actual lab image */}
                    Image: {lab.name}
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">{lab.name}</h3>
                  <p className="text-text-muted mb-2">In-charge: {lab.incharge}</p>
                  <p className="text-text-muted mb-2">Computers: {lab.computers}</p>
                  <p className="text-text-body font-mono text-sm mt-4">{lab.config}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
