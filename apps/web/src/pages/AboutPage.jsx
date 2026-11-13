import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import { aboutContent, images, stats, whyPoints } from '@/data/site';

export default function AboutPage() {
  return (
    <Layout
      title="About Us | Think Digital Media"
      description="Learn about Think Digital Media — a Delhi-based 360° advertising agency delivering outdoor, digital, print, events and film across India."
      image={images.team}
    >
      <PageHero
        eyebrow="About Us"
        title="WE THINK BEYOND ADVERTISING."
        description={aboutContent.intro}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us' },
        ]}
        image={images.team}
      />

      <section className="bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-[90rem] gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="tdm-eyebrow text-[#0072B9]">Company</p>
            <h2 className="tdm-display mt-4 text-3xl text-[#071923] sm:text-4xl">Who we are</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg leading-relaxed text-[#071923]/70">{aboutContent.who}</p>
            <p className="mt-6 text-base leading-relaxed text-[#071923]/60">
              Based in Delhi with pan-India reach, we partner with government, FMCG, real estate, education, automotive
              and growth brands that need one team to own the full communication stack.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#071923] px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-[90rem] gap-10 md:grid-cols-2">
          <div className="border border-white/10 p-10">
            <p className="tdm-eyebrow text-[#4FB4E8]">Vision</p>
            <h2 className="tdm-display mt-4 text-2xl text-white sm:text-3xl">Our vision</h2>
            <p className="mt-6 text-white/65 leading-relaxed">{aboutContent.vision}</p>
          </div>
          <div className="border border-white/10 p-10">
            <p className="tdm-eyebrow text-[#4FB4E8]">Mission</p>
            <h2 className="tdm-display mt-4 text-2xl text-white sm:text-3xl">Our mission</h2>
            <p className="mt-6 text-white/65 leading-relaxed">{aboutContent.mission}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#EAF6FC] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-[90rem]">
          <p className="tdm-eyebrow text-[#0072B9]">Approach</p>
          <h2 className="tdm-display mt-4 text-3xl text-[#071923] sm:text-4xl">How we work</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {aboutContent.approach.map((a, i) => (
              <article key={a.title} className="bg-white p-8">
                <span className="text-[0.7rem] font-bold tracking-[0.2em] text-[#0072B9]">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-bold text-[#071923]">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#071923]/60">{a.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-[90rem]">
          <p className="tdm-eyebrow text-[#0072B9]">Why clients choose us</p>
          <div className="mt-10 grid gap-px bg-[#071923]/10 sm:grid-cols-2 lg:grid-cols-4">
            {whyPoints.map((p) => (
              <div key={p.no} className="bg-white p-8">
                <span className="text-[#0072B9] font-bold text-sm">{p.no}</span>
                <h3 className="mt-3 font-bold text-[#071923]">{p.title}</h3>
                <p className="mt-2 text-sm text-[#071923]/60">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="bg-[#0072B9] px-5 py-20 sm:px-10">
          <p className="tdm-eyebrow text-white/80">Capabilities</p>
          <h2 className="tdm-display mt-4 text-3xl text-white">What we deliver</h2>
          <ul className="mt-10 space-y-4">
            {aboutContent.capabilities.map((c) => (
              <li key={c} className="border-b border-white/20 pb-4 text-lg text-white/90">
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative min-h-[320px]">
          <img src={images.skyline} alt="Indian city skyline media landscape" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#071923]/55" />
          <div className="relative flex h-full flex-col justify-end p-10 text-white">
            <p className="tdm-eyebrow text-[#4FB4E8]">Pan India</p>
            <h2 className="tdm-display mt-3 text-3xl">Presence that scales</h2>
            <p className="mt-4 max-w-md text-white/75">{aboutContent.presence}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#071923] px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-[90rem] gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center text-white">
              <p className="tdm-display text-4xl">
                {s.text || (
                  <>
                    <CountUp value={s.value} />
                    {s.suffix}
                  </>
                )}
              </p>
              <p className="mt-2 text-[0.7rem] uppercase tracking-[0.2em] text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-20 text-center sm:px-8">
        <h2 className="tdm-display text-3xl text-[#071923] sm:text-5xl">Let&apos;s work together</h2>
        <Link
          to="/contact-us/"
          className="mt-10 inline-flex min-h-[52px] items-center gap-2 bg-[#0072B9] px-10 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white"
        >
          Start a conversation <ArrowRight size={16} />
        </Link>
      </section>
    </Layout>
  );
}
