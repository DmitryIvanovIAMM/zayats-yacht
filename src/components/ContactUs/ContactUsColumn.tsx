import React, { FC } from 'react';
import { Grid2, Typography } from '@mui/material';

export interface ContactUsColumnProps {
  title: string;
  icon?: any;
  children: React.ReactNode;
}

const ContactUsColumn: FC<ContactUsColumnProps> = ({ children, title, icon = 'icon' }) => {
  return (
    <Grid2 container spacing={3} alignContent="flex-start" style={{ margin: 20 }}>
      <Grid2 xs={12} sm={12} md={12} lg={12}>
        <div
          style={{
            background: '#fff',
            boxShadow: '0px 2px 20px rgba(51, 101, 167, 0.18)',
            borderRadius: '50%',
            minWidth: '67px',
            maxWidth: '67px',
            height: '67px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </div>
      </Grid2>
      <Grid2 xs={12} sm={12} md={12} lg={12} style={{ paddingTop: 0 }}>
        <Typography
          variant="h6"
          component="h6"
          style={{
            textTransform: 'uppercase',
            color: '#333333',
            fontWeight: '550',
            fontSize: '18px',
            lineHeight: '22px'
          }}
        >
          <br />
          {title}
        </Typography>
        {children}
      </Grid2>
    </Grid2>
  );
};

export default ContactUsColumn;
