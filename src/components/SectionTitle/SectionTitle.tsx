import { FC } from 'react';
import { Typography } from '@mui/material';

const sectionTitleSx = {
  textTransform: 'uppercase',
  color: 'secondary.dark',
  fontSize: { xs: '2em', md: '3em' },
  marginBottom: '20px'
};

export interface SectionTitleProps {
  title: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ title }) => {
  return (
    <Typography component="h4" variant="h4" align="center" sx={sectionTitleSx}>
      {title}
    </Typography>
  );
};

export default SectionTitle;
