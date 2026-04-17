"use client";

import { Badge } from "@/components/ui/badge";

const clients = [
  { name: "TechVision", color: "#1a90ff" },
  { name: "NovaBrands", color: "#7c3aed" },
  { name: "GrowthLab", color: "#f97316" },
  { name: "PulseMedia", color: "#00c8ff" },
  { name: "UrbanScale", color: "#1a90ff" },
  { name: "ZenithPro", color: "#7c3aed" },
  { name: "ArcDigital", color: "#f97316" },
  { name: "SwiftEdge", color: "#00c8ff" },
  { name: "CoreLeap", color: "#1a90ff" },
  { name: "BrightMark", color: "#7c3aed" },
];

export default function ClientLogoCarousel() {
  return (
    <section
      className="py-16 overflow-hidden"
      style={{
        background: "var(--dark-bg)",
        borderTop: "1px solid var(--dark-border)",
        borderBottom: "1px solid var(--dark-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <Badge className="mb-3">Our Clients</Badge>
        <p className="text-[#8ba3c7] text-sm">
          Trusted by forward-thinking brands across industries
        </p>
      </div>

      {/* Marquee track — duplicated for seamless loop */}
      <div className="relative">
        {/* Gradient masks */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to right, var(--dark-bg) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to left, var(--dark-bg) 0%, transparent 100%)",
          }}
        />

        <div className="flex overflow-hidden">
          <div className="flex gap-10 animate-marquee hover:[animation-play-state:paused] whitespace-nowrap items-center">
            {[...clients, ...clients].map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl shrink-0 transition-all duration-300 grayscale hover:grayscale-0 hover:scale-105"
                style={{
                  background: `${client.color}10`,
                  border: `1px solid ${client.color}25`,
                  minWidth: "160px",
                  height: "52px",
                }}
              >
                <span
                  className="text-sm font-bold tracking-wide"
                  style={{ color: client.color }}
                >
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
