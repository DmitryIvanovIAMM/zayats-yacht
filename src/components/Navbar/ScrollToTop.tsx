import { Fade, useScrollTrigger } from '@mui/material';
import Box from '@mui/material/Box';
import React, { ReactNode } from 'react';

export interface ScrollTopProps {
  children: ReactNode;
}

const ScrollToTop: React.FC<ScrollTopProps> = ({ children }) => {
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: undefined,
    disableHysteresis: true,
    threshold: 100
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 11, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
};

export default ScrollToTop;
