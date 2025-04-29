import React from 'react';
import styles from './page.module.css';
import AboutUs from '@/components/AboutUs/AboutUs';
import Testimonials from '@/components/Testimonials/Testimonials';
import Gallery from '@/components/Gallery/Gallery';
import EmptySection from '@/components/EmptySection';
import VideoGallery from '@/components/VideoGallery/VideoGallery';
import LazyViewedSection from '@/components/LazyViewedSection/LazyViewedSection';
import ScheduleSection from '@/components/Schedule/Schedule';
import { getPorts } from '@/app/api/ports/getPorts';
import { getNearestSchedule } from '@/app/api/schedule/nearest/getNearestSchedule';

export default async function Home() {
  const ports = await getPorts();
  // eslint-disable-next-line no-console
  // console.log('Home().  ports: ', ports);
  const schedules = await getNearestSchedule();
  // eslint-disable-next-line no-console
  // console.log('schedules: ', schedules);

  return (
    <div className={styles.main}>
      <ScheduleSection ports={ports} schedules={schedules} />
      <EmptySection />
      <LazyViewedSection title="Gallery" id="photo-gallery-section">
        <Gallery />
      </LazyViewedSection>
      <LazyViewedSection title="Video Gallery" id="video-gallery-section">
        <VideoGallery />
      </LazyViewedSection>
      <Testimonials />
      <AboutUs />
    </div>
  );
}
