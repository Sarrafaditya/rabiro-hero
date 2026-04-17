"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

export default function MapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const mapAreaRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const pinIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const mapContainer = mapContainerRef.current;
    const overlay = overlayRef.current;
    const card = cardRef.current;
    const pin = pinRef.current;
    const pinIcon = pinIconRef.current;

    if (!section || !mapContainer || !overlay || !card || !pin || !pinIcon) return;

    // Pin pulse animation — runs on all devices
    const pulseTween = gsap.to(pinIcon, {
      scale: 1.2,
      duration: 0.9,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Scroll reveal
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      if (mapAreaRef.current) {
        gsap.from(mapAreaRef.current, {
          opacity: 0,
          y: 50,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }
    }, section);

    // Disable parallax on mobile (matches custom cursor breakpoint)
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) {
      return () => {
        pulseTween.kill();
        ctx.revert();
      };
    }

    // GSAP quickTo for smooth, lag-free parallax per layer
    const mapX = gsap.quickTo(mapContainer, "x", { duration: 1.2, ease: "power3.out" });
    const mapY = gsap.quickTo(mapContainer, "y", { duration: 1.2, ease: "power3.out" });

    const overlayX = gsap.quickTo(overlay, "x", { duration: 1.0, ease: "power3.out" });
    const overlayY = gsap.quickTo(overlay, "y", { duration: 1.0, ease: "power3.out" });

    const cardX = gsap.quickTo(card, "x", { duration: 0.8, ease: "power3.out" });
    const cardY = gsap.quickTo(card, "y", { duration: 0.8, ease: "power3.out" });

    const pinX = gsap.quickTo(pin, "x", { duration: 0.5, ease: "power3.out" });
    const pinY = gsap.quickTo(pin, "y", { duration: 0.5, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      // Normalize cursor position to -1 … +1
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      // Layer 1 — map: very subtle (±1.5px / ±1px)
      mapX(nx * 1.5);
      mapY(ny * 1.0);

      // Layer 2 — overlay: slightly more (±3px / ±2px)
      overlayX(nx * 3);
      overlayY(ny * 2);

      // Layer 3 — card: noticeable but controlled (±7.5px / ±5px)
      cardX(nx * 7.5);
      cardY(ny * 5.0);

      // Layer 4 — pin: most responsive (±12px / ±8px)
      pinX(nx * 12);
      pinY(ny * 8);
    };

    // Reset all layers to origin on mouse leave
    const handleMouseLeave = () => {
      mapX(0);
      mapY(0);
      overlayX(0);
      overlayY(0);
      cardX(0);
      cardY(0);
      pinX(0);
      pinY(0);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
      pulseTween.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="map"
      className="py-24 md:py-32"
      style={{ background: "var(--dark-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12">
          <Badge className="mb-4">Find Us</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Visit Our{" "}
            <span className="text-[var(--electric-blue)]">Office</span>
          </h2>
          <p className="text-[#8ba3c7] text-base md:text-lg max-w-2xl mx-auto">
            We&apos;re located in Kharar, Punjab, India. Come meet our
            team or schedule a virtual call.
          </p>
        </div>

        {/* Map area — all 4 parallax layers live here */}
        <div
          ref={mapAreaRef}
          className="relative rounded-3xl overflow-hidden"
          style={{ height: "500px" }}
        >
          {/* Layer 1: Map container — slowest (background) */}
          <div
            ref={mapContainerRef}
            className="absolute inset-0 will-change-transform"
          >
            <iframe
              src="https://www.google.com/maps?q=Sector+115+Landran+Road+Kharar+Punjab+India&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Rabiro Office Location"
            />
          </div>

          {/* Layer 2: Overlay gradient — medium movement */}
          <div
            ref={overlayRef}
            className="absolute inset-0 pointer-events-none will-change-transform"
            style={{
              background:
                "linear-gradient(135deg, rgba(8,12,20,0.75) 0%, rgba(8,12,20,0.1) 50%, rgba(8,12,20,0.75) 100%)",
            }}
          />

          {/* Layer 4: Location pin — fastest + pulse (attention anchor) */}
          <div
            ref={pinRef}
            className="absolute will-change-transform"
            style={{ top: "40%", left: "58%", zIndex: 11 }}
          >
            {/* Inner element receives the pulse scale animation */}
            <div ref={pinIconRef} className="relative will-change-transform">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center glow-blue"
                style={{ background: "rgba(26,144,255,0.2)" }}
              >
                <MapPin size={22} className="text-[var(--electric-blue)]" />
              </div>
              {/* Ripple ring */}
              <div
                className="absolute inset-0 rounded-full border-2 border-[var(--electric-blue)] opacity-40 animate-ping"
                style={{ animationDuration: "2s" }}
              />
            </div>
          </div>

          {/* Layer 3: Glass address card — faster movement (primary focus) */}
          <div
            ref={cardRef}
            className="absolute bottom-6 left-6 glass-card rounded-2xl p-5 will-change-transform"
            style={{ zIndex: 10, maxWidth: "260px" }}
          >
            <h3 className="text-white font-semibold text-sm mb-0.5">
              Rabiro HQ
            </h3>
            <p className="text-[#8ba3c7] text-xs mb-0.5">
              Sector 115, Landran Road
            </p>
            <p className="text-[#8ba3c7] text-xs mb-4">Kharar, Punjab, India</p>
            <Button
              size="sm"
              className="gap-2 w-full"
              style={{ cursor: "none" }}
              onClick={() =>
                window.open(
                  "https://maps.google.com/?q=Sector+115+Landran+Road+Kharar+Punjab+India",
                  "_blank"
                )
              }
            >
              <Navigation size={13} />
              Get Directions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
