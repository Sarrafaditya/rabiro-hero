"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CMO, NovaTech",
    initials: "SM",
    rating: 5,
    quote:
      "Rabiro completely transformed how we present ourselves online. Our lead generation increased by 340% in just 3 months. The team's strategic depth is unmatched.",
  },
  {
    name: "Raj Patel",
    role: "Founder, GreenWave",
    initials: "RP",
    rating: 5,
    quote:
      "From zero to $2M ARR — Rabiro's performance marketing expertise made it possible. They treat your business like their own.",
  },
  {
    name: "Emma Chen",
    role: "Head of Growth, PulseHealth",
    initials: "EC",
    rating: 5,
    quote:
      "The website they built for us is incredibly fast and converts beautifully. Our user signups jumped 180% after launch. Exceptional work.",
  },
  {
    name: "Daniel Osei",
    role: "CEO, Luminary Fashion",
    initials: "DO",
    rating: 5,
    quote:
      "We went from 10K to 1M social followers in under a year. Rabiro's content strategy and community management are second to none.",
  },
];

export default function TestimonialsSection() {
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

      // Slide-in testimonials
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".testimonial-card");
        cards.forEach((card, i) => {
          gsap.from(card, {
            opacity: 0,
            x: i % 2 === 0 ? -50 : 50,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-24 md:py-32"
      style={{ background: "var(--dark-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <Badge className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            What Our{" "}
            <span className="text-[var(--electric-blue)]">Clients Say</span>
          </h2>
          <p className="text-[#8ba3c7] text-base md:text-lg max-w-2xl mx-auto">
            Don&apos;t take our word for it — hear from the brands we&apos;ve
            helped grow.
          </p>
        </div>

        {/* Testimonial cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card glass-card rounded-2xl p-7 hover:border-[var(--electric-blue)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(26,144,255,0.08)]"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-[var(--electric-blue)] text-[var(--electric-blue)]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#c5d3e8] text-base leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>{t.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {t.name}
                  </div>
                  <div className="text-xs text-[var(--electric-blue)]">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
