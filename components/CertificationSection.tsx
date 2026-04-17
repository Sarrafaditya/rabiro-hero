"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    name: "Meta Business Partner",
    logo: "/logos/meta.svg",
    color: "#1877F2",
    bg: "#1877F215",
  },
  {
    name: "Shopify Partner",
    logo: "/logos/shopify.svg",
    color: "#96bf48",
    bg: "#96bf4815",
  },
  {
    name: "AiSensy",
    logo: "/logos/aisensy.svg",
    color: "#7c3aed",
    bg: "#7c3aed15",
  },
  {
    name: "Razorpay Partner",
    logo: "/logos/razorpay.svg",
    color: "#3395FF",
    bg: "#3395FF15",
  },
  {
    name: "Cashfree Payments",
    logo: "/logos/cashfree.svg",
    color: "#00b674",
    bg: "#00b67415",
  },
];

export default function CertificationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      if (logosRef.current) {
        gsap.from(logosRef.current.children, {
          opacity: 0,
          y: 20,
          scale: 0.9,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: logosRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // Subtle floating animation
        Array.from(logosRef.current.children).forEach((child, i) => {
          gsap.to(child, {
            y: -6,
            duration: 2 + i * 0.3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.2,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="py-20"
      style={{
        background: "var(--dark-bg)",
        borderTop: "1px solid var(--dark-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headingRef} className="text-center mb-12">
          <Badge className="mb-4">Certified &amp; Trusted</Badge>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            Our Services Are{" "}
            <span className="text-[var(--electric-blue)]">Certified By</span>
          </h2>
          <p className="text-[#8ba3c7] text-sm max-w-md mx-auto">
            Recognized and verified by the world&apos;s leading technology and
            payments platforms.
          </p>
        </div>

        <div
          ref={logosRef}
          className="flex flex-wrap justify-center items-center gap-6"
        >
          {certifications.map((cert) => (
            <div
              key={cert.name}
              title={cert.name}
              className="group flex flex-col items-center justify-center rounded-2xl px-8 py-5 transition-all duration-300 hover:scale-110 cursor-default"
              style={{
                background: cert.bg,
                border: `1px solid ${cert.color}30`,
                minWidth: "160px",
                boxShadow: `0 4px 20px rgba(0,0,0,0.2)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${cert.color}30`;
                (e.currentTarget as HTMLDivElement).style.borderColor = `${cert.color}60`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 4px 20px rgba(0,0,0,0.2)";
                (e.currentTarget as HTMLDivElement).style.borderColor = `${cert.color}30`;
              }}
            >
              <Image
                src={cert.logo}
                alt={cert.name}
                width={120}
                height={45}
                unoptimized
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
