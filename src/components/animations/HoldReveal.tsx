"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Trophy, Award, Sparkles } from "lucide-react";
import { ROLL_OF_HONOUR } from "@/lib/department-data";

interface HoldRevealProps {
  className?: string;
}

export function HoldReveal({ className = "" }: HoldRevealProps) {
  const [progress, setProgress] = useState(0); // 0 to 1
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHolding, setIsHolding] = useState(false);

  const reduce = useReducedMotion();
  const rafIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const decayStartTimeRef = useRef<number | null>(null);
  const decayStartProgressRef = useRef<number>(0);

  const HOLD_DURATION = 1200; // ms
  const DECAY_DURATION = 250; // ms

  const easeOutCustom = (t: number) => {
    const p = Math.min(1, Math.max(0, t));
    return 1 - Math.pow(1 - p, 3);
  };

  const cancelLoop = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  const startDecay = useCallback(() => {
    cancelLoop();
    setIsHolding(false);

    decayStartTimeRef.current = performance.now();
    decayStartProgressRef.current = progress;

    const decayStep = (now: number) => {
      if (!decayStartTimeRef.current) return;
      const elapsed = now - decayStartTimeRef.current;
      const t = Math.min(1, elapsed / DECAY_DURATION);
      const current = decayStartProgressRef.current * (1 - t);

      setProgress(current);

      if (t < 1 && current > 0) {
        rafIdRef.current = requestAnimationFrame(decayStep);
      } else {
        setProgress(0);
        cancelLoop();
      }
    };

    rafIdRef.current = requestAnimationFrame(decayStep);
  }, [cancelLoop, progress]);

  const startHold = useCallback(() => {
    if (isRevealed) return;
    cancelLoop();
    setIsHolding(true);
    startTimeRef.current = performance.now();

    const holdStep = (now: number) => {
      if (!startTimeRef.current) return;
      const elapsed = now - startTimeRef.current;
      const linearProgress = Math.min(1, elapsed / HOLD_DURATION);
      const easedProgress = easeOutCustom(linearProgress);

      setProgress(easedProgress);

      if (linearProgress >= 1) {
        setIsRevealed(true);
        setIsHolding(false);
        setProgress(1);
        cancelLoop();
      } else {
        rafIdRef.current = requestAnimationFrame(holdStep);
      }
    };

    rafIdRef.current = requestAnimationFrame(holdStep);
  }, [cancelLoop, isRevealed]);

  useEffect(() => {
    return () => cancelLoop();
  }, [cancelLoop]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    startHold();
  };

  const handlePointerUp = () => {
    if (!isRevealed && isHolding) {
      startDecay();
    }
  };

  const handlePointerLeave = () => {
    if (!isRevealed && isHolding) {
      startDecay();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Space" || e.code === "Enter") {
      e.preventDefault();
      if (!isHolding && !isRevealed) {
        startHold();
      }
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.code === "Space" || e.code === "Enter") {
      e.preventDefault();
      if (!isRevealed && isHolding) {
        startDecay();
      }
    }
  };

  const size = 120;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className={`w-full ${className}`}>
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="hold-button-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center p-8 md:p-12 rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--navy-deep)] via-[#123362] to-[#1a4a90] text-white shadow-2xl relative overflow-hidden text-center border border-white/15"
          >
            {/* Ambient Glow Overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(228, 92, 4, 0.4) 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[var(--gold-soft)] text-xs font-bold uppercase tracking-wider mb-4 border border-white/15">
                <Sparkles size={13} /> Signature Interactive Feature
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 font-sans tracking-tight">
                Hold to Reveal Placement & Achievement Highlights
              </h3>
              <p className="text-sm md:text-base text-white/80 mb-8 leading-relaxed">
                Press and hold the trigger for 1.2s to unlock our placement records, VOICE hackathon wins, and Roll of Honour toppers.
              </p>

              {/* Radial Progress / Hold Button */}
              <div
                tabIndex={0}
                role="button"
                aria-label="Hold to reveal department achievements"
                aria-pressed={isHolding}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerLeave}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                className="relative cursor-pointer select-none group focus:outline-none focus:ring-4 focus:ring-[var(--gist-orange)]/50 rounded-full p-2"
                style={{ touchAction: "none" }}
              >
                {!reduce ? (
                  /* SVG Radial Progress Ring */
                  <div className="relative flex items-center justify-center">
                    <svg width={size} height={size} className="transform -rotate-90">
                      <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="rgba(255, 255, 255, 0.2)"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                      />
                      <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="var(--gist-orange)"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{
                          transition: isHolding ? "none" : "stroke-dashoffset 0.1s linear",
                        }}
                      />
                    </svg>

                    {/* Central Button */}
                    <div
                      className={`absolute w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-xl ${
                        isHolding
                          ? "bg-[var(--gist-orange)] scale-95 shadow-[0_0_30px_rgba(228,92,4,0.6)]"
                          : "bg-white text-[var(--navy-deep)] group-hover:scale-105"
                      }`}
                    >
                      <Trophy
                        size={28}
                        className={`transition-colors duration-300 ${
                          isHolding ? "text-white animate-pulse" : "text-[var(--gist-orange)]"
                        }`}
                      />
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${
                          isHolding ? "text-white" : "text-[var(--navy-deep)]"
                        }`}
                      >
                        {isHolding ? `${Math.round(progress * 100)}%` : "HOLD"}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Reduced Motion Fallback: Simple Bar */
                  <div className="px-8 py-4 rounded-full bg-[var(--gist-orange)] text-white font-bold text-base flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Trophy size={20} /> Hold to Unlock (1.2s)
                    </div>
                    <div className="w-48 h-2 bg-white/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white transition-all"
                        style={{ width: `${progress * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="revealed-achievements-panel"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 md:p-12 rounded-[var(--radius-xl)] bg-[var(--surface)] border-2 border-[var(--gist-orange)] shadow-2xl relative overflow-hidden"
          >
            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border)] mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--gist-orange)] text-white flex items-center justify-center shadow-lg">
                  <Trophy size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold text-[var(--gist-orange)] uppercase tracking-wider">
                    Unlocked Outcome Report
                  </div>
                  <h3 className="text-2xl font-extrabold text-[var(--navy-deep)] font-sans">
                    CSE Department Excellence & Impact
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setIsRevealed(false)}
                className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--gist-orange)] transition-colors px-3.5 py-2 rounded-lg bg-[var(--surface-2)] border border-[var(--border)]"
              >
                Reset View
              </button>
            </div>

            {/* Grid of Key Unlocked Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="p-6 rounded-[var(--radius-lg)] bg-[var(--navy-deep)] text-white"
              >
                <div className="text-3xl md:text-4xl font-black text-[var(--gist-orange)] mb-1">
                  85%+
                </div>
                <div className="text-sm font-bold text-white mb-2">Consistent Placements</div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Top recruiters including TCS, Wipro, Infosys, Tech Mahindra, and Accenture annually hire GIST CSE graduates.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface-2)] border border-[var(--border)]"
              >
                <div className="text-3xl md:text-4xl font-black text-[var(--navy-deep)] mb-1">
                  15 Batches
                </div>
                <div className="text-sm font-bold text-[var(--navy-deep)] mb-2">Roll of Honour (2008–2023)</div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Highest CGPA toppers consistently scoring 80%+ / 9.0+ CGPA with JNTUA university ranks.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface-2)] border border-[var(--border)]"
              >
                <div className="text-3xl md:text-4xl font-black text-[var(--navy-deep)] mb-1">
                  NVIDIA AI
                </div>
                <div className="text-sm font-bold text-[var(--navy-deep)] mb-2">Specialized Hardware Lab</div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Dedicated Jetson Nano kits for edge AI, deep learning, computer vision, and autonomous robotics projects.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface-2)] border border-[var(--border)]"
              >
                <div className="text-3xl md:text-4xl font-black text-[var(--navy-deep)] mb-1">
                  VOICE Wins
                </div>
                <div className="text-sm font-bold text-[var(--navy-deep)] mb-2">National Hackathons</div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Active CSI, ACM & ISTE student chapters organizing national-level coding contests and technical expos.
                </p>
              </motion.div>
            </div>

            {/* Roll of Honour Spotlight Table */}
            <div className="bg-[var(--surface-2)] rounded-[var(--radius-lg)] p-6 border border-[var(--border)]">
              <h4 className="text-base font-bold text-[var(--navy-deep)] mb-4 flex items-center gap-2">
                <Award size={18} className="text-[var(--gist-orange)]" /> Recent Roll of Honour Toppers (Batch Excerpt)
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-[var(--text-body)]">
                  <tbody className="divide-y divide-[var(--border)]">
                    {ROLL_OF_HONOUR.slice(0, 5).map((r) => (
                      <tr key={r.sno} className="hover:bg-white/50">
                        <td className="px-4 py-2.5 font-semibold text-[var(--gist-orange)]">{r.batch}</td>
                        <td className="px-4 py-2.5 font-mono">{r.rollNo}</td>
                        <td className="px-4 py-2.5 font-bold text-[var(--navy-deep)]">{r.name}</td>
                        <td className="px-4 py-2.5 font-bold">{r.cgpa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
