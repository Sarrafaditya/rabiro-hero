"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "NovaTech Rebrand",
    category: "Brand Identity",
    description:
      "Complete rebrand for a $50M B2B tech company — new identity, messaging, and digital presence.",
    stat: "+340% Brand Recall",
    color: "#1a90ff",
    size: "large",
  },
  {
    title: "GreenWave E-commerce",
    category: "Performance Marketing",
    description:
      "Scaled D2C brand from $200K to $2M ARR in 8 months through paid social and SEO.",
    stat: "+900% Revenue",
    color: "#4da6ff",
    size: "small",
  },
  {
    title: "PulseHealth App",
    category: "Web Development",
    description:
      "Built a blazing-fast Next.js web app for a healthtech startup with 50K+ monthly users.",
    stat: "99 Lighthouse Score",
    color: "#00c8ff",
    size: "small",
  },
  {
    title: "Luminary Fashion",
    category: "Social Media Marketing",
    description:
      "Turned a boutique fashion brand into a social media phenomenon with 1M+ followers.",
    stat: "1M+ Followers",
    color: "#0066cc",
    size: "large",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Grid reveal — stagger cards
      if (gridRef.current) {
        gsap.from(gridRef.current.querySelectorAll(".project-card"), {
          opacity: 0,
          y: 60,
          scale: 0.92,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: gridRef.current,
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
      id="projects"
      className="py-24 md:py-32"
      style={{ background: "var(--dark-surface)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <Badge className="mb-4">Our Work</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Results That{" "}
            <span className="text-[var(--electric-blue)]">Speak for Themselves</span>
          </h2>
          <p className="text-[#8ba3c7] text-base md:text-lg max-w-2xl mx-auto">
            A curated look at campaigns and projects that moved the needle —
            dramatically.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className={`project-card group glass-card rounded-2xl overflow-hidden hover:border-[var(--electric-blue)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(26,144,255,0.1)] ${
                project.size === "large" ? "md:col-span-1" : ""
              }`}
            >
              {/* Preview area */}
              <div
                className="h-48 relative overflow-hidden flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${project.color}22 0%, ${project.color}08 100%)`,
                  borderBottom: `1px solid var(--dark-border)`,
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-extrabold transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${project.color}22`,
                    color: project.color,
                  }}
                >
                  {project.title.charAt(0)}
                </div>
                <div
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: `${project.color}33` }}
                >
                  <ExternalLink size={14} color={project.color} />
                </div>
              </div>

              {/* Info */}
              <div className="p-7">
                <Badge variant="secondary" className="mb-3 text-xs">
                  {project.category}
                </Badge>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--electric-blue)] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-[#8ba3c7] text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold"
                  style={{
                    background: `${project.color}15`,
                    color: project.color,
                    border: `1px solid ${project.color}40`,
                  }}
                >
                  {project.stat}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
