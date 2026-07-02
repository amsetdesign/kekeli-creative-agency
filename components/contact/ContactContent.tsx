"use client";

import Link from "next/link";
import { ChevronRight, Mail, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import Badge from "@/components/ui/Badge";
import ContactForm from "@/components/contact/ContactForm";
import { useT } from "@/hooks/useT";

export default function ContactContent() {
  const tr = useT();
  const c = tr.pages.contact;

  return (
    <>
      {/* HERO */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #08060F 0%, #12082A 35%, #1C0840 60%, #0A0618 100%)" }}
      >
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full blur-[150px] opacity-22" style={{ background: "#7C3AED" }} />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[120px] opacity-20" style={{ background: "#C8A84B" }} />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full blur-[90px] opacity-15" style={{ background: "#3B82F6" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="down" className="mb-6">
            <nav className="flex items-center gap-2 text-xs font-body" style={{ color: "rgba(220,210,255,0.45)" }}>
              <Link href="/" className="hover:text-gold transition-colors">{c.breadHome}</Link>
              <ChevronRight size={12} />
              <span style={{ color: "rgba(220,210,255,0.70)" }}>Contact</span>
            </nav>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              {c.sectionTitle1}
            </p>
            <h1 className="font-display text-5xl sm:text-6xl text-white">
              {c.sectionTitle2} <em className="text-gold not-italic">{c.sectionTitleHL}</em>
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* 2-COLUMN LAYOUT */}
      <section className="py-16 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
            {/* LEFT — Info */}
            <FadeIn direction="right">
              <div>
                <h2 className="font-display text-3xl text-text-primary mb-2">
                  {c.guarantee}<em className="text-gold not-italic">{c.guaranteeHL}</em>
                </h2>
                <p className="font-body text-text-muted text-sm leading-relaxed mb-8">
                  {c.subtitle}
                </p>

                <div className="space-y-4 mb-8">
                  <a
                    href="mailto:kekelicreativeagency@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-xl border border-border bg-bg-primary hover:border-gold hover:[box-shadow:var(--shadow-gold)] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gold-pale flex items-center justify-center shrink-0">
                      <Mail size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-text-muted mb-0.5">{c.emailLabel}</p>
                      <p className="font-body text-sm font-medium text-text-primary group-hover:text-gold transition-colors">
                        kekelicreativeagency@gmail.com
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/221765289111"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border border-border bg-bg-primary hover:border-gold hover:[box-shadow:var(--shadow-gold)] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gold-pale flex items-center justify-center shrink-0">
                      <MessageCircle size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-text-muted mb-0.5">{c.whatsappLabel}</p>
                      <p className="font-body text-sm font-medium text-text-primary group-hover:text-gold transition-colors">
                        {c.whatsappCta}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-bg-primary">
                    <div className="w-10 h-10 rounded-full bg-gold-pale flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-text-muted mb-0.5">{c.locationLabel}</p>
                      <p className="font-body text-sm font-medium text-text-primary">Dakar, Sénégal</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-bg-dark border border-gold/20 [box-shadow:var(--shadow-gold)]">
                  <Badge variant="gold" className="mb-3">{c.auditBadge}</Badge>
                  <h3 className="font-display text-xl text-text-on-dark mb-2">{c.auditTitle}</h3>
                  <p className="font-body text-sm text-text-on-dark/60 mb-4">{c.auditDesc}</p>
                  <Link
                    href="/sondage"
                    className="inline-flex items-center gap-2 font-body text-sm font-medium text-gold hover:text-gold-light transition-colors group"
                  >
                    {c.auditCta}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </FadeIn>

            {/* RIGHT — Form */}
            <FadeIn direction="left" delay={0.15}>
              <div className="bg-bg-primary rounded-2xl border border-border p-6 sm:p-8 [box-shadow:var(--shadow-md)]">
                <h2 className="font-display text-2xl text-text-primary mb-1">{c.formTitle}</h2>
                <p className="font-body text-sm text-text-muted mb-6">
                  {c.formNote}
                </p>
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

    </>
  );
}
