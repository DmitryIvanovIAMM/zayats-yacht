import React, { FC } from 'react';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import { centeredSectionSx } from '@/components/AboutUs/AboutUs';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import { primary } from '@/components/colors';

const quotedTextSx = {
  paddingLeft: '10px',
  borderLeft: `0.2em solid ${primary.main}`,
  fontSize: '1.1em',
  position: 'relative',
  '&:before, &:after': {
    content: "'\\201C'"
  }
};

const authorStyle = {
  fontSize: '1.0em',
  fontWeight: 600,
  textAlign: 'end'
};
const dividerSx = {
  width: '60%',
  margin: '15px auto',
  color: 'primary.main',
  backgroundColor: 'primary.main'
};

const Testimonials: FC = () => {
  return (
    <Box id="about-us-section" sx={centeredSectionSx}>
      <SectionTitle title="Testimonials" />
      <Box sx={quotedTextSx}>
        Thank you for the fine work you did on the Beneteau swift trawler that we had you send down
        from Victoria to Ensenada. The owners are really happy with their new boat! We have more
        opportunities in the pipeline and we will definitely be contacting you again so that we may
        use your services.
      </Box>
      <Box sx={authorStyle}>
        Walter Johnson <br />
        President <br />
        ENGEL & VÖLKERS YACHTING
      </Box>
      <Divider sx={dividerSx} />
      <Box sx={quotedTextSx}>
        I would like to express my sincere gratitude for the ship visit last week. Justin really
        gave me a great tour! Very happy to be a customer and to be able to support Allied Yacht
        Transport. You are running a really good business!
        <br />
        Thanks again for the amazing customer service!!
      </Box>
      <Box sx={authorStyle}>
        Rich
        <br />
        Vessel: Adventurer
      </Box>
      <Divider sx={dividerSx} />
      <Box sx={quotedTextSx}>
        Thanks are in order for Allied Yacht Transport and Vadim who, thanks to their commitment to
        service, helped our team to ensure we made the trip to the transport boat on time for
        departure. Awesome support.
      </Box>
      <Box sx={authorStyle}>Mike Karty</Box>
      <Divider sx={dividerSx} />
      <Box sx={quotedTextSx}>
        Vadim Yegudkin, thank you for all your hard work on our transportation needs. I definitely
        will be recommending your services and you will be the person we contact if she need to ship
        return back home.
      </Box>
      <Box sx={authorStyle}>Nic Arnsby</Box>
    </Box>
  );
};

export default Testimonials;
