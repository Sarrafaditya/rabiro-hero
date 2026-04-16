"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, MessageSquare, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Book A Service",
    description:
      "Choose the service that matches your business needs and schedule a free discovery call with our team.",
    color: "#1a90ff",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Start Consultation",
    description:
      "We deep-dive into your goals, audience, and competition to craft a tailored strategy that delivers results.",
    color: "#7c3aed",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Check Your Growth",
    description:
      "Track your progress with transparent reporting dashboards and watch your business scale.",
    color: "#f97316",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Timeline draw animation
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Step cards stagger in
      if (stepsRef.current) {
        gsap.from(stepsRef.current.querySelectorAll(".process-step"), {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Icons bounce
      const icons = stepsRef.current?.querySelectorAll(".step-icon");
      icons?.forEach((icon, i) => {
        gsap.to(icon, {
          y: -6,
          duration: 1.4 + i * 0.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.3,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-24 md:py-32"
      style={{ background: "var(--dark-surface)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-20">
          <Badge className="mb-4">How It Works</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Our Simple{" "}
            <span className="text-[var(--electric-blue)]">Three-Step Process</span>
          </h2>
          <p className="text-[#8ba3c7] text-base md:text-lg max-w-xl mx-auto">
            From first contact to measurable growth — we keep it clear, focused,
            and results-oriented.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-14 left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-px">
            <div
              ref={lineRef}
              className="h-full"
              style={{
                background:
                  "linear-gradient(90deg, #1a90ff, #7c3aed, #f97316)",
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="process-step flex flex-col items-center text-center">
                  {/* Number + Icon */}
                  <div className="relative mb-6">
                    <div
                      className="step-icon w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `${step.color}18`,
                        border: `2px solid ${step.color}50`,
                        boxShadow: `0 0 24px ${step.color}40`,
                      }}
                    >
                      <Icon size={28} style={{ color: step.color }} />
                    </div>
                    <span
                      className="absolute -top-3 -right-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold"
                      style={{
                        background: step.color,
                        color: "#080c14",
                      }}
                    >
                      {step.number.slice(-1)}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-[#8ba3c7] text-sm leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
