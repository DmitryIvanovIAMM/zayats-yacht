import React from 'react';
import { Box } from '@mui/material';

import SectionTitle from '@/components/SectionTitle/SectionTitle';
import { centeredSectionSx } from '@/components/AboutUs/AboutUs';

const EmptySection = () => {
  return (
    <Box id="photo-gallery-section" sx={{ ...centeredSectionSx, minHeight: '100vh' }}>
      <SectionTitle title="Empty section" />
    </Box>
  );
};

export default EmptySection;
