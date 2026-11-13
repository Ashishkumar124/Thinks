import React from 'react';
import { Link } from 'react-router-dom';
import { company, logoUrl, navLinks, services } from '@/data/site';

export default function SiteFooter() {
  const quick = navLinks.filter((l) => !l.children);

  return (
    <footer className="bg-[#071923] text-white">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="inline-block">
            <img src={logoUrl} alt={company.name} className="h-12 w-auto brightness-0 invert" />
          </Link>
          <p className="tdm-display mt-8 text-2xl text-white/90 sm:text-3xl">{company.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
            360° advertising agency — outdoor, digital, print, events, video and branding across India.
          </p>
        </div>

        <div>
          <p className="tdm-eyebrow text-[#4FB4E8]">Quick Links</p>
          <ul className="mt-5 space-y-3">
            {quick.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="text-sm text-white/65 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/services/" className="text-sm text-white/65 transition-colors hover:text-white">
                Services
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="tdm-eyebrow text-[#4FB4E8]">Services</p>
          <ul className="mt-5 space-y-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={s.href} className="text-sm text-white/65 transition-colors hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="tdm-eyebrow text-[#4FB4E8]">Contact</p>
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            <li>
              <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="hover:text-white">
                {company.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-white">
                {company.email}
              </a>
            </li>
            <li className="leading-relaxed">{company.address}</li>
            <li>{company.reach}</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            {company.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="border border-white/15 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/70 transition-colors hover:border-[#0072B9] hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[90rem] flex-col gap-2 px-5 py-6 text-[0.7rem] text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p className="uppercase tracking-[0.2em]">{company.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
