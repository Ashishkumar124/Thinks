import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '@/components/Reveal';
import { cn } from '@/lib/utils';

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/50">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <span className="text-white/25">/</span>}
            {item.href ? (
              <Link to={item.href} className="transition-colors hover:text-[#4FB4E8]">
                {item.label}
              </Link>
            ) : (
              <span className="text-white/80">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  image,
  compact,
  children,
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-[#071923] px-5 sm:px-8',
        compact ? 'pb-16 pt-28 md:pb-20 md:pt-32' : 'pb-20 pt-32 md:pb-28 md:pt-40'
      )}
    >
      <div className="tdm-grain pointer-events-none absolute inset-0 opacity-[0.16]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#0072B9]/25 blur-[100px]" aria-hidden="true" />
      {image && (
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-30 lg:block">
          <img src={image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071923] via-[#071923]/85 to-transparent" />
        </div>
      )}
      <div className="relative mx-auto max-w-[90rem]">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {eyebrow && (
          <Reveal y={12}>
            <p className="tdm-eyebrow text-[#4FB4E8]">
              <span className="mr-3 inline-block h-px w-10 align-middle bg-[#0072B9]" />
              {eyebrow}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.06}>
          <h1 className="tdm-display mt-5 max-w-5xl text-[2.35rem] text-white sm:text-5xl lg:text-[4.2rem]">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">{description}</p>
          </Reveal>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
