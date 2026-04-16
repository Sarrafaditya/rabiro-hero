"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Users, BarChart2, HeadphonesIcon, Target, Eye, Compass } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const points = [
  { icon: Users, label: "Personalized Social Media Strategies" },
  { icon: BarChart2, label: "Data-Driven Insights" },
  { icon: HeadphonesIcon, label: "Exceptional Customer Service" },
];

const blocks = [
  {
    icon: Eye,
    title: "Our Vision",
    text: "To be the leading digital marketing agency that empowers businesses worldwide.",
    color: "#1a90ff",
  },
  {
    icon: Target,
    title: "Our Mission",
    text: "Deliver data-driven solutions that generate measurable, sustainable growth.",
    color: "#7c3aed",
  },
  {
    icon: HeadphonesIcon,
    title: "Our Support",
    text: "24/7 dedicated support so your campaigns never miss a beat.",
    color: "#f97316",
  },
  {
    icon: Compass,
    title: "Our Approach",
    text: "Strategy-first thinking combined with creative execution for maximum impact.",
    color: "#00c8ff",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left content → slide in from left
      gsap.from(textRef.current, {
        opacity: 0,
        x: -60,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Right content → slide in from right
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

      // Points stagger fade-in
      const items = sectionRef.current?.querySelectorAll(".value-item");
      if (items) {
        gsap.from(items, {
          opacity: 0,
          x: -20,
          duration: 0.5,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
      }

      // Bottom blocks stagger
      if (blocksRef.current) {
        gsap.from(blocksRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: blocksRef.current,
            start: "top 85%",
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Left: Text */}
          <div ref={textRef}>
            <Badge className="mb-6">About Rabiro</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              Empowering Your Business with{" "}
              <span className="text-[var(--electric-blue)]">
                Data-Driven Digital Solutions
              </span>
            </h2>
            <p className="text-[#8ba3c7] text-base md:text-lg leading-relaxed mb-8">
              Rabiro is a data-driven digital marketing agency that helps
              businesses grow through personalized solutions, including SEO,
              social media, email, and PPC marketing.
            </p>
            <ul className="space-y-4">
              {points.map((point) => {
                const Icon = point.icon;
                return (
                  <li key={point.label} className="value-item flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(26,144,255,0.12)" }}
                    >
                      <Icon size={15} className="text-[var(--electric-blue)]" />
                    </div>
                    <span className="text-[#c5d3e8] text-sm font-medium">{point.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: Visual */}
          <div ref={imageRef} className="relative">
            <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
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
                  <div className="text-sm font-semibold text-white">Expert Team</div>
                  <div className="text-xs text-[#8ba3c7]">50+ specialists worldwide</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision / Mission / Support / Approach blocks */}
        <div
          ref={blocksRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {blocks.map((block) => {
            const Icon = block.icon;
            return (
              <div
                key={block.title}
                className="glass-card rounded-2xl p-6 group hover:scale-[1.02] transition-all duration-300"
                style={{ borderColor: `${block.color}30` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${block.color}20` }}
                >
                  <Icon size={18} style={{ color: block.color }} />
                </div>
                <h3 className="text-white font-bold mb-2 text-sm">{block.title}</h3>
                <p className="text-[#8ba3c7] text-xs leading-relaxed">{block.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
