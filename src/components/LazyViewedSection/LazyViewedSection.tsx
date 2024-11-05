'use client';

import React from 'react';
import { Box } from '@mui/material';
import { centeredSectionSx } from '@/components/AboutUs/AboutUs';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import { InView } from 'react-intersection-observer';

interface LazyViewedSectionProps {
  title: string;
  children: React.ReactNode;
  id: string;
}

const LazyViewedSection: React.FC<LazyViewedSectionProps> = ({ title, children, id }) => {
  return (
    <Box id={id} sx={centeredSectionSx}>
      <SectionTitle title={title} />
      <InView triggerOnce={true} initialInView={false}>
        {({ inView, ref }) => {
          return (
            <Box ref={ref} sx={{ width: '100%', maxWidth: '100%' }}>
              {inView ? children : null}
            </Box>
          );
        }}
      </InView>
    </Box>
  );
};

export default LazyViewedSection;
