"use client";

import { Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const footerLinks = {
  Services: [
    "Performance Marketing",
    "SEO & Content",
    "Social Media",
    "Brand Design",
    "Web Development",
  ],
  Company: ["About Us", "Careers", "Blog", "Press", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer
      className="border-t border-[var(--dark-border)] py-16"
      style={{ background: "var(--dark-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-2xl font-bold tracking-tight inline-block mb-4"
            >
              <span className="text-[var(--electric-blue)]">Rabi</span>
              <span className="text-white">ro</span>
            </a>
            <p className="text-[#8ba3c7] text-sm leading-relaxed mb-6 max-w-xs">
              Rabiro is a performance-driven digital marketing agency that
              transforms brands through data, creativity, and technology.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full border border-[var(--dark-border)] flex items-center justify-center text-[#8ba3c7] hover:text-[var(--electric-blue)] hover:border-[var(--electric-blue)] transition-all duration-200"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white text-sm font-semibold mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[#8ba3c7] text-sm hover:text-[var(--electric-blue)] transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-[var(--dark-border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8ba3c7] text-xs">
            © {new Date().getFullYear()} Rabiro. All rights reserved.
          </p>
          <p className="text-[#8ba3c7] text-xs">
            Built with{" "}
            <span className="text-[var(--electric-blue)]">Next.js</span> &{" "}
            <span className="text-[var(--electric-blue)]">GSAP</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
