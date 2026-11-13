import React from 'react';
import { Helmet } from 'react-helmet';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import { images } from '@/data/site';

export default function Layout({ title, description, children, image }) {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Seo title={title} description={description} image={image || images.heroMain} siteName="Think Digital Media" />
      <Navbar />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
