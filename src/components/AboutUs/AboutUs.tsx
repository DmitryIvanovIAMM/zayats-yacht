import React from 'react';
import { sectionContainerSx } from '@/components/ContactUs/ContactUs';
import { Box } from '@mui/material';
import SectionTitle from '@/components/SectionTitle/SectionTitle';

const textStyle = {
  fontWeight: 500,
  fontSize: `1.3em`,
  lineHeight: '183.5%'
  //color: '#777777'
  //color: 'secondary.dark'
};
const emphasizedTextStyle = {
  fontWeight: 'bold'
};
export const centeredSectionSx = {
  ...sectionContainerSx,
  width: '90%',
  marginLeft: 'auto',
  marginRight: 'auto',
  '@media (min-width: 900px)': {
    width: '66%'
  }
};

const AboutUs = () => {
  return (
    <Box id="about-us-section" sx={centeredSectionSx}>
      <SectionTitle title="About Us" />
      <div>
        <Box style={textStyle}>
          <span style={emphasizedTextStyle}>Allied Yacht Transport</span>
          <br />
          Welcome to Allied Yacht Transport, your trusted partner in global yacht logistics and
          transportation services. At Allied Yacht Transport, we specialize in providing safe,
          reliable, and efficient transport solutions for yachts of all sizes. Our mission is to
          deliver unparalleled service that ensures your vessel reaches its destination securely and
          on schedule.
          <br />
          <br />
          <span style={emphasizedTextStyle}>Our Heritage</span>
          <br />
          Founded on a passion for the sea and a deep understanding of the complexities involved in
          yacht transportation, Allied Yacht Transport has grown to become a leading name in the
          industry. Under the leadership of Vadim Yegudkin, our president who has been a prominent
          figure in the yacht transport field for over 14 years, our team combines expertise with
          personal service to manage every aspect of your yacht's journey. From the bustling ports
          of North America to the serene waters of the Mediterranean, we cover all major routes
          across the globe.
          <br />
          <br />
          <span style={emphasizedTextStyle}>Our Services</span>
          <br />
          Allied Yacht Transport offers a comprehensive range of services tailored to meet the
          unique needs of each client. Our services include.
          <li>
            <span style={emphasizedTextStyle}>International Yacht Shipping:</span>
            &nbsp;&nbsp;We handle all logistics, from inland transportation to international
            shipping, ensuring your yacht is transported safely across oceans.
          </li>
          <li>
            <span style={emphasizedTextStyle}>Customs Clearance:</span>
            &nbsp;&nbsp;Our team takes care of all necessary customs documentation and clearance
            procedures, making international transfers as smooth as possible.
          </li>
          <li>
            <span style={emphasizedTextStyle}>Cradling and Shrink Wrapping:</span>
            &nbsp;&nbsp;To guarantee the utmost safety during transport, we provide custom cradling
            and professional shrink wrapping.
          </li>
          <li>
            <span style={emphasizedTextStyle}>Load Master Supervision:</span>
            &nbsp;&nbsp;Our experienced load masters oversee every step of the loading and unloading
            process, ensuring that each yacht is handled with care.
          </li>
          <li>
            <span style={emphasizedTextStyle}>Insurance:</span>
            &nbsp;&nbsp;We offer comprehensive marine insurance for peace of mind throughout the
            transport process.
          </li>
          <br />
          <span style={emphasizedTextStyle}>Our Commitment</span>
          <br />
          At Allied Yacht Transport, we are committed to excellence. Our dedicated team works
          closely with each client, providing personalized service and attention to detail that
          ensures every transport is executed flawlessly. We use the latest technology and equipment
          to monitor each shipment, giving our clients peace of mind knowing their valuable assets
          are in safe hands.
          <br />
          <br />
          <span style={emphasizedTextStyle}>Join Us</span>
          <br />
          Whether you're relocating, attending international regattas, or exploring new waters,
          Allied Yacht Transport is here to make your yacht transportation experience seamless and
          stress-free. Connect with us today to learn more about how we can assist with your yacht
          transport needs. Together, let's set the course for your next maritime adventure.
          <br />
          <br />
          <span style={emphasizedTextStyle}>
            Explore. Transport. Discover. With Allied Yacht Transport.
          </span>
        </Box>
      </div>
      <Box>
        <img
          style={{ width: '100%', height: 'auto' }}
          //src={xsScreen ? '/assets/images/aboutUs_sm.jpg' : '/assets/images/aboutUs.jpg'}
          src={'/assets/images/aboutUs.jpg'}
          alt="Allied Yacht Transport ship"
        />
      </Box>
    </Box>
  );
};

export default AboutUs;
