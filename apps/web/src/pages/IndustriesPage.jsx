import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { industries } from '@/data/site';

export default function IndustriesPage() {
  return (
    <Layout
      title="Industries | Think Digital Media"
      description="Advertising and marketing solutions for government, FMCG, real estate, education, healthcare, automotive and more."
    >
      <PageHero
        eyebrow="Industries"
        title="BUILT FOR EVERY INDUSTRY."
        description="Category experience across public sector and private brands — with media plans that respect how each industry decides."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Industries' },
        ]}
      />
      <section className="bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-[90rem] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <Link key={ind.slug} to={`/industries/${ind.slug}/`} className="group overflow-hidden border border-[#071923]/08">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={ind.image} alt={ind.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#071923]">{ind.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#071923]/60">{ind.desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#0072B9]">
                  View industry <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
