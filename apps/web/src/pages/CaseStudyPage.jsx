import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { work } from '@/data/site';

export default function CaseStudyPage() {
  const { slug } = useParams();
  const project = work.find((w) => w.slug === slug);
  if (!project) return <Navigate to="/our-work/" replace />;

  const blocks = [
    { label: 'Client', value: project.client },
    { label: 'Objective', value: project.objective },
    { label: 'Strategy', value: project.strategy },
    { label: 'Execution', value: project.execution },
    { label: 'Media used', value: project.media },
    { label: 'Results', value: project.results },
  ];

  return (
    <Layout title={`${project.name} | Our Work | Think Digital Media`} description={project.short} image={project.image}>
      <PageHero
        eyebrow={project.category}
        title={project.name}
        description={project.short}
        image={project.image}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Work', href: '/our-work/' },
          { label: project.name },
        ]}
      />

      <section className="bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-[90rem] gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="tdm-eyebrow text-[#0072B9]">Overview</p>
            <h2 className="tdm-display mt-4 text-3xl text-[#071923]">Project overview</h2>
          </div>
          <div className="space-y-8">
            {blocks.map((b) => (
              <div key={b.label} className="border-b border-[#071923]/10 pb-6">
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#0072B9]">{b.label}</h3>
                <p className="mt-3 text-base leading-relaxed text-[#071923]/75">{b.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EAF6FC] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-[90rem]">
          <h2 className="tdm-display text-3xl text-[#071923]">Gallery</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {(project.gallery || [project.image]).map((src, i) => (
              <img key={`${src}-${i}`} src={src} alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 text-center sm:px-8">
        <Link to="/contact-us/" className="inline-flex min-h-[52px] items-center gap-2 bg-[#0072B9] px-10 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white">
          Start a similar project <ArrowRight size={16} />
        </Link>
      </section>
    </Layout>
  );
}
