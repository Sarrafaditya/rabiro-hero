"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Globe,
  Search,
  Palette,
  Code2,
  BarChart3,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: TrendingUp,
    title: "Performance Marketing",
    description:
      "ROI-focused paid advertising across Google, Meta, and programmatic channels. Every rupee tracked.",
    color: "#1a90ff",
  },
  {
    icon: Search,
    title: "SEO & Content Strategy",
    description:
      "Dominate search rankings with technical SEO, authority-building content, and keyword dominance.",
    color: "#4da6ff",
  },
  {
    icon: Globe,
    title: "Social Media Marketing",
    description:
      "Build engaged communities and convert followers into loyal customers with viral campaigns.",
    color: "#00c8ff",
  },
  {
    icon: Palette,
    title: "Brand Identity & Design",
    description:
      "Craft a magnetic brand identity that communicates your values and captivates your audience.",
    color: "#0066cc",
  },
  {
    icon: Code2,
    title: "Web Development",
    description:
      "High-performance websites and web apps that convert visitors into customers, powered by modern tech.",
    color: "#1a90ff",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "Turn raw data into actionable insights. Our dashboards give you 360° visibility into your growth.",
    color: "#4da6ff",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading slide up
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

      // Cards stagger reveal
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
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
      id="services"
      className="py-24 md:py-32"
      style={{ background: "var(--dark-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <Badge className="mb-4">Our Services</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Everything You Need to{" "}
            <span className="text-[var(--electric-blue)]">Scale</span>
          </h2>
          <p className="text-[#8ba3c7] text-base md:text-lg max-w-2xl mx-auto">
            From strategy to execution, we cover every dimension of your digital
            growth. One partner, infinite possibilities.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group glass-card rounded-2xl p-7 hover:border-[var(--electric-blue)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(26,144,255,0.1)] cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${service.color}22` }}
                >
                  <Icon size={22} color={service.color} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[var(--electric-blue)] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-[#8ba3c7] text-sm leading-relaxed">
                  {service.description}
                </p>
                <div
                  className="mt-5 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
