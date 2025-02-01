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
    <Box
      id="services-section"
      sx={{
        ...centeredSectionSx,
        width: { xs: '100%', sm: '90%' },
        maxWidth: { xs: '100%', sm: '90%' }
      }}
    >
      <SectionTitle title="Services" />
      <Box
        sx={{
          width: { xs: '100%', sm: '440px', md: 'auto', lg: 'auto' },
          margin: 'auto',
          padding: '0 0',
          fontSize: '1.2em'
        }}
      >
        <div style={{ marginLeft: '10px' }}>
          <span style={emphasizedTextStyle}>Allied Yacht Transport</span>
          &nbsp;offers numerous services which yacht owners have access to. Some services are
          necessary for every transport and these are included in every shipping contract; while
          others are optional based on customer needs.
        </div>

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
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '40px',
            marginBottom: '40px'
          }}
        >
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
    </Box>
  );
};

export default Services;
