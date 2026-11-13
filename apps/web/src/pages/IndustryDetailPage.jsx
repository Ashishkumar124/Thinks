import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { industries, services } from '@/data/site';

export default function IndustryDetailPage() {
  const { slug } = useParams();
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return <Navigate to="/industries/" replace />;

  return (
    <Layout title={`${industry.title} Advertising | Think Digital Media`} description={industry.desc} image={industry.image}>
      <PageHero
        eyebrow="Industry"
        title={industry.title.toUpperCase()}
        description={industry.desc}
        image={industry.image}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Industries', href: '/industries/' },
          { label: industry.title },
        ]}
      />

      <section className="bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-[90rem] gap-12 lg:grid-cols-2">
          <div>
            <p className="tdm-eyebrow text-[#0072B9]">Challenges</p>
            <h2 className="tdm-display mt-4 text-3xl text-[#071923]">What brands face</h2>
            <p className="mt-6 text-base leading-relaxed text-[#071923]/65">{industry.challenges}</p>
          </div>
          <div>
            <p className="tdm-eyebrow text-[#0072B9]">Our approach</p>
            <h2 className="tdm-display mt-4 text-3xl text-[#071923]">How we help</h2>
            <p className="mt-6 text-base leading-relaxed text-[#071923]/65">{industry.approach}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#EAF6FC] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-[90rem]">
          <h2 className="tdm-display text-2xl text-[#071923] sm:text-3xl">Relevant services</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {services.map((s) => (
              <Link key={s.slug} to={s.href} className="bg-white px-5 py-3 text-sm font-semibold text-[#071923] hover:text-[#0072B9]">
                {s.title}
              </Link>
            ))}
          </div>
          <Link to="/contact-us/" className="mt-12 inline-flex min-h-[48px] items-center gap-2 bg-[#0072B9] px-8 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white">
            Discuss your {industry.title.toLowerCase()} campaign <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
