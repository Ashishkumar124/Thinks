import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { work, workFilters } from '@/data/site';

export default function WorkPage() {
  const [filter, setFilter] = useState('All');
  const items = useMemo(
    () => (filter === 'All' ? work : work.filter((w) => w.category === filter)),
    [filter]
  );

  return (
    <Layout
      title="Our Work | Think Digital Media"
      description="Explore Think Digital Media portfolio — outdoor, digital, print, events, video and branding campaigns across India."
    >
      <PageHero
        eyebrow="Portfolio"
        title="WORK THAT SPEAKS LOUDER."
        description="Selected campaigns across outdoor, digital, print, events, film and branding."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Work' },
        ]}
      />

      <section className="bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-[90rem]">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Portfolio filters">
            {workFilters.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`min-h-11 px-5 text-[0.68rem] font-bold uppercase tracking-[0.16em] transition-colors ${
                  filter === f ? 'bg-[#0072B9] text-white' : 'bg-[#EAF6FC] text-[#071923] hover:bg-[#071923]/10'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((w) => (
              <article key={w.slug} className="group flex flex-col border border-[#071923]/08 bg-white">
                <div className="aspect-[16/11] overflow-hidden">
                  <img
                    src={w.image}
                    alt={w.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#0072B9]">{w.category}</p>
                  <h2 className="mt-2 text-xl font-bold text-[#071923]">{w.name}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#071923]/60">{w.short}</p>
                  <Link
                    to={`/our-work/${w.slug}/`}
                    className="mt-6 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#0072B9]"
                  >
                    View project <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
