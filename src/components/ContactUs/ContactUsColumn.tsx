import React, { FC } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const contactUsContainerSx = {
  display: 'flex',
  justifyContent: 'start',
  justifyItems: 'start',
  flexDirection: 'row',
  alignItems: {
    xs: 'center',
    sm: 'start'
  }
};
const iconContainerStyle = {
  background: '#fff',
  boxShadow: '0px 2px 20px rgba(51, 101, 167, 0.18)',
  borderRadius: '50%',
  minWidth: '67px',
  maxWidth: '67px',
  height: '67px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '20px'
};
const titleContainerSx = {
  textTransform: 'uppercase',
  fontWeight: '550',
  fontSize: '18px',
  lineHeight: '22px',
  alignItems: 'start',
  verticalAlign: 'top'
};

export interface ContactUsColumnProps {
  title: string;
  icon?: any;
  children: React.ReactNode;
}

const ContactUsColumn: FC<ContactUsColumnProps> = ({
  children,
  title,
  icon: Icon = LocationOnIcon
}) => {
  return (
    <Box sx={contactUsContainerSx}>
      <div style={iconContainerStyle}>
        <Icon fontSize="large" />
      </div>
      <div style={{ alignItems: 'start' }}>
        <Typography variant="h5" component="h5" sx={titleContainerSx}>
          <br />
          {title}
        </Typography>
        {children}
      </div>
    </Box>
  );
};

export default ContactUsColumn;
