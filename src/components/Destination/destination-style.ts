import React from 'react';

export const subheaderSx = {
  padding: { sm: '0 17px', md: '0 114px' },
  width: '100%',
  minHeight: '300px',
  backgroundSize: 'cover',
  display: 'flex',
  '& p': {
    lineHeight: '59px'
  }
};
export const subheaderContentSx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '30px 0',
  color: 'primary.contrastText',
  justifyContent: 'space-between'
};
export const destinationNameSx = {
  fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
  textTransform: 'uppercase',
  fontWeight: 'bold',
  paddingLeft: { xs: '18px', sm: '0px' }
};
export const clippedTitleSx = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontSize: '24px',
  fontWeight: 600,
  padding: '12px 10% 12px 23px',
  background: '#00A995',
  color: 'primary.contrastText',
  justifyContent: 'space-between',
  clipPath: `polygon(0 0, 100% 0%, 90% 100%, 0% 100%)`,
  marginLeft: { xs: '18px', sm: '0px' }
};
export const sidePaddingSx = {
  padding: { xs: '0 17px', sm: '0 17px', md: '0 114px' },
  color: 'secondary.dark',
  marginBottom: '20px'
};
export const fullImageSx = {
  padding: '36px 0',
  '& img': {
    width: '100%'
  }
};
export const rowSx = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'column', md: 'row' },
  '&:nth-child(even)': {
    flexDirection: { xs: 'column-reverse', sm: 'column-reverse', md: 'row' }
  }
};
export const sectionTitleStyle: React.CSSProperties = {
  fontSize: '1.8em',
  textTransform: 'uppercase',
  fontWeight: 500
};
export const sectionTextStyle = {
  fontSize: '1.2em'
};
export const sectionImageSx = {
  imageSection: {
    padding: { sm: '0 !important' }
  },
  '& img': {
    width: '100%'
  }
};
export const fullImageSX = {
  display: { xs: 'none', sm: 'none', md: 'block' },
  padding: '8px 0',
  '& img': {
    width: '100%'
  }
};
