import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import { clients, images, industries, services, stats, testimonials, whyPoints, work } from '@/data/site';

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-[#071923] px-5 pb-16 pt-32 sm:px-8">
      <div className="tdm-grain pointer-events-none absolute inset-0 opacity-[0.18]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-24 top-1/3 h-[26rem] w-[26rem] rounded-full bg-[#0072B9]/20 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-[90rem] items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <Reveal y={16}>
            <p className="tdm-eyebrow flex items-center gap-3 text-[#4FB4E8]">
              <span className="h-px w-10 bg-[#0072B9]" />
              360° Advertising &amp; Marketing Agency
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="tdm-display mt-7 text-[2.6rem] text-white sm:text-6xl lg:text-[4.6rem] xl:text-[5.4rem]">
              We make brands
              <br />
              <span className="text-[#0072B9]">impossible</span> to ignore.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              From outdoor advertising and digital campaigns to events, print and visual production — we create
              communication that gets noticed.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-11 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/services/"
                className="group inline-flex min-h-[52px] items-center justify-center gap-3 bg-[#0072B9] px-8 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white transition-all duration-200 hover:bg-[#0086d8] active:scale-[0.98]"
              >
                Explore Our Services
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/our-work/"
                className="inline-flex min-h-[52px] items-center justify-center gap-3 border border-white/25 px-8 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:border-[#0072B9] hover:text-[#4FB4E8]"
              >
                View Our Work
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/4]"
          >
            <img src={images.heroMain} alt="Illuminated billboard advertising above a busy street" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071923] via-transparent to-transparent" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: 'easeOut' }}
            className="absolute -bottom-6 -left-2 hidden w-44 overflow-hidden border-4 border-[#071923] sm:block lg:-left-14 lg:w-56"
          >
            <img src={images.heroSecondary} alt="Corporate event stage" className="aspect-[4/3] w-full object-cover" loading="lazy" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="absolute -right-2 top-8 hidden w-40 overflow-hidden border-4 border-[#071923] lg:block lg:-right-10 lg:w-48"
          >
            <img src={images.heroThird} alt="Video production crew" className="aspect-[16/10] w-full object-cover" loading="lazy" />
          </motion.div>
        </div>
      </div>
      <div className="relative mx-auto mt-16 flex w-full max-w-[90rem] items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/40">
        <ArrowDown size={14} className="animate-bounce text-[#0072B9]" />
        Scroll to explore
      </div>
    </section>
  );
}

export function Clients() {
  const row = [...clients, ...clients];
  return (
    <section className="border-b border-[#071923]/8 bg-white py-16">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <h2 className="tdm-display text-center text-xl text-[#071923] sm:text-2xl">Trusted by brands that think big</h2>
      </div>
      <div className="relative mt-10 overflow-hidden">
        <div className="tdm-marquee flex w-max gap-14 pr-14">
          {row.map((c, i) => (
            <span key={`${c}-${i}`} className="whitespace-nowrap text-lg font-bold uppercase tracking-tight text-[#071923]/25 sm:text-2xl">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesOverview() {
  return (
    <section className="bg-[#EAF6FC] px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-[90rem]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="tdm-eyebrow text-[#0072B9]">What we do</p>
            <h2 className="tdm-display mt-4 text-3xl text-[#071923] sm:text-5xl">360° services. One partner.</h2>
          </div>
          <Link to="/services/" className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#0072B9]">
            All services <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Reveal key={s.slug}>
              <article className="group flex h-full flex-col border border-[#071923]/08 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-[#071923]/08">
                <span className="text-[0.7rem] font-bold tracking-[0.2em] text-[#0072B9]">{s.no}</span>
                <h3 className="mt-4 text-xl font-bold text-[#071923]">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#071923]/60">{s.desc}</p>
                <Link
                  to={s.href}
                  className="mt-8 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#0072B9] transition-transform group-hover:translate-x-1"
                >
                  View Service <ArrowRight size={14} />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutTeaser() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto grid max-w-[90rem] items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden">
            <img src={images.team} alt="Think Digital Media team collaboration" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
        <div>
          <p className="tdm-eyebrow text-[#0072B9]">About us</p>
          <h2 className="tdm-display mt-4 text-3xl text-[#071923] sm:text-5xl">We think beyond advertising.</h2>
          <p className="mt-6 text-base leading-relaxed text-[#071923]/65">
            Think Digital Media is a full-service Indian advertising agency. We plan ideas, craft creative and execute
            across outdoor, digital, print, events and film — so every surface feels like one brand.
          </p>
          <Link
            to="/about-us/"
            className="mt-10 inline-flex min-h-[48px] items-center gap-2 bg-[#071923] px-7 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white hover:bg-[#0072B9]"
          >
            Know more about us <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FeaturedWork() {
  const featured = work.slice(0, 4);
  return (
    <section className="bg-[#071923] px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-[90rem]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="tdm-eyebrow text-[#4FB4E8]">Selected work</p>
            <h2 className="tdm-display mt-4 text-3xl text-white sm:text-5xl">Work that speaks louder.</h2>
          </div>
          <Link to="/our-work/" className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#4FB4E8]">
            View all work <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {featured.map((w) => (
            <Link key={w.slug} to={`/our-work/${w.slug}/`} className="group relative aspect-[16/11] overflow-hidden">
              <img src={w.image} alt={w.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071923] via-[#071923]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#4FB4E8]">{w.category}</p>
                <h3 className="mt-2 text-xl font-bold text-white">{w.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Why() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-[90rem]">
        <p className="tdm-eyebrow text-[#0072B9]">Why Think</p>
        <h2 className="tdm-display mt-4 max-w-3xl text-3xl text-[#071923] sm:text-5xl">Built for brands that refuse to blend in.</h2>
        <div className="mt-14 grid gap-px bg-[#071923]/10 sm:grid-cols-2 lg:grid-cols-4">
          {whyPoints.map((p) => (
            <div key={p.no} className="bg-white p-8">
              <span className="text-[0.7rem] font-bold tracking-[0.2em] text-[#0072B9]">{p.no}</span>
              <h3 className="mt-4 text-lg font-bold text-[#071923]">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#071923]/60">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="bg-[#0072B9] px-5 py-16 sm:px-8 md:py-20">
      <div className="mx-auto grid max-w-[90rem] gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center text-white">
            <p className="tdm-display text-4xl sm:text-5xl">
              {s.text || (
                <>
                  <CountUp value={s.value} />
                  {s.suffix}
                </>
              )}
            </p>
            <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/75">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function IndustriesHome() {
  return (
    <section className="bg-[#EAF6FC] px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-[90rem]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="tdm-eyebrow text-[#0072B9]">Industries</p>
            <h2 className="tdm-display mt-4 text-3xl text-[#071923] sm:text-5xl">Built for every industry.</h2>
          </div>
          <Link to="/industries/" className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#0072B9]">
            Explore industries →
          </Link>
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          {industries.map((ind) => (
            <Link
              key={ind.slug}
              to={`/industries/${ind.slug}/`}
              className="border border-[#071923]/12 bg-white px-5 py-3 text-sm font-semibold text-[#071923] transition-colors hover:border-[#0072B9] hover:text-[#0072B9]"
            >
              {ind.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-[90rem]">
        <p className="tdm-eyebrow text-[#0072B9]">Testimonials</p>
        <h2 className="tdm-display mt-4 text-3xl text-[#071923] sm:text-5xl">What our clients think</h2>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="flex h-full flex-col border-t-4 border-[#0072B9] bg-[#EAF6FC] p-8">
              <p className="flex-1 text-base leading-relaxed text-[#071923]/80">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-8">
                <p className="font-bold text-[#071923]">{t.name}</p>
                <p className="text-sm text-[#071923]/55">
                  {t.role}, {t.company}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#071923] px-5 py-24 sm:px-8">
      <div className="tdm-grain pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="relative mx-auto max-w-[56rem] text-center">
        <h2 className="tdm-display text-3xl text-white sm:text-5xl lg:text-6xl">Ready to make your brand impossible to ignore?</h2>
        <p className="mx-auto mt-6 max-w-xl text-white/55">Tell us about the campaign. We will bring the plan, the craft and the execution.</p>
        <Link
          to="/contact-us/"
          className="mt-10 inline-flex min-h-[52px] items-center gap-2 bg-[#0072B9] px-10 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white hover:bg-[#0086d8]"
        >
          Let&apos;s work together <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
