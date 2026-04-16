"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Activity } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: TrendingUp,
    value: 85,
    suffix: "%",
    label: "Sales Growth",
    color: "#1a90ff",
    glow: "rgba(26,144,255,0.35)",
  },
  {
    icon: Activity,
    value: 120,
    suffix: "%",
    label: "Engagement",
    color: "#7c3aed",
    glow: "rgba(124,58,237,0.35)",
  },
];

export default function StatsStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards float in
      if (countersRef.current) {
        gsap.from(countersRef.current.children, {
          opacity: 0,
          y: 40,
          scale: 0.9,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // Count-up animation
      stats.forEach((stat, i) => {
        const el = document.querySelector(`#stat-num-${i}`);
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + stat.suffix;
          },
        });
      });

      // Subtle floating animation on cards
      const cards = countersRef.current?.querySelectorAll(".stat-badge");
      cards?.forEach((card, i) => {
        gsap.to(card, {
          y: -8,
          duration: 2 + i * 0.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="py-12 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg, rgba(26,144,255,0.04) 0%, rgba(124,58,237,0.06) 50%, rgba(249,115,22,0.04) 100%)",
        borderTop: "1px solid var(--dark-border)",
        borderBottom: "1px solid var(--dark-border)",
      }}
    >
      {/* Blur blobs */}
      <div
        className="absolute -left-20 top-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(26,144,255,0.06)" }}
      />
      <div
        className="absolute -right-20 bottom-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(124,58,237,0.06)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={countersRef}
          className="flex flex-wrap justify-center gap-8"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="stat-badge glass-card rounded-2xl px-10 py-7 flex items-center gap-5"
                style={{
                  boxShadow: `0 0 30px ${stat.glow}, 0 0 60px ${stat.glow.replace("0.35", "0.1")}`,
                  border: `1px solid ${stat.color}40`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `${stat.color}22`,
                    boxShadow: `0 0 16px ${stat.glow}`,
                  }}
                >
                  <Icon size={22} style={{ color: stat.color }} />
                </div>
                <div>
                  <div
                    id={`stat-num-${i}`}
                    className="text-4xl font-extrabold tabular-nums"
                    style={{ color: stat.color }}
                  >
                    0{stat.suffix}
                  </div>
                  <div className="text-sm text-[#8ba3c7] mt-0.5 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
