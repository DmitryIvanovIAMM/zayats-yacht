import { Box } from '@mui/material';
import { centeredSectionSx } from '@/components/AboutUs/AboutUs';
import LazyViewedSection from '@/components/LazyViewedSection/LazyViewedSection';
import React from 'react';
import VideoGallery from '@/components/VideoGallery/VideoGallery';
import PhotoGallery from '@/components/Gallery2/PhotoGallery';

export default async function Gallery() {
  return (
    <Box id="faq" sx={{ ...centeredSectionSx, color: 'secondary.dark' }}>
      <LazyViewedSection title="Video Gallery" id="video-gallery-section">
        <VideoGallery />
      </LazyViewedSection>
      <LazyViewedSection title="Photo Gallery" id="photo-gallery-section">
        <PhotoGallery />
      </LazyViewedSection>
    </Box>
  );
}
