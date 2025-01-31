import React from 'react';
import ServiceCard from '@/components/Services/ServiceCard';
import { INCLUDED_SERVICES, OPTIONAL_SERVICES } from '@/components/Services/services-list';
import { centeredSectionSx, emphasizedTextStyle } from '@/components/AboutUs/AboutUs';
import { Box } from '@mui/material';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import Button from '@mui/material/Button';
import { PATHS } from '@/helpers/paths';

const Services = () => {
  return (
    <Box id="services-section" sx={{ ...centeredSectionSx }}>
      <SectionTitle title="Services" />
      <Box
        sx={{
          width: { xs: '100%', md: '80%' },
          margin: 'auto',
          padding: '0 16px',
          fontSize: '1.2em'
        }}
      >
        <span style={emphasizedTextStyle}>Allied Yacht Transport</span>
        &nbsp;offers numerous services which yacht owners have access to. Some services are
        necessary for every transport and these are included in every shipping contract; while
        others are optional based on customer needs.
      </Box>

      <div style={{ marginTop: '40px' }} />
      <SectionTitle title="Included Services" />
      {INCLUDED_SERVICES.map((service, index) => (
        <ServiceCard {...service} key={index} />
      ))}

      <div style={{ marginTop: '40px' }} />
      <SectionTitle title="Optional Services" />
      {OPTIONAL_SERVICES.map((service, index) => (
        <ServiceCard {...service} key={index} />
      ))}

      <div style={{ marginTop: '40px', marginBottom: '40px' }}>
        <Button
          href={PATHS.quoteRequest}
          variant={'contained'}
          sx={{ backgroundColor: 'secondary.dark' }}
          size={'large'}
        >
          Get Quote
        </Button>
      </div>
    </Box>
  );
};

export default Services;
