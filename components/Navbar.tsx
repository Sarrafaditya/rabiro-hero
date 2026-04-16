"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animation
      gsap.from(logoRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      if (linksRef.current) {
        gsap.from(linksRef.current.children, {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.3,
        });
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[rgba(8,12,20,0.95)] backdrop-blur-md border-b border-[var(--dark-border)] py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          ref={logoRef}
          href="#"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl font-bold tracking-tight"
          style={{ cursor: "none" }}
        >
          <span className="text-[var(--electric-blue)]">Rabi</span>
          <span className="text-white">ro</span>
        </a>

        {/* Desktop Links */}
        <ul ref={linksRef} className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-[#8ba3c7] hover:text-[var(--electric-blue)] transition-colors duration-300 relative group"
                style={{ cursor: "none" }}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--electric-blue)] transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <Button
            size="sm"
            onClick={() => handleNavClick("#contact")}
            style={{ cursor: "none" }}
          >
            Get Started
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{ cursor: "none" }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--dark-surface)] border-t border-[var(--dark-border)] px-6 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="text-[#8ba3c7] hover:text-[var(--electric-blue)] transition-colors w-full text-left py-1"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <Button
                size="sm"
                className="w-full mt-2"
                onClick={() => handleNavClick("#contact")}
              >
                Get Started
              </Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
