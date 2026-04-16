"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in content
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Button pulse animation
      if (btnRef.current) {
        gsap.to(btnRef.current, {
          boxShadow: "0 0 32px rgba(26,144,255,0.6), 0 0 64px rgba(26,144,255,0.2)",
          duration: 1.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "var(--dark-bg)" }}
    >
      {/* Background accent blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(26,144,255,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(124,58,237,0.06)" }}
      />
      <div
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(249,115,22,0.06)" }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div ref={contentRef}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Need advice for{" "}
            <span className="text-[var(--electric-blue)]">your business?</span>
          </h2>
          <p className="text-[#8ba3c7] text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Are you looking for guidance on how to grow your business? Our team
            of experienced consultants is here to help.
          </p>
          <button
            ref={btnRef}
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #1a90ff, #7c3aed)",
              cursor: "none",
            }}
          >
            Contact Us
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
