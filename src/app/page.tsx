import React from 'react';
import styles from './page.module.css';
import CopyrightFooter from '@/components/CopyrightFooter';
import Navbar from '@/components/Navbar/Navbar';
import ContactUs from '@/components/ContactUs/ContactUs';
import AboutUs from '@/components/AboutUs/AboutUs';
import Testimonials from '@/components/Testimonials/Testimonials';
import Gallery from '@/components/Gallery/Gallery';
import EmptySection from '@/components/EmptySection';

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar isAuthenticated={false} />
      <div className={styles.main}>
        <EmptySection />
        <Gallery />
        <Testimonials />
        <AboutUs />
        <ContactUs />
      </div>
      <CopyrightFooter />
    </div>
  );
}
