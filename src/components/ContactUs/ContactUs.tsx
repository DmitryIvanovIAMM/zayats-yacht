import SectionTitle from '@/components/SectionTitle/SectionTitle';
import ContactUsColumn from '@/components/ContactUs/ContactUsColumn';
import Box from '@mui/material/Box';

const contactUsContainerSx = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  justifyContent: 'center',
  marginLeft: '20px',
  marginRight: '20px'
};
const contactUsDataSx = {
  display: 'flex',
  marginTop: '30px',
  justifyContent: 'space-around',
  alignItems: {
    xs: 'left',
    md: 'center'
  },
  flexDirection: {
    xs: 'column',
    sm: 'row'
  }
};

const ContactUs = () => {
  return (
    <Box id="contact-us-section" sx={contactUsContainerSx}>
      <SectionTitle title="Contact Us" />
      <Box sx={contactUsDataSx}>
        <ContactUsColumn title="Address"> Address</ContactUsColumn>
        <ContactUsColumn title="Phone">Phone</ContactUsColumn>
        <ContactUsColumn title="Email">Email</ContactUsColumn>
      </Box>
    </Box>
  );
};

export default ContactUs;
