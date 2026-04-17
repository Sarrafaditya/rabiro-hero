"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, DollarSign, Target, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Clock,
    title: "Save Your Time",
    description:
      "We optimize your time and resources with efficient marketing solutions.",
    color: "#1a90ff",
  },
  {
    icon: DollarSign,
    title: "Affordable Price For You",
    description:
      "We provide cost-effective digital marketing solutions to fit your budget.",
    color: "#7c3aed",
  },
  {
    icon: Target,
    title: "Best Strategy",
    description:
      "We deliver the industry's best strategies for maximum ROI and business growth.",
    color: "#f97316",
  },
  {
    icon: Star,
    title: "Why Choose Us",
    description:
      "Partner with Rabiro for expertly crafted digital strategies that yield tangible results.",
    color: "#00c8ff",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
      id="why-choose-us"
      className="py-24 md:py-32"
      style={{ background: "var(--dark-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <Badge className="mb-4">Why Choose Us</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            We Provide{" "}
            <span className="text-[var(--electric-blue)]">Best Service</span>{" "}
            For Your Brand
          </h2>
          <p className="text-[#8ba3c7] text-base md:text-lg max-w-2xl mx-auto">
            At Rabiro, we&apos;re passionate about helping businesses succeed in
            the digital world.
          </p>
        </div>

        {/* Feature Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="group rounded-xl border transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] cursor-default"
                style={{
                  background: "rgba(13, 19, 32, 0.7)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  borderColor: `${feature.color}25`,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 48px ${feature.color}35, 0 0 0 1px ${feature.color}55`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${feature.color}70`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 4px 24px rgba(0,0,0,0.3)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${feature.color}25`;
                }}
              >
                <CardHeader className="pb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-2"
                    style={{
                      background: `${feature.color}18`,
                      boxShadow: `0 0 16px ${feature.color}33`,
                    }}
                  >
                    <Icon size={22} style={{ color: feature.color }} />
                  </div>
                  <CardTitle className="text-white text-base">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#8ba3c7] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

