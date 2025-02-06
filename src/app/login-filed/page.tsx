import { Box } from '@mui/material';
import { centeredSectionSx } from '@/components/AboutUs/AboutUs';
import LazyViewedSection from '@/components/LazyViewedSection/LazyViewedSection';
import React from 'react';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import Button from '@mui/material/Button';
import { PATHS } from '@/helpers/paths';

export default async function GalleryPage() {
  return (
    <div>
      <SectionTitle title="Login Failed" />
      <div style={{ textAlign: 'center' }}>
        <Button
          href={PATHS.landing}
          variant={'contained'}
          sx={{ backgroundColor: 'secondary.dark' }}
          size={'large'}
        >
          Main page
        </Button>
      </div>
    </div>
  );
}
