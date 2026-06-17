"use client";

import Link from "next/link";
import Image from "next/image";
import { useT } from "@/hooks/useT";

const PAYMENT_METHODS = [
  { label: "Wave",         dot: "#1A90FF" },
  { label: "Orange Money", dot: "#FF6B00" },
  { label: "PayPal",       dot: "#009CDE" },
  { label: "Virement",     dot: "#C8A84B" },
];

export default function Footer() {
  const tr = useT();
  const f = tr.footer;

  const artisteLinks = [
    { label: f.artistDir,       href: "/artistes/direction" },
    { label: f.artistBranding,  href: "/artistes/branding" },
    { label: f.artistClips,     href: "/artistes/clips" },
    { label: f.artistPhoto,     href: "/artistes/photo" },
    { label: f.artistDist,      href: "/artistes/distribution" },
    { label: f.artistMarketing, href: "/artistes/marketing" },
    { label: f.artistMonetize,  href: "/artistes/monetisation" },
  ];

  const entrepriseLinks = [
    { label: f.companyBranding,   href: "/entreprises/branding" },
    { label: f.companySite,       href: "/entreprises/site-web" },
    { label: f.companyCM,         href: "/entreprises/community" },
    { label: f.companyAds,        href: "/entreprises/publicite" },
    { label: f.companyApps,       href: "/entreprises/applications" },
    { label: f.companyPhotoVideo, href: "/entreprises/photo-video" },
    { label: f.companyCoach,      href: "/entreprises/coaching" },
  ];

  const personnaliteLinks = [
    { label: f.persoPersonalBranding,   href: "/personnalites/personal-branding" },
    { label: f.persoImageDigitale,      href: "/personnalites/image-digitale" },
    { label: f.persoStrategieInfluence, href: "/personnalites/strategie-influence" },
    { label: f.persoGestionReputation,  href: "/personnalites/gestion-reputation" },
  ];

  const pages = [
    { href: "/",              label: tr.nav.home },
    { href: "/services",      label: f.allServices },
    { href: "/artistes",      label: tr.nav.artists },
    { href: "/entreprises",   label: tr.nav.companies },
    { href: "/personnalites", label: tr.nav.personnalites },
    { href: "/realisations",  label: f.portfolio },
    { href: "/tarifs",        label: tr.nav.pricing },
    { href: "/a-propos",      label: tr.nav.agency },
    { href: "/contact",       label: f.contact },
    { href: "/sondage",       label: tr.nav.freeAudit },
    { href: "/brief",         label: f.brief },
  ];

  return (
    <footer className="bg-bg-dark text-text-on-dark">
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div style={{ position: "relative", width: 150, height: 42 }}>
                <Image
                  src="/images/logo-horizontal-dark.png"
                  alt="KEKELI Creative Agency"
                  fill
                  sizes="150px"
                  style={{ objectFit: "contain", objectPosition: "left center" }}
                />
              </div>
            </div>
            <p className="text-sm font-body text-text-on-dark/60 leading-relaxed mb-6">
              {f.tagline}<br />{f.location}
            </p>
            <div className="p-4 rounded-xl border border-gold/20 bg-gold/5 mb-6">
              <p className="text-xs font-body text-text-on-dark/60 mb-2">{f.auditBadge}</p>
              <Link href="/sondage" className="text-sm font-body font-medium text-gold hover:text-gold-light transition-colors">
                {f.auditCta}
              </Link>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex items-center gap-3">
              {[
                { initials: "IG", href: "https://www.instagram.com/kekeli_agency",                 label: "Instagram KEKELI Creative Agency" },
                { initials: "FB", href: "https://www.facebook.com/kekelicreativeagency",           label: "Facebook KEKELI Creative Agency" },
                { initials: "YT", href: "https://www.youtube.com/@kekelicreativeagency",           label: "YouTube KEKELI Creative Agency" },
                { initials: "IN", href: "https://www.linkedin.com/company/kekeli-creative-agency", label: "LinkedIn KEKELI Creative Agency" },
              ].map(({ initials, href, label }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 font-body font-bold text-[10px] tracking-wide"
                  style={{ background: "rgba(200,168,75,0.08)", border: "1px solid rgba(200,168,75,0.25)", color: "#C8A84B" }}>
                  {initials}
                </a>
              ))}
            </div>

            {/* Modes de paiement */}
            <div className="mt-6">
              <p className="font-body text-[10px] uppercase tracking-[0.18em] text-text-on-dark/35 mb-2">Paiement accepté</p>
              <div className="flex flex-wrap gap-1.5">
                {PAYMENT_METHODS.map(({ label, dot }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-body text-[10px] font-medium"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.60)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: dot }} />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Artistes */}
          <div>
            <h3 className="font-body font-semibold text-sm uppercase tracking-[0.15em] text-gold mb-6">{f.artistsCol}</h3>
            <ul className="space-y-3">
              {artisteLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm font-body text-text-on-dark/60 hover:text-text-on-dark transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprises */}
          <div>
            <h3 className="font-body font-semibold text-sm uppercase tracking-[0.15em] text-gold mb-6">{f.companiesCol}</h3>
            <ul className="space-y-3">
              {entrepriseLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm font-body text-text-on-dark/60 hover:text-text-on-dark transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Personnalités */}
          <div>
            <h3 className="font-body font-semibold text-sm uppercase tracking-[0.15em] mb-6" style={{ color: "#10B981" }}>{f.persoCol}</h3>
            <ul className="space-y-3">
              {personnaliteLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm font-body text-text-on-dark/60 hover:text-text-on-dark transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-body font-semibold text-sm uppercase tracking-[0.15em] text-gold mb-6">{f.navCol}</h3>
            <ul className="space-y-3">
              {pages.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm font-body text-text-on-dark/60 hover:text-text-on-dark transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-body font-semibold text-sm uppercase tracking-[0.15em] text-gold mb-6">{f.contact}</h3>
            <ul className="space-y-3 text-sm font-body text-text-on-dark/60">
              <li>
                <a href="mailto:kekelicreativeagency@gmail.com" className="hover:text-text-on-dark transition-colors">
                  kekelicreativeagency@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/221781672819" target="_blank" rel="noopener noreferrer" className="hover:text-text-on-dark transition-colors">
                  {f.whatsapp}
                </a>
              </li>
              <li>Dakar, Sénégal</li>
            </ul>
          </div>

        </div>
      </div>

      <div className="border-t border-text-on-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body text-text-on-dark/40">
            © {new Date().getFullYear()} KEKELI Creative Agency — {f.rights}
          </p>
          <p className="text-xs font-body text-text-on-dark/40">
            Dakar, Sénégal · <span className="text-gold/60">KEKELI</span> {f.eweNote.replace("KEKELI ", "")}
          </p>
        </div>
      </div>
    </footer>
  );
}
