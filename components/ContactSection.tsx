"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const services = [
  "Performance Marketing",
  "SEO & Content Strategy",
  "Social Media Marketing",
  "Brand Identity & Design",
  "Web Development",
  "Analytics & Insights",
  "Other",
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@rabiro.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
  { icon: MapPin, label: "Location", value: "New York, NY" },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(infoRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(formRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (field?: string) =>
    `w-full bg-[var(--dark-surface)] border ${
      field ? "border-red-500/60" : "border-[var(--dark-border)]"
    } text-[#f0f4ff] placeholder:text-[#4a5568] rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--electric-blue)] focus:ring-1 focus:ring-[var(--electric-blue)] transition-all duration-200`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-32"
      style={{ background: "var(--dark-surface)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <Badge className="mb-4">Contact Us</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Ready to{" "}
            <span className="text-[var(--electric-blue)]">Scale Together?</span>
          </h2>
          <p className="text-[#8ba3c7] text-base md:text-lg max-w-2xl mx-auto">
            Let&apos;s talk about your goals. Our team will reach out within 24
            hours with a customized growth plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-6">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.label}
                  className="glass-card rounded-2xl p-5 flex items-center gap-4"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(26,144,255,0.12)" }}
                  >
                    <Icon size={18} className="text-[var(--electric-blue)]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#8ba3c7] mb-0.5">{info.label}</div>
                    <div className="text-sm text-white font-medium">{info.value}</div>
                  </div>
                </div>
              );
            })}

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-2">Response Time</h3>
              <p className="text-[#8ba3c7] text-sm">
                We respond to all inquiries within{" "}
                <span className="text-[var(--electric-blue)] font-semibold">
                  24 hours
                </span>
                . For urgent matters, call us directly.
              </p>
            </div>
          </div>

          {/* Form */}
          <div ref={formRef} className="lg:col-span-3">
            <div className="glass-card rounded-2xl p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <CheckCircle2 size={52} className="text-[var(--electric-blue)]" />
                  <h3 className="text-xl font-bold text-white">
                    Message Sent!
                  </h3>
                  <p className="text-[#8ba3c7] text-sm max-w-xs">
                    Thanks for reaching out. We&apos;ll get back to you within
                    24 hours with a tailored growth strategy.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStatus("idle")}
                    style={{ cursor: "none" }}
                  >
                    Send Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-[#8ba3c7] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className={inputClass(errors.name)}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs text-[#8ba3c7] mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className={inputClass(errors.email)}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-[#8ba3c7] mb-1.5">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company Inc."
                        className={inputClass()}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#8ba3c7] mb-1.5">
                        Service Needed
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={inputClass()}
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#8ba3c7] mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your project and goals..."
                      className={`${inputClass(errors.message)} resize-none`}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 rounded-xl px-4 py-3">
                      <AlertCircle size={16} />
                      <span>Something went wrong. Please try again.</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2"
                    disabled={status === "loading"}
                    style={{ cursor: "none" }}
                  >
                    {status === "loading" ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
