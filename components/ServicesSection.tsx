"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Code2, Video, Palette, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code2,
    title: "Web Development & Landing Pages",
    description:
      "Craft a website or landing page that converts visitors into customers with our professional web services.",
    color: "#1a90ff",
    gradient: "from-[#1a90ff]/20 to-[#0066cc]/10",
  },
  {
    icon: Video,
    title: "Video Editing",
    description:
      "Improve your social media presence and engage with your target audience through creative content on Facebook, Instagram, Twitter, etc.",
    color: "#7c3aed",
    gradient: "from-[#7c3aed]/20 to-[#a78bfa]/10",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description:
      "Enhance your brand's visual identity with professional design services that include logos, banners, infographics, and other marketing materials.",
    color: "#f97316",
    gradient: "from-[#f97316]/20 to-[#fb923c]/10",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading fade in
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
          stagger: 0.15,
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
            Rabiro&apos;s{" "}
            <span className="text-[var(--electric-blue)]">
              Comprehensive Digital Services
            </span>
          </h2>
          <p className="text-[#8ba3c7] text-base md:text-lg max-w-2xl mx-auto">
            We offer tailored digital marketing solutions to drive growth and
            enhance your online presence. Discover our comprehensive services and
            take your business to the next level with Rabiro.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group glass-card rounded-2xl p-8 hover:border-[var(--electric-blue)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(26,144,255,0.1)] hover:scale-[1.02] cursor-default flex flex-col"
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${service.gradient} transition-all duration-300 group-hover:-translate-y-1`}
                  style={{ boxShadow: `0 0 20px ${service.color}33` }}
                >
                  <Icon size={26} color={service.color} />
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[var(--electric-blue)] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-[#8ba3c7] text-sm leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Read More */}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5"
                  style={{ color: service.color, cursor: "none" }}
                >
                  Read More
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
