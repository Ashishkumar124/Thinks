import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { services } from '@/data/site';

export default function ServicesPage() {
  return (
    <Layout
      title="Services | Think Digital Media"
      description="Explore Think Digital Media services — outdoor advertising, digital marketing, print, events, video production and branding."
    >
      <PageHero
        eyebrow="Services"
        title="360° ADVERTISING. ONE CREATIVE PARTNER."
        description="Six integrated disciplines. One team that plans the idea and owns the execution."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services' },
        ]}
      />
      <section className="bg-white">
        {services.map((s, i) => (
          <Link
            key={s.slug}
            to={s.href}
            className={`group grid border-b border-[#071923]/10 lg:grid-cols-2 ${i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''}`}
          >
            <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
              <img
                src={s.image}
                alt={s.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-center bg-[#EAF6FC] px-8 py-14 sm:px-12 lg:px-16">
              <Reveal>
                <span className="text-[0.75rem] font-bold tracking-[0.28em] text-[#0072B9]">{s.no}</span>
                <h2 className="tdm-display mt-4 text-3xl text-[#071923] sm:text-4xl">{s.title}</h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-[#071923]/65">{s.desc}</p>
                <p className="mt-4 text-sm text-[#071923]/45">{s.items}</p>
                <span className="mt-10 inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#0072B9]">
                  Explore service <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Reveal>
            </div>
          </Link>
        ))}
      </section>
    </Layout>
  );
}
