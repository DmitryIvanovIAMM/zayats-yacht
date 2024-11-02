import SectionTitle from '@/components/SectionTitle/SectionTitle';
import ContactUsColumn from '@/components/ContactUs/ContactUsColumn';
import Box from '@mui/material/Box';
import AddressColumnContent from '@/components/ContactUs/AddressColumnContent';
import PhoneColumnContent from '@/components/ContactUs/PhoneColumnContent.';
import EmailsColumnContent from '@/components/ContactUs/EmailsColumnContent';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';

export const sectionContainerSx = {
  display: 'flex',
  justifyContent: 'center',
  justifyItems: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  marginLeft: '20px',
  marginRight: '20px',
  marginTop: '40px',
  marginBottom: '20px',
  color: 'secondary.dark'
};
const contactUsSectionSx = {
  ...sectionContainerSx,
  marginLeft: '0px',
  marginRight: '0px',
  marginBottom: '0px',
  backgroundColor: '#F7F8F9',
  padding: '10px'
};
const contactUsDataSx = {
  display: 'flex',
  marginTop: {
    xs: '0px',
    sm: '30px'
  },
  justifyContent: 'space-around',
  alignItems: {
    xs: 'left',
    md: 'start'
  },
  flexDirection: {
    xs: 'column',
    sm: 'row'
  },
  color: 'secondary.dark'
};

const ContactUs = () => {
  return (
    <Box id="contact-us-section" sx={contactUsSectionSx}>
      <SectionTitle title="Contact Us" />
      <Box sx={contactUsDataSx}>
        <ContactUsColumn title="Address" icon={LocationOnIcon}>
          <AddressColumnContent />
        </ContactUsColumn>
        <ContactUsColumn title="Phone" icon={CallIcon}>
          <PhoneColumnContent />
        </ContactUsColumn>
        <ContactUsColumn title="Email" icon={EmailIcon}>
          <EmailsColumnContent />
        </ContactUsColumn>
      </Box>
    </Box>
  );
};

export default ContactUs;
