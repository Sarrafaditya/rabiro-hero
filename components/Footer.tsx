"use client";

import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const WhatsAppIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const socials = [
  { icon: Facebook, href: "https://www.facebook.com/rabiro", label: "Facebook" },
  { icon: Twitter, href: "https://x.com/rabiroagency", label: "X (Twitter)" },
  { icon: WhatsAppIcon, href: "https://api.whatsapp.com/send?phone=919934438066&text=", label: "WhatsApp" },
  { icon: Instagram, href: "https://www.instagram.com/rabiroagency/", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/rabiro/", label: "LinkedIn" },
] as const;

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
                    target="_blank"
                    rel="noopener noreferrer"
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
            Built by{" "}
            <span className="text-[var(--electric-blue)]">Rabiro</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
