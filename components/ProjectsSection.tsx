"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Google & YouTube Ads",
    category: "Video Advertising",
    description:
      "We created engaging video ads for a food delivery service that were viewed over 1 million times, resulting in a 30% increase in orders.",
    stat: "+30% Orders",
    gradient: "linear-gradient(135deg, #1a90ff 0%, #0d1320 60%)",
    accent: "#1a90ff",
    icon: "▶",
  },
  {
    title: "Facebook & Instagram Ads",
    category: "Social Media Ads",
    description:
      "We ran a targeted ad campaign for a fitness startup that generated over 1,000 leads in just one month, resulting in a 25% increase in membership sign-ups.",
    stat: "1,000+ Leads",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #0d1320 60%)",
    accent: "#7c3aed",
    icon: "f",
  },
  {
    title: "Web Development",
    category: "Development",
    description:
      "We designed and developed a new website for a technology company that improved user experience and resulted in a 50% increase in website traffic.",
    stat: "+50% Traffic",
    gradient: "linear-gradient(135deg, #f97316 0%, #0d1320 60%)",
    accent: "#f97316",
    icon: "</>",
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

      if (gridRef.current) {
        // Grid reveal — stagger cards
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

        {/* Projects Grid — 3 hover cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className="project-card group relative rounded-2xl overflow-hidden cursor-default"
              style={{
                border: `1px solid ${project.accent}25`,
                height: "340px",
              }}
            >
              {/* Background image layer */}
              <div
                className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110"
                style={{ background: project.gradient }}
              />

              {/* Static icon (visible by default, fades out on hover) */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0"
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-extrabold"
                  style={{
                    background: `${project.accent}22`,
                    border: `2px solid ${project.accent}50`,
                    color: project.accent,
                    boxShadow: `0 0 32px ${project.accent}40`,
                  }}
                >
                  {project.icon}
                </div>
              </div>

              {/* Overlay — slides in on hover */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-7 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{
                  background:
                    "linear-gradient(to top, rgba(8,12,20,0.97) 0%, rgba(8,12,20,0.75) 60%, rgba(8,12,20,0.1) 100%)",
                }}
              >
                <Badge
                  variant="secondary"
                  className="self-start mb-3 text-xs"
                  style={{
                    background: `${project.accent}20`,
                    color: project.accent,
                    border: `1px solid ${project.accent}40`,
                  }}
                >
                  {project.category}
                </Badge>
                <h3
                  className="text-xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-400"
                >
                  {project.title}
                </h3>
                <p
                  className="text-[#c5d3e8] text-sm leading-relaxed mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                >
                  {project.description}
                </p>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold self-start translate-y-4 group-hover:translate-y-0 transition-transform duration-600"
                  style={{
                    background: `${project.accent}18`,
                    color: project.accent,
                    border: `1px solid ${project.accent}45`,
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

