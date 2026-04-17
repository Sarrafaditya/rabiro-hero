"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, DollarSign, Zap } from "lucide-react";

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), {
  ssr: false,
});

const stats = [
  { icon: TrendingUp, value: "500%", label: "Avg. ROI", color: "#1a90ff" },
  { icon: Users, value: "200+", label: "Clients", color: "#4da6ff" },
  { icon: DollarSign, value: "$75K+", label: "Ads Spent", color: "#00c8ff" },
  { icon: Zap, value: "10x", label: "Growth", color: "#0066cc" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      // Heading lines stagger
      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll(".hero-line");
        tl.from(lines, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
        });
      }

      // Subtitle
      tl.from(
        subRef.current,
        { opacity: 0, y: 30, duration: 0.7, ease: "power2.out" },
        "-=0.4"
      );

      // CTA buttons scale in
      if (ctaRef.current) {
        tl.from(
          ctaRef.current.children,
          {
            opacity: 0,
            scale: 0.85,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.12,
          },
          "-=0.3"
        );
      }

      // Stats cards float in
      if (statsRef.current) {
        tl.from(
          statsRef.current.children,
          {
            opacity: 0,
            y: 40,
            scale: 0.9,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.2"
        );
      }

      // Floating animation for stats cards
      if (statsRef.current) {
        const cards = statsRef.current.querySelectorAll(".stat-card");
        cards.forEach((card, i) => {
          gsap.to(card, {
            y: i % 2 === 0 ? -8 : 8,
            duration: 2 + i * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2,
          });
        });
      }
    }, sectionRef);

    // Parallax on scroll
    const handleScroll = () => {
      if (!headingRef.current) return;
      const scrollY = window.scrollY;
      gsap.to(headingRef.current, {
        y: scrollY * 0.15,
        ease: "none",
        duration: 0,
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToWork = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "var(--dark-bg)" }}
    >
      {/* Three.js background */}
      <ThreeBackground />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(26,144,255,0.12) 0%, transparent 60%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 w-full"
        style={{ zIndex: 2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--electric-blue)] bg-[rgba(26,144,255,0.08)] px-4 py-1.5 text-xs text-[var(--electric-blue)] font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--electric-blue)] animate-pulse" />
              WELCOME TO RABIRO
            </div>

            {/* Heading */}
            <div ref={headingRef} className="mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                <span className="hero-line block text-white">
                  We Grow Your
                </span>
                <span className="hero-line block text-[var(--electric-blue)] glow-text">
                  Brand Digitally
                </span>
                <span className="hero-line block text-white">
                  Beyond Limits
                </span>
              </h1>
            </div>

            <p
              ref={subRef}
              className="text-base md:text-lg text-[#8ba3c7] leading-relaxed mb-8 max-w-lg"
            >
              Rabiro transforms businesses with data-driven marketing strategies,
              immersive digital experiences, and ROI-focused campaigns that
              deliver measurable results.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="gap-2 group"
                onClick={scrollToContact}
                style={{ cursor: "none" }}
              >
                Start Your Journey
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToWork}
                style={{ cursor: "none" }}
              >
                View Our Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-[var(--electric-blue)] text-[var(--electric-blue)] hover:bg-[rgba(26,144,255,0.1)]"
                onClick={() => { window.location.href = "tel:+919934438066"; }}
                style={{ cursor: "none" }}
              >
                Book Your Consultation
              </Button>
            </div>
          </div>

          {/* Right: Stats cards */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="stat-card glass-card rounded-2xl p-6 flex flex-col gap-3 hover:border-[var(--electric-blue)] transition-colors duration-300"
                  style={{
                    boxShadow: `0 0 30px rgba(26,144,255,0.05), 0 4px 20px rgba(0,0,0,0.3)`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${stat.color}22` }}
                  >
                    <Icon size={20} color={stat.color} />
                  </div>
                  <div>
                    <div
                      className="text-3xl font-extrabold"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm text-[#8ba3c7]">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-xs text-[#8ba3c7] tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-[var(--electric-blue)] to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
