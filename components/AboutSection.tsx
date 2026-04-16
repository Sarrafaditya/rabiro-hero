"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const values = [
  "Data-driven decision making",
  "Transparent reporting & analytics",
  "Creative excellence in every campaign",
  "Client success as our north star",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text block: fade in + slide up
      gsap.from(textRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Image block: fade in from right
      gsap.from(imageRef.current, {
        opacity: 0,
        x: 60,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Value list items stagger
      const items = sectionRef.current?.querySelectorAll(".value-item");
      if (items) {
        gsap.from(items, {
          opacity: 0,
          x: -20,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-32"
      style={{ background: "var(--dark-surface)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div ref={textRef}>
            <Badge className="mb-6">About Rabiro</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              We&apos;re Not Just an Agency.{" "}
              <span className="text-[var(--electric-blue)]">
                We&apos;re Your Growth Partner.
              </span>
            </h2>
            <p className="text-[#8ba3c7] text-base md:text-lg leading-relaxed mb-6">
              Founded with the belief that every brand deserves a remarkable
              digital presence, Rabiro has spent years mastering the art of
              performance marketing. We combine creative strategy with
              technology-powered execution.
            </p>
            <p className="text-[#8ba3c7] text-base leading-relaxed mb-8">
              Our multidisciplinary team of strategists, designers, and
              developers builds campaigns that not only look incredible — they
              deliver measurable, scalable growth.
            </p>
            <ul className="space-y-3">
              {values.map((val) => (
                <li key={val} className="value-item flex items-center gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-[var(--electric-blue)] shrink-0"
                  />
                  <span className="text-[#c5d3e8] text-sm">{val}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual block */}
          <div ref={imageRef} className="relative">
            <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
              {/* Background accent */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20 blur-3xl"
                style={{ background: "var(--electric-blue)" }}
              />

              <div className="grid grid-cols-2 gap-6 relative z-10">
                {[
                  { num: "8+", label: "Years Experience" },
                  { num: "200+", label: "Happy Clients" },
                  { num: "$50M+", label: "Revenue Generated" },
                  { num: "98%", label: "Retention Rate" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col gap-1 p-4 rounded-xl"
                    style={{ background: "rgba(26,144,255,0.05)" }}
                  >
                    <span className="text-3xl font-extrabold text-[var(--electric-blue)]">
                      {item.num}
                    </span>
                    <span className="text-xs text-[#8ba3c7]">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--dark-border)] flex items-center gap-4">
                <div className="flex -space-x-2">
                  {["MK", "AJ", "SL", "RP"].map((initials) => (
                    <div
                      key={initials}
                      className="w-9 h-9 rounded-full border-2 border-[var(--dark-surface)] flex items-center justify-center text-xs font-bold text-[var(--electric-blue)]"
                      style={{ background: "rgba(26,144,255,0.15)" }}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Expert Team
                  </div>
                  <div className="text-xs text-[#8ba3c7]">
                    50+ specialists worldwide
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
