import React from 'react';
import styles from './page.module.css';
import CopyrightFooter from '@/components/CopyrightFooter';
import Navbar from '@/components/Navbar/Navbar';
import ContactUs from '@/components/ContactUs/ContactUs';
import AboutUs from '@/components/AboutUs/AboutUs';
import Testimonials from '@/components/Testimonials/Testimonials';
import Gallery from '@/components/Gallery/Gallery';
import EmptySection from '@/components/EmptySection';
//import VideoGallery from '@/components/VideoGallery/VideoGallery';
import dynamic from 'next/dynamic';
//import VideoGallery2 from '@/components/VideoGallery/VideoGallery2';

const VideoGallery = dynamic(() => import('@/components/VideoGallery/VideoGallery'), {
  ssr: false
});

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar isAuthenticated={false} />
      <div className={styles.main}>
        <VideoGallery />
        <EmptySection />
        {/*<VideoGallery2 />*/}
        <Gallery />
        <Testimonials />
        <AboutUs />
        <ContactUs />
      </div>
      <CopyrightFooter />
    </div>
  );
}
