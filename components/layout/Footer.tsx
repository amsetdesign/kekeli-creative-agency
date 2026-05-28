"use client";

import Link from "next/link";
import { useT } from "@/hooks/useT";

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

  const pages = [
    { href: "/",             label: tr.nav.home },
    { href: "/services",     label: f.allServices },
    { href: "/artistes",     label: tr.nav.artists },
    { href: "/entreprises",  label: tr.nav.companies },
    { href: "/realisations", label: f.portfolio },
    { href: "/a-propos",     label: tr.nav.agency },
    { href: "/experience",   label: f.experience },
    { href: "/contact",      label: f.contact },
    { href: "/sondage",      label: tr.nav.freeAudit },
    { href: "/brief",        label: f.brief },
  ];

  return (
    <footer className="bg-bg-dark text-text-on-dark">
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                <span className="font-display font-bold text-gold text-lg leading-none">K</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-body font-semibold text-text-on-dark text-sm tracking-[0.15em]">
                  KEKELI<span className="text-gold">.</span>
                </span>
                <span className="font-body text-[10px] text-text-on-dark/50 tracking-[0.2em] uppercase">Creative Agency</span>
              </div>
            </div>
            <p className="text-sm font-body text-text-on-dark/60 leading-relaxed mb-6">
              {f.tagline}<br />{f.location}
            </p>
            <div className="p-4 rounded-xl border border-gold/20 bg-gold/5">
              <p className="text-xs font-body text-text-on-dark/60 mb-2">{f.auditBadge}</p>
              <Link href="/sondage" className="text-sm font-body font-medium text-gold hover:text-gold-light transition-colors">
                {f.auditCta}
              </Link>
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
                <a href="https://wa.me/221781672819" className="hover:text-text-on-dark transition-colors">
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
