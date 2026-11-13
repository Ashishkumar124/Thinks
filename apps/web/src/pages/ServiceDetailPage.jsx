import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { process, services, work } from '@/data/site';

const ctaBySlug = {
  'outdoor-advertising': 'Plan an outdoor campaign',
  'digital-marketing': 'Plan a digital campaign',
  'print-media': 'Plan a print campaign',
  'events-exhibitions': 'Plan an event',
  'video-production': 'Start a film project',
  'branding-creative': 'Start a branding project',
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/services/" replace />;

  const related = work.filter((w) => service.title.toLowerCase().includes(w.category.toLowerCase()) || w.category === 'Branding').slice(0, 3);
  const galleryWork = work.filter((w) => related.includes(w) || w.image === service.image).slice(0, 6);
  const gallery = galleryWork.length ? galleryWork : work.slice(0, 6);

  return (
    <Layout
      title={`${service.title} | Think Digital Media`}
      description={service.intro || service.desc}
      image={service.image}
    >
      <PageHero
        eyebrow={service.title}
        title={service.hero}
        description={service.intro}
        image={service.image}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services/' },
          { label: service.title },
        ]}
      >
        <Link
          to="/contact-us/"
          className="inline-flex min-h-[48px] items-center gap-2 bg-[#0072B9] px-8 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white"
        >
          {ctaBySlug[service.slug] || 'Talk to us'} <ArrowRight size={14} />
        </Link>
      </PageHero>

      <section className="bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-[90rem]">
          <p className="tdm-eyebrow text-[#0072B9]">Capabilities</p>
          <h2 className="tdm-display mt-4 text-3xl text-[#071923] sm:text-4xl">What we cover</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.offerings.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.03}>
                <article className="h-full border border-[#071923]/08 p-6 transition-colors hover:border-[#0072B9]/40 hover:bg-[#EAF6FC]">
                  <h3 className="text-lg font-bold text-[#071923]">{o.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#071923]/60">{o.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EAF6FC] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-[90rem]">
          <p className="tdm-eyebrow text-[#0072B9]">Gallery</p>
          <h2 className="tdm-display mt-4 text-3xl text-[#071923]">Visual reference</h2>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[service.image, ...gallery.map((g) => g.image)].slice(0, 6).map((src, i) => (
              <div key={`${src}-${i}`} className={`overflow-hidden ${i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}>
                <img src={src} alt="" className="aspect-[4/3] h-full w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {(service.slug === 'digital-marketing' || service.slug === 'events-exhibitions' || service.slug === 'video-production') && (
        <section className="bg-white px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-[90rem]">
            <p className="tdm-eyebrow text-[#0072B9]">Process</p>
            <h2 className="tdm-display mt-4 text-3xl text-[#071923]">How we deliver</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-4">
              {process.map((p) => (
                <div key={p.no} className="border-t-2 border-[#0072B9] pt-6">
                  <span className="text-sm font-bold text-[#0072B9]">{p.no}</span>
                  <h3 className="mt-3 text-xl font-bold text-[#071923]">{p.title}</h3>
                  <p className="mt-2 text-sm text-[#071923]/60">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#071923] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-[90rem]">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="tdm-eyebrow text-[#4FB4E8]">Projects</p>
              <h2 className="tdm-display mt-4 text-3xl text-white">Related work</h2>
            </div>
            <Link to="/our-work/" className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#4FB4E8]">
              All work →
            </Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {(related.length ? related : work.slice(0, 3)).map((w) => (
              <Link key={w.slug} to={`/our-work/${w.slug}/`} className="group block overflow-hidden">
                <div className="aspect-[16/11] overflow-hidden">
                  <img src={w.image} alt={w.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#4FB4E8]">{w.category}</p>
                <h3 className="mt-1 text-lg font-bold text-white">{w.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 text-center sm:px-8">
        <h2 className="tdm-display text-3xl text-[#071923] sm:text-4xl">{ctaBySlug[service.slug]?.toUpperCase() || 'LET\'S TALK'} →</h2>
        <Link
          to="/contact-us/"
          className="mt-10 inline-flex min-h-[52px] items-center gap-2 bg-[#0072B9] px-10 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white"
        >
          Contact us <ArrowRight size={16} />
        </Link>
      </section>
    </Layout>
  );
}
