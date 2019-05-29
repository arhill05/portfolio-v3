import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import './index.css';
import HeroContent from '../components/hero-content';
import HeroImage from '../components/hero-image';
import HeroIcons from '../components/hero-icons';

const IndexPage = () => (
  <Layout>
    <SEO
      title="Home"
      keywords={[`andrew hill`, `portfolio`, `web developer`, `freelance`]}
    />
    <section className="hero">
      <HeroContent />
      <HeroImage />
      <HeroIcons />
    </section>
  </Layout>
);

export default IndexPage;
