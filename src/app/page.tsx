import React from 'react';
import styles from './page.module.css';
import AboutUs from '@/components/AboutUs/AboutUs';
import Testimonials from '@/components/Testimonials/Testimonials';
import Gallery from '@/components/Gallery/Gallery';
import EmptySection from '@/components/EmptySection';
import VideoGallery from '@/components/VideoGallery/VideoGallery';
import LazyViewedSection from '@/components/LazyViewedSection/LazyViewedSection';
import ScheduleSection from '@/components/Schedule/Schedule';
import { getPortsAction } from '@/controllers/PortsController';
import { queryNearestShippingsAction } from '@/controllers/SchedulesController';

export default async function Home() {
  const ports = await getPortsAction();
  // eslint-disable-next-line no-console
  console.log('ports: ', ports);
  const schedules = await queryNearestShippingsAction(new Date());
  // eslint-disable-next-line no-console
  console.log('schedules: ', schedules);

  return (
    <div className={styles.main}>
      <ScheduleSection ports={ports.ports} schedules={schedules} />
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
