import React from 'react';
import Layout from '@/components/Layout';
import {
  AboutTeaser,
  Clients,
  FeaturedWork,
  FinalCta,
  Hero,
  IndustriesHome,
  ServicesOverview,
  Stats,
  Testimonials,
  Why,
} from '@/components/sections/HomeSections';

const description =
  'Think Digital Media is a full-service advertising agency offering outdoor advertising, digital marketing, print media, events, exhibitions, video production and creative solutions across India.';

export default function HomePage() {
  return (
    <Layout title="Think Digital Media | 360° Advertising & Marketing Agency" description={description}>
      <Hero />
      <Clients />
      <ServicesOverview />
      <AboutTeaser />
      <FeaturedWork />
      <Why />
      <Stats />
      <IndustriesHome />
      <Testimonials />
      <FinalCta />
    </Layout>
  );
}
